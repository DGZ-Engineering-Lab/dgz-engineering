import JsonLd from "../../../components/JsonLd";
import { BLOG_POSTS_SEO, FOUNDER, pageMetadata, articleJsonLd, breadcrumbJsonLd } from "../../../lib/seo";

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS_SEO).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = BLOG_POSTS_SEO[id];
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
  const post = BLOG_POSTS_SEO[id];

  return (
    <>
      {post && (
        <>
          <JsonLd data={articleJsonLd({ id, ...post })} />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${id}` },
            ])}
          />
        </>
      )}
      {children}
    </>
  );
}
