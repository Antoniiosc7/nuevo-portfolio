---
title: Conectividad entre microservicios
sidebar_label: Conectividad
sidebar: microserviciosSidebar
---

# Cómo conecto microservicios en Java

La comunicación entre servicios define la resiliencia y la velocidad de una plataforma de microservicios. Aquí resumo los patrones que aplico con Spring Boot para conectar servicios de manera fiable.

---

## 1. REST síncrono

- Ideal para operaciones CRUD y consultas en tiempo real.
- Uso `RestTemplate` (legacy) o `WebClient` (reactivo) con resiliencia implementada por Resilience4j.

```java
@Service
public class CatalogClient {
  private final WebClient webClient;

  public CatalogClient(WebClient.Builder builder,
                       @Value("${clients.catalog.base-url}") String baseUrl) {
    this.webClient = builder.baseUrl(baseUrl).build();
  }

  public Mono<ProductDto> getProduct(UUID id) {
    return webClient.get()
      .uri("/api/v1/products/{id}", id)
      .retrieve()
      .bodyToMono(ProductDto.class)
      .timeout(Duration.ofSeconds(2))
      .retryWhen(Retry.backoff(3, Duration.ofMillis(200)));
  }
}
```

- Usa `ResponseEntity` y contratos OpenAPI acordados.
- Controla timeouts (`spring.webclient.connect-timeout`, `response-timeout`).
- Añade circuit breakers:

```java
@CircuitBreaker(name = "catalog", fallbackMethod = "fallbackProduct")
public Mono<ProductDto> getProduct(UUID id) { ... }
```

---

## 2. Mensajería asíncrona

- Para eventos de dominio y procesos desacoplados.
- Brokers habituales: RabbitMQ, Kafka, Azure Service Bus.

### RabbitMQ (Spring AMQP)

```java
@Component
public class OrderEventPublisher {
  private final AmqpTemplate amqpTemplate;

  public void publish(OrderCreatedEvent event) {
    amqpTemplate.convertAndSend("orders.exchange", "orders.created", event);
  }
}
```

```java
@RabbitListener(queues = "orders.created.queue")
public void handle(OrderCreatedEvent event) {
  fulfillmentService.startWorkflow(event);
}
```

### Kafka (Spring for Apache Kafka)

```java
@KafkaListener(topics = "orders", groupId = "notifications")
public void handle(OrderEvent event) { ... }
```

- Usa `Schema Registry` o Avro/JSON Schema para evolucionar contratos.
- Monitorea `consumer lag` y configura `dead-letter topics`.

---

## 3. Service-to-service discovery

- **Eureka/Consul**: registrar y descubrir instancias dinámicas.
- **Kubernetes**: DNS y servicios virtuales (`orders-service.default.svc.cluster.local`).
- La comunicación se realiza mediante load balancers (Ribbon, Spring Cloud LoadBalancer) o sidecars (Envoy, Istio).

```yaml
spring:
  cloud:
    loadbalancer:
      retry:
        enabled: true
```

```java
@LoadBalanced
@Bean
WebClient.Builder loadBalancedWebClientBuilder() {
  return WebClient.builder();
}
```

Con esto puedes llamar a `http://orders-service/api/v1/orders` automáticamente balanceado.

---

## 4. API Gateway y borde

- Spring Cloud Gateway, Kong o Nginx Ingress.
- Responsabilidades: autenticación, rate limiting, routing, agregación de respuestas.

```java
@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
  return builder.routes()
    .route("orders", r -> r.path("/api/orders/**").uri("lb://orders-service"))
    .route("catalog", r -> r.path("/api/catalog/**").filters(f -> f.stripPrefix(1)).uri("lb://catalog-service"))
    .build();
}
```

---

## 5. Contratos y compatibilidad

- Versiona APIs (`/api/v1/...`) y documenta con OpenAPI.
- Tests de contrato con Spring Cloud Contract o Pact.
- Para eventos, gestiona versionado mediante `envelope` (`type`, `version`, `payload`).

---

## 6. Resiliencia y observabilidad

- Retry, circuit breaker, bulkhead, rate limiter (Resilience4j).
- Propaga `traceId`/`spanId` usando Spring Cloud Sleuth u OpenTelemetry.
- Métricas clave: p95 latencia, throughput, error rate, backlog de colas.
- Dashboards que correlacionan métricas de cliente → gateway → servicio → base de datos.

---

## 7. Comunicación gRPC / RSocket

- Para escenarios de baja latencia o streaming.
- Spring Boot ofrece starters (`spring-boot-starter-grpc` comunitarios, `spring-messaging` + RSocket).

```java
@GrpcService
public class CatalogGrpcService extends CatalogServiceGrpc.CatalogServiceImplBase {
  @Override
  public void findProduct(ProductRequest request, StreamObserver<ProductResponse> responseObserver) {
    Product product = service.find(request.getId());
    responseObserver.onNext(ProductResponse.newBuilder().setId(product.getId()).setName(product.getName()).build());
    responseObserver.onCompleted();
  }
}
```

---

## 8. Seguridad en la conectividad

- Tokens firmados entre servicios (mTLS, JWT, SPIFFE identities).
- Policy enforcement en gateway y sidecars.
- Validación de esquemas y sanitización de payloads.
- Rate limiting y quotas por consumidor.

---

## 9. Orquestación vs coreografía

- **Orquestación**: un servicio coordina (Camunda, Temporal, Spring Batch).
- **Coreografía**: eventos determinan el flujo (event sourcing, Sagas).
- Selecciona según complejidad de procesos y necesidad de visibilidad central.

---

## 10. Herramientas

- **Spring Cloud** (Netflix OSS): Eureka, Gateway, Config, Sleuth.
- **Spring Cloud Kubernetes**: discovery/config nativos en k8s.
- **HashiCorp Consul** para discovery + KV + health checks.
- **Istio/Linkerd** para mallas de servicios (mTLS, retries, observabilidad sin tocar código).

Con estos patrones puedes conectar microservicios construidos en Java garantizando contratos estables, resiliencia ante fallos y soporte para escalado horizontal.


