---
title: Seguridad con Spring Security
sidebar_label: Seguridad
sidebar: springFrameworkSidebar
---

# Fundamentos de Spring Security (Spring Framework)

Spring Security es el módulo encargado de proteger aplicaciones Spring, ya sea MVC clásico o servicios REST. Aunque Spring Boot facilita su configuración, puedes usarlo en proyectos Spring “a secas” con total control.

## Componentes clave

- **SecurityContext**: almacena la autenticación actual (usuario y roles).
- **AuthenticationManager**: procesa autenticaciones.
- **UserDetailsService** y **PasswordEncoder**: resuelven credenciales.
- **Filter Chain**: filtros que interceptan cada petición HTTP (autenticación, autorización, CSRF, headers…).

## Configuración básica (Java)

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/css/**", "/js/**", "/login").permitAll()
        .requestMatchers("/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated())
      .formLogin(login -> login
        .loginPage("/login")
        .defaultSuccessUrl("/dashboard", true))
      .logout(logout -> logout.logoutSuccessUrl("/login?logout"))
      .csrf(Customizer.withDefaults());
    return http.build();
  }

  @Bean
  public UserDetailsService userDetailsService() {
    UserDetails admin = User.withUsername("admin")
        .password(passwordEncoder().encode("secret"))
        .roles("ADMIN")
        .build();
    return new InMemoryUserDetailsManager(admin);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
```

- En aplicaciones sin Boot register `DelegatingFilterProxy` en `web.xml` apuntando a `springSecurityFilterChain`.

## Autenticación personalizada

- Implementa `UserDetailsService` para cargar usuarios desde base de datos.
- Usa `DaoAuthenticationProvider` o crea un `AuthenticationProvider` propio.

```java
@Component
public class JpaUserDetailsService implements UserDetailsService {
  private final UsersRepository repository;

  public UserDetails loadUserByUsername(String username) {
    return repository.findByUsername(username)
        .map(user -> User.withUsername(user.username())
                         .password(user.passwordHash())
                         .roles(user.role())
                         .build())
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }
}
```

## API REST con JWT

```java
@Configuration
@EnableWebSecurity
public class ApiSecurityConfig {

  @Bean
  SecurityFilterChain apiFilterChain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {
    http
      .securityMatcher("/api/**")
      .csrf(csrf -> csrf.disable())
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**").permitAll()
        .anyRequest().authenticated());
    return http.build();
  }
}
```

`JwtAuthFilter` valida el token, construye una `UsernamePasswordAuthenticationToken` y la almacena en el `SecurityContext`.

## Autorización declarativa

- Usa `@EnableMethodSecurity` (o `@EnableGlobalMethodSecurity` en versiones previas).
- Anota métodos con `@PreAuthorize("hasRole('ADMIN')")`, `@PostAuthorize`, `@PreFilter`, etc.
- Integra `SecurityExpressionHandler` para expresiones personalizadas.

```java
@Service
public class PaymentsService {

  @PreAuthorize("hasAuthority('PAYMENTS_APPROVE')")
  public void approvePayment(UUID id) {}
}
```

## CSRF, CORS y cabeceras

- CSRF está habilitado por defecto para formularios web; deshabilítalo sólo en APIs stateless.
- Configura CORS cuando el frontend está en dominio distinto:

```java
http.cors(cors -> cors.configurationSource(request -> {
  CorsConfiguration config = new CorsConfiguration();
  config.setAllowedOrigins(List.of("https://frontend.antoniosaborido.es"));
  config.setAllowedMethods(List.of("GET","POST","PATCH"));
  config.setAllowedHeaders(List.of("Authorization","Content-Type"));
  return config;
}));
```

- Spring Security gestiona cabeceras como HSTS, X-Content-Type-Options, XSS-Protection.

## Protección de servicios gRPC / WebSocket

- Spring Security integra interceptores para WebSockets (`ChannelInterceptor`) y mensajes STOMP.
- Para gRPC puedes envolver el servidor en filtros de autenticación (`io.grpc.ServerInterceptors.intercept`).

## Testing de seguridad

- `@WithMockUser` para simular usuarios en tests `MockMvc`.
- `SecurityMockMvcRequestPostProcessors.jwt()` para JWT.
- `TestSecurityContextHolder` manipula el contexto en pruebas unitarias.

```java
@WebMvcTest(controllers = AdminController.class)
class AdminControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  @WithMockUser(username = "admin", roles = "ADMIN")
  void permiteAccesoAdmin() throws Exception {
    mockMvc.perform(get("/admin")).andExpect(status().isOk());
  }
}
```

## Integración con OAuth2 / OpenID Connect

- Usa `spring-security-oauth2-client` para login social o SSO corporativo.
- Configura `ClientRegistrationRepository` y `OAuth2AuthorizedClientService`.
- Para resource servers añade validación de token (`NimbusJwtDecoder`, introspection).

## Buenas prácticas

- Encripta contraseñas con BCrypt/Argon2; nunca almacenes texto plano.
- Agrupa permisos en roles y documenta su significado.
*-* Configura sesiones seguras (`sessionFixation().migrateSession()`, `maximumSessions(1)` para apps sensibles).
- Monitoriza intentos fallidos y bloquea IPs sospechosas con `ApplicationEventPublisher`.
- Externaliza secretos en un vault; evita hardcodear API keys.

Con esta base puedes proteger aplicaciones Spring Framework sin depender de Spring Boot, manteniendo el control sobre autenticación, autorización y políticas de seguridad avanzadas.


