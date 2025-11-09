---
title: Autoconfiguración y configuración avanzada en Spring Boot
sidebar_label: Autoconfiguración Boot
sidebar: springBootSidebar
---

# Profundizando en Spring Boot

Spring Boot reduce drásticamente la configuración necesaria para levantar una aplicación Spring. Esta guía profundiza en sus piezas clave.

## `SpringApplication` y ciclo de arranque

```java
@SpringBootApplication
public class DemoApplication {
  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }
}
```

- `@SpringBootApplication` agrupa `@Configuration`, `@EnableAutoConfiguration` y `@ComponentScan`.
- `SpringApplication` prepara el entorno, crea el ApplicationContext, procesa eventos y arranca el servidor embebido.

### Eventos de arranque

- `ApplicationStartingEvent`, `ApplicationReadyEvent`, `ApplicationFailedEvent`.
- Implementa `ApplicationListener<?>` o usa `SpringApplication.addListeners`.

## Starters

- Agrupan dependencias coherentes (`spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-security`).
- Reducen conflictos y aseguran versiones compatibles gestionadas por el **parent POM** (`spring-boot-dependencies`).

## Autoconfiguración

- Spring Boot detecta beans disponibles en el classpath y activa configuraciones condicionadas.
- `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty`, etc.

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration { ... }
```

- Puedes inspeccionar autoconfiguraciones activas con Actuator (`/actuator/conditions`) o `--debug`.

## Personalizar configuración

- **Properties/YAML** (`application.properties`, `application.yml`).
- Prefijos tipados con `@ConfigurationProperties`.

```java
@ConfigurationProperties(prefix = "app.mail")
public record MailProperties(String host, int port, boolean ssl) {}

@Configuration
@EnableConfigurationProperties(MailProperties.class)
public class MailConfig {}
```

### Perfiles

- `spring.profiles.active=dev`.
- `@Profile("dev")`, `@Profile({"prod","qa"})`.
- Propiedades específicas: `application-dev.yml`, `application-prod.yml`.

### Jerarquía de configuración

1. Propiedades en línea de comandos (`--server.port=8081`).
2. Variables de entorno.
3. `application.yml` / `application.properties`.
4. Valores por defecto en el código.

## Actuator y observabilidad

- Endpoints `/actuator/health`, `/actuator/info`, `/actuator/metrics`, `/actuator/loggers`.
- Integra con Prometheus (`micrometer-registry-prometheus`), Grafana, Zipkin.
- Configura niveles:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,loggers,threaddump,env,conditions
  endpoint:
    health:
      show-details: when_authorized
```

## Logging

- Usa **Logback** por defecto (`logback-spring.xml`).
- Niveles configurables en `application.yml`:

```yaml
logging:
  level:
    root: INFO
    com.demo: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n"
```

- Añade apéndices (archivos, syslog, Elasticsearch) con configuraciones específicas.

## Seguridad

- `spring-boot-starter-security` configura un filtro básico.
- Desactiva/autoconfigura con `SecurityFilterChain`.
- Integra OAuth2, JWT, Basic Auth, LDAP, SAML.

## Testing con Spring Boot

- `@SpringBootTest` carga el contexto completo.
- `@DataJpaTest`, `@WebMvcTest`, `@RestClientTest` para slices específicos.
- `TestRestTemplate`, `WebTestClient`, `MockMvc` para pruebas de controladores.

## Contenedores y despliegue

- `mvn spring-boot:run`, `mvn spring-boot:build-image` (Buildpacks).
- Dockerfile multi-stage:

```dockerfile
FROM eclipse-temurin:21-jdk AS build
WORKDIR /workspace
COPY . .
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre
COPY --from=build /workspace/target/app.jar /app/app.jar
ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","/app/app.jar"]
```

- Perfiles + Config Server + Vault para gestionar secretos en distintos entornos.

## Crear autoconfiguraciones propias

- Define un starter interno (`acme-spring-boot-starter`).
- Registra autoconfiguración en `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`.
- Usa propiedades tipadas para exponer configuración.

## Depuración y tuning

- `--debug` muestra condiciones evaluadas.
- `spring.main.log-startup-info=false` para arranque silencioso.
- Ajusta `server.tomcat.max-connections`, `spring.datasource.hikari.maximumPoolSize`, etc.
- `springdoc-openapi`, `GraphQL`, `Kafka`, `Batch` tienen starters oficiales.

Con estas herramientas puedes exprimir Spring Boot al máximo, manteniendo la productividad sin perder el control fino cuando lo necesitas.


