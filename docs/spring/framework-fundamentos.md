---
title: Fundamentos de Spring Framework
sidebar_label: Fundamentos Spring
sidebar: springFrameworkSidebar
---

# Fundamentos de Spring Framework (core)

Spring Framework proporciona la base sobre la que se construye todo el ecosistema Spring. Dominar sus conceptos es clave para entender el comportamiento de Spring Boot y poder extenderlo más allá de la autoconfiguración por defecto.

---

## Contenedor IoC

- El **ApplicationContext** es el corazón de Spring. Administra objetos (beans), resuelve dependencias y gestiona el ciclo de vida.
- Puedes registrar beans usando anotaciones (`@Component`, `@Service`, `@Repository`, `@Configuration`) o configuración explícita (Java/XML).
- Diferentes implementaciones cubren distintos escenarios (`AnnotationConfigApplicationContext`, `ClassPathXmlApplicationContext`, `WebApplicationContext`).
- Soporta múltiples scopes y jerarquías de contextos (por ejemplo, un `RootApplicationContext` y contextos hijos para cada DispatcherServlet).

### Scopes disponibles

| Scope | Descripción | Uso típico |
| --- | --- | --- |
| `singleton` | Bean único por contenedor | Servicios sin estado |
| `prototype` | Se crea un bean nuevo en cada inyección | Objetos con estado temporal |
| `request` | Nuevo bean por petición HTTP | DTOs, helpers web |
| `session` | Bean por sesión HTTP | Datos de usuario en web |
| `application` | Bean por ServletContext | Caches compartidas |
| `websocket` | Bean por sesión WebSocket | Estado temporal en websockets |

### Configuración basada en Java

```java
@Configuration
@ComponentScan(basePackages = "com.demo")
public class AppConfig {

  @Bean
  public Clock clock() {
    return Clock.systemUTC();
  }
}

var context = new AnnotationConfigApplicationContext(AppConfig.class);
```

### Configuración basada en XML (legacy)

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
         http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="clock" class="java.time.Clock" factory-method="systemUTC"/>
</beans>
```

---

## Inyección de dependencias

- **Constructor injection** (recomendada): garantiza inmutabilidad y facilita testing.
- **Setter injection**: útil para dependencias opcionales.
- **Field injection**: evitar en código de producción; limita la testabilidad.
- Usa `@Qualifier` o `@Primary` cuando existen múltiples implementaciones del mismo tipo.
- Para colecciones, Spring inyecta automáticamente todos los beans que coinciden con la interfaz (`List<PaymentProcessor>`).

```java
@Service
public class EmailsService {
  private final TemplateEngine templateEngine;
  private final Clock clock;

  public EmailsService(TemplateEngine templateEngine, Clock clock) {
    this.templateEngine = templateEngine;
    this.clock = clock;
  }
}
```

### Propiedades externas

```java
@Configuration
@PropertySource("classpath:mail.properties")
public class MailConfig {

  @Bean
  public JavaMailSender mailSender(@Value("${mail.host}") String host) {
    JavaMailSenderImpl sender = new JavaMailSenderImpl();
    sender.setHost(host);
    return sender;
  }
}
```

El objeto `Environment` permite acceder a propiedades en tiempo de ejecución (`environment.getProperty("mail.host")`).

---

## Ciclo de vida y extensiones

- **Lifecycle hooks**: `@PostConstruct`, `@PreDestroy`, interfaces `InitializingBean`, `DisposableBean`.
- **Eventos**: `ContextRefreshedEvent`, `ContextClosedEvent`, `ApplicationReadyEvent`.
- **BeanPostProcessor**: intercepta beans antes/después de su inicialización.
- **BeanFactoryPostProcessor**: modifica definiciones antes de crear instancias (útil para sobrescribir propiedades).

```java
@Component
public class MetricsCollector {
  @PostConstruct
  public void start() {}

  @PreDestroy
  public void stop() {}
}
```

```java
@Component
public class TracingBeanPostProcessor implements BeanPostProcessor {
  @Override
  public Object postProcessAfterInitialization(Object bean, String beanName) {
    log.debug("Bean inicializado {}", beanName);
    return bean;
  }
}
```

---

## Aspect-Oriented Programming (AOP)

- Permite aplicar lógica transversal (logging, seguridad, transacciones) sin contaminar la lógica de negocio.
- Conceptos: **JoinPoint**, **Pointcut**, **Advice**, **Aspect**.
- Spring genera proxies (JDK o CGLIB) para interceptar llamadas.

```java
@Aspect
@Component
public class LoggingAspect {

