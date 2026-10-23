# Plan de mejoras DevGiz — auditoría oct-2026

Alcance: monorepo completo (web Next.js 16, API FastAPI, motor QA, plugin QGIS,
CI/CD, sitio legado). Restricción: **coste $0**, solo planes gratuitos estables.
Rama con los cambios: `mejora/auditoria-seo-seguridad-ui`.
Guía de indexación: [`GUIA_INDEXACION_GOOGLE.md`](GUIA_INDEXACION_GOOGLE.md).

Leyenda: ✅ hecho en la rama · 🔧 pendiente (código) · 👤 acción manual del dueño

---

## 0. Urgente — acciones manuales (hoy)

| # | Acción | Por qué |
|---|---|---|
| 👤 1 | **Rotar credenciales** filtradas en el historial público de git (`.env.local` en commits `7efa9eb`, `04b76b3`; clave Resend hasta `2d13c33`): contraseña del rol de **Neon**, JWT secret de **Supabase** (rota anon + service_role), token de **Upstash**, API key de **Resend**, DSN de **Sentry**. Actualizar los valores en Vercel y Render. | Cualquiera puede leerlos con `git log -p`. Borrar el archivo no basta; **rotar es la única mitigación real**. |
| 👤 2 | Revisar accesos en Neon/Supabase desde 2026-05-12. | Detectar uso indebido. |
| 👤 3 | (Opcional, tras rotar) purgar historial: `git filter-repo --invert-paths --path .env.local --path scratch/colombian_leads.csv --path scratch/colombian_leads.json` en un clon `--mirror` y `git push --force --mirror`; luego pedir a GitHub Support que purgue vistas cacheadas. El repo no tiene forks. | Elimina también PII de prospectos (Ley 1581). Reescribe hashes: coordina antes. |
| 👤 4 | GitHub → Settings → Code security: activar **Secret scanning**, **Push protection**, **Dependabot alerts/security updates**, **Private vulnerability reporting**. | Gratis en repos públicos; evita repetir la fuga. |
| 👤 5 | Vercel → Environment Variables (Production): `RESEND_ADMIN_EMAIL`, `UPSTASH_REDIS_REST_URL/TOKEN` (o `KV_REST_API_*`), `ADMIN_PASSCODE` ≥ 16 caracteres. | Los endpoints caros ahora **fallan cerrados** (503) sin Redis en producción. |
| 👤 6 | Render → variables declaradas en `render.yaml` (`SENTRY_DSN`, `UPSTASH_*`, `VUR_*`, `MAPBOX_TOKEN` tipo `pk.`, `CORS_ALLOW_ORIGINS`). Crear en Neon un rol de **solo lectura** para la API. | Mínimo privilegio. |

---

## 1. SEO e indexación

| Estado | Mejora |
|---|---|
| ✅ | **Soft 404 eliminados**: `/blog/<id>`, `/projects/<id>`, `/services/<slug>` inexistentes devuelven 404 real (`dynamicParams = false` + `notFound()` en layouts; `Object.hasOwn` contra claves como `constructor`). |
| ✅ | Redirecciones legadas que acababan en 404 (`/lab/map.html`, `gis-dashboard`, `research`, `validator`, `geoai`, `biomatrix`, `/index.html`) apuntan a páginas reales. |
| ✅ | **GitHub Pages** ya no publica el sitio legado duplicado: publica stubs con `canonical` + meta-refresh hacia Vercel, permisos de Pages solo en el job de despliegue. |
| ✅ | Home con metadata propia: “Catastro Multipropósito LADM-COL y WebGIS en Colombia \| DevGiz”. |
| ✅ | JSON-LD: `sameAs` (GitHub org/personal, LinkedIn), `contactPoint`, `email`, `telephone`, `Person.url/sameAs`, autor con URL; breadcrumb de servicios incluye “Servicios”. |
| ✅ | `sitemap.xml` con `lastModified` estable (`CONTENT_UPDATED` en `seo.js`), no la fecha de cada build. |
| 👤 | Search Console + sitemap + solicitudes de indexación, Bing, Google Business Profile, backlinks → ver la guía. |
| 🔧 | Unificar datos de blog/proyectos (`BLOG_POSTS_SEO` vs `BLOG_DATA`, `PROJECTS_SEO` vs `PROJECTS_DATA`) en `src/data/*`: hoy se mantienen a mano y ya divergen (post 4: “Trazabilidad” vs “IA territorial”). |
| 🔧 | `qgis-plugin` como `SoftwareApplication` en JSON-LD; logo de 512×512 para `Organization.logo`. |
| 🔧 | Sustituir cifras no verificables del home (“+1,2 M predios”, “99,9 %”) por logros demostrables: E-E-A-T y confianza B2G. |
| 🔧 | Enlazado interno: bloque en footer/home con los 10 servicios y 4 proyectos con anchor text descriptivo. |
| 🔧 | `lab/gesture-sandbox` usa teselas de `mt1.google.com` (fuera de términos de uso): cambiar a OSM/Esri con atribución. |
| 👤 | 1 artículo técnico/mes (ideas en la guía). Considerar dominio propio (~USD 10/año) **antes** de acumular backlinks; el sitio funciona igual en `vercel.app`. |

