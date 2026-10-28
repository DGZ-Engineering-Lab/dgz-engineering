import Link from "next/link";
import LegalPage, { TEXT_LINK } from "../../components/legal/LegalPage";
import { RESPONSABLE, POLICY_EFFECTIVE_DATE, POLICY_VERSION, PROVEEDORES } from "../../lib/legal";

// Política de Tratamiento de la Información (Ley 1581 de 2012; Decreto 1074 de 2015,
// Sección 2.2.2.25). Contenido mínimo: responsable, tratamiento y finalidades, derechos,
// área de atención, procedimiento, vigencia. Mantener sincronizada con src/lib/legal.js.

const mail = (
  <a href={`mailto:${RESPONSABLE.email}`} className={TEXT_LINK}>
    {RESPONSABLE.email}
  </a>
);

const FINALIDADES_TABLA = [
  {
    canal: "Formulario de contacto y WhatsApp",
    datos:
      "Nombre, correo, empresa o entidad, asunto y mensaje; número de WhatsApp si nos escribe por ese medio",
    finalidad:
      "Responder su solicitud, preparar propuestas y cotizaciones y hacer seguimiento comercial",
  },
  {
    canal: "Diagnóstico y auditoría territorial",
    datos: "Nombre, correo, cargo y municipio o entidad",
    finalidad:
      "Elaborar el diagnóstico solicitado y presentarle resultados y propuestas relacionadas",
  },
  {
    canal: "Cotización de servicios",
    datos: "Nombre, correo, organización, teléfono, plan de interés y mensaje",
    finalidad: "Preparar y enviar la cotización y gestionar la eventual contratación",
  },
  {
    canal: "Trabaja con nosotros",
    datos: "Nombre, correo, enlace a portafolio o perfil y presentación",
    finalidad: "Evaluar su perfil en procesos de selección o colaboración",
  },
  {
    canal: "Boletín",
    datos: "Correo electrónico",
    finalidad: "Enviarle el boletín técnico y novedades, con opción de baja en cada envío",
  },
  {
    canal: "Navegación del sitio",
    datos:
      "Datos técnicos de navegación (páginas vistas, tipo de dispositivo, errores técnicos) y, solo si acepta cookies de analítica, identificadores de PostHog",
    finalidad:
      "Seguridad del sitio, prevención de abuso, corrección de errores y estadística de uso (ver la Política de Cookies)",
  },
  {
    canal: "Asistente de IA",
    datos: "El texto que usted escribe en el asistente",
    finalidad: "Generar la respuesta solicitada. No escriba datos personales en el asistente",
  },
];

