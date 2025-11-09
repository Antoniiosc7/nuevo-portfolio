---
title: Escalado de equipos
sidebar_label: Escalado de equipos
sidebar: estrategiaSidebar
---

# Escalado de equipos con Angular

Angular ofrece convenciones sólidas que facilitan la colaboración entre múltiples equipos cuando se gestionan correctamente.

## Estructura organizativa

- **Feature squads**: equipos autónomos responsables de dominios concretos, con repositorios compartidos o monorepos con Nx.
- **Platform team**: mantiene librerías internas, el diseño de arquitectura y plantillas de proyectos.
- **Chapter leads**: alinean prácticas de testing, accesibilidad y performance.

## Gobernanza técnica

- Define reglas de linting y formato comunes (ESLint + Prettier).
- Publica librerías internas en registries privados, usando *semantic versioning*.
- Implementa *CODEOWNERS* y revisiones automáticas con `ng lint`/`ng test`.

## Comunicación

- Sincronizaciones semanales de arquitectos para compartir patrones y decisiones.
- Documentación viva en Docusaurus (¡como este sitio!) con ejemplos, snippets y convenciones.
- Demostraciones mensuales de nuevas capacidades y retrospectivas trimestrales.

## Métricas de escalado

- Lead time de features.
- Número de regresiones por release.
- Satisfacción del desarrollador (encuestas internas).
- Evolución de bundle size por micro-front.

## Herramientas recomendadas

- **Nx Cloud** para caché distribuida y análisis de afectación.
- **Backstage** o portales internos para centralizar documentación y plantillas.
- **SonarQube** o DeepSource para mantener la calidad del código.


