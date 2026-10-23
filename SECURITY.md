# Política de seguridad

## Reportar una vulnerabilidad

No abras un issue público. Usa el reporte privado de GitHub:
**Security → Report a vulnerability** en este repositorio
(<https://github.com/DGZ-Engineering-Lab/dgz-engineering/security/advisories/new>).

Incluye la URL o archivo afectado, los pasos para reproducirlo y el impacto.
Respondemos en un plazo de 5 días hábiles.

## Alcance

- Sitio web: <https://devgiz.vercel.app> (`apps/web`)
- API: `apps/api` y `backend/qa_engine`
- Plugin QGIS: `projects/qgis-plugin`

Fuera de alcance: ataques de denegación de servicio volumétricos, ingeniería social
y hallazgos en servicios de terceros (Vercel, Render, Upstash, Neon, Supabase).