const sections = [
  {
    id: "responsable",
    title: "Responsable del tratamiento",
    body: (
      <>
        <ul className="space-y-1.5 list-none">
          <li>
            <strong>Nombre:</strong> {RESPONSABLE.nombre} ({RESPONSABLE.tipo}), que opera bajo la
            marca {RESPONSABLE.marca}.
          </li>
          <li>
            <strong>Identificación:</strong> {RESPONSABLE.documento}
          </li>
          <li>
            <strong>Domicilio y dirección:</strong> {RESPONSABLE.direccion}
          </li>
          <li>
            <strong>Correo electrónico:</strong> {mail}
          </li>
          <li>
            <strong>Teléfono / WhatsApp:</strong> {RESPONSABLE.telefono}
          </li>
          <li>
            <strong>Sitio web:</strong> devgiz.vercel.app
          </li>
        </ul>
        <p>
          El responsable atiende directamente las consultas y reclamos de los titulares en el correo
          indicado; no existe un área separada para ello.
        </p>
      </>
    ),
  },
  {
    id: "marco",
    title: "Marco legal y alcance",
    body: (
      <p>
        Esta política se expide en cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto 1074
        de 2015 (que compila el Decreto 1377 de 2013) y las normas que los modifiquen o
        complementen. Se aplica a los datos personales que recibimos a través de este sitio web, sus
        formularios, el correo electrónico y WhatsApp.
      </p>
    ),
  },
  {
    id: "finalidades",
    title: "Datos que tratamos y finalidades",
    body: (
      <>
        <p>
          Solo recolectamos los datos necesarios para cada finalidad. Cada formulario le informa la
          finalidad concreta y le pide su autorización antes de enviar.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <caption className="sr-only">Datos tratados y finalidad por canal</caption>
            <thead className="bg-slate-50 text-slate-800">
              <tr>
                <th scope="col" className="p-3 font-semibold">
                  Canal
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Datos
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Finalidad
                </th>
              </tr>
            </thead>
            <tbody>
              {FINALIDADES_TABLA.map((f) => (
                <tr key={f.canal} className="border-t border-slate-200 align-top">
                  <th scope="row" className="p-3 font-medium text-slate-800">
                    {f.canal}
                  </th>
                  <td className="p-3">{f.datos}</td>
                  <td className="p-3">{f.finalidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          No vendemos ni cedemos sus datos personales a terceros con fines comerciales y no tomamos
          decisiones automatizadas que produzcan efectos jurídicos sobre usted.
        </p>
      </>
    ),
  },
  {
    id: "sensibles",
    title: "Datos sensibles y de menores",
    body: (
      <>
        <p>
          No solicitamos datos sensibles (origen racial o étnico, salud, orientación política, datos
          biométricos, entre otros). Usted no está obligado a suministrarlos; si los incluye por
          iniciativa propia en un mensaje, los trataremos solo para atender su solicitud.
        </p>
        <p>
          El laboratorio de gestos usa la cámara únicamente después de que usted la activa. El video
          se procesa en su navegador para detectar la posición de la mano: no se graba, no se
          almacena y no se envía a ningún servidor.
        </p>
        <p>
          Este sitio está dirigido a profesionales y entidades. No recolectamos conscientemente
          datos de niños, niñas o adolescentes.
        </p>
      </>
    ),
  },
  {
    id: "terceros",
    title: "Información de terceros y demostraciones",
    body: (
      <>
        <p>
          Las demostraciones del sitio usan datos ficticios. La consulta de folios de matrícula
          inmobiliaria no muestra nombres ni documentos de los titulares: esa información debe
          consultarse directamente ante la Superintendencia de Notariado y Registro.
        </p>
        <p>
          Si usted nos envía información o archivos que contienen datos personales de otras
          personas, declara que cuenta con la autorización o la base legal necesaria para
          compartirlos. No suba archivos con datos personales de terceros a las demostraciones del
          sitio.
        </p>
      </>
    ),
  },
  {
    id: "proveedores",
    title: "Encargados y transferencia internacional",
    body: (
      <>
        <p>
          Para operar el sitio usamos proveedores tecnológicos que actúan como encargados del
          tratamiento y que pueden procesar o alojar la información en servidores ubicados
          principalmente en Estados Unidos. Se trata de una transmisión internacional de datos a
          encargados, que realizamos con su autorización informada. Estados Unidos y el Reino Unido
          figuran entre los países con nivel adecuado de protección según la Circular Externa 005 de
          2017 de la Superintendencia de Industria y Comercio. Exigimos a los proveedores condiciones
          de seguridad y confidencialidad compatibles con esta política, mediante sus términos de
          tratamiento de datos.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          {PROVEEDORES.map((p) => (
            <li key={p.nombre}>
              <strong>{p.nombre}</strong> ({p.pais}): {p.uso}.
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "derechos",
    title: "Derechos del titular",
    body: (
      <>
        <p>Como titular de los datos, usted tiene derecho a (Ley 1581 de 2012, art. 8):</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Solicitar prueba de la autorización otorgada.</li>
          <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
          <li>
            Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la
            ley, una vez agotado el trámite de consulta o reclamo ante el responsable.
          </li>
          <li>
            Revocar la autorización y solicitar la supresión de sus datos cuando no exista un deber
            legal o contractual de conservarlos.
          </li>
          <li>Acceder gratuitamente a sus datos personales objeto de tratamiento.</li>
        </ul>
      </>
    ),
  },
  {
    id: "procedimiento",
    title: "Cómo ejercer sus derechos: consultas y reclamos",
    body: (
      <>
        <p>
          Escriba a {mail} indicando su nombre, documento de identidad, un medio para responderle y
          su petición concreta. Puede hacerlo usted, su causahabiente o su representante o apoderado
          debidamente acreditado.
        </p>
        <p>
          <strong>Consultas</strong> (conocer qué datos tenemos y cómo se usan): se responden en un
          máximo de diez (10) días hábiles desde su recibo. Si no es posible en ese plazo, le
          informaremos el motivo y la fecha de respuesta, que no superará cinco (5) días hábiles
          adicionales.
        </p>
        <p>
          <strong>Reclamos</strong> (corregir, actualizar o suprimir datos, o revocar la
          autorización): se atienden en un máximo de quince (15) días hábiles desde el día siguiente
          a su recibo completo, prorrogables hasta por ocho (8) días hábiles informándole el motivo.
          Si el reclamo está incompleto, dentro de los cinco (5) días siguientes a su recepción le
          pediremos que subsane las fallas; si transcurridos dos (2) meses desde ese requerimiento no
          presenta la información solicitada, se entenderá que desistió del reclamo. Una vez
          recibido el reclamo completo, en un máximo de dos (2) días hábiles incluiremos en nuestros
          registros la leyenda «reclamo en trámite» y el motivo. Si no somos competentes para
          resolverlo, lo trasladaremos a quien corresponda en un máximo de dos (2) días hábiles y se
          lo informaremos.
        </p>
        <p>
          Para dejar de recibir el boletín use la instrucción de baja incluida en cada envío o
          escríbanos: la baja es gratuita y se aplica sin necesidad de justificarla.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    title: "Conservación y seguridad",
    body: (
      <>
        <p>
          Los mensajes recibidos por los formularios se eliminan automáticamente de la base de datos
          del sitio a los treinta (30) días. La notificación enviada al correo del responsable se
          conserva en ese buzón mientras sea necesaria para atender su solicitud, la relación
          comercial o el proceso de selección, y se elimina después o antes si usted lo solicita.
          Las comunicaciones que den lugar a una relación comercial se conservan mientras dure esa
          relación y durante el tiempo que exijan las normas contables, tributarias y de
          responsabilidad aplicables. Los datos de candidatos se conservan hasta doce (12) meses y
          los suscriptores del boletín hasta que se den de baja. El asistente de IA no guarda las
          conversaciones.
        </p>
        <p>
          La prueba de su autorización (texto aceptado, fecha, versión de la política y formulario)
          se guarda en un registro separado que no contiene su mensaje ni su correo en claro, y se
          conserva mientras tratemos sus datos y durante el tiempo que la ley exija para
          acreditarla.
        </p>
        <p>
          Aplicamos medidas técnicas razonables: conexión cifrada (HTTPS), control de acceso al
          panel de mensajes, límites contra el abuso y registro de errores técnicos sin datos
          personales. Si ocurre un incidente de seguridad que afecte sus datos, lo informaremos a la
          Superintendencia de Industria y Comercio y a los afectados conforme a la ley.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies y analítica",
    body: (
      <p>
        Usamos almacenamiento técnico necesario y, solo si usted lo acepta, cookies de analítica.
        Consulte el detalle y cómo cambiar su decisión en la{" "}
        <Link href="/cookies" className={TEXT_LINK}>
          Política de Cookies
        </Link>
        .
      </p>
    ),
  },
  {
    id: "vigencia",
    title: "Vigencia y cambios",
    body: (
      <p>
        Esta política rige desde el {POLICY_EFFECTIVE_DATE} (versión {POLICY_VERSION}). Las bases de
        datos estarán vigentes mientras se mantengan las finalidades descritas. Si cambiamos
        sustancialmente esta política o las finalidades, lo publicaremos en esta página antes de
        aplicarlo y, cuando la ley lo exija, pediremos una nueva autorización.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      current="/privacy"
      eyebrow="Ley 1581 de 2012 · Habeas Data"
      title="Política de Tratamiento de Datos Personales"
      intro={
        <p>
          <strong>Aviso de privacidad.</strong> {RESPONSABLE.nombre} ({RESPONSABLE.marca}) es
          responsable del tratamiento de los datos personales que usted suministra en este sitio.
          Los usamos para atender sus solicitudes, cotizaciones, procesos de selección y el boletín
          al que se suscriba. Usted puede conocer, actualizar, rectificar y suprimir sus datos y
          revocar su autorización escribiendo a {mail}.
        </p>
      }
      sections={sections}
      updated={`Versión ${POLICY_VERSION} · Vigente desde el ${POLICY_EFFECTIVE_DATE}.`}
    />
  );
}
