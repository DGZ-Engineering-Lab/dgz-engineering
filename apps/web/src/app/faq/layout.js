import JsonLd from "../../components/JsonLd";
import { FAQS } from "../../data/faqData";
import { pageMetadata, faqJsonLd } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Preguntas Frecuentes sobre LADM-COL, Catastro e INTERLIS",
  description:
    "Respuestas expertas sobre LADM-COL (ISO 19152), INTERLIS/XTF, gestores catastrales, normativa del IGAC y la SNR, MAGNA-SIRGAS CTM12, LiDAR y la tecnología geoespacial de DevGiz.",
  path: "/faq",
});

export default function FaqLayout({ children }) {
  const questions = FAQS.flatMap((cat) => cat.questions);
  return (
    <>
      <JsonLd data={faqJsonLd(questions)} />
      {children}
    </>
  );
}
