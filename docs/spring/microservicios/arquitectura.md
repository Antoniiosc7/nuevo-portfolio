---
title: Arquitectura de microservicios en Java
sidebar_label: Arquitectura
sidebar: microserviciosSidebar
---

# Cómo diseño microservicios en Java con Spring

Esta guía describe la arquitectura que utilizo para construir plataformas basadas en microservicios usando Spring Boot, enfocadas en dominios del sector público y productos SaaS.

---

## 1. Principios base

- **Dominios delimitados** (DDD): cada servicio encapsula un contexto de negocio.
- **Autonomía**: ciclo de vida independiente (deploy, escala, datos).
- **Comunicación explícita**: contratos versionados, descubrimiento y observabilidad.
- **Defensa en profundidad**: seguridad, validaciones, circuit breakers, tracing.

---

## 2. Modelo de referencia

```
├── gateway (API Gateway, edge security)
├── auth-service
├── catalog-service
├── orders-service
├── notifications-service
└── platform-infra (config, discovery, tracing)
```

- Cada servicio es un proyecto Spring Boot con su propio repositorio (o submódulo).
- Base de datos por servicio (Oracle/PostgreSQL/Redis dependiendo del caso).
- Pipeline CI/CD autónomo (tests, imagen Docker, despliegue Helm).

---

## 3. Esqueleto de un servicio

```bash
spring init --dependencies=web,actuator,data-jpa,validation,lombok \
  --groupId=es.antoniosaborido.orders \
  --name=orders-service orders-service
```

Estructura interna:

```
src/main/java/es/antoniosaborido/orders
├── OrdersApplication.java
├── application
│   ├── command
│   ├── query
│   └── service
├── domain
│   ├── model
│   ├── event
│   └── repository
├── infrastructure
│   ├── rest
│   ├── persistence
│   ├── messaging
│   └── config
└── shared
    └── exception
```

- Arquitectura hexagonal/clean: separa dominio, aplicación e infraestructura.
- `infrastructure/config` agrupa configuración de seguridad, observabilidad, resiliencia.

---

## 4. Descubrimiento y configuración

- **Service discovery**: Spring Cloud Netflix Eureka, Consul, Kubernetes DNS.
  - Con Kubernetes, usa `Service` + DNS (`orders-service.default.svc.cluster.local`).
  - Con Eureka:
    ```yaml
    eureka:
      client:
        serviceUrl:
          defaultZone: http://discovery:8761/eureka
    ```
- **Configuración centralizada**: Spring Cloud Config, Vault, AWS Parameter Store.
  - Propiedades versionadas en git (profiles: `dev`, `pre`, `prod`).
  - Vault para credenciales y certificados rotables.

---

## 5. Observabilidad

- **Actuator + Micrometer** expone métricas (Prometheus/Grafana).
- **Tracing**: OpenTelemetry + Tempo/Zipkin (`spring-boot-starter-actuator` + `opentelemetry-exporter-otlp`).
- **Logging**: JSON (Logback + Logstash encoder) con `traceId`/`spanId`.
- Alertas Prometheus (SLO: p95 < 400 ms, error rate < 2 %).

---

## 6. Seguridad transversal

- API Gateway (Spring Cloud Gateway o Kong) para autenticar/autorizar llamadas externas.
- Servicios internos autenticados mediante tokens mTLS, JWT firmados o API Keys rotadas.
- Policies con `Spring Security` y `@PreAuthorize`.
- Auditoría de acceso (`AuditEventRepository`, eventos personalizados).

---

## 7. Gestión de dependencias y evolución

- `BOM` compartido (`spring-cloud-dependencies`, `spring-boot-dependencies`).
- Renovate + Dependabot para actualizaciones automáticas.
- Feature toggles (LaunchDarkly, Togglz) para despliegues progresivos.
- Estrategias de migración: branch by abstraction, expand & contract para contratos API.

---

## 8. Pipeline DevOps

1. `mvn verify` (tests, JaCoCo, SonarQube).
2. Build imagen Docker (`spring-boot:build-image` o Dockerfile multi-stage).
3. Push a registry privado.
4. Despliegue Helm/Kustomize (GitOps con ArgoCD/Flux).
5. Smoke tests automatizados post-deploy (RestAssured, Newman).

---

## 9. Estrategias de resiliencia

- Circuit breakers / retries con Resilience4j.
- Bulkheads y rate limiting en gateway.
- Outbox pattern + Debezium para consistencia eventual.
- Shadow traffic y canary releases para validar nuevas versiones.

---

## 10. Equipo y gobierno

- Contratos API versionados (`/api/v1/...`) + documentación OpenAPI.
- Acuerdos sobre logs, métricas, tags y nomenclatura de topics/colas.
- Catálogo de servicios y owners (Backstage / Portal interno).
- Revisiones de arquitectura periódicas para asegurar alineamiento con negocio.

Con esta arquitectura he construido plataformas escalables donde cada microservicio mantiene autonomía sin perder coherencia global. En el siguiente módulo profundizamos en los mecanismos de comunicación y conectividad entre servicios.


