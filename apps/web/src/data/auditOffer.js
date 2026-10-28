/**
 * Paid entry offer shown at the end of the /diagnostic calculator.
 * Edit price, delivery time or deliverables here; the UI and the lead email read from this object.
 */
import { PRICE_NOTES } from "./servicesData";

export const AUDIT_OFFER = {
  name: "Auditoría Catastral Express",
  price: "$2.500.000 COP",
  priceNote: `Precio de referencia para municipios de hasta 50.000 predios. ${PRICE_NOTES.currency} ${PRICE_NOTES.validity}`,
  delivery: "Entrega en 10 días hábiles",
  deliverables: [
    "Revisión topológica de la base catastral (traslapes, huecos y linderos)",
    "Cruce de mejoras no incorporadas con imágenes satelitales abiertas",
    "Estimación de la posible fuga de recaudo predial a partir de sus datos",
    "Informe ejecutivo en PDF y reunión de 45 minutos para presentar hallazgos",
  ],
};

const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

/**
 * Builds the plain-text message sent to /api/contact so the lead arrives with the numbers the visitor saw.
 */
export function buildAuditLeadMessage({ source, municipio, cargo, numPredios, yearsOutdated, avgTax, annualLeak, totalLoss }) {
  const lines = [
    `[Lead Diagnóstico] ${source === "report" ? "Solicita la auditoría pagada desde el informe" : "Solicita la auditoría pagada desde la calculadora"}`,
    `Oferta: ${AUDIT_OFFER.name} (${AUDIT_OFFER.price}, ${AUDIT_OFFER.delivery.toLowerCase()})`,
  ];
  if (municipio) lines.push(`Municipio / organización: ${municipio}`);
  if (cargo) lines.push(`Cargo: ${cargo}`);
  if (Number.isFinite(numPredios)) lines.push(`Predios: ${numPredios.toLocaleString("es-CO")}`);
  if (Number.isFinite(yearsOutdated)) lines.push(`Años sin actualizar: ${yearsOutdated}`);
  if (Number.isFinite(avgTax)) lines.push(`Predial promedio: ${formatCOP(avgTax)}`);
  if (Number.isFinite(annualLeak)) lines.push(`Fuga anual estimada: ${formatCOP(annualLeak)}`);
  if (Number.isFinite(totalLoss)) lines.push(`Pérdida acumulada estimada: ${formatCOP(totalLoss)}`);
  return lines.join("\n");
}
