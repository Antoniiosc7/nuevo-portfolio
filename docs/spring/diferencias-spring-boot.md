---
title: Spring Framework vs Spring Boot
sidebar_label: Diferencias Spring / Boot
sidebar: springBootSidebar
---

# Diferencias entre Spring y Spring Boot

| Aspecto | Spring Framework | Spring Boot |
| --- | --- | --- |
| Objetivo | Proveer los bloques fundamentales (IoC, MVC, Data, AOP). | Facilitar la creación de aplicaciones Spring listas para producción con mínima configuración. |
| Configuración | Manual: definir beans, `DispatcherServlet`, datasources, etc. | Autoconfiguración basada en dependencias y propiedades. |
| Dependencias | El desarrollador elige la combinación exacta. | `spring-boot-starter-*` agrupa librerías compatibles. |
| Arranque | `AnnotationConfigApplicationContext`, `WebApplicationInitializer`. | `SpringApplication.run(App.class, args)` con servidor embebido. |
| Packaging | `war` desplegado en servidor externo (Tomcat/WebSphere). | `jar` o `war` ejecutable con Tomcat/Jetty/Undertow embebido. |
| Observabilidad | Integraciones manuales con Actuator/metrics. | Actuator preconfigurado con endpoints `/actuator/**`. |
| Configuración externa | Propiedades con `@PropertySource`, `Environment`. | `application.properties/yml`, perfiles, Config Server, Vault. |
| Líneas de código ceremoniosas | Elevadas en proyectos nuevos. | Reducidas: enfoque “convention over configuration”. |

## ¿Cuándo usar Spring “a secas”?

- Crear librerías/frameworks que otros proyectos consumirán (starters, infra reutilizable).
- Integrarse con infraestructuras heredadas donde el contenedor ya está configurado.
- Proyectos donde la autoconfiguración de Boot dificulta ajustes muy finos (aplicaciones legacy con servidores específicos).

## ¿Cuándo usar Spring Boot?

- Microservicios, REST APIs, workers, batch jobs.
- Equipos que valoran rapidez y consistencia en la configuración.
- Necesidad de monitorización, health checks y métricas incorporadas.
- Despliegues modernos (Docker, Kubernetes, Cloud Foundry).

## Cómo coexisten

- Spring Boot **usa** Spring Framework. La mayoría de conceptos (beans, perfiles, AOP, MVC) se heredan tal cual.
- Puedes combinar ambos: arrancar un proyecto Boot y desactivar o extender autoconfiguraciones (`@EnableAutoConfiguration(exclude = ...)`, `@ConditionalOnMissingBean`, `@ConfigurationProperties`).
- Si vienes de Spring clásico puedes pasar tus configuraciones Java a Boot y mantener controles manuales donde sea necesario.

## Estrategia de migración

1. Crea un módulo Boot (por ejemplo, para nuevas APIs) y deja el módulo legacy en Spring clásico.
2. Extrae configuración común en starters internos.
3. Usa `spring.factories` para registrar autoconfiguraciones personalizadas.
4. Aprovecha `CommandLineRunner` para migrar tareas batch.
5. Valida equivalencias de propiedades (`application.properties`) versus configuraciones manuales previas.

En resumen, Spring Framework es la base y Boot es la capa “opinionada” que acelera el desarrollo. Dominar ambos te permite elegir el enfoque adecuado según el proyecto.


