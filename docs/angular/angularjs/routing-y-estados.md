---
title: Routing y gestión de estados
sidebar_label: Routing y estados
sidebar: angularJsSidebar
---

# Routing en AngularJS

AngularJS ofrece varias opciones para manejar la navegación. Las dos más populares son:

- **`ngRoute`**: enrutador oficial, sencillo y suficiente para apps pequeñas.
- **`ui-router`** (`@uirouter/angularjs`): maneja estados anidados y parámetros complejos.

## Configuración con `ngRoute`

Instala el módulo:

```bash
npm install angular-route
```

```js
angular.module('demoApp', ['ngRoute']).config(configureRoutes);

configureRoutes.$inject = ['$routeProvider', '$locationProvider'];
function configureRoutes($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      template: '<dashboard></dashboard>',
    })
    .when('/users/:id', {
      template: '<user-detail></user-detail>',
      resolve: {
        user: function (usersService, $route) {
          return usersService.get($route.current.params.id);
        },
      },
    })
    .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
}
```

- `resolve` permite cargar datos antes de renderizar la vista.
- `html5Mode` elimina el hash (`#/`) y requiere configuración del servidor.

## Configuración con UI-Router

```bash
npm install @uirouter/angularjs
```

```js
angular.module('demoApp', ['ui.router']).config(configureStates);

function configureStates($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      template: '<app-shell><ui-view/></app-shell>',
    })
    .state('app.dashboard', {
      url: '/',
      component: 'dashboard',
    })
    .state('app.users', {
      abstract: true,
      url: '/users',
      template: '<ui-view/>',
    })
    .state('app.users.list', {
      url: '',
      component: 'usersList',
    })
    .state('app.users.detail', {
      url: '/:id',
      component: 'userDetail',
      resolve: {
        user: function (usersService, $transition$) {
          return usersService.get($transition$.params().id);
        },
      },
    });

  $urlRouterProvider.otherwise('/');
}
```

- Estados anidados (`app.users.detail`) permiten componer layouts complejos.
- `resolve` recibe `$transition$` para acceder a parámetros.

## Layouts y vistas anidadas

Con UI-Router puedes definir múltiples `<ui-view>` para renders simultáneos (sidebar, contenido).

```html
<div>
  <aside ui-view="menu"></aside>
  <main ui-view></main>
</div>
```

```js
$stateProvider.state('app.dashboard', {
  url: '/',
  views: {
    menu: {component: 'sideMenu'},
    '': {component: 'dashboard'},
  },
});
```

## Autorización y navegación

- Usa `resolve` o `transition hooks` (`$transitions.onBefore`) para proteger rutas.
- Redirige a login si no existe sesión.

```js
$transitions.onBefore({to: 'app.**'}, function (transition) {
  const auth = transition.injector().get('authService');
  if (!auth.isAuthenticated()) {
    return transition.router.stateService.target('login');
  }
});
```

## Scroll y títulos

```js
$rootScope.$on('$routeChangeSuccess', function (event, current) {
  document.title = current.$$route.title || 'Demo App';
  window.scrollTo(0, 0);
});
```

Con UI-Router:

```js
$transitions.onSuccess({}, transition => {
  const title = transition.to().data?.title ?? 'Demo App';
  document.title = title;
  window.scrollTo(0, 0);
});
```

## Estrategias modernas

- Para proyectos grandes, considera **lazy loading** usando `require.ensure` o `import()` dentro de `resolve`.
- Usa `ui-router-extras` para features avanzadas como sticky states.
- Si planeas migrar a Angular, puedes mantener UI-Router (también existe versión para Angular moderno).


