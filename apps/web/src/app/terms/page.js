import Link from "next/link";
import LegalPage, { TEXT_LINK } from "../../components/legal/LegalPage";
import { RESPONSABLE, POLICY_EFFECTIVE_DATE, POLICY_VERSION } from "../../lib/legal";

// Términos y condiciones de uso del sitio. Los servicios profesionales se rigen por la
// propuesta o contrato escrito de cada proyecto; este documento regula el uso del sitio.

const mail = (
  <a href={`mailto:${RESPONSABLE.email}`} className={TEXT_LINK}>
    {RESPONSABLE.email}
  </a>
);

const sections = [
  {
    id: "identificacion",
    title: "Identificación",
    body: (
      <ul className="space-y-1.5 list-none">
        <li>
          <strong>Titular del sitio:</strong> {RESPONSABLE.nombre} ({RESPONSABLE.tipo}), que opera
          bajo la marca {RESPONSABLE.marca}.
        </li>
        <li>
          <strong>Identificación:</strong> {RESPONSABLE.documento}
        </li>
        <li>
          <strong>Matrícula profesional (COPNIA):</strong> {RESPONSABLE.matriculaProfesional}
        </li>
        <li>
          <strong>Domicilio:</strong> {RESPONSABLE.direccion}
        </li>
        <li>
          <strong>Contacto:</strong> {mail} · {RESPONSABLE.telefono}
        </li>
      </ul>
    ),
  },
  {
    id: "aceptacion",
    title: "Objeto y aceptación",
    body: (
      <p>
        Estos términos regulan el acceso y uso del sitio devgiz.vercel.app. El uso del sitio implica
        que usted conoce estos términos; si no está de acuerdo, absténgase de usarlo. El contenido es
        informativo y no constituye por sí mismo una oferta vinculante ni asesoría profesional para
        un caso concreto.
      </p>
    ),
  },
  {
    id: "servicios",
    title: "Servicios profesionales y precios",
    body: (
      <>
        <p>
          Los servicios de ingeniería, consultoría y desarrollo se prestan únicamente mediante
          propuesta, cotización o contrato escrito aceptado por ambas partes, que prevalece sobre la
          información de este sitio.
        </p>
        <p>
          Los precios publicados son valores de referencia en pesos colombianos (COP), vigentes a la
          fecha de la última actualización de la página, y en cada caso se indica si incluyen o no
          impuestos. Cuando el usuario actúe como consumidor, el precio informado será el precio
          total con impuestos incluidos; cuando el IVA sea aplicable a la operación, se discriminará
          en la propuesta y en la factura. El valor final, el alcance, los plazos, la forma de pago y
          las condiciones de cualquier anticipo o reembolso se fijan en la propuesta escrita. Los
          enlaces de pago de terceros (por ejemplo, pasarelas como Wompi) se rigen además por las
          condiciones de dicho proveedor.
        </p>
        <p>
          Cuando el usuario actúe como consumidor en los términos de la Ley 1480 de 2011, conservará
          los derechos que esa ley le reconoce, incluidos los de información, garantía y, cuando
          proceda, retracto.
        </p>
      </>
    ),
  },
  {
    id: "demostraciones",
    title: "Demostraciones, simulaciones y asistente de IA",
    body: (
      <>
        <p>
          El sitio incluye demostraciones técnicas, mapas, tableros, casos ilustrativos y consultas
          simuladas que usan datos ficticios o públicos con fines exclusivamente ilustrativos. No
          son información oficial, no sustituyen los certificados o consultas ante la
          Superintendencia de Notariado y Registro, el IGAC u otras entidades, y no deben usarse
          para tomar decisiones jurídicas, catastrales, técnicas o económicas.
        </p>
        <p>
          El asistente de inteligencia artificial genera respuestas automáticas mediante un modelo
          de lenguaje de un proveedor externo (Groq, Estados Unidos). Las respuestas pueden contener
          errores y no constituyen asesoría profesional. No escriba datos personales ni información
          confidencial en el asistente.
        </p>
        <p>
          Las menciones de normas y estándares (por ejemplo, LADM-COL / ISO 19152 o buenas prácticas
          de seguridad de la información) describen la metodología de trabajo y no implican
          certificación, aval ni relación con los organismos que los expiden, salvo que se indique
          expresamente.
        </p>
      </>
    ),
  },
  {
    id: "uso",
    title: "Uso permitido",
    body: (
      <>
        <p>Al usar el sitio, usted se compromete a no:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Intentar acceder sin autorización a sistemas, cuentas o datos, ni vulnerar sus medidas
            de seguridad.
          </li>
          <li>
            Enviar programas maliciosos, sobrecargar el servicio o automatizar consultas masivas.
          </li>
          <li>
            Subir o enviar datos personales de terceros sin autorización, ni contenido ilícito o que
            infrinja derechos de terceros.
          </li>
          <li>Usar el sitio o su contenido para fines contrarios a la ley o a estos términos.</li>
        </ul>
        <p>
          Podemos limitar o bloquear el acceso ante usos abusivos y, cuando corresponda, informar a
          las autoridades competentes.
        </p>
      </>
    ),
  },
  {
    id: "propiedad",
    title: "Propiedad intelectual",
    body: (
      <p>
        Los textos, diseños, código, gráficos y la marca {RESPONSABLE.marca} pertenecen a su titular
        o se usan con licencia. Se prohíbe su reproducción o explotación comercial sin autorización
        previa y escrita, salvo los usos permitidos por la ley. El código publicado en repositorios
        abiertos se rige por la licencia indicada en cada repositorio. Las marcas, nombres y normas
        de terceros mencionados pertenecen a sus respectivos titulares.
      </p>
    ),
  },
  {
    id: "terceros",
    title: "Enlaces y servicios de terceros",
    body: (
      <p>
        El sitio puede contener enlaces a sitios, mapas o servicios de terceros (por ejemplo,
        WhatsApp, LinkedIn, GitHub, OpenStreetMap o Mapbox). No controlamos su contenido ni sus
        políticas, y su uso se rige por las condiciones de cada tercero.
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Disponibilidad y responsabilidad",
    body: (
      <>
        <p>
          Procuramos que el sitio esté disponible y actualizado, pero no garantizamos que funcione
          sin interrupciones o errores, ni que la información esté libre de imprecisiones. Podemos
          actualizar o retirar contenidos informativos del sitio; esto no afecta las propuestas ni
          los contratos ya aceptados.
        </p>
        <p>
          En la medida permitida por la ley colombiana, no respondemos por daños derivados del uso
          de la información ilustrativa o de las demostraciones del sitio, ni por fallas de
          servicios de terceros. Esta limitación no se aplica a los casos de dolo o culpa grave ni a
          los derechos irrenunciables de los consumidores.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    title: "Datos personales y cookies",
    body: (
      <p>
        El tratamiento de datos personales se rige por la{" "}
        <Link href="/privacy" className={TEXT_LINK}>
          Política de Tratamiento de Datos Personales
        </Link>{" "}
        y el uso de cookies por la{" "}
        <Link href="/cookies" className={TEXT_LINK}>
          Política de Cookies
        </Link>
        .
      </p>
    ),
  },
  {
    id: "ley",
    title: "Ley aplicable, controversias y cambios",
    body: (
      <>
        <p>
          Estos términos se rigen por las leyes de la República de Colombia. Las diferencias se
          intentarán resolver de forma directa escribiendo a {mail}; de no lograrse, serán
          competentes los jueces de Medellín, sin perjuicio del derecho de los consumidores a acudir
          a la Superintendencia de Industria y Comercio o al juez de su domicilio.
        </p>
        <p>
          Podemos actualizar estos términos; la versión vigente es la publicada en esta página con
          su fecha. Las modificaciones no afectan los contratos ya celebrados ni los derechos
          adquiridos, que se rigen por la propuesta o contrato aplicable y por la versión vigente al
          momento de su aceptación.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      current="/terms"
      eyebrow="Condiciones de uso"
      title="Términos y Condiciones"
      sections={sections}
      updated={`Versión ${POLICY_VERSION} · Vigente desde el ${POLICY_EFFECTIVE_DATE}.`}
    />
  );
}
