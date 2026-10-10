import logging
import xml.etree.ElementTree as ET
import datetime
from typing import Dict, Any, List

class DgzLadmColEngine:
    """
    LADM-COL v3.0 Mapping & INTERLIS 2 (XTF) Export Engine.
    Converts QGIS vectors & SNR registry properties into official IGAC XML linderos.
    Supports EPSG:9377 (MAGNA-SIRGAS Origen Nacional) coordinate writing.
    """
    def __init__(self, model_name: str = "Catastro_Registro_COL_V3_0"):
        self.model_name = model_name

    def map_feature_to_ladm(self, qgis_attrs: Dict[str, Any], geometry_wkt: str) -> Dict[str, Any]:
        """
        Translates raw QGIS layer attributes into LADM-COL structured classes.
        """
        # Read parameters with standard fallbacks
        npn = qgis_attrs.get("npn") or qgis_attrs.get("codigo") or "000000000000000000000000000000"
        matricula = qgis_attrs.get("matricula") or qgis_attrs.get("fmi") or "000-000000"
        area_m2 = float(qgis_attrs.get("area_m2") or qgis_attrs.get("area") or 0.0)
        
        # Interesado Mapping
        owner_name = qgis_attrs.get("propietario") or qgis_attrs.get("owner") or "ESTADO COLOMBIANO"
        owner_doc = qgis_attrs.get("documento") or "00000000"
        
        return {
            "BAUnit": {
                "id": f"COL_BAUnit_{npn}",
                "nombre": f"PREDIO_NPN_{npn}",
                "tipo": "Privado" if qgis_attrs.get("tipo") == "PRIVADO" else "Baldio",
                "matricula": matricula,
                "npn": npn
            },
            "SpatialUnit": {
                "id": f"COL_SpatialUnit_{npn}",
                "area": area_m2,
                "wkt": geometry_wkt
            },
            "Party": {
                "id": f"COL_Party_{owner_doc}",
                "nombre": owner_name,
                "documento": owner_doc,
                "tipo": "Persona_Natural" if len(owner_doc) < 10 else "Persona_Juridica"
            },
            "RRR": {
                "id": f"COL_Derecho_{npn}_{owner_doc}",
                "tipo": "Dominio" if qgis_attrs.get("falsa_tradicion") != "SI" else "Falsa_Tradicion",
                "participacion": 1.0
            }
        }

    def generate_xtf_xml(self, mapped_dataset: List[Dict[str, Any]], target_file_path: str) -> bool:
        """
        Serializes LADM-COL features to an INTERLIS 2 transfer file (.xtf).
        Formats geometries to GML coordinate blocks under EPSG:9377.
        """
        try:
            # Setup standard XTF namespaces
            ET.register_namespace('xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            root = ET.Element('TRANSFER', {
                'xmlns': 'http://www.interlis.ch/INTERLIS2.3',
                'version': '2.3'
            })
            
            # 1. Header Section
            header = ET.SubElement(root, 'HEADERSECTION', {
                'sender': 'DevGiz Spatial Territorial OS v6.2.0',
                'version': '2.3'
            })
            models = ET.SubElement(header, 'MODELS')
            ET.SubElement(models, 'MODEL', {
                'name': self.model_name,
                'uri': 'http://www.igac.gov.co/models/LADM_COL_V3_0',
                'version': '2023-11-20'
            })
            
            # 2. Data Section
            data_section = ET.SubElement(root, 'DATASECTION')
            basket = ET.SubElement(data_section, f'{self.model_name}.ModelBasket', {
                'bid': f'b_{datetime.datetime.now().strftime("%Y%m%d_%H%M%S")}'
            })
            
            # Write structured LADM records
            for entry in mapped_dataset:
                b = entry["BAUnit"]
                s = entry["SpatialUnit"]
                p = entry["Party"]
                r = entry["RRR"]
                
                # Write LA_BAUnit (COL_Predio)
                ba_unit_node = ET.SubElement(basket, f'{self.model_name}.COL_Predio', {'tid': b["id"]})
                ET.SubElement(ba_unit_node, 'Nombre').text = b["nombre"]
                ET.SubElement(ba_unit_node, 'Matricula_Inmobiliaria').text = b["matricula"]
                ET.SubElement(ba_unit_node, 'NPN').text = b["npn"]
                ET.SubElement(ba_unit_node, 'Tipo_Predio').text = b["tipo"]
                
                # Write LA_Party (COL_Interesado)
                party_node = ET.SubElement(basket, f'{self.model_name}.COL_Interesado', {'tid': p["id"]})
                ET.SubElement(party_node, 'Nombre').text = p["nombre"]
                ET.SubElement(party_node, 'Documento_Identidad').text = p["documento"]
                ET.SubElement(party_node, 'Tipo_Interesado').text = p["tipo"]
                
                # Write LA_RRR (COL_Derecho)
                rrr_node = ET.SubElement(basket, f'{self.model_name}.COL_Derecho', {'tid': r["id"]})
                ET.SubElement(rrr_node, 'Tipo').text = r["tipo"]
                ET.SubElement(rrr_node, 'Fraccion_Derecho').text = str(r["participacion"])
                ET.SubElement(rrr_node, 'Unidad_Asociada', {'ref': b["id"]})
                ET.SubElement(rrr_node, 'Interesado_Asociado', {'ref': p["id"]})
                
                # Write LA_SpatialUnit (COL_UnidadEspacial)
                spatial_node = ET.SubElement(basket, f'{self.model_name}.COL_UnidadEspacial', {'tid': s["id"]})
                ET.SubElement(spatial_node, 'Area_Calculada').text = f'{s["area"]:.2f}'
                
                # Format WKT to clean XTF MultiSurface coordinates (Simple representation)
                geometry_node = ET.SubElement(spatial_node, 'Geometria')
                surface_node = ET.SubElement(geometry_node, 'MULTISURFACE')
                boundary_node = ET.SubElement(surface_node, 'surface')
                exterior_node = ET.SubElement(boundary_node, 'EXTERNAL')
                
                # Parse basic polygon WKT: POLYGON ((X Y, X Y, ...))
                wkt = s["wkt"]
                if "POLYGON" in wkt:
                    coords_str = wkt.replace("POLYGON", "").replace("(", "").replace(")", "").strip()
                    points = [pt.strip().split() for pt in coords_str.split(",")]
                    
                    for pt in points:
                        if len(pt) >= 2:
                            coord_el = ET.SubElement(exterior_node, 'COORD')
                            ET.SubElement(coord_el, 'C1').text = pt[0]
                            ET.SubElement(coord_el, 'C2').text = pt[1]

            # Write XML structure to disk
            tree = ET.ElementTree(root)
            # Indent XML for readable structure
            ET.indent(tree, space="  ", level=0)
            tree.write(target_file_path, encoding='utf-8', xml_declaration=True)
            return True
            
        except Exception as e:
            logging.error(f"Failed to generate INTERLIS XTF file: {str(e)}")
            return False
