---
title: Filtros y formateo de datos
sidebar_label: Filtros y pipes
sidebar: angularJsSidebar
---

# Filtros (pipes) en AngularJS

Los filtros transforman datos para mostrarlos en la vista. Son el equivalente a los *pipes* en Angular moderno.

## Filtros integrados

| Filtro | Uso |
| --- | --- |
| `currency` | Formatea números como moneda. |
| `date` | Formatea fechas (`&#123;&#123;fecha \| date:'dd/MM/yyyy'&#125;&#125;`). |
| `json` | Muestra objetos con formato JSON. |
| `limitTo` | Limita longitud de arrays o strings. |
| `lowercase` / `uppercase` | Cambia mayúsculas/minúsculas. |
| `number` | Formatea número con separador decimal. |
| `orderBy` | Ordena colecciones (`| orderBy:'nombre'`). |
| `filter` | Filtra arrays por expresión (`\| filter:&#123;estado:'activo'&#125;`). |

## Composición de filtros

Puedes encadenar filtros:

```html
<li ng-repeat="user in $ctrl.users | filter:$ctrl.search | orderBy:'lastName'">
  {{user.fullName | uppercase}}
</li>
```

## Crear filtros personalizados

```js
angular.module('demoApp').filter('telefono', function () {
  return function (input = '') {
    const digits = input.replace(/\D/g, '');
    if (digits.length !== 9) return input;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };
});
```

Uso:

```html
{{empleado.telefono | telefono}}
```

### Filtros con dependencias

```js
angular.module('demoApp').filter('i18n', function (i18nService) {
  return function (key, locale) {
    return i18nService.translate(key, locale);
  };
});
```

## Uso en controladores y servicios

```js
angular.module('demoApp').controller('InvoicesCtrl', function ($filter) {
  const currency = $filter('currency');
  this.totalFormateado = currency(1200, '€');
});
```

- `$filter('nombreDelFiltro')` devuelve la función filtradora.
- Evita abusar de filtros en controladores para no duplicar lógica de presentación.

## Filtros y rendimiento

- Filtros en `ng-repeat` se evalúan en cada digest cycle. Para grandes colecciones usa filtros en controladores y guarda el resultado en caché.
- Evita filtros costosos (`filter` y `orderBy`) en arrays enormes sin paginación.
- Usa `track by` en `ng-repeat` para evitar recrear elementos innecesarios.

## Alternativas modernas

Si planeas migrar, ten en cuenta que los filtros se reemplazan por pipes en Angular (2+). Recomendar:

- Migrar la lógica a **servicios** o **helpers** reutilizables.
- Utilizar el paquete [`@angular/upgrade`](https://angular.dev/tools/upgrade) para portar componentes y filtros de forma progresiva.

