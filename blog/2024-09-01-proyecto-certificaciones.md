---
slug: proyecto-certificaciones
title: Plataforma de certificaciones con Angular y Spring
description: Aplicación full stack para estudiar certificaciones, realizar exámenes y seguir el progreso.
authors: [antonio]
tags: [angular, spring, devops, certificaciones]
image: /img/blog/certificaciones/dashboard-documentacion.png
---

## Descripción general

La plataforma de certificaciones es una aplicación web desarrollada con **Angular 18** en el frontend y **Spring Boot** en el backend. El objetivo es que los usuarios puedan preparar certificaciones mediante documentación teórica y exámenes de práctica autocorregibles.

<!-- truncate -->

![Panel de documentación](/img/blog/certificaciones/dashboard-documentacion.png)

## Funcionalidades principales

### 1. Registro y autenticación

- Gestión de usuarios con seguimiento del progreso.
- Estadísticas personales basadas en los resultados de los exámenes.

### 2. Documentación dinámica

- Contenidos teóricos por certificación y tema.
- Editor administrable desde base de datos, evitando redeploys.

![Sección de documentación](/img/blog/certificaciones/menus-bbdd.png)

### 3. Exámenes interactivos

- Generación de tests desde base de datos.
- Corrección automática con explicación de cada pregunta.

![Corrección de exámenes](/img/blog/certificaciones/examen-correccion.png)

### 4. Seguimiento del progreso

- Historial de exámenes por usuario.
- Estadísticas acumuladas y gráficos de evolución.

![Resumen del perfil de usuario](/img/blog/certificaciones/perfil-usuario.png)

## Tecnologías

- **Frontend**: Angular 18 + Tailwind + NgRx.
- **Backend**: Spring Boot con controladores REST, seguridad y acceso a base de datos.
- **Base de datos**: gestión integral de certificaciones, exámenes y documentación.
- **DevOps**: pipelines automáticos para despliegue y verificación de calidad.

---

- **Fecha**: 1 de septiembre de 2024  
- **Visitas originales**: 53

