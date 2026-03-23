---
name: SIG-IGGA Resource Decision Guide
description: Guía maestra que mapea cada tipo de tarea a los recursos óptimos. Enseña al AI a usar el recurso correcto para cada situación, evitando sobre-ingeniería en tareas simples.
---

# 🧭 Guía de Decisión de Recursos — SIG-IGGA-AVISOS

> **Regla de Oro**: No usar herramientas especializadas para tareas simples.
> Un cambio de color en CSS NO necesita un MCP de PostgreSQL.

---

## 🔀 Árbol de Decisión Rápido

```
¿Qué tipo de tarea es?
│
├─ 🐛 BUG / ERROR EN PRODUCCIÓN
│  ├─ ¿Error 500 en la API? → MCP Sentry + MCP PostgreSQL
│  ├─ ¿Error CORS? → Workflow /debug-cors + MCP Fetch
│  ├─ ¿Error de mapa/GIS? → Skill sig-igga-gis + MCP Filesystem
│  └─ ¿Error de datos/schema? → MCP PostgreSQL directo
│
├─ 🚀 DEPLOY / DESPLIEGUE
│  ├─ ¿Deploy frontend? → Workflow /deploy-frontend
│  ├─ ¿Deploy completo? → Skill sig-igga-deploy
│  └─ ¿Verificar producción? → Workflow /health-check
│
├─ 📊 REPORTES / DATOS
│  ├─ ¿Reporte Excel GEAM? → Skill sig-igga-export
│  ├─ ¿Consulta de datos? → MCP PostgreSQL
│  └─ ¿Estadísticas de avisos? → MCP PostgreSQL + MCP Fetch (API)
│
├─ 🗺️ GIS / GEOESPACIAL
│  ├─ ¿Validar GeoJSON? → Skill sig-igga-gis
│  ├─ ¿Verificar coordenadas? → Skill sig-igga-gis + MCP PostgreSQL
│  ├─ ¿Importar capa? → MCP Filesystem + Skill sig-igga-gis
│  └─ ¿Problema con la proyección? → Skill sig-igga-gis
│
├─ 🏗️ DESARROLLO / NUEVA FUNCIONALIDAD
│  ├─ ¿Tarea simple (CSS, fix menor)? → NINGÚN recurso extra (baseline)
│  ├─ ¿Feature compleja multi-módulo? → Skill antigravity-skill-orchestrator
│  ├─ ¿Nuevo componente visual? → Skill antigravity-design-expert
│  ├─ ¿Planificar refactorización? → MCP Sequential Thinking
│  └─ ¿Buscar skill específica? → MCP SkillsMP
│
├─ 🧪 TESTING
│  ├─ ¿Test de API? → Skill sig-igga-testing + MCP Fetch
│  ├─ ¿Test de frontend? → Skill sig-igga-testing
│  └─ ¿Health check rápido? → Workflow /health-check
│
├─ 📝 GESTIÓN DE CÓDIGO
│  ├─ ¿Ver diff/historial? → MCP Git
│  ├─ ¿Crear PR/Issue? → MCP GitHub
│  ├─ ¿Ver errores en prod? → MCP Sentry
│  └─ ¿Leer archivos del proyecto? → MCP Filesystem
│
├─ 🔍 INVESTIGACIÓN / ANÁLISIS
│  ├─ ¿Analizar sesiones pasadas? → Skill analyze-project
│  ├─ ¿Buscar skills nuevas? → MCP SkillsMP
│  ├─ ¿Leer documentación web? → MCP Fetch
│  └─ ¿Planificación compleja? → MCP Sequential Thinking
│
└─ 🔧 MANTENIMIENTO
   ├─ ¿Levantar dev local? → Workflow /dev-start
   ├─ ¿Verificar estado general? → Workflow /health-check
   └─ ¿CI/CD? → GitHub Actions ci.yml
```

---

## 📋 Inventario Completo de Recursos

### Nivel 1: MCPs (9 servidores — acceso directo)

| MCP | Cuándo SÍ usar | Cuándo NO usar |
|---|---|---|
| 🐙 **GitHub** | Issues, PRs, releases, ver código remoto | Cambios locales (usar Git MCP o edición directa) |
| 🗄️ **PostgreSQL** | Diagnosticar datos, validar schema, queries rápidas | Cambios de schema (hacer manual con SQL seguro) |
| 🌐 **Fetch** | Probar API, verificar CORS, leer docs de OpenLayers | Páginas con autenticación |
| 🧠 **Memory** | Recordar decisiones, patrones de skills exitosos | Datos efímeros o temporales |
| 🧩 **Sequential Thinking** | Planificar migraciones, refactorizaciones grandes | Tareas simples y directas |
| 📂 **Git** | Commits, branches, ver historial, diffs | Operaciones destructivas sin confirmación |
| 📁 **Filesystem** | Leer GeoJSON, configs, logs, archivos de capas | Escribir archivos grandes (mejor herramientas nativas) |
| 🔍 **Sentry** | Ver errores de prod, analizar stack traces, monitorear | Errores de desarrollo local |
| 🎯 **SkillsMP** | Buscar skills nuevas, instalar capacidades dinámicas | Tareas cubiertas por skills existentes |

