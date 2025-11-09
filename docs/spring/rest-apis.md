---
title: APIs REST productivas
sidebar_label: APIs REST
sidebar: springBootSidebar
---

# Construcción de APIs REST con Spring Boot

Mis proyectos combinan Spring Web, Spring Data y controladores versionados para exponer servicios que consumen aplicaciones Angular. Esta es la checklist que sigo.

## Diseño de endpoints

- Versionado en la URL (`/api/v1/...`) con documentación en OpenAPI.
- Uso de `ProblemDetail` y `@ControllerAdvice` para respuestas de error consistentes.
- Paginación estándar (`page`, `size`, `sort`) delegada en Spring Data `Pageable`.
- Contratos orientados a casos de uso: DTOs específicos para comandos y queries.
- Idempotencia en operaciones sensibles (`PUT`, `PATCH`, `DELETE`) y `Idempotency-Key` para endpoints críticos.
- Inclusión de metadatos (`X-Correlation-Id`, `traceparent`) desde filtros para observabilidad.

## Ejemplo de controlador

```java
@RestController
@RequestMapping("/api/v1/certificaciones")
@RequiredArgsConstructor
class CertificacionController {

  private final CrearCertificacionHandler crearHandler;
  private final BuscarCertificacionesQuery buscarQuery;

  @PostMapping
  ResponseEntity<Void> crear(@Valid @RequestBody CrearCertificacionRequest request) {
    crearHandler.handle(request.toCommand());
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping
  ResponseEntity<Page<CertificacionResponse>> listar(@Valid FiltroCertificacionesRequest filtro) {
    return ResponseEntity.ok(buscarQuery.handle(filtro.toQuery()));
  }
}
```

## Persistencia

- Repositorios declarativos con Spring Data.
- Uso de `@EntityGraph` o proyecciones para evitar *n+1*.
- Migraciones gestionadas con Flyway y scripts versionados (especialmente en Oracle).
- CQRS ligera con consultas optimizadas (`@Query` nativas, proyecciones DTO) y comandos validados desde la capa de aplicación.

## Seguridad

- Autenticación con JWT (Angular) o Session Cookie (aplicaciones internas).
- Autorización declarativa con `@PreAuthorize` y roles recopilados desde Keycloak.
- Sanitización de entrada y límite de peticiones con Spring Cloud Gateway cuando aplica.
- Aplicación de `@Validated` y `ConstraintValidator` personalizados para reglas de negocio.
- Protección contra CSRF en canales web, y cabeceras de seguridad (`X-Content-Type-Options`, `Content-Security-Policy`) cuando se sirve contenido.

## Documentación

- `springdoc-openapi` para generar la especificación y servir Swagger UI.
- Plantilla de Postman (o Hoppscotch) exportada automáticamente en cada release.
- Ejemplos de respuesta reales obtenidos de pruebas contractuales.
- Contratos pactados con consumidores mediante `Spring Cloud Contract`.
- Documentación living con snippets de `RestDocs` integrados en tests.

## Rendimiento

- Control manual de serialización con `@JsonInclude` y `@JsonIgnore` cuando es necesario.
- Cache selectiva con Spring Cache (Redis) para listados de lectura frecuente.
- Uso de WebClient para llamadas concurrentes a servicios externos.
- `ResponseEntity` con compresión (`server.compression.enabled=true`) y soporte para ETags (`ShallowEtagHeaderFilter`).
- Circuit breakers y timeouts con Resilience4j para integraciones dependientes.

## Testing y calidad

- Tests de controladores con `@WebMvcTest` + `MockMvc`.
- Tests de contrato con `Spring Cloud Contract` y suites Postman automatizadas en CI.
- Validación de esquemas JSON (JSON Schema) para evitar regresiones.
- Monitorización de latencias con Actuator (`http.server.requests`) y alertas en Grafana.

## Más allá de REST

- **HATEOAS**: `RepresentationModel` y `EntityModel` para APIs navegables.
- **GraphQL**: `spring-boot-starter-graphql` cuando el cliente requiere consultas flexibles.
- **WebSockets / SSE**: `spring-boot-starter-websocket` para notificaciones en tiempo real.

Con estas prácticas consigo APIs predecibles, fáciles de consumir desde Angular y preparadas para monitorizarse en producción.