  @Before("execution(* com.demo.service..*(..))")
  public void logBefore(JoinPoint jp) {
    log.info("Invocando {}", jp.getSignature());
  }
}
```

### Transacciones declarativas

```java
@Service
public class PaymentsService {

  @Transactional(isolation = Isolation.SERIALIZABLE, timeout = 3)
  public void processPayment(PaymentCommand command) {
    // lógica transaccional
  }
}
```

`@Transactional` se implementa internamente con AOP.

---

## Módulos principales del framework

| Módulo | Descripción |
| --- | --- |
| `spring-core`, `spring-beans` | IoC container, DI, definición de beans. |
| `spring-context` | ApplicationContext, internacionalización, recursos, eventos. |
| `spring-aop` | Aspect-Oriented Programming. |
| `spring-expression` (SpEL) | Lenguaje de expresiones. |
| `spring-tx` | Gestión de transacciones. |
| `spring-orm`, `spring-jdbc` | Abstracciones de acceso a datos. |
| `spring-web`, `spring-webmvc`, `spring-webflux` | MVC tradicional y pila reactiva. |
| `spring-messaging`, `spring-integration` | Mensajería y flujos. |
| `spring-test` | Herramientas de testing integradas. |

---

## Spring Expression Language (SpEL)

Permite evaluar expresiones en anotaciones o configuración:

```java
@Value("#{new java.text.SimpleDateFormat('yyyy').format(new java.util.Date())}")
private String currentYear;
```

Uso frecuente:

- `@ConditionalOnExpression`, `@Cacheable(key = "#user.id")`.
- Condiciones en `@Scheduled`, `@Async`, `@PreAuthorize`.
- Plantillas Thymeleaf (`th:text="$&#123;#dates.format(localDate, 'dd/MM')&#125;"`).

---

## Eventos de aplicación

```java
public record UserCreatedEvent(UUID id) {}

@Component
class UserService {
  private final ApplicationEventPublisher publisher;

  public void createUser(User user) {
    repository.save(user);
    publisher.publishEvent(new UserCreatedEvent(user.id()));
  }
}

@Component
class WelcomeMailListener {
  @EventListener
  public void handle(UserCreatedEvent event) {
    mailService.sendWelcome(event.id());
  }
}
```

- Usa `@Async` para listeners asíncronos (requiere `@EnableAsync`).
- Implementa `SmartApplicationListener` si necesitas priorizar eventos.

---

## Programación de tareas

```java
@Configuration
@EnableScheduling
public class SchedulingConfig {

  @Bean
  public TaskScheduler taskScheduler() {
    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
    scheduler.setPoolSize(4);
    scheduler.setThreadNamePrefix("scheduler-");
    return scheduler;
  }
}

@Component
class ReportsJob {
  @Scheduled(cron = "0 0 6 * * MON-FRI", zone = "Europe/Madrid")
  public void generateDailyReport() {}
}
```

- Combínalo con `@Async` para ejecutar tareas en paralelo.
- `SchedulingConfigurer` permite definir programaciones complejas en runtime.

---

## Profiles y configuración externa

- Define beans condicionales con `@Profile("dev")`, `@Profile("prod")`.
- `@PropertySource` agrega ficheros de propiedades al contexto.
- El objeto `Environment` expone propiedades y perfiles activos.
- Puedes utilizar `@ConfigurationProperties` para agrupar configuraciones en POJOs reutilizables (también disponible sin Boot).

```java
@Configuration
@PropertySource("classpath:app-${spring.profiles.active}.properties")
public class PropertiesConfig {}
```

---

## Integración con aplicaciones heredadas

- Spring puede coexistir con Java EE: registra `DispatcherServlet` en `web.xml` o `WebApplicationInitializer`.
- Usa `DelegatingFilterProxy` y `DelegatingServletProxy` para aplicar filtros/servlets gestionados por Spring en contenedores externos (Tomcat, WebLogic).
- `JndiObjectFactoryBean` permite reutilizar recursos JNDI ya definidos (DataSource, JMS).

---

## Relación con Spring Boot

- Spring Boot **se apoya** en todos estos conceptos: usa el contenedor IoC, eventos, AOP, contexto, profiles…
- Conocer Spring Framework permite:
  - Desactivar o extender autoconfiguraciones (`@ConditionalOnMissingBean`).
  - Crear starters o librerías agnósticas de Boot.
  - Diagnosticar problemas de arranque (`Failed to configure a DataSource`, `UnsatisfiedDependencyException`).

En los siguientes capítulos profundizamos en la capa web (Spring MVC/WebFlux), acceso a datos, seguridad, mensajería y testing, proporcionando ejemplos prácticos que te permitirán dominar Spring sin depender exclusivamente de Boot.