## 2. Rendimiento (Core Web Vitals)

| Estado | Mejora |
|---|---|
| ✅ | SVG CAD del hero (~36 KB de fuente, ~610 líneas) fuera del HTML/RSC: carga diferida (`HeroCad`) solo en ≥ lg y en reposo; animaciones SMIL pausadas fuera de pantalla, con pestaña oculta o `prefers-reduced-motion`. |
| ✅ | El H1 (LCP) ya no parte de `opacity: 0`: visible desde el primer frame. |
| ✅ | Fondo: sin listener de ratón en táctil/movimiento reducido; animación de capa gigante desactivada en móvil. |
| ✅ | `SystemStatusHeader` hace su fetch en `requestIdleCallback` y lo aborta al desmontar. |
| ✅ | Hero/terms/privacy: `privacy` y `terms` ahora son Server Components (0 JS propio). |
| 🔧 | `services/[slug]/page.js`: quitar `initial={{opacity:0}}` del H1 y del lead (retrasa el LCP en las 10 páginas de servicio). |
| 🔧 | framer-motion → `LazyMotion` + `m.*` (≈ −20-25 KB gz). |
| 🔧 | Dividir páginas cliente gigantes (`ServicesSection` 1 595 líneas, `GlobalPartners` 1 231, `services/[slug]` 1 789, `blog/[id]`, `projects/[id]`, `about`) en Server Component + islas cliente. |
| 🔧 | `width/height` en logos de `GlobalPartners` (CLS); imagen de Wikimedia de 1200 px mostrada a 32 px en `VurQuery`. |
| 👤 | Medir antes/después en PageSpeed Insights (móvil) y vigilar Vercel Speed Insights (ya instalado). |

## 3. Seguridad — web (Next.js en Vercel)

| Estado | Mejora |
|---|---|
| ✅ | Rate limit por ruta (Upstash) con **fail-closed** en rutas caras: `/api/ai` 5/min + 400/día, `/api/contact` 3/h + 40/día, `/api/blob/upload` 5/día; lecturas 30/min. `analytics:false` para ahorrar cuota. |
| ✅ | Verificación de **Origin** (anti-CSRF / anti-abuso cross-site) y `Content-Type: application/json` en POST públicos. |
| ✅ | Login admin: contador **atómico por IP** (sin User-Agent, que era evadible) + tope global 50/h; logout revoca la sesión en el servidor; mocks solo fuera de producción. |
| ✅ | Subidas: validación de **firma de archivo** (magic bytes) además de la extensión. |
| ✅ | `/api/ai`: input aislado en `<user_data>` contra prompt injection, `max_tokens` 800. |
| ✅ | Correo: la confirmación ya no refleja texto del visitante (anti-relé de phishing), 1 cada 24 h por destinatario, alta en Audiencia solo con `consent`, sin email por defecto en el código, emails enmascarados en logs. |
| ✅ | Retención de 30 días de mensajes realmente aplicada (el cron buscaba claves inexistentes); lista acotada a 1 000. |
| ✅ | Webhook Resend robusto ante payloads sin `to`. |
| ✅ | XSS: popup de Leaflet en `OfficialGISDemo` escapado; CSV del admin neutraliza fórmulas (`=`, `+`, `-`, `@`). |
| ✅ | Cabeceras: `Permissions-Policy` sin geolocalización, cámara/micro solo `self`; `CORP same-origin` y `no-store` en `/api`; CSP *report-only* sin `unsafe-eval` y con allowlist de conexiones. |
| ✅ | `/.well-known/security.txt` y `SECURITY.md`. |
| 🔧 | Tras 1 semana sin violaciones en consola, **promover la CSP report-only a enforced** (fase 1). Fase 2 (nonces) solo si el tráfico lo justifica: obliga a render dinámico. |
| 🔧 | **Cloudflare Turnstile** (gratis) en contacto, diagnóstico, subida y login admin. |
| 🔧 | Casilla de consentimiento en `ContactSection` (envía `consent: true`) para poder usar la Audiencia de Resend. |
| 👤 | Vercel Firewall (Hobby): regla de rate limit en `POST /api/*` y Attack Challenge Mode cuando haya ataque. |

