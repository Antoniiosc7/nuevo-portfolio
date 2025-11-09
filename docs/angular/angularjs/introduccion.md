---
title: Introducción a AngularJS
sidebar_label: Introducción
sidebar: angularJsSidebar
description: Panorama general, casos de uso actuales y filosofía clave de AngularJS 1.x.
---

# AngularJS en contexto

AngularJS (versiones 1.x) fue el primer framework mantenido por Google pensado para crear **Single Page Applications (SPA)** con JavaScript, HTML y CSS. Se publicó en 2010 y popularizó conceptos como el enlace de datos bidireccional, la inyección de dependencias en el navegador y un ciclo de vida claro para construir interfaces ricas sin recargar la página.

Aunque se encuentra en modo de **soporte extendido**, sigue presente en:

- Portales de administración pública lanzados entre 2010 y 2017.
- Intranets corporativas con procesos complejos y formularios extensos.
- Productos SaaS que priorizaron el time-to-market y todavía no han migrado a frameworks modernos.

## Filosofía clave

## Filosofía

- **Enlace de datos bidireccional** que sincroniza modelo y vista sin esfuerzo.
- Plantillas declarativas basadas en HTML con directivas personalizadas.
- Inyección de dependencias que promueve el desacoplamiento.
- Separación de responsabilidades mediante módulos, controladores, servicios y directivas.

## Versiones y soporte

| Versión | Año | Novedades clave | Estado |
| --- | --- | --- | --- |
| 1.0 | 2012 | Estabilización del framework, `ngRoute`, soporte IE8 | Retirada |
| 1.2 | 2013 | Animaciones nativas, `ngMessages`, mejoras en promesas | Retirada |
| 1.3 | 2014 | One-time bindings `::`, mejoras en validaciones | Retirada |
| 1.5 | 2016 | API `component()`, soporte para migraciones progresivas | LTS comunitario |
| 1.8.3 | 2021 | Última versión oficial liberada por Google | Soporte extendido por la comunidad |

> Desde enero de 2022 el mantenimiento es comunitario. Se recomienda planificar una migración a Angular moderno o a otro framework, pero mientras tanto se pueden aplicar actualizaciones de seguridad ofrecidas por empresas de soporte.

## ¿Por qué sigue siendo relevante?

- **Base instalada enorme**: muchas compañías cuentan con aplicaciones críticas que dependen de AngularJS.
- **Curva de aprendizaje llana**: un desarrollador front-end puede ser productivo en pocas horas.
- **Ecosistema maduro**: librerías como UI-Router, ngResource o ngAnimate siguen funcionando y cuentan con comunidad activa.
- **Compatibilidad con Angular**: la librería `ngUpgrade` permite convivir AngularJS y Angular moderno durante la migración.

## Qué aprenderás en esta serie

1. **Fundamentos y arquitectura**: scopes, controladores, servicios y digest cycle.
2. **Primeros pasos**: cómo arrancar proyectos desde cero, alternativas a `angular-seed` y organización del código.
3. **Directivas, filtros y componentes**: cómo reutilizar UI y crear tus propias piezas.
4. **Routing, formularios y validaciones**: navegación por estados y manejo de formularios complejos.
5. **Calidad y mantenimiento**: testing con Jasmine/Karma, linting y mejores prácticas de rendimiento.
6. **Build y despliegue**: pipelines basados en npm scripts, Gulp/Grunt y consejos para producción.
7. **Herramientas y estrategias de migración**: cómo convivir con Angular moderno y planificar el futuro.

Cada documento profundiza con ejemplos y snippets para que puedas ir de cero a completo entendimiento de AngularJS.

## ¿Qué necesito para empezar?

- Conocimientos básicos de HTML, CSS y JavaScript (ES5).
- Node.js (≥ 16) para utilizar herramientas modernas de bundling y testing.
- Un editor con soporte para JavaScript y formato Prettier/ESLint (VS Code).
- Npm o Yarn para gestionar dependencias.

## Estado de soporte

| Fecha | Evento | Impacto |
|-------|--------|---------|
| Dic 2021 | Fin del soporte oficial estándar | Sin nuevas funcionalidades |
| Ene 2022 - Dic 2026 | Soporte LTS financiado por la comunidad | Correcciones críticas |
| Ene 2027 | Fin de soporte extendido | Requiere plan de migración |

> Si dependes de AngularJS, comienza cuanto antes tu estrategia de modernización. Consulta la guía `Migración desde AngularJS` en la sección `Guías estratégicas` para planificarla paso a paso.

## Lectura recomendada

- **`angular/angular.js`** en GitHub: repositorio oficial con issues y parches recientes.
- **Google Developers Blog** (archivo): entradas históricas con patrones oficiales.
- **John Papa Angular Style Guide**: recomendaciones prácticas para mantener código legible.
- **AngularJS Batarang**: extensión de Chrome para depurar scopes y watchers.

