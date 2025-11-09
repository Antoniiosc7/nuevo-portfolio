---
title: Despliegue y operaciones
sidebar_label: Despliegue
sidebar: springBootSidebar
---

# Despliegue de servicios Spring Boot

Spring Boot facilita empaquetar servicios, pero el éxito depende de una cadena de entrega reproducible, observabilidad y control de configuración. Esta guía describe el proceso completo que aplico en proyectos reales.

## Empaquetado

- **Docker multi-stage** con `eclipse-temurin:21-jdk` (build) + `21-jre` (runtime). Imagen final < 200 MB.
- Generación de archivo `build-info` y `git.properties` (`spring-boot-maven-plugin`) para exponer versión en `/actuator/info`.
- Inclusión de SBOM (`cyclonedx-maven-plugin`) y firma de artefactos (`maven-gpg-plugin`).
- Uso de `jlink`/`jreleaser` cuando se requiere footprint reducido.

## Configuración y secretos

- `application.yml` como base, `application-prod.yml` para overrides.
- Perfiles activos (`SPRING_PROFILES_ACTIVE`) y variables de entorno para credenciales.
- Integración con Spring Cloud Config / Vault / Secrets Manager según el cliente.
- Plantillas `env.sample` y documentación de variables críticas para evitar errores en despliegues.

## Pipeline (GitHub Actions / GitLab CI)

1. `mvn verify` con análisis de SonarQube.
2. Construcción de imagen Docker y publicación en GHCR.
3. Ejecución de pruebas contractuales / smoke tests contra entorno de staging.
4. Publicación de artefacto Helm/manifest declarativo.
5. Gate manual con checklist (migraciones OK, métricas estables).

## Observabilidad

- Actuator con endpoints expuestos vía `/actuator/health`, `/actuator/metrics`, `/actuator/loggers`.
- Micrometer + Prometheus/Grafana para latencia, throughput y tasa de errores.
- Integración con OpenTelemetry (OTLP) para tracing distribuido (Tempo/Zipkin).
- Logback con formato JSON (`logstash-logback-encoder`) y envío a ELK/Graylog.
- Alertas Prometheus (ratio de error > 2 %, p95 > 500 ms) notificadas por Slack/Teams.

## Estrategias de despliegue

- **Blue/Green**: dos entornos idénticos con switch de tráfico tras validar smoke tests.
- **Canary**: liberar 5–10 % del tráfico y monitorizar métricas antes de completar el rollout.
- **Rolling update**: Kubernetes despliega réplicas gradualmente (control de `maxUnavailable` y `maxSurge`).
- **GitOps**: manifiestos versionados en repositorio separado (ArgoCD/Flux).
- Feature toggles para activar funcionalidades bajo demanda.

## Seguridad y cumplimiento

- Dependencias verificadas con `mvn dependency-check` y Renovate.
- Cabeceras de seguridad configuradas en Gateway (CSP, HSTS, X-Frame-Options).
- Logs estructurados (JSON) anonimizando datos sensibles para cumplir con GDPR.
- Hardening de imágenes Docker (user no root, `readOnlyRootFilesystem`, `seccomp`).
- Escaneo de vulnerabilidades en imágenes (Trivy, Grype).
- Revisión periódica de políticas IAM y rotación de secretos.

## Estrategia de rollback

- Versionado semántico (`vX.Y.Z`) y etiquetas Docker.
- Mantenimiento de al menos dos despliegues previos listos para rollback.
- Scripts de base de datos reversibles; ejecución manual supervisada.
- Feature flags para deshabilitar rápidamente funcionalidades sin revertir código.
- Backups automáticos (snapshots Oracle/PostgreSQL) validados regularmente.

## Checklist antes de producción

- [ ] Pruebas automatizadas en verde (unitarias, integración, contractuales).
- [ ] Revisión de seguridad (dependencias críticas, cabeceras, permisos).
- [ ] Smoke test posterior al despliegue.
- [ ] Métricas y logs verificados en las primeras 24 h.
- [ ] Health checks y endpoints Actuator protegidos/restringidos.
- [ ] Documentación de procedimientos de emergencia (rollback, escalado).

Con este flujo garantizo despliegues reproducibles, observables y alineados con los requisitos de entornos corporativos y cloud.