## 4. Seguridad y robustez — API (FastAPI en Render)

| Estado | Mejora |
|---|---|
| ✅ | **Inyección SQL en DuckDB** cerrada (`codigo` parametrizado). |
| ✅ | **Path traversal / escritura arbitraria** en `/api/v1/cross-reference` cerrada (`uploads.py`: nombre saneado, extensiones permitidas, 25 MB, zip seguro). |
| ✅ | CORS por variable (`CORS_ALLOW_ORIGINS`), sin `*` ni credenciales; errores genéricos con `error_id` (sin `str(e)`). |
| ✅ | Sentry solo con `SENTRY_DSN` del entorno, sin PII; `/sentry-debug` eliminado; token Mapbox solo si es público `pk.`. |
| ✅ | Rate limit por endpoint con IP real (`--proxy-headers`), TTL garantizado, fail-closed en VUR y cross-reference. |
| ✅ | Validación: matrícula VUR con patrón, segmentos URL escapados, `asyncio.Lock` en login VUR, límites Pydantic (500 features), cuerpo > 30 MB → 413. |
| ✅ | Pool de BD con `pool_pre_ping` (Neon suspende), engine perezoso (la app arranca sin BD), endpoints bloqueantes en threadpool. |
| ✅ | `/healthz` (y `/health` que el cron ya llamaba) + `healthCheckPath` en `render.yaml`. |
| ✅ | Respuestas simuladas marcadas `simulated: true` y nunca cacheadas. |
| ✅ | `requirements.txt`: `python-multipart` (sin él la API no arrancaba), `openpyxl`, `pyarrow`, `httpx`; FastAPI 0.115.12 (Starlette con CVE-2024-47874 corregido). |
| 🔧 | Actualizar el resto de dependencias (geopandas 1.x, duckdb, polars, pandas, uvicorn) con lockfile y `pip-audit`; FastAPI reciente para cubrir CVEs de Starlette 2025. |
| 🔧 | Llamadas del navegador a la API → pasar por rutas de Next (servidor) con cabecera secreta; luego exigir esa clave en Render. |
| 🔧 | Corregir cálculo de áreas en CRS geográfico (`to_crs(3116)` antes de comparar con SNR) y `detect_overlaps` O(n²). |
| 🔧 | Eliminar código muerto: `backend/fastapi/` (copia divergente), `mcp_server.py` + `mcp` si no se usa, `geoai/lead_prospector.py` (datos personales → repo privado), shim de `qa_engine/core_validator.py` (rompe en Docker). |
| 🔧 | Dockerfiles sin root (`USER app`), multi-stage, `.dockerignore`. |
| 🔧 | Plugin QGIS: el modo offline autentica siempre (`return True`); validar contra token firmado. |
| 👤 | Keep-alive gratuito: UptimeRobot/cron-job.org cada 10-14 min a `https://<api>.onrender.com/healthz` para evitar cold starts (cabe en las 750 h/mes si es el único servicio). |

## 5. Interfaz y accesibilidad (WCAG 2.2 AA)

