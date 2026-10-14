// Inyecta datos estructurados schema.org como <script type="application/ld+json">.
// Se escapa "<" para que el contenido no pueda cerrar la etiqueta script.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
