import Link from "next/link";
import LegalPage, { TEXT_LINK } from "../../components/legal/LegalPage";
import CookieSettingsButton from "../../components/legal/CookieSettingsButton";
import { RESPONSABLE, POLICY_EFFECTIVE_DATE, POLICY_VERSION } from "../../lib/legal";

// Política de Cookies. El inventario debe coincidir con lo que el sitio guarda realmente
// (claves de localStorage/sessionStorage y cookies de terceros): revisarlo al añadir
// cualquier script o almacenamiento nuevo.

const INVENTARIO = [
  {
    nombre: "dgz_cookie_consent",
    tipo: "Necesaria · almacenamiento local",
    proveedor: "DevGiz (propia)",
    finalidad: "Recordar si usted aceptó o rechazó las cookies de analítica",
    duracion: "Hasta que usted la borre o cambie su decisión",
  },
  {
    nombre: "dgz_session_token",
    tipo: "Necesaria · almacenamiento de sesión",
    proveedor: "DevGiz (propia)",
    finalidad: "Mantener la sesión del panel de administración (solo personal autorizado)",
    duracion: "Hasta cerrar la pestaña o la sesión (máximo 1 hora)",
  },
  {
    nombre: "dgz_skip_intro",
    tipo: "Necesaria · almacenamiento de sesión",
    proveedor: "DevGiz (propia)",
    finalidad: "No repetir la animación de entrada en la misma visita",
    duracion: "Hasta cerrar la pestaña",
  },
  {
    nombre: "dgz_map_engine, dgz_lang",
    tipo: "Funcional · almacenamiento local",
    proveedor: "DevGiz (propia)",
    finalidad: "Recordar el motor de mapa y el idioma que usted eligió",
    duracion: "Hasta que usted la borre",
  },
  {
    nombre: "dgz_cache_*",
    tipo: "Funcional · almacenamiento local",
    proveedor: "DevGiz (propia)",
    finalidad: "Guardar temporalmente resultados de las demostraciones para que carguen más rápido",
    duracion: "Hasta que usted la borre",
  },
  {
    nombre: "ph_* (cookie y almacenamiento local)",
    tipo: "Analítica · opcional",
    proveedor: "PostHog Inc. (Estados Unidos)",
    finalidad:
      "Medir de forma agregada cómo se usa el sitio para mejorarlo. Solo se activa si usted acepta",
    duracion: "Hasta 1 año",
  },
  {
    nombre: "Vercel Web Analytics y Speed Insights",
    tipo: "Estadística sin cookies",
    proveedor: "Vercel Inc. (Estados Unidos)",
    finalidad:
      "Contar visitas y medir rendimiento sin cookies ni identificadores persistentes en su dispositivo",
    duracion: "No almacena datos en su dispositivo",
  },
  {
    nombre: "Mapbox",
    tipo: "Funcional · terceros",
    proveedor: "Mapbox Inc. (Estados Unidos)",
    finalidad:
      "Mostrar mapas interactivos cuando usted los activa; puede guardar datos técnicos del mapa",
    duracion: "Según la política de Mapbox",
  },
];

const sections = [
  {
    id: "que-son",
    title: "Qué son las cookies",
    body: (
      <p>
        Las cookies y tecnologías similares (almacenamiento local o de sesión del navegador) son
        pequeños archivos o registros que un sitio guarda en su dispositivo. Algunas son necesarias
        para que el sitio funcione; otras, como las de analítica, son opcionales y solo se usan con
        su consentimiento.
      </p>
    ),
  },
  {
    id: "inventario",
    title: "Cookies y almacenamiento que usamos",
    body: (
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm text-left">
          <caption className="sr-only">Inventario de cookies y almacenamiento</caption>
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th scope="col" className="p-3 font-semibold">
                Nombre
              </th>
              <th scope="col" className="p-3 font-semibold">
                Tipo
              </th>
              <th scope="col" className="p-3 font-semibold">
                Proveedor
              </th>
              <th scope="col" className="p-3 font-semibold">
                Finalidad
              </th>
              <th scope="col" className="p-3 font-semibold">
                Duración
              </th>
            </tr>
          </thead>
          <tbody>
            {INVENTARIO.map((c) => (
              <tr key={c.nombre} className="border-t border-slate-200 align-top">
                <th scope="row" className="p-3 font-mono text-xs font-medium text-slate-800">
                  {c.nombre}
                </th>
                <td className="p-3">{c.tipo}</td>
                <td className="p-3">{c.proveedor}</td>
                <td className="p-3">{c.finalidad}</td>
                <td className="p-3">{c.duracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "errores",
    title: "Registro de errores",
    body: (
      <p>
        Usamos Sentry (Functional Software Inc., Estados Unidos) para registrar errores técnicos del
        sitio. No guarda cookies de seguimiento, no graba sesiones y está configurado para no enviar
        datos personales.
      </p>
    ),
  },
  {
    id: "gestion",
    title: "Cómo aceptar, rechazar o cambiar su decisión",
    body: (
      <>
        <p>
          En su primera visita le mostramos un aviso para aceptar o rechazar las cookies de
          analítica; rechazar es tan sencillo como aceptar y el sitio funciona igual. Puede cambiar
          su decisión en cualquier momento:
        </p>
        <CookieSettingsButton />
        <p>
          También puede borrar o bloquear las cookies y el almacenamiento local desde la
          configuración de su navegador. Si bloquea las necesarias, algunas funciones (como recordar
          su decisión) dejarán de funcionar.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    title: "Datos personales",
    body: (
      <p>
        La información obtenida mediante cookies de analítica puede constituir dato personal. Su
        tratamiento se rige por la{" "}
        <Link href="/privacy" className={TEXT_LINK}>
          Política de Tratamiento de Datos Personales
        </Link>
        , donde encontrará sus derechos y cómo ejercerlos. Responsable: {RESPONSABLE.nombre} (
        {RESPONSABLE.marca}), {RESPONSABLE.email}.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      current="/cookies"
      eyebrow="Cookies y almacenamiento local"
      title="Política de Cookies"
      intro={
        <p>
          Usamos solo el almacenamiento necesario para que el sitio funcione y, si usted lo acepta,
          cookies de analítica para entender cómo se usa. No usamos cookies publicitarias ni de
          redes sociales.
        </p>
      }
      sections={sections}
      updated={`Versión ${POLICY_VERSION} · Vigente desde el ${POLICY_EFFECTIVE_DATE}.`}
    />
  );
}
