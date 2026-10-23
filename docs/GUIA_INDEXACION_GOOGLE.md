# Guía paso a paso: que Google indexe DevGiz (coste $0)

Sitio: **https://devgiz.vercel.app** (Next.js en Vercel, plan Hobby gratuito).
Tiempo total de trabajo: ~2 horas repartidas en 4 semanas. Google tarda entre
unos días y varias semanas en indexar un sitio nuevo: es normal.

> Qué ya está resuelto en el código (rama `mejora/auditoria-seo-seguridad-ui`):
> `sitemap.xml` y `robots.txt` dinámicos, metadatos y Open Graph por página,
> JSON-LD (Organization, Person, WebSite, BlogPosting, Service, BreadcrumbList),
> 404 reales en rutas inexistentes, redirecciones de URLs antiguas, home con
> título orientado a búsqueda y el sitio duplicado de GitHub Pages convertido
> en redirecciones hacia Vercel.

---

## Fase 0 — Antes de empezar (día 1, 15 min)

1. **Fusiona y despliega la rama.** Abre un PR de `mejora/auditoria-seo-seguridad-ui`
   a `main`, espera el CI en verde y revisa el *Preview Deployment* de Vercel.
   Al fusionar, Vercel publica en producción y GitHub Pages queda como redirección.
2. **Comprueba que producción responde bien** (en tu terminal):

   ```bash
   curl -sI https://devgiz.vercel.app/                 | head -1   # HTTP/2 200
   curl -sI https://devgiz.vercel.app/blog/999         | head -1   # HTTP/2 404
   curl -sI https://devgiz.vercel.app/services/xyz     | head -1   # HTTP/2 404
   curl -sI https://devgiz.vercel.app/lab/map.html     | head -1   # 308 → /projects
   curl -s  https://devgiz.vercel.app/robots.txt                   # Allow: / + Sitemap
   curl -s  https://devgiz.vercel.app/sitemap.xml | grep -c '<loc>'  # ~31
   ```

   Si `/blog/999` devuelve 200, la corrección de *soft 404* no se desplegó.

---

## Fase 1 — Google Search Console (día 1, 20 min)

Search Console es gratuito y es la única forma de decirle a Google “este sitio
existe” y ver qué indexa.

1. Entra en <https://search.google.com/search-console> con tu cuenta de Google.
2. **Añadir propiedad → “Prefijo de la URL”** → `https://devgiz.vercel.app/`.
   (La opción “Dominio” no está disponible en `*.vercel.app` porque no controlas su DNS.)
3. **Verificar la propiedad** — elige **una** de las dos opciones:

   **Opción A — archivo HTML (recomendada, no depende de variables):**
   1. Descarga el archivo `googleXXXXXXXXXXXX.html` que te ofrece Google.
   2. Cópialo tal cual en `apps/web/public/`.
   3. `git add`, commit, push a `main` → espera el despliegue.
   4. Comprueba que abre: `https://devgiz.vercel.app/googleXXXXXXXXXXXX.html`.
   5. Pulsa **Verificar**. **No borres nunca ese archivo** (Google re-verifica).

   **Opción B — metaetiqueta (ya soportada por el código):**
   1. Elige “Etiqueta HTML” y copia solo el valor de `content="..."`.
   2. En Vercel → Project → Settings → Environment Variables, crea
      `GOOGLE_SITE_VERIFICATION` = ese valor, entorno **Production**.
   3. **Redespliega** (Deployments → ⋯ → Redeploy). La variable se lee en build.
   4. Comprueba: `curl -s https://devgiz.vercel.app/ | grep -o 'google-site-verification[^>]*'`
   5. Pulsa **Verificar**.

4. **Enviar el sitemap:** menú *Sitemaps* → escribe `sitemap.xml` → *Enviar*.
   Debe quedar en estado “Correcto” con ~31 URLs descubiertas.
5. **Solicitar indexación de las páginas clave:** menú *Inspección de URLs*,
   pega cada URL, pulsa *Probar URL publicada* (debe decir “La URL está disponible
   para Google”) y luego **Solicitar indexación**. Hay un cupo diario (~10-12):
   prioriza en este orden:
   1. `https://devgiz.vercel.app/`
   2. `https://devgiz.vercel.app/services`
   3. `https://devgiz.vercel.app/projects`
   4. `https://devgiz.vercel.app/projects/qgis-plugin`
   5. `https://devgiz.vercel.app/about`
   6. `https://devgiz.vercel.app/blog`
   7. Las páginas `https://devgiz.vercel.app/services/<slug>` (al día siguiente)
   8. Los artículos `https://devgiz.vercel.app/blog/1` … `/blog/4`

---

## Fase 2 — Bing, DuckDuckGo y motores de IA (día 1, 10 min)

Bing alimenta también a DuckDuckGo, Yahoo, Ecosia y a ChatGPT Search.

1. <https://www.bing.com/webmasters> → inicia sesión → **Importar desde Google
   Search Console** (importa sitio, verificación y sitemap en un clic).
2. Si prefieres verificar aparte: variable `BING_SITE_VERIFICATION` en Vercel
   (el código ya la soporta) + redeploy.
3. `robots.txt` ya permite a los rastreadores de IA y existe `/llms.txt`.

---

## Fase 3 — Señales de entidad y enlaces (semana 1, 1 h)

