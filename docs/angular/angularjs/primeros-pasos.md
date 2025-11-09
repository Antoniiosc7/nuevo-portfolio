---
title: Primeros pasos con AngularJS
sidebar_label: Primeros pasos
sidebar: angularJsSidebar
description: Guía para inicializar un proyecto AngularJS desde cero, configurar scripts y adoptar buenas prácticas.
---

# Crear tu primer proyecto AngularJS

Este documento cubre los fundamentos para arrancar un proyecto desde cero, comprender la estructura mínima y montar un entorno de desarrollo moderno.

## 1. Preparar el entorno

1. Instala **Node.js** (≥ 16) y **npm**.
2. Crea una carpeta para el proyecto:
   ```bash
   mkdir angularjs-demo && cd angularjs-demo
   npm init -y
   ```
3. Instala AngularJS y utilidades recomendadas:
   ```bash
   npm install angular@1.8.3 angular-mocks --save
   npm install lite-server concurrently --save-dev
   ```

## 2. Estructura mínima

```
angularjs-demo/
├── package.json
├── src/
│   ├── app.module.js
│   ├── app.component.js
│   ├── app.component.html
│   └── index.html
└── bs-config.json
```

### `index.html`

```html
<!doctype html>
<html lang="es" ng-app="demoApp">
  <head>
    <meta charset="UTF-8" />
    <title>AngularJS Demo</title>
  </head>
  <body>
    <app-root></app-root>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
    <script src="app.module.js"></script>
    <script src="app.component.js"></script>
  </body>
</html>
```

### `app.module.js`

```js
(function () {
  'use strict';

  angular.module('demoApp', []);
})();
```

### `app.component.js`

```js
(function () {
  'use strict';

  angular
    .module('demoApp')
    .component('appRoot', {
      templateUrl: 'app.component.html',
      controller: AppController,
    });

  function AppController() {
    const vm = this;
    vm.title = 'Hola AngularJS';
  }
})();
```

### `app.component.html`

```html
<section class="hero">
  <h1>{{$ctrl.title}}</h1>
  <p>Primer componente en AngularJS</p>
</section>
```

## 3. Scripts de desarrollo

En `package.json`:

```json
{
  "scripts": {
    "start": "concurrently \"npm:serve\" \"npm:watch\"",
    "serve": "lite-server",
    "watch": "npm run build:templates -- --watch",
    "build:templates": "echo \"(opcional) compilar plantillas\""
  }
}
```

- **lite-server** refresca el navegador automáticamente.
- Puedes reemplazarlo por **Vite** o **Webpack Dev Server** si necesitas bundling.

## 4. Buenas prácticas iniciales

- Usa **ESLint** con la configuración `eslint-config-angular`.
- Prefiere **`component()`** sobre `directive` para nuevas piezas reutilizables.
- Organiza el código por dominios (`users/`, `orders/`) en lugar de tipos (`components/`, `services/`).
- Habilita **Strict Dependency Injection** (`ng-strict-di`) para detectar problemas en minificación.

## 5. Convenciones de archivos `.js`

| Patrón | Descripción | Ejemplo |
| --- | --- | --- |
| `app.module.js` | Módulo raíz con dependencias. | `angular.module('demoApp', ['demoApp.core', 'demoApp.users']);` |
| `app.config.js` | Configuración de rutas, interceptores, providers. | `angular.module('demoApp').config(routeConfig);` |
| `feature/*.module.js` | Submódulos por dominio. | `angular.module('demoApp.users', []);` |
| `feature/*.component.js` | Componentes con `bindings` y `templateUrl`. | `angular.module('demoApp.users').component('userList', {...});` |
| `feature/*.service.js` | Lógica compartida o acceso a API. | `angular.module('demoApp.users').service('UserService', UserService);` |
| `feature/*.translations.json` | Catálogos de idioma por feature. | `users.translations.json` |

Agrupa cada conjunto (`module/config/run/component/service`) en la misma carpeta para facilitar refactors y migración futura.

## 6. Recursos de plantillas

- [angular/angular-seed](https://github.com/angular/angular-seed) – proyecto oficial minimal.
- [John Papa HotTowel](https://github.com/johnpapa/hottowel-angular) – estructura escalable con Gulp.
- [Vite + AngularJS starter](https://github.com/andrewbents/vite-angularjs) – ejemplo moderno.

Con estos pasos tendrás un proyecto listo para experimentar y seguir las guías avanzadas de esta serie.


