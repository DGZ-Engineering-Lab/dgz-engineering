# 🦾 DGZ Engineering :: Vision Sandbox

[![DGZ Vision CI/CD](https://github.com/gaviriaz/dgz-engineering/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/gaviriaz/dgz-engineering/actions/workflows/gh-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech: MediaPipe AI](https://img.shields.io/badge/AI-MediaPipe_Vision-00e5ff.svg)](https://developers.google.com/mediapipe)
[![Map: MapLibre GL](https://img.shields.io/badge/Maps-MapLibre_GL-9d4edd.svg)](https://maplibre.org/)

> **Experimento de Interface Holográfica e Interacción SIG Inmersiva.** Controla la cartografía global mediante telequinesis digital y visión artificial.

---

## 🌌 Visión del Proyecto
Este laboratorio experimental (`lab/gesture_sandbox.html`) implementa una interfaz inspirada en **Apple Vision Pro**, utilizando inteligencia artificial para el rastreo de manos en tiempo real. Permite interactuar con datos geoespaciales críticos sin tocar la pantalla, optimizado para operaciones tácticas y visualización de datos de alto rendimiento.

### ✨ Características Premium
- **🎚️ Paneles Glassmorphism:** Interfaz ultra-transparente con desenfoque gaussiano de 25px, totalmente colapsable y **draggable** (puedes moverlos por la pantalla con gestos).
- **📡 Rastreo Ultra-Fluido:** Algoritmo de Media Móvil Exponencial (EMA) para eliminar el jitter del cursor.
- **🗺️ Integraciones Public Data:**
  - **SGC:** Mapa Geológico de Colombia (Servicio Geológico Colombiano).
  - **IGAC:** (Mock) Catastro Vectorial con Tablas de Atributos dinámicas.
  - **USGS:** Feed mundial de Sismos en tiempo real.

---

## 🧤 Manual de Gestos (Telequinesis)

| Gesto | Acción | Descripción |
| :--- | :--- | :--- |
| **☝️ Índice** | **Cursor** | Mueve el puntero espacial por la interfaz. |
| **🤌 Pinza** | **Arrastrar/Clic** | Agarra el mapa para moverlo o pinza un panel para reubicarlo. |
| **✌️ Paz** | **Zoom In (+)** | Acercamiento dinámico con suavizado. |
| **✋ Mano Abierta** | **Zoom Out (-)** | Alejamiento del globo terráqueo. |
| **✊ Puño** | **Reset** | Restablece la vista a la posición home (Bogotá). |

---

## 🛠️ Stack Tecnológico
- **Frontend:** HTML5, CSS3 (Vanilla Glassmorphism), JavaScript (ES6+).
- **Core AI:** [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands) (Google).
- **Renderizado SIG:** MapLibre GL JS + Capas WMS del SGC.
- **Alojamiento:** GitHub Pages (Despliegue automático vía CI/CD).

## 🚀 Instalación y Despliegue
Este repositorio está configurado para un **flujo de trabajo profesional Zero-Ops**:
1. Clonar el repositorio.
2. Abrir `lab/gesture_sandbox.html` (Servidor local recomendado para cámara).
3. Hacer `git push` a `main` para que los cambios se publiquen automáticamente en la web.

## ⚖️ Licencia
Distribuido bajo la Licencia **MIT**. Ver `LICENSE` para más información.

---
**Desarrollado con ❤️ para DGZ Engineering por Albert Gaviria.**