Google indexa más rápido lo que está enlazado desde sitios que ya rastrea.

1. **Google Business Profile** (gratis): <https://business.google.com>
   - Tipo: *negocio de área de servicio* (oculta la dirección si trabajas desde casa).
   - Nombre exacto: `DevGiz` (sin añadir keywords: lo prohíben las directrices).
   - Categoría más cercana: “Servicio de cartografía”, “Consultor”, “Ingeniero”.
   - Zona: Medellín / Antioquia / Colombia. Sitio web: `https://devgiz.vercel.app`.
   - Verificación por vídeo o llamada según te pida Google.
2. **GitHub:** en el repo → *About* (engranaje) → Website = `https://devgiz.vercel.app`,
   topics `ladm-col`, `catastro`, `qgis`, `postgis`, `webgis`, `colombia`.
   Pon también la URL en tu perfil de GitHub personal y de la organización.
3. **LinkedIn:** URL del sitio en tu perfil (sección Contacto y Destacado) y
   en una página de empresa DevGiz. Publica un post enlazando a un artículo del blog.
4. **QGIS Plugin Repository** (<https://plugins.qgis.org>): publicar el validador
   LADM-COL con enlace al sitio en `metadata.txt` (`homepage=`). Es el backlink
   temático de más autoridad al que puedes aspirar gratis.
5. **Comunidades:** OSGeo Colombia, foros/grupos de QGIS en español, GIS
   StackExchange (respuestas útiles con enlace solo cuando aporte). Nada de
   granjas de enlaces ni directorios masivos: penalizan.

---

## Fase 4 — Validación técnica (semana 1, 20 min)

1. **Resultados enriquecidos:** <https://search.google.com/test/rich-results>
   con `/`, `/blog/2` y `/services/<slug>`. Debe detectar Organization, Article y
   Breadcrumb sin errores. (FAQPage ya no genera rich result para sitios
   comerciales desde 2023; se mantiene por los motores de IA.)
2. **Schema:** <https://validator.schema.org> con la home.
3. **Rendimiento móvil:** <https://pagespeed.web.dev> con `/` y una página de
   servicio. Objetivo: LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
4. **Vista previa social:** <https://www.opengraph.xyz> con la home.

---

## Fase 5 — Seguimiento (semanas 2-4 y luego mensual)

| Cuándo | Dónde | Qué mirar |
|---|---|---|
| Día 3-7 | Search Console → *Páginas* | Que aparezcan URLs “Indexadas”. |
| Día 7 | Google: `site:devgiz.vercel.app` | Cuántas páginas muestra Google. |
| Día 14 | *Páginas → Por qué no se indexan* | “Rastreada, sin indexar” es normal al inicio; se corrige con contenido y enlaces. “Página con redirección” para URLs antiguas es correcto. |
| Día 14 | *Rendimiento* | Primeras impresiones y consultas. |
| Mensual | *Experiencia → Core Web Vitals* | Aparece cuando hay tráfico suficiente. |
| Mensual | *Enlaces* | Backlinks conseguidos. |

**Qué NO hacer:** reenviar el sitemap a diario, pedir indexación repetida de la
misma URL, comprar enlaces, crear páginas duplicadas por ciudad con el mismo
texto, ni cambiar la URL del sitio sin redirecciones 301.

---

## Fase 6 — Contenido que posiciona (continuo, 1 artículo/mes)

Un sitio nuevo gana primero en la **cola larga técnica en español**, donde hay
poca competencia. Ideas con intención de búsqueda real:

- “Cómo validar un XTF LADM-COL en QGIS paso a paso”
- “Errores topológicos más comunes en entregas catastrales al IGAC”
- “Migrar de Shapefile a INTERLIS: pipeline ETL con Python”
- “Qué exige la Resolución IGAC sobre catastro multipropósito (resumen práctico)”
- “PostGIS para gestores catastrales: consultas que ahorran horas”

Cada artículo: datos y capturas reales, autor con enlace a `/about`, fecha real,
y enlaces internos a la página de servicio relacionada. Para publicar uno nuevo:
añade la entrada en `BLOG_POSTS_SEO` (`apps/web/src/lib/seo.js`) y su contenido en
`apps/web/src/app/blog/[id]/page.js`; el sitemap y el JSON-LD se actualizan solos.
Actualiza `CONTENT_UPDATED` en `seo.js` cuando cambies páginas existentes.

---

## Sobre el dominio (decisión pendiente)

`devgiz.vercel.app` **se indexa y posiciona sin penalización**. Limitaciones:
no permite propiedad “Dominio” en Search Console, no permite correo con dominio
propio (Resend en modo de prueba solo envía a tu correo) y transmite menos
confianza a clientes B2B/B2G. Si algún día compras un dominio (~USD 10-12/año un
`.com`), hazlo **antes** de acumular backlinks:

1. Vercel → Settings → Domains → añade el dominio y configura el DNS que indica.
2. Variable `NEXT_PUBLIC_SITE_URL=https://tudominio.com` → redeploy
   (canonical, sitemap y JSON-LD cambian automáticamente).
3. En Domains, marca `devgiz.vercel.app` para redirigir (308) al dominio nuevo.
4. Search Console → propiedad “Dominio” vía DNS + herramienta *Cambio de dirección*.
5. Actualiza `TARGET` en `.github/workflows/gh-pages.yml`.
