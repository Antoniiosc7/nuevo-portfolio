---
title: Pruebas automatizadas
sidebar_label: Testing
sidebar: springBootSidebar
---

# Estrategia de pruebas en Spring Boot

Spring Boot proporciona anotaciones y utilidades para probar cada capa de la aplicación sin cargar más contexto del necesario. Esta guía recopila la estrategia completa que aplico en proyectos reales.

## Pirámide de pruebas

1. **Unitarias (≈70 %)**: lógica de dominio y servicios de aplicación aislados del framework.
2. **Integración (≈20 %)**: verificación de adaptadores (REST, persistencia, mensajería) con contexto Spring acotado.
3. **Contractuales / End-to-end (≈10 %)**: asegurar que los contratos expuestos a terceros siguen vigentes y que el flujo completo funciona con infraestructura real.

## Herramientas clave

- **JUnit 5** + AssertJ para aserciones expresivas.
- **Mockito** / MockK (Kotlin) para aislar dependencias.
- **Testcontainers** para ejecutar PostgreSQL, Oracle, Kafka o Redis en CI.
- **RestAssured** o **WebTestClient** para contratos HTTP.
- **Spring Cloud Contract** cuando hay múltiples consumidores internos.
- **WireMock** para simular APIs externas.

## Pruebas unitarias

```java
@ExtendWith(MockitoExtension.class)
class CrearCertificacionHandlerTest {

  @Mock
  private CertificacionRepository repository;

  @InjectMocks
  private CrearCertificacionHandler handler;

  @Test
  void creaUnaCertificacionValida() {
    var command = new CrearCertificacionCommand("DevOps", "Fundamentos");

    handler.handle(command);

    verify(repository).save(argThat(cert -> cert.getNombre().equals("DevOps")));
  }
}
```

- Evito contexto Spring; inyecto dependencias con mocks.
- Para validadores (`ConstraintValidator`) utilizo `Validation.buildDefaultValidatorFactory()`.
- Aseguro comportamiento de mapping con `MapStruct` usando `Mappers.getMapper()` y objetos reales.

## Pruebas de integración

- `@DataJpaTest` para repositorios (H2, PostgreSQL con Testcontainers).
- `@JdbcTest`, `@JsonTest`, `@RestClientTest` para slices específicos.
- `@WebMvcTest` con `MockMvc` para controladores, simulando seguridad con `SecurityMockMvcRequestPostProcessors`.
- `@SpringBootTest` reservado para flujos end-to-end o verificación de configuración.
- `@Sql`, `@DirtiesContext` y utilidades `DatabaseCleaner` para aislar escenarios.
- `@Testcontainers` con reutilización de contenedores para acelerar la suite.

## Contratos y e2e

- Spring Cloud Contract genera stubs para consumidores (`mvn clean install -Pstubs`).
- Suites Postman/Newman o Cypress API para comprobar flujos completos tras cada despliegue.
- Pruebas de interfaz (si aplica) con Playwright/Cypress conectadas al backend real.

## Cobertura y automatización

- Cobertura mínima en SonarQube: 80 % líneas / 60 % ramas.
- `mvn verify` incluye JaCoCo, SpotBugs y análisis estático.
- Publicación de reportes HTML (Allure, Surefire) y métricas de tiempo de ejecución por suite.
- Control de flaky tests desde GitHub Actions Insights o Gradle Enterprise.

## Observabilidad durante tests

- Logs estructurados (`application-test.yml`) con identificadores de correlación.
- Métricas de Actuator (`/actuator/prometheus`) verificadas en entornos de staging.
- Captura de evidencias (payloads de error) cuando fallan tests para acelerar el diagnóstico.

## Pipeline de CI/CD

1. Compilación y tests unitarios (`mvn test`).
2. Tests de integración y generación de stubs (`mvn verify -Pcontract`).
3. Publicación de artefactos y reportes.
4. Etapa opcional de smoke tests tras desplegar en staging (RestAssured + Testcontainers en modo `reuse`).

## Buenas prácticas

- Aislar acciones externas (APIs, colas) en adaptadores para mockearlos fácilmente.
- Mantener datos de prueba consistentes; usa builders o `Mother Objects`.
- Ejecutar tests en paralelo cuando sea viable (`maven-surefire-plugin` `reuseForks=false`).
- Documentar escenarios críticos (altas de usuario, pagos, caducidad). Cada bug debe traducirse a un test que lo cubra.

Resultado: servicios con regresiones mínimas y confianza para desplegar varias veces por semana.

