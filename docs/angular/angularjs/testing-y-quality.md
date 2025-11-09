---
title: Testing y calidad
sidebar_label: Testing y calidad
sidebar: angularJsSidebar
---

# Testing en AngularJS

AngularJS fue uno de los primeros frameworks que apostó por pruebas automatizadas desde su diseño. Aquí cubrimos las herramientas esenciales.

## Stack recomendado

- **Jasmine**: framework de pruebas BDD.
- **Karma**: lanzador de tests en navegadores reales o headless.
- **angular-mocks**: utilidades para inyectar dependencias y simular HTTP.
- **Protractor** (legacy) o **Cypress** para pruebas end-to-end.

## Configurar Karma + Jasmine

```bash
npm install karma karma-jasmine karma-chrome-launcher jasmine-core angular-mocks --save-dev
npx karma init
```

`karma.conf.js`:

```js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.module.js',
      'src/**/*.js',
      'src/**/*.spec.js',
      'src/**/*.html',
    ],
    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'src/**/!(*.spec).js': ['coverage'],
    },
    browsers: ['ChromeHeadless'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
    },
  });
};
```

## Test unitarios de componentes

```js
describe('Component: userCard', function () {
  beforeEach(module('demoApp'));

  let $componentController;
  beforeEach(inject(function (_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('debe exponer la función select', function () {
    const bindings = {user: {id: 1}, onSelect: jasmine.createSpy('onSelect')};
    const ctrl = $componentController('userCard', null, bindings);

    ctrl.select();

    expect(bindings.onSelect).toHaveBeenCalledWith({id: 1});
  });
});
```

## Simular HTTP con `$httpBackend`

```js
describe('Service: usersService', function () {
  let usersService, $httpBackend;

  beforeEach(module('demoApp'));
  beforeEach(inject(function (_usersService_, _$httpBackend_) {
    usersService = _usersService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => $httpBackend.verifyNoOutstandingExpectation());

  it('debe recuperar usuarios', function () {
    $httpBackend.expectGET('/api/users').respond([{id: 1, name: 'Ada'}]);

    let result;
    usersService.list().then(data => (result = data));
    $httpBackend.flush();

    expect(result.length).toBe(1);
  });
});
```

## Testing de directivas

```js
describe('Directive: autoFocus', function () {
  let $compile, $rootScope;

  beforeEach(module('demoApp'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('debe enfocar el elemento', function () {
    const element = $compile('<input auto-focus />')($rootScope);
    $rootScope.$digest();
    expect(document.activeElement).toBe(element[0]);
  });
});
```

## End-to-end (E2E)

- **Protractor** era el estándar, pero ha quedado en mantenimiento. Si tu proyecto lo usa, puedes mantenerlo o migrar a Cypress/Playwright.
- Con **Cypress**:

```bash
npm install cypress --save-dev
npx cypress open
```

```js
describe('Dashboard', () => {
  it('debe mostrar el nombre de usuario', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Hola AngularJS');
  });
});
```

## Integración continua

```yaml
# .github/workflows/test.yml
name: test
on: [push, pull_request]
jobs:
  karma:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test -- --watch=false
```

## Cobertura y calidad

- Apunta a >80% de cobertura con **Istanbul** / `karma-coverage`.
- Usa **ESLint** con [eslint-plugin-angular](https://github.com/Gillespie59/eslint-plugin-angular).
- Ejecuta **`npm audit`** y herramientas como **Retire.js** para detectar vulnerabilidades en dependencias legacy.

## Consejos

- Los tests deben ser rápidos y aislados; usa `$httpBackend` y mocks para evitar dependencias externas.
- Para apps grandes, combina tests unitarios, de integración (componentes) y E2E en el pipeline.
- Documenta estrategias de debugging (`ngMock`, `angular.mock.inject`) para facilitar onboarding.


