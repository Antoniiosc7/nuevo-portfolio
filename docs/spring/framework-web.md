---
title: Spring MVC y desarrollo web
sidebar_label: Spring MVC
sidebar: springFrameworkSidebar
---

# Desarrollo web con Spring MVC

Spring MVC es el módulo web tradicional de Spring Framework. Permite construir aplicaciones web basadas en el patrón **Front Controller → Handler → View**.

## DispatcherServlet

- `DispatcherServlet` es el punto de entrada. Recibe todas las peticiones, las mapea a handlers y resuelve la vista/respuesta.
- En aplicaciones sin Spring Boot se registra en `web.xml` o mediante `ServletInitializer`.

```java
public class WebAppInitializer implements WebApplicationInitializer {
  @Override
  public void onStartup(ServletContext sc) {
    AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
    ctx.register(WebConfig.class);
    sc.addServlet("dispatcher", new DispatcherServlet(ctx)).addMapping("/");
  }
}
```

## Controladores

```java
@Controller
@RequestMapping("/users")
public class UsersController {

  private final UsersService usersService;

  public UsersController(UsersService usersService) {
    this.usersService = usersService;
  }

  @GetMapping
  public String list(Model model) {
    model.addAttribute("users", usersService.findAll());
    return "users/list";
  }

  @PostMapping
  public String create(@Valid @ModelAttribute UserForm form, BindingResult result, RedirectAttributes redirect) {
    if (result.hasErrors()) return "users/form";
    usersService.save(form);
    redirect.addFlashAttribute("message", "Usuario creado");
    return "redirect:/users";
  }
}
```

- `@Controller` trabaja con vistas (JSP, Thymeleaf, FreeMarker).
- Usa `@RestController` si prefieres respuestas JSON (Spring Boot lo hace por defecto).
- `@ControllerAdvice` permite lógica transversal (manejo de errores, data binders).

## Vistas

- **Thymeleaf** es el motor recomendado.
- También soporta JSP, FreeMarker o Mustache.

`src/main/resources/templates/users/list.html`

```html
<section>
  <h1>Usuarios</h1>
  <table>
    <tr><th>Nombre</th><th>Email</th></tr>
    <tr th:each="user : ${users}">
      <td th:text="${user.name}">Nombre</td>
      <td th:text="${user.email}">Email</td>
    </tr>
  </table>
</section>
```

## Validación

- Integrada con JSR-380/Bean Validation.
- `@Valid`, `BindingResult` y anotaciones como `@NotBlank`, `@Email`.

```java
public record UserForm(@NotBlank String name, @Email String email) {}
```

- `@InitBinder` permite registrar validadores personalizados o formateadores (`Formatter`, `Converter`).

## Manejo de errores

- `@ControllerAdvice` + `@ExceptionHandler` para centralizar errores.
- Páginas de error personalizadas con `SimpleMappingExceptionResolver` o Spring Boot `ErrorController`.

```java
@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String handleNotFound(ResourceNotFoundException ex, Model model) {
    model.addAttribute("message", ex.getMessage());
    return "errors/404";
  }
}
```

## Interceptores y filtros

- `HandlerInterceptor` intercepta antes/después de ejecutar un controlador.
- `OncePerRequestFilter` para lógica transversal (logs, seguridad).

```java
public class RequestLoggingInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    log.info("Request {} {}", request.getMethod(), request.getRequestURI());
    return true;
  }
}
```