### Nivel 2: Skills Personalizadas (4 — dominio SIG-IGGA)

| Skill | Activar cuando... | NO activar cuando... |
|---|---|---|
| 📊 **sig-igga-export** | "Generar reporte", "exportar Excel", "GEAM" | Consultas simples de datos |
| 🧪 **sig-igga-testing** | "Testear", "verificar endpoints", "smoke test" | Un solo curl rápido |
| 🗺️ **sig-igga-gis** | "GeoJSON", "coordenadas", "KML", "PostGIS", "capa" | Datos sin componente geográfico |
| 🚀 **sig-igga-deploy** | "Deploy", "desplegar", "subir a producción" | Cambios locales sin push |

### Nivel 3: Skills de Antigravity (8 — meta/utilidades)

| Skill | Propósito | Cuándo activar |
|---|---|---|
| 🎯 **antigravity-skill-orchestrator** | Elegir la combinación correcta de skills | Tareas complejas multi-módulo donde no sabes qué skills necesitas |
| 🔍 **analyze-project** | Análisis forense de sesiones de trabajo | Al final de un sprint o cuando hay muchos problemas recurrentes |
| 🎨 **antigravity-design-expert** | UI premium: glassmorphism, animaciones, 3D CSS | Cuando se necesita un componente visual wow |
| ⚙️ **antigravity-manager** | Guía del proyecto AntigravityManager | Solo si se trabaja en el propio Antigravity Manager |
| 💰 **antigravity-balance** | Verificar cuota de tokens de Antigravity | Cuando se sospecha que la cuota está baja |
| 🔄 **antigravity-rotator** | Rotación automática de cuentas | Gestión de múltiples cuentas (no aplica para SIG-IGGA) |
| 📋 **antigravity-workflows** | Orquestar workflows multi-fase | SaaS MVP, Security Audit, AI Agent, Browser QA |
| 🏗️ **trellis-meta** | Framework de desarrollo estructurado con specs | Proyectos grandes con múltiples desarrolladores |

### Nivel 4: Workflows (4 — atajos rápidos)

| Workflow | Trigger | Tiempo |
|---|---|---|
| `/health-check` | "¿Está todo bien?", "verificar producción" | ~30 seg |
| `/debug-cors` | "Error CORS", "Access-Control", "blocked" | ~1 min |
| `/dev-start` | "Levantar local", "npm run dev" | ~2 min |
| `/deploy-frontend` | "Deploy frontend", "subir a Cloudflare" | ~3 min |

### Nivel 5: CI/CD (GitHub Actions)

| Pipeline | Trigger | Qué hace |
|---|---|---|
| `ci.yml` | Push/PR a main | Lint Python + TypeScript + health check |
| `etl_cron.yml` | Viernes 23:00 UTC | ETL SharePoint → Railway |

---

## ⚡ Combinaciones Óptimas por Escenario

### Escenario: "La app no carga en producción"

```
1. /health-check                    → ¿Backend/Frontend vivos?
2. MCP Sentry                       → ¿Hay errores nuevos?
3. MCP Fetch (CORS test)            → ¿CORS bloqueando?
4. MCP PostgreSQL                   → ¿DB conectada?
5. Skill sig-igga-testing           → Smoke test completo
```

### Escenario: "Agregar nueva capa GIS al mapa"

```
1. MCP Filesystem                   → Leer el archivo GeoJSON
2. Skill sig-igga-gis               → Validar geometrías y proyección
3. MCP PostgreSQL                   → Verificar schema en DB
4. Edición directa                  → Agregar componente en frontend
5. /deploy-frontend                 → Subir cambios
```

### Escenario: "Generar reporte mensual para ISA"

```
1. MCP PostgreSQL                   → Extraer datos de avisos
2. Skill sig-igga-export            → Generar Excel formateado
3. MCP Git                          → Commit del reporte
```

### Escenario: "Rediseñar el dashboard de analytics"

```
1. MCP Sequential Thinking          → Planificar componentes
2. Skill antigravity-design-expert  → Diseño premium glassmorphism
3. Edición directa                  → Implementar componentes React
4. Skill sig-igga-testing           → Verificar que todo funciona
5. /deploy-frontend                 → Deploy
```

### Escenario: "Debuggear un error 500"

```
1. MCP Sentry                       → Ver stack trace exacto
2. MCP PostgreSQL                   → Verificar estado de datos
3. MCP Fetch                        → Reproducir el request
4. Edición directa                  → Aplicar fix
5. /health-check                    → Verificar fix en producción
```

---

## 🚫 Anti-Patrones (NO hacer)

| ❌ No hagas | ✅ Haz en su lugar |
|---|---|
| Usar MCP PostgreSQL para cambiar un color CSS | Editar el archivo directamente |
| Activar skill-orchestrator para renombrar una variable | Renombrar directamente |
| Usar MCP Fetch para leer un archivo local | Usar MCP Filesystem o view_file |
| Activar analyze-project para un fix rápido | Solo para análisis post-sprint |
| Usar Sequential Thinking para una tarea de 1 paso | Ejecutar directamente |
| Buscar en SkillsMP algo que ya tienes como skill local | Usar la skill local primero |
