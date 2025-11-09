---
title: Mensajería y eventos con Spring
sidebar_label: Mensajería
sidebar: springFrameworkSidebar
---

# Mensajería y eventos con Spring Framework

Spring ofrece varios proyectos para trabajar con colas, brokers y flujos de eventos. Esta guía introduce los más utilizados sin depender de Spring Boot.

## Spring JMS (Java Message Service)

- Abstracción sobre JMS 1.1/2.0 compatible con ActiveMQ, IBM MQ, Artemis.
- Simplifica el uso de `ConnectionFactory`, `Session` y `Message`.

```java
@Configuration
public class JmsConfig {

  @Bean
  public JmsTemplate jmsTemplate(ConnectionFactory connectionFactory) {
    JmsTemplate template = new JmsTemplate(connectionFactory);
    template.setDefaultDestinationName("queue.notifications");
    template.setSessionTransacted(true);
    return template;
  }
}
```

```java
@Component
public class NotificationProducer {
  private final JmsTemplate jmsTemplate;

  public void send(Notification payload) {
    jmsTemplate.convertAndSend(payload);
  }
}
```

```java
@Component
public class NotificationListener {

  @JmsListener(destination = "queue.notifications")
  public void handle(Notification notification) {
    log.info("Procesando {}", notification);
  }
}
```

## Spring AMQP (RabbitMQ)

- Facilita trabajar con RabbitMQ (colas, exchanges, bindings).

```java
@Configuration
public class RabbitConfig {

  @Bean
  public Queue queue() {
    return QueueBuilder.durable("events.order-created").build();
  }

  @Bean
  public TopicExchange exchange() {
    return new TopicExchange("events");
  }

  @Bean
  public Binding binding(Queue queue, TopicExchange exchange) {
    return BindingBuilder.bind(queue).to(exchange).with("order.created");
  }
}
```

```java
@Component
public class OrderCreatedListener {

  @RabbitListener(queues = "events.order-created")
  public void handle(OrderCreatedEvent event) {
    // procesar evento
  }
}
```

## Spring for Apache Kafka

- Alto nivel (KafkaTemplate, @KafkaListener) y bajo nivel (ConsumerFactory, ProducerFactory).

```java
@Configuration
public class KafkaConfig {

  @Bean
  public NewTopic orderTopic() {
    return TopicBuilder.name("orders").partitions(3).replicas(1).build();
  }
}
```

```java
@Component
public class KafkaOrderListener {

  @KafkaListener(topics = "orders", groupId = "billing")
  public void process(OrderEvent event) {
    billingService.charge(event);
  }
}
```

### Error Handling

- Usa `SeekToCurrentErrorHandler` o `DeadLetterPublishingRecoverer`.
- Configura `ContainerProperties` para commit manual o ack automático.

## Spring Integration

- Ofrece componentes para construir pipelines con enfoque EIP (Enterprise Integration Patterns).
- Soporta canales (`DirectChannel`, `QueueChannel`), transformadores, routers, splitters.

```java
@Configuration
@IntegrationComponentScan
public class IntegrationConfig {

  @Bean
  public MessageChannel inputChannel() {
    return MessageChannels.direct().get();
  }

  @Bean
  public IntegrationFlow flow() {
    return IntegrationFlows
        .from(inputChannel())
        .filter(Order::isValid)
        .handle(orderService::process)
        .get();
  }
}
```

Spring Integration se conecta a Rabbit, Kafka, HTTP, FTP, mail, etc.

## Spring Cloud Stream

- Abstracción declarativa sobre brokers (Kafka, RabbitMQ, Pulsar).
- Define bindings en configuración y usa `@StreamListener` o `@Bean Supplier/Function`.
- Perfecto para microservicios event-driven y serverless.

## Eventos locales vs mensajería

- **Eventos de aplicación** (`ApplicationEventPublisher`) son locales al contexto.
- Usa mensajería cuando necesitas durabilidad, reintentos o comunicación entre servicios.
- Aplica patrones **Outbox** + **Change Data Capture** para garantizar consistencia entre DB y eventos.

## Testing de pipelines

- Usa `EmbeddedBroker` (Kafka), `ActiveMQ Artemis embedded` o Testcontainers.
- Spring Integration ofrece `MessageChannel` de prueba (`QueueChannel`) para validar flujos.
- Verifica reintentos y errores con `RetryTemplate`, `ErrorMessageExceptionTypeRouter`.

Con estas herramientas puedes construir sistemas event-driven robustos utilizando sólo Spring Framework, eligiendo el broker y el nivel de abstracción más adecuado para cada proyecto.