| Estado | Mejora |
|---|---|
| ✅ | Navbar: menú móvil con foco inicial, trampa de foco, `inert` en el resto, objetivos táctiles 44 px, contraste ≥ 4,5:1 en ambos temas. |
| ✅ | Footer, contacto, auditoría, 404: objetivos táctiles, foco visible, errores en español anunciados (`role=alert`), `inputMode`, `aria-busy`, movimiento reducido. |
| ✅ | **Formularios que fingían enviar** (cotización de servicio, newsletter de blog/FAQ, postulación de careers) ahora envían de verdad a `/api/contact`. |
| ✅ | Consulta VUR: label real, estados anunciados, `encodeURIComponent`, aviso visible “Datos de demostración”. |
| ✅ | Blog/proyectos: breadcrumbs visibles, jerarquía de headings, filtros con `aria-pressed` (no tabs falsos), estados vacíos. |
| ✅ | Privacidad: derechos del titular (Ley 1581) y contacto; Términos corrige la sede (Medellín). |
| ✅ | Logo con IDs SVG únicos por instancia (navbar + footer). |
| 🔧 | Revisión a fondo de `about`, `brochure`, `diagnostic`, `docs`, `standards`, `lab` (tabs con `role="tab"` sin navegación por flechas). |
| 🔧 | `about`: el botón “Verificar firma” es un `setTimeout` que siempre “verifica”: quitar o rotular como demo. `VurQuery` rellena un propietario inventado incluso con respuesta real. |
| 🔧 | Admin: modales sin trampa de foco, clases Tailwind dinámicas que no se generan, UI en inglés. |

## 6. CI/CD y cadena de suministro

| Estado | Mejora |
|---|---|
| ✅ | Nuevo workflow **Security**: CodeQL (JS/TS, Python, Actions), dependency-review en PRs, OSV-Scanner sobre lockfiles; semanal. |
| ✅ | Dependabot cubre `apps/api`. Pages con permisos mínimos por job. |
| 🔧 | Fijar acciones por SHA; job Python que instale `apps/api/requirements.txt` + `pip-audit`; quitar `--no-audit` de `npm ci`. |
| 🔧 | Endurecer `ruff.toml` (`S`, `ASYNC`, `BLE`, `UP`, `I`; retirar ignores `E722`/`B904`). Tests para `apps/api` (hoy 0). |
| 👤 | Aplicar `branch-protection.json` con los checks requeridos del CI. |

---

## Stack $0 recomendado (estable a largo plazo)

| Capa | Servicio (plan gratuito) | Límite relevante |
|---|---|---|
| Web | Vercel Hobby | Uso no comercial según términos; 100 GB transferencia |
| API | Render Free (+ keep-alive) | 512 MB RAM, duerme a los 15 min, 750 h/mes |
| BD | Neon Free | Suspende a los 5 min; usar rol de solo lectura |
| Cache/rate limit | Upstash Redis Free | ~500 k comandos/mes |
| Correo | Resend Free | 100/día; requiere dominio propio para enviar a terceros |
| Errores | Sentry Developer | 5 k eventos/mes |
| Anti-bots | Cloudflare Turnstile | Ilimitado |
| Seguridad repo | GitHub (público): CodeQL, secret scanning, Dependabot | Gratis |
| SEO | Search Console, Bing Webmaster, Business Profile | Gratis |

> Nota: Vercel Hobby es para uso personal/no comercial. Si DevGiz factura a
> clientes a través del sitio, revisa los términos; la alternativa gratuita con
> uso comercial permitido es **Cloudflare Pages/Workers** (requiere adaptar el
> despliegue con OpenNext).

## Cómo desplegar esta rama

1. `git push -u origin mejora/auditoria-seo-seguridad-ui` y abrir PR a `main`.
2. Esperar CI (lint · typecheck · test · build, ruff · pytest) y el nuevo workflow Security.
   Los cambios **no se compilaron localmente** (sin Node en la máquina de la auditoría):
   el CI es la primera verificación real.
3. Probar el *Preview Deployment*: formularios, admin, lab de gestos, `/blog/999` → 404.
4. Configurar variables (sección 0) **antes** de fusionar.
5. Fusionar → seguir la guía de indexación.