- Registra interceptores en un `WebMvcConfigurer`.

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new RequestLoggingInterceptor());
  }
}
```

## Enrutamiento y Content Negotiation

- Define rutas con `@GetMapping`, `@PostMapping`, etc.
- `produces` y `consumes` para control de tipos MIME.
- Content negotiation configurable (JSON vs XML) con `MappingJackson2HttpMessageConverter`.

```java
@GetMapping(value = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<UserDto> getUser(@PathVariable Long id) {}
```

## Respuestas asíncronas

- Usa `Callable`, `DeferredResult` o `WebAsyncTask` para operaciones largas sin bloquear threads.

```java
@GetMapping("/reports/{id}")
public Callable<ResponseEntity<Report>> generateReport(@PathVariable UUID id) {
  return () -> ResponseEntity.ok(reportService.generate(id));
}
```

- Habilita `AsyncSupportConfigurer` para configurar timeouts y ejecutores.

## Subida de archivos

```java
@PostMapping("/upload")
public String upload(@RequestParam("file") MultipartFile file) throws IOException {
  storageService.store(file.getOriginalFilename(), file.getInputStream());
  return "redirect:/";
}
```

- Configura `CommonsMultipartResolver` o `StandardServletMultipartResolver`.
- Establece límites (`spring.servlet.multipart.max-file-size`) aun sin Boot, mediante `MultipartConfigElement`.

## Formularios y binding

- Tags de formulario (`<form:form>`) y auxiliares (`<form:input>`, `<form:errors>`).
- `ConversionService` convierte tipos automáticamente (`String` → `LocalDate`).
- Para colecciones complejas usa `BindingResult` y `@ModelAttribute`.

## Internacionalización (i18n)

- `LocaleResolver` + `ResourceBundleMessageSource`.
- `CookieLocaleResolver` o `SessionLocaleResolver`.

```java
@Configuration
public class I18nConfig implements WebMvcConfigurer {

  @Bean
  public LocaleResolver localeResolver() {
    SessionLocaleResolver resolver = new SessionLocaleResolver();
    resolver.setDefaultLocale(new Locale("es", "ES"));
    return resolver;
  }

  @Bean
  public MessageSource messageSource() {
    ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();
    source.setBasename("classpath:i18n/messages");
    source.setDefaultEncoding("UTF-8");
    return source;
  }
}
```

## WebFlux (reactivo)

- Spring Framework también ofrece **WebFlux** para programación reactiva no bloqueante.
- Compatible con Reactor, R2DBC, WebClient.
- Ideal para microservicios que manejan gran concurrencia o streaming.

```java
@RestController
@RequestMapping("/reactive/users")
public class ReactiveUsersController {

  private final ReactiveUsersService service;

  public ReactiveUsersController(ReactiveUsersService service) {
    this.service = service;
  }

  @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<UserDto> streamUsers() {
    return service.streamActiveUsers();
  }
}
```

## WebSockets y SSE

- Spring provee soporte nativo para WebSockets (`@EnableWebSocketMessageBroker`) y Server-Sent Events.
- Usa `SimpMessagingTemplate` para enviar mensajes, `@MessageMapping` para handlers Stomp.

## Testing con Spring MVC

- `MockMvcBuilders.standaloneSetup` para tests unitarios de controladores.
- `MockMvcBuilders.webAppContextSetup` para pruebas con contexto completo.

```java
@ExtendWith(SpringExtension.class)
@WebAppConfiguration
class UsersControllerTest {

  private MockMvc mockMvc;

  @BeforeEach
  void setUp(WebApplicationContext wac) {
    mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
  }

  @Test
  void devuelveListado() throws Exception {
    mockMvc.perform(get("/users")).andExpect(status().isOk()).andExpect(view().name("users/list"));
  }
}
```

## Comparativa con Spring Boot

- Spring Boot auto configura todo esto: registra `DispatcherServlet`, Thymeleaf, `MessageConverters`, validaciones, etc.
- En Spring “puro” tú decides qué dependencias incluir y cómo configurar cada pieza.
- Comprender Spring MVC te permite personalizar Boot más allá de lo básico (añadir interceptores, message converters propios, etc.).

## Recursos adicionales

- Documentación: [docs.spring.io/spring-framework](https://docs.spring.io/spring-framework/reference/web.html)
- Guías oficiales: [spring.io/guides](https://spring.io/guides) (`gs-serving-web-content`, `gs-handling-form-submission`)
- Libros: *Spring in Action*, *Spring MVC 4 in Action*.

