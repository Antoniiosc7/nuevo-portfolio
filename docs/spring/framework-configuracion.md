---
title: Configuración avanzada en Spring
sidebar_label: Configuración avanzada
sidebar: springFrameworkSidebar
---

# Configuración avanzada en Spring Framework

Además del escaneo automático de componentes, Spring permite configurar beans de forma muy granular. Esta guía resume técnicas para entornos enterprise donde se requiere control total.

## Beans condicionales

- `@Conditional` evalúa cualquier condición antes de registrar un bean.
- Spring ofrece anotaciones derivadas (`@ConditionalOnClass`, `@ConditionalOnMissingBean`, etc.) que puedes reutilizar fuera de Boot.

```java
@Configuration
@ConditionalOnClass(MongoClient.class)
public class MongoConfig {

  @Bean
  public MongoTemplate mongoTemplate(MongoClient client) {
    return new MongoTemplate(client, "demo");
  }
}
```

Implementa tu propio `Condition`:

```java
class CloudCondition implements Condition {
  @Override
  public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
    return context.getEnvironment().containsProperty("cloud.enabled");
  }
}
```

## Configuración modular

- Divide la configuración en paquetes (`common-config`, `infra-db`, `infra-messaging`).
- Usa `@Import` para componer módulos independientemente del orden.

```java
@Configuration
@Import({DatabaseConfig.class, MessagingConfig.class})
public class ApplicationConfig {}
```

## BeanFactory y ApplicationContext aware

- `BeanFactoryAware`, `ApplicationContextAware` te permiten interactuar con el contenedor.
- Útil para escenarios donde necesitas programar la creación de beans en runtime.

```java
@Component
public class DynamicBeanRegistrar implements ApplicationContextAware {

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) {
    ConfigurableListableBeanFactory factory = ((ConfigurableApplicationContext) applicationContext).getBeanFactory();
    if (!factory.containsBean("auditLogger")) {
      factory.registerSingleton("auditLogger", new AuditLogger());
    }
  }
}
```

## PropertySources y entorno

- Agrega propiedades en tiempo de ejecución:

```java
@Component
public class GitInfoPropertySource implements EnvironmentPostProcessor {
  @Override
  public void postProcessEnvironment(ConfigurableEnvironment env, SpringApplication application) {
    Path gitProps = Paths.get("git.properties");
    if (Files.exists(gitProps)) {
      Properties props = new Properties();
      try (InputStream in = Files.newInputStream(gitProps)) {
        props.load(in);
      }
      env.getPropertySources().addLast(new PropertiesPropertySource("git-info", props));
    }
  }
}
```

- En aplicaciones sin Boot puedes registrar un `PropertySourcesPlaceholderConfigurer`.

## Conversión y formateo

- `ConversionService` resuelve conversiones personalizadas.
- Implementa `Converter<S, T>` o `Formatter<T>` y registra en `FormattingConversionServiceFactoryBean`.

```java
@Component
public class StringToMoneyConverter implements Converter<String, Money> {
  @Override
  public Money convert(String source) {
    return Money.parse(source, Locale.forLanguageTag("es-ES"));
  }
}
```

## BeanDefinitionRegistryPostProcessor

- Permite registrar/alterar definiciones antes de instanciarlas.
- Útil para generar beans dinámicos (por ejemplo, repositorios gRPC por convención).

```java
@Component
public class RepositoryScanner implements BeanDefinitionRegistryPostProcessor {

  @Override
  public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) {
    ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
    scanner.addIncludeFilter(new AnnotationTypeFilter(DomainRepository.class));
    scanner.findCandidateComponents("com.demo").forEach(def -> registry.registerBeanDefinition(def.getBeanClassName(), def));
  }
}
```

## Programación y ejecución asíncrona

- `@EnableAsync` + `@Async` para métodos que se ejecutan en un pool separado.

```java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {
  @Override
  public Executor getAsyncExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(4);
    executor.setQueueCapacity(100);
    executor.initialize();
    return executor;
  }
}
```

- Gestiona excepciones con `AsyncUncaughtExceptionHandler`.

## Externalización de configuración

- `YamlPropertiesFactoryBean` permite importar YAML en aplicaciones legacy.
- `CompositePropertySource` combina propiedades de múltiples orígenes (S3, base de datos, etc.).
- Para entornos enterprise, delega la resolución de propiedades a un servicio central (Spring Cloud Config, Consul, Zookeeper).

## Construcción de librerías reutilizables

- Empaqueta configuraciones comunes en módulos Maven/Gradle (`common-logging`, `common-outbox`).
- Publica starters internos que registran beans y exponen `@ConfigurationProperties`.
- Documenta pre-requisitos (propiedades necesarias, beans requeridos) para facilitar la adopción en otros proyectos.

Con estas técnicas puedes controlar completamente cómo se inicializa y configura tu aplicación Spring, sin depender de la autoconfiguración de Spring Boot, manteniendo la flexibilidad necesaria en entornos corporativos complejos.


