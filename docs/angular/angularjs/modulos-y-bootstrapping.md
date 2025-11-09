---
title: Módulos, inyección y ciclo de arranque
sidebar_label: Módulos y bootstrapping
sidebar: angularJsSidebar
---

# Módulos, inyección y ciclo de vida

AngularJS organiza el código en **módulos**. Cada módulo declara las dependencias que necesita y define componentes, servicios, filtros y configuraciones.

## Definir un módulo

```js
angular.module('demoApp', ['ngRoute', 'ngAnimate']);
```

- Primer argumento: nombre del módulo.
- Segundo argumento: dependencias (otros módulos).

### Dividir el proyecto

```js
angular.module('demoApp.core', ['ngResource']);
angular.module('demoApp.users', []);
angular.module('demoApp', ['demoApp.core', 'demoApp.users']);
```

## Bootstrapping

Puedes iniciar la aplicación de dos formas:

1. **Automática**: atributo `ng-app="demoApp"` en el `<html>` o `<body>`.
2. **Manual**: útil para cargar configuración o esperar datos antes de iniciar.

```js
angular.element(document).ready(function () {
  angular.bootstrap(document, ['demoApp'], {strictDi: true});
});
```

`strictDi` obliga a declarar dependencias de forma explícita y evita errores tras minificar.

## Ciclo `config()` y `run()`

```js
angular
  .module('demoApp')
  .config(configure)
  .run(initialize);

configure.$inject = ['$routeProvider', '$httpProvider'];
function configure($routeProvider, $httpProvider) {
  $routeProvider.when('/', {template: '<app-root></app-root>'});
  $httpProvider.interceptors.push('authInterceptor');
}

initialize.$inject = ['$rootScope', 'sessionService'];
function initialize($rootScope, sessionService) {
  $rootScope.$on('$routeChangeStart', sessionService.ensureSession);
}
```

- **`config()`**: ejecuta antes que cualquier servicio. Útil para definir rutas, interceptores HTTP o providers.
- **`run()`**: se ejecuta cuando la app está lista. Ideal para listeners globales, precargar datos o inicializar servicios.

## Inyección de dependencias (DI)

AngularJS ofrece tres estilos:

1. **Inline array**:
   ```js
   angular.module('demoApp').controller('HomeCtrl', ['$scope', 'userService', function ($scope, userService) {}]);
   ```
2. **Asignar `$inject`** (recomendado):
   ```js
   HomeCtrl.$inject = ['$scope', 'userService'];
   function HomeCtrl($scope, userService) {}
   angular.module('demoApp').controller('HomeCtrl', HomeCtrl);
   ```
3. **Annotation plugin**: herramientas como `ng-annotate` agregan `$inject` automáticamente durante el build.

## Providers, services, factories

| Tipo | Uso | Ejemplo |
| --- | --- | --- |
| `service` | Clases instanciadas con `new`. Acceso a `this`. | `angular.module('app').service('UserService', UserService);` |
| `factory` | Función que retorna un objeto literal. Flexible. | `angular.module('app').factory('userFactory', factoryFn);` |
| `provider` | Configurable desde `.config()`. | `app.provider('apiUrl', function(){ this.setBase = ...; this.$get = ...; });` |
| `value` / `constant` | Datos estáticos. `constant` disponible en `config()`. | `app.constant('API_BASE', '/api');` |

## `$rootScope` y scopes hijos

- `$rootScope` es el ancestro de todos los scopes.
- Cada controlador crea un scope hijo.
- Evita contaminar `$rootScope`: usa servicios para compartir estado.
- Usa `controllerAs` (`ng-controller="HomeCtrl as vm"`) para evitar problemas de prototipado.

## Watchers y digest cycle

- Cada binding `{{exp}}` crea un watcher.
- El digest cycle (`$digest`) evalúa watchers y actualiza la UI.
- Usa `::` para bindings que no cambian (`{{::vm.title}}`).
- Evita watchers innecesarios; usa eventos (`$emit`, `$broadcast`) o servicios para coordinar cambios.

## Organizar el proyecto

```
src/
├── app.module.js
├── app.config.js
├── app.run.js
├── core/
│   ├── logging.service.js
│   ├── http.interceptor.js
│   └── constants.js
├── users/
│   ├── users.module.js
│   ├── users.component.js
│   └── users.service.js
└── shared/
    ├── directives/
    ├── filters/
    └── services/
```

Cada carpeta tiene su módulo, declarando dependencias explícitas y facilitando pruebas y migraciones futuras.


