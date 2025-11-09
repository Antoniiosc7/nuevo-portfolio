---
title: Acceso a datos y transacciones
sidebar_label: Datos y transacciones
sidebar: springFrameworkSidebar
---

# Acceso a datos con Spring Framework

Spring facilita el acceso a bases de datos relacionales y NoSQL con abstracciones limpias y soporte para manejo transaccional.

## JDBC Template y NamedParameterJdbcTemplate

```java
@Repository
public class UsersJdbcRepository {

  private final NamedParameterJdbcTemplate jdbc;

  public UsersJdbcRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<User> findAll() {
    return jdbc.query("SELECT * FROM users", BeanPropertyRowMapper.newInstance(User.class));
  }
}
```

- Maneja recursos (Connection, Statement, ResultSet) automáticamente.
- Soporta batch, key holders, RowMapper personalizados.
- `SimpleJdbcInsert`, `SimpleJdbcCall` simplifican operaciones comunes.
- Útil para consultas que requieren máximo control o cuando no se desea JPA.

## Spring Data JPA

```java
public interface UsersRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String email);
}
```

- Métodos derivados, `@Query`, proyecciones (`interface UserView`), `EntityGraph`.
- Integración con `PagingAndSortingRepository` para paginación.
- Usa `Specification` para filtros dinámicos y `Querydsl` para queries type-safe.

### Configuración mínima

```java
@Configuration
@EnableJpaRepositories(basePackages = "com.demo.users")
@EnableTransactionManagement
public class JpaConfig {

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    vendorAdapter.setGenerateDdl(false);
    vendorAdapter.setShowSql(true);

    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
    factory.setDataSource(dataSource);
    factory.setJpaVendorAdapter(vendorAdapter);
    factory.setPackagesToScan("com.demo.users");
    factory.setJpaPropertyMap(Map.of(
      "hibernate.dialect", "org.hibernate.dialect.OracleDialect",
      "hibernate.format_sql", "true"
    ));
    return factory;
  }
}
```

Spring Boot auto configura todo esto al detectar `spring-boot-starter-data-jpa`, pero en Spring clásico debemos declararlo manualmente.

## Transacciones

- Habilita `@EnableTransactionManagement`.
- Usa `@Transactional` a nivel de servicio.
- Configura un `PlatformTransactionManager` (JPA, JDBC, JMS, Mongo).

```java
@Service
public class UsersService {

  private final UsersRepository repository;

  public UsersService(UsersRepository repository) {
    this.repository = repository;
  }

  @Transactional
  public void registerUser(RegisterUserCommand command) {
    repository.save(map(command));
  }

  @Transactional(readOnly = true)
  public Optional<User> find(Long id) {
    return repository.findById(id).map(this::map);
  }
}
```

- Propagación (`Propagation.REQUIRES_NEW`, `MANDATORY`, etc.) y aislamiento (`Isolation.SERIALIZABLE`, `READ_COMMITTED`) disponibles.
- Configura `TransactionTemplate` para casos donde se necesita manejar transacciones de forma programática.
- Usa `@TransactionalEventListener` para publicar eventos una vez confirmada la transacción.

## Bases de datos reactivas

- Spring Data Reactive (MongoDB, Cassandra, Redis, R2DBC) trabaja con `Flux`/`Mono` (Project Reactor).
- Ideal para aplicaciones con alta concurrencia y latencias reducidas.

## Repositorios personalizados

Puedes combinar repositorios Spring Data con implementaciones personalizadas:

```java
public interface UsersRepositoryCustom {
  List<UserEntity> findActiveUsers();
}

public class UsersRepositoryImpl implements UsersRepositoryCustom {
  // Named queries, QueryDSL, Criteria API...
}

public interface UsersRepository extends JpaRepository<UserEntity, Long>, UsersRepositoryCustom {}
```

## Migraciones y versionado de esquema

- **Flyway** / **Liquibase** para mantener el esquema sincronizado.
- Versiona scripts (`V1__init.sql`, `V2__indexes.sql`).
- Ejecuta migraciones en el pipeline antes del despliegue.
- Usa `FlywayCallbacks` para tareas adicionales (semillas, auditoría).

## Testing de datos

- Usa `@DataJpaTest` con bases en memoria o Testcontainers.
- `@Sql` para preparar/limpiar datos.
- `EntityManagerFactory` permite tests de integración sin servidor completo.
- `DbUnit` o `Testcontainers` ayudan a aislar datos reproducibles.

## Diferencias con Spring Boot

- En Spring clásico configuras manualmente `DataSource`, `EntityManager` y transacciones.
- Spring Boot detecta el driver, configura HikariCP, crea el `EntityManagerFactory` y expone propiedades vía `application.yml`.
- Con Boot puedes añadir starters (`spring-boot-starter-data-jpa`, `spring-boot-starter-data-redis`) y autoconfiguración se encarga del wiring.

---

## Acceso a NoSQL y otros almacenes

| Proyecto | Descripción | Ejemplo |
| --- | --- | --- |
| Spring Data MongoDB | Repositorios reactivos y bloqueantes para Mongo | `MongoRepository`, `ReactiveMongoTemplate` |
| Spring Data Redis | Cache y pub/sub sobre Redis | `RedisTemplate`, `StringRedisTemplate` |
| Spring Data Elasticsearch | Búsquedas full-text | `ElasticsearchRepository` |
| Spring Data Neo4j | Grafos con Cypher | `Neo4jRepository` |

```java
public interface SessionRepository extends RedisRepository<Session, String> {
  List<Session> findByUserId(String userId);
}
```

`MongoTemplate`, `RedisTemplate`, `CassandraTemplate` ofrecen control bajo nivel.

---

## Data Access Objects manuales

Spring permite combinar diferentes estilos:

```java
@Repository
public class OrdersDao {

  private final JdbcTemplate jdbcTemplate;
  private final NamedParameterJdbcTemplate namedTemplate;
  private final EntityManager entityManager;

  public OrdersDao(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedTemplate, EntityManager entityManager) {
    this.jdbcTemplate = jdbcTemplate;
    this.namedTemplate = namedTemplate;
    this.entityManager = entityManager;
  }

  public OrderEntity findById(Long id) {
    return entityManager.find(OrderEntity.class, id);
  }

  public List<OrderSummary> findSummaries() {
    return namedTemplate.query("""
        SELECT id, customer_name, total_amount
        FROM orders
        WHERE status = :status
        """, Map.of("status", "PAID"), (rs, rowNum) ->
        new OrderSummary(rs.getLong("id"), rs.getString("customer_name"), rs.getBigDecimal("total_amount")));
  }
}
```

---

## Cache y rendimiento

- `@EnableCaching` + `@Cacheable`, `@CachePut`, `@CacheEvict`.
- Proveedores: ConcurrentMap (por defecto), Caffeine, Redis, Ehcache, Hazelcast.

```java
@Service
public class CatalogService {

  @Cacheable(cacheNames = "books", key = "#isbn")
  public BookDto findByIsbn(String isbn) { ... }
}
```

- Configura TTL y tamaños máximos para evitar memory leaks.

