import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { BLOG_POSTS_SEO, FOUNDER, pageMetadata, articleJsonLd, breadcrumbJsonLd } from "../../../lib/seo";

// Solo existen las rutas generadas: cualquier otro valor responde 404 real
// (antes devolvía 200 con un aviso en pantalla, un "soft 404" para Google).
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS_SEO).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = Object.hasOwn(BLOG_POSTS_SEO, id) ? BLOG_POSTS_SEO[id] : undefined;
  if (!post) return { title: "Artículo no encontrado", robots: { index: false, follow: true } };

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${id}`,
    image: post.image,
    type: "article",
    publishedTime: post.datePublished,
    authors: [FOUNDER.name],
  });
}

export default async function BlogPostLayout({ children, params }) {
  const { id } = await params;
  const post = Object.hasOwn(BLOG_POSTS_SEO, id) ? BLOG_POSTS_SEO[id] : undefined;
  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd({ id, ...post })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${id}` },
        ])}
      />
      {children}
    </>
  );
}
