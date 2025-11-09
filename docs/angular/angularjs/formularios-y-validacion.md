---
title: Formularios y validación
sidebar_label: Formularios y validación
sidebar: angularJsSidebar
---

# Formularios en AngularJS

AngularJS cuenta con un módulo de formularios altamente configurable (`ngModel`, `ngForm`) que soporta validaciones y estados.

## Formularios basados en plantilla

```html
<form name="userForm" novalidate ng-submit="$ctrl.save(userForm)">
  <label>
    Nombre
    <input type="text" name="name" ng-model="$ctrl.user.name" required minlength="3" />
  </label>
  <p ng-if="userForm.name.$touched && userForm.name.$error.required">El nombre es obligatorio.</p>
  <p ng-if="userForm.name.$error.minlength">Debe tener al menos 3 caracteres.</p>

  <label>
    Email
    <input type="email" name="email" ng-model="$ctrl.user.email" required />
  </label>
  <p ng-if="userForm.email.$error.email">Formato inválido.</p>

  <button type="submit" ng-disabled="userForm.$invalid">Guardar</button>
</form>
```

- `name="userForm"` crea un objeto en el scope con estados (`$dirty`, `$valid`, `$error`).
- `novalidate` desactiva validaciones del navegador y permite control completo.

## Estados disponibles

| Propiedad | Descripción |
| --- | --- |
| `$pristine` / `$dirty` | Indica si el usuario modificó el campo. |
| `$valid` / `$invalid` | Resultado de las validaciones. |
| `$touched` / `$untouched` | Detecta si el campo recibió foco y salió de él. |
| `$error` | Objeto con flags por tipo de error (`{required: true}` por ejemplo). |

## Validaciones personalizadas

```js
angular.module('demoApp').directive('uniqueUsername', function (usersService, $q) {
  return {
    require: 'ngModel',
    link(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.uniqueUsername = function (modelValue) {
        return usersService.isAvailable(modelValue).then(
          () => true,
          () => $q.reject('not-available'),
        );
      };
    },
  };
});
```

Uso:

```html
<input type="text" name="username" ng-model="$ctrl.user.username" unique-username />
<p ng-if="userForm.username.$error.uniqueUsername">El usuario ya existe.</p>
```

## Formularios dinámicos con `ng-form`

`ng-form` permite agrupar campos dentro de un formulario principal:

```html
<ng-form name="addressForm">
  <input name="street" ng-model="$ctrl.user.address.street" required />
  <input name="zip" ng-model="$ctrl.user.address.zip" ng-pattern="/^[0-9]{5}$/" />
</ng-form>
```

## Formularios controlados por código

```js
function UserCtrl($scope) {
  const vm = this;
  vm.user = {};

  vm.save = function (form) {
    if (form.$valid) {
      // enviar datos
    } else {
      form.$setSubmitted();
    }
  };

  vm.reset = function (form) {
    vm.user = {};
    form.$setPristine();
    form.$setUntouched();
  };
}
```

## Mensajes reutilizables (`ngMessages`)

```html
<div ng-messages="userForm.email.$error" ng-if="userForm.email.$dirty">
  <p ng-message="required">Obligatorio.</p>
  <p ng-message="email">Formato no válido.</p>
</div>
```

```bash
npm install angular-messages
```

```js
angular.module('demoApp', ['ngMessages']);
```

## Formularios reactivos con `Formly`

Para formularios configurables considera librerías como **Angular Formly** o **Schema Form**, que generan formularios basados en JSON y facilitan su mantenimiento.

## Buenas prácticas

- Usa `form.$setSubmitted()` para mostrar errores tras enviar el formulario.
- Evita lógica compleja en plantillas: delega en el controlador o servicios de validación.
- Sincroniza formularios extensos con RxJS o websockets mediante servicios, no en controllers.
- Para apps grandes, centraliza reglas de negocio en servicios y reutiliza validadores.


