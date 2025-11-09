---
title: Directivas y componentes
sidebar_label: Directivas y componentes
sidebar: angularJsSidebar
---

# Directivas y componentes en AngularJS

Las directivas extienden HTML con nuevo comportamiento. Desde AngularJS 1.5 disponemos de la API `component()` que simplifica la creación de componentes reutilizables.

## Directivas integradas esenciales

| Directiva | Uso |
| --- | --- |
| `ng-model` | Enlaza inputs con el modelo. |
| `ng-if`, `ng-show`, `ng-hide` | Control condicional de elementos. |
| `ng-repeat` | Itera sobre colecciones. |
| `ng-class`, `ng-style` | Asigna clases/estilos dinámicamente. |
| `ng-submit`, `ng-click` | Gestionan eventos. |

## Crear una directiva personalizada

```js
angular.module('demoApp').directive('avatar', avatarDirective);

function avatarDirective() {
  return {
    restrict: 'E',
    scope: {
      user: '=',
    },
    template:
      '<div class="avatar"><img ng-src="{{$ctrl.photo}}" alt="{{$ctrl.name}}"/><span>{{$ctrl.name}}</span></div>',
    controller: AvatarCtrl,
    controllerAs: '$ctrl',
    bindToController: true,
  };
}

function AvatarCtrl() {
  const vm = this;
  vm.$onInit = function () {
    vm.photo = vm.user.photo || 'assets/default.png';
    vm.name = vm.user.name;
  };
}
```

### Restricciones (`restrict`)

- `A`: atributo (`<div avatar></div>`).
- `E`: elemento (`<avatar></avatar>`).
- `C`: clase (`<div class="avatar"></div>`).
- `M`: comentario (poco común).

### Scope aislado

| Símbolo | Descripción |
| --- | --- |
| `=` | Enlace bidireccional. |
| `@` | Pasa valores como string. |
| `&` | Expone una función (callback). |

## API `component()`

```js
angular.module('demoApp').component('userCard', {
  bindings: {
    user: '<',
    onSelect: '&',
  },
  templateUrl: 'users/user-card.html',
  controller: function () {
    const vm = this;
    vm.select = () => vm.onSelect({id: vm.user.id});
  },
});
```

- `bindings` sustituye al scope aislado.
- `controllerAs` siempre es `$ctrl`.
- Hooks de ciclo: `$onInit`, `$onChanges`, `$onDestroy`, `$postLink`.

## Comunicación entre componentes

1. **Padre → hijo**: bindings `<` o `@`.
2. **Hijo → padre**: binding `&` que ejecuta un callback.
3. **Servicios compartidos**: mantener estado global.
4. **Eventos `$emit` / `$broadcast`**: útiles en scopes heredados, aunque se recomienda reservarlos para casos puntuales.

## Directivas de atributo comunes

```js
angular.module('demoApp').directive('autoFocus', function ($timeout) {
  return {
    restrict: 'A',
    link(scope, element) {
      $timeout(() => element[0].focus(), 0);
    },
  };
});
```

- `link` permite manipular el DOM.
- Usa `$timeout` en lugar de `setTimeout` para integrarse con el digest.

## Plantillas y `templateUrl`

- Las plantillas se pueden incluir como string (`template: '...'`) o archivo (`templateUrl`).
- Usa `ng-template` o herramientas como `gulp-angular-templatecache` para precargar templates y reducir peticiones HTTP.

## Directivas estructurales personalizadas

```js
angular.module('demoApp').directive('ifRole', function (authService, $compile) {
  return {
    restrict: 'A',
    transclude: 'element',
    priority: 600,
    terminal: true,
    link(scope, element, attrs, ctrl, transclude) {
      const role = attrs.ifRole;
      if (authService.hasRole(role)) {
        transclude(scope, cloned => element.after(cloned));
      }
    },
  };
});
```

- `transclude: 'element'` permite manipular el DOM original como hace `ng-if`.
- `priority` y `terminal` controlan el orden de ejecución respecto a otras directivas.

## Migración futura

- `component()` se asemeja a los componentes de Angular moderno. Utilízalo siempre que sea posible.
- Evita `scope: true` (heredar scope) y prefiere bindings explícitos para facilitar migraciones.
- Para proyectos nuevos planifica la convivencia con Angular usando `ngUpgrade`.

En el siguiente documento profundizamos en filtros y pipes para formatear datos de manera reutilizable.


