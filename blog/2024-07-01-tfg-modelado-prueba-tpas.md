---
slug: tfg-modelado-prueba-tpas
title: TFG - Modelado y Prueba de TPAs en el marco de DORA
description: Cómo diseñé y desplegué TP Tester, un microservicio que potencia la observabilidad del ecosistema Bluejay.
authors: [antonio]
tags: [tfg, angular, spring, devops]
image: /img/blog/tfg/tfg.png
---

![Portada del proyecto TP Tester](/img/blog/tfg/tfg.png)

<!-- truncate -->

## Introducción

Este Trabajo de Fin de Grado (TFG) se enfoca en el desarrollo de un sistema informático aplicando buenas prácticas de desarrollo de software y metodologías ágiles. A lo largo del proyecto abordé desde la planificación y el análisis hasta la implementación y la evaluación, con el objetivo de crear un sistema eficiente y adaptable.

Los objetivos técnicos incluían mejorar la eficiencia y calidad del desarrollo de software dentro del equipo Bluejay, mientras que los objetivos académicos se centraban en poner en práctica los conocimientos adquiridos durante la carrera.

- Metodología ágil con sprints quincenales, gestión de tareas en GitHub Projects y seguimiento del tiempo en Toggl.
- Comunicación y coordinación continua con herramientas como Google Calendar y Google Chat.
- Auditoría de buenas prácticas enfocada en la relación entre Bluejay y las TPAs (Team Performance Assessments).

El análisis del sistema define el objetivo, describe la arquitectura y detalla la interacción entre frontend y backend, garantizando una visión completa de la solución propuesta.

## Investigación de gráficas

Una pieza clave del proyecto fue identificar qué visualizaciones necesitábamos para un dashboard de observabilidad en Grafana.

![Gráfico soporte Grafana](/img/blog/tfg/grafico-soporte.png)
![Tabla soporte Grafana](/img/blog/tfg/tabla-soporte-grafana.png)

- 33 % de las gráficas requeridas ya contaban con soporte nativo.
- 28,33 % necesitaban un plugin existente.
- 38 % no tenían soporte, pero podían implementarse rápidamente con librerías como Highcharts.

## Estructura del proyecto

La solución se divide en dos piezas principales: un frontend Angular y un backend Express. Ambos se diseñaron para ser modulares, escalables y fáciles de mantener.

![Estructura general del sistema](/img/blog/tfg/estructura.png)

### Frontend

- **Modelos**: tipado exhaustivo de respuestas y peticiones HTTP.
- **Servicios**: comunicación con el backend propio, la API de GitHub y la API de Bluejay.
- **Componentes**: piezas reutilizables para gestión de TPAs, paneles de métricas, integración con GitHub, etc.
- **Páginas**: vistas completas que agrupan componentes para ofrecer funcionalidades principales como tests con GitHub o visualización de métricas.

### Backend

- **Gestión de repositorios**: clonado, gestión de archivos y ejecución de scripts.
- **TPAs y métricas**: operaciones CRUD y ejecución de scripts YAML.
- **Documentación API**: exposición con Swagger para facilitar pruebas y adopción por parte de otros equipos.

Esta arquitectura permite que el frontend interactúe con múltiples fuentes (backend propio, GitHub y Bluejay) ofreciendo una experiencia consistente y potente.

## Estructura de las páginas

TP Tester replica el contenido del README del proyecto en una interfaz navegable:

- **Home**: guía visual de todas las secciones disponibles y selector de idioma (es/en).
- **Testear métricas**: tablas separadas para métricas TPA y métricas individuales, con acciones para ver, ejecutar o eliminar.
- **Testeo manual**: gestión de repositorios clonados con soporte para ramas, pull requests y scripts.
- **Testing automático**: zona para crear, ejecutar y analizar scripts YAML.
- **Testeo de TPAs**: creación, edición y ejecución de pruebas específicas de TPA.
- **Configuración**: gestión de tokens y parámetros globales del sistema.

## Manuales y despliegue

Incluí manuales completos para:

- Despliegue en modo desarrollo, producción y aplicación.
- Referencia del fichero de configuración.
- Tutorial completo del ciclo de creación de un TPA.

Además, documenté los problemas detectados y propuse mejoras futuras, subrayando la relevancia de las metodologías ágiles y la aplicación práctica de los conocimientos adquiridos durante la carrera.

---

- **Fecha**: 1 de julio de 2024  
- **Visitas originales**: 128

