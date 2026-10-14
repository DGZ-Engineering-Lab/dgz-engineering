import xml.etree.ElementTree as ET

import pytest

from core.ladm_engine import DgzLadmColEngine

MODEL = "Catastro_Registro_COL_V3_0"
WKT = "POLYGON ((4800000 2100000, 4800010 2100000, 4800010 2100010, 4800000 2100000))"


@pytest.fixture
def engine():
    return DgzLadmColEngine()


def test_map_feature_uses_attributes(engine):
    mapped = engine.map_feature_to_ladm(
        {
            "npn": "050010101000000010001000000000",
            "matricula": "001-123456",
            "area_m2": "250.5",
            "propietario": "ANA RESTREPO",
            "documento": "43123456",
            "tipo": "PRIVADO",
        },
        WKT,
    )

    assert mapped["BAUnit"]["id"] == "COL_BAUnit_050010101000000010001000000000"
    assert mapped["BAUnit"]["tipo"] == "Privado"
    assert mapped["BAUnit"]["matricula"] == "001-123456"
    assert mapped["SpatialUnit"]["area"] == pytest.approx(250.5)
    assert mapped["Party"]["tipo"] == "Persona_Natural"
    assert mapped["RRR"]["tipo"] == "Dominio"


def test_map_feature_falls_back_to_defaults(engine):
    mapped = engine.map_feature_to_ladm({}, WKT)

    assert mapped["BAUnit"]["npn"] == "0" * 30
    assert mapped["BAUnit"]["tipo"] == "Baldio"
    assert mapped["Party"]["nombre"] == "ESTADO COLOMBIANO"
    assert mapped["SpatialUnit"]["area"] == 0.0


def test_map_feature_flags_false_tradition_and_legal_entities(engine):
    mapped = engine.map_feature_to_ladm({"falsa_tradicion": "SI", "documento": "9001234567"}, WKT)

    assert mapped["RRR"]["tipo"] == "Falsa_Tradicion"
    assert mapped["Party"]["tipo"] == "Persona_Juridica"


def test_generate_xtf_writes_interlis_transfer(engine, tmp_path):
    dataset = [engine.map_feature_to_ladm({"npn": "1", "area_m2": 10}, WKT)]
    target = tmp_path / "out.xtf"

    assert engine.generate_xtf_xml(dataset, str(target)) is True

    root = ET.parse(target).getroot()
    ns = "{http://www.interlis.ch/INTERLIS2.3}"
    assert root.tag == f"{ns}TRANSFER"
    basket = root.find(f"{ns}DATASECTION/{ns}{MODEL}.ModelBasket")
    assert basket is not None
    predio = basket.find(f"{ns}{MODEL}.COL_Predio")
    assert predio.get("tid") == "COL_BAUnit_1"
    coords = basket.findall(f".//{ns}COORD")
    assert len(coords) == 4
    assert coords[0].find(f"{ns}C1").text == "4800000"


def test_generate_xtf_reports_failure(engine, tmp_path):
    assert engine.generate_xtf_xml([{"BAUnit": {}}], str(tmp_path / "bad.xtf")) is False
