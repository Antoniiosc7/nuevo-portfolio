---
title: Introducción a Spring Framework y Spring Boot
sidebar_label: Introducción
sidebar: springBootSidebar
---

# Ecosistema Spring: Framework y Boot

Spring nació en 2003 como respuesta a la complejidad de Java EE. Su filosofía se basa en **inversión de control (IoC)**, **inyección de dependencias** y una forma modular de construir aplicaciones Java. Con el tiempo evolucionó a un ecosistema completo que cubre prácticamente cualquier necesidad empresarial: web, datos, mensajería, batch, seguridad, observabilidad, etc.

En 2014 apareció **Spring Boot**, una capa de opinionated configuration que facilita arrancar y desplegar aplicaciones Spring con muy poco código ceremonioso.

## Spring Framework (core)

- **IoC Container**: administra el ciclo de vida de los objetos (beans) y resuelve dependencias.
- **AOP**: permite aspectos transversales (logging, transacciones) sin invadir la lógica de negocio.
- **Spring MVC**: framework web basado en el patrón dispatcher → controller → view.
- **Data Access**: integración con JDBC, JPA/Hibernate, MongoDB, Redis…
- **Transacciones**: manejo declarativo con `@Transactional`.
- **Messaging y batch**: soporte para JMS, RabbitMQ, Kafka, tareas programadas y Spring Batch.

## Spring Boot

- Construye sobre Spring Framework y aporta:
  - **Autoconfiguración** que detecta las dependencias y activa configuraciones por defecto.
  - **Starters** (`spring-boot-starter-*`) que agrupan dependencias compatibles.
  - **`SpringApplication`** para arrancar apps en minutos.
  - **Actuator** para métricas, health checks y observabilidad.
  - **Packaging** en ejecutables `jar`/`war` con servidor embebido (Tomcat/Jetty/Undertow).
  - **Soporte de configuración externo** (properties, YAML, perfiles, Vault, Config Server…).

## ¿Cuándo usar cada uno?

- **Spring Framework**: si necesitas un control muy fino del contenedor, integrar con aplicaciones existentes o crear bibliotecas que no dependen de autoconfiguración.
- **Spring Boot**: cuando quieres arrancar rápido, contar con defaults sensatos y desplegar servicios independientes (microservicios, APIs REST, workers).

> En mis proyectos, Spring Boot es la opción por defecto para nuevos servicios. Aun así, comprender los fundamentos de Spring Framework es imprescindible para extender o depurar comportamientos avanzados.

## Casos de uso habituales

1. **APIs REST para frontends Angular**: autenticación, gestión de trámites, reporting.
2. **Procesos batch y schedulers**: generación de informes, sincronización de catálogos.
3. **Integraciones con terceros**: WebClient/WebFlux para consumir APIs, colas (Kafka/Rabbit) para eventos.
4. **Aplicaciones monolíticas modulares** que eventualmente pueden dividirse en microservicios.

## Roadmap de esta sección

| Documento | Contenido |
| --- | --- |
| `framework-fundamentos` | Beans, IoC, AOP, configuración y ciclo de vida. |
| `framework-configuracion` | Condiciones, conversión, configuración modular, scheduling. |
| `framework-web` | Spring MVC, controladores, validaciones, vistas. |
| `framework-data` | Acceso a datos con JDBC, JPA, transacciones. |
| `framework-seguridad` | Autenticación, autorización y filtros con Spring Security. |
| `framework-mensajeria` | JMS, RabbitMQ, Kafka, Spring Integration y eventos. |
| `diferencias-spring-boot` | Comparativa detallada entre Spring y Boot. |
| `arquitectura` | Arquitectura hexagonal aplicada a servicios Spring Boot. |
| `rest-apis` | Diseño de APIs productivas con Spring Boot. |
| `testing-y-quality` | Estrategias de testing y calidad en proyectos Spring. |
| `build-y-deploy` | Pipelines y despliegue en producción. |
| `boot-autoconfiguracion` | Starters, profiles, configuración externa, Actuator. |
| `security/guia-completa` | Spring Security en profundidad, OAuth2, JWT, tests. |
| `microservicios/arquitectura` | Diseño de microservicios Java, dominios y despliegue. |
| `microservicios/conectividad` | Comunicación entre microservicios (REST, mensajes, discovery). |

## Objetivos

- Documentar las bases de Spring para cualquiera que llegue nuevo al equipo.
- Profundizar en Spring Boot y sus ventajas productivas.
- Ofrecer guías prácticas para APIs, seguridad, testing y despliegue.
- Explicar claramente las diferencias y complementariedades entre Spring “a secas” y Spring Boot.

Con esta serie podrás ir de cero a experto, comprendiendo tanto el framework clásico como la capa opinionada de Boot.
