---
title: Herramientas y soporte AngularJS
sidebar_label: Herramientas
sidebar: angularJsSidebar
---

# Herramientas y soporte AngularJS

A pesar de su edad, AngularJS dispone de herramientas maduras para mantener aplicaciones en producción.

## Tooling esencial

- **Angular CLI for AngularJS**: proyectos como [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) y plantillas híbridas facilitan compartir pipeline con Angular moderno.
- **ngUpgrade**: biblioteca oficial que permite ejecutar AngularJS y Angular lado a lado durante una migración gradual.
- **Generadores Yeoman**: `generator-angular` sigue siendo útil para proyectos que requieren scaffolding clásico.
- **Testing**: Jasmine + Karma para unit tests, Protractor o Cypress (mediante adaptadores) para pruebas end-to-end.

## Compatibilidad con navegadores

| Navegador | Estado |
| --- | --- |
| Chrome, Edge, Firefox | Soporte completo (últimas versiones) |
| Safari | Necesita polyfills para `Promise` y `fetch` |
| IE11 | Solo con polyfills y *es5 builds* |

## Estrategia de soporte

1. **Establece un *baseline***: congela dependencias y verifica vulnerabilidades.
2. **Aplica auditoría de rendimiento**: usa herramientas como Batarang o el *Performance Profiler* de Chrome.
3. **Automatiza QA**: pipelines de CI con Karma y reportes de cobertura.
4. **Planifica comunicación**: informa a stakeholders del calendario de retirada.

## Recursos recomendados

- [Guía oficial de migración](https://angular.dev/tools/upgrade).
- [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide).
- Comunidad `#AngularJS` en Discord y Slack de Angular.

## Bundlers y pipelines modernos

Aunque AngularJS nació cuando Grunt y Bower eran estándar, hoy podemos usar herramientas modernas:

- **npm scripts** para tareas básicas (`npm run dev`, `npm run build`).
- **Webpack** o **Vite** para transpilar ES2015+, compilar Sass y minificar assets.
- **Gulp** como orquestador cuando necesitas pipelines más expresivos (procesar plantillas, generar sprites, etc.).
- **Docker** para encapsular dependencias antiguas (por ejemplo, PhantomJS para tests heredados).

### Ejemplo de `package.json`

```json
{
  "scripts": {
    "dev": "webpack serve --env.angularjs",
    "build": "webpack --env.angularjs --mode production",
    "test": "karma start karma.conf.js",
    "lint": "eslint src/**/*.js"
  }
}
```

## Integración continua y automatización

- **GitHub Actions** / **GitLab CI** / **Azure DevOps** pueden ejecutar tests de Karma y generar builds diarios.
- Usa **`npm ci`** para instalaciones reproducibles y fija las versiones mediante `package-lock.json`.
- Genera artefactos minificados (`app.min.js`, `templates.min.js`) y súbelos a un *artifact storage* o CDN.

## Internacionalización y localización

AngularJS no trae i18n completo de serie, pero existen librerías consolidadas:

- **angular-translate** (`pascalprecht.translate`): soporta catálogos JSON/PO, interpolación y cargas asincrónicas.
- **tmhDynamicLocale**: cambia `locale` de AngularJS en tiempo real (formateo de fecha/moneda).
- **angular-gettext**: genera catálogos `.po` y expone filtros `gettext` en las vistas.

### Patrón de archivos

```
src/
├── i18n/
│   ├── es/
│   │   └── common.json
│   ├── en/
│   │   └── common.json
│   └── extractor.config.js
├── app.module.js
└── shared/
    └── translate/
        ├── translate.config.js
        └── translate-loader.service.js
```

### Configuración con `angular-translate`

```js
angular
  .module('app.core')
  .config(($translateProvider) => {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{lang}/{part}.json',
    });
    $translateProvider.preferredLanguage('es');
  })
  .run(($translate, $rootScope) => {
    $rootScope.$on('locale:change', (_, lang) => $translate.use(lang));
  });
```

En cada módulo de feature:

```js
angular.module('app.users').config(($translatePartialLoaderProvider) => {
  $translatePartialLoaderProvider.addPart('users');
});
```

### Carga de catálogos dinámica

Utiliza Webpack o Gulp para generar bundles por idioma:

```js
const gulp = require('gulp');
const angularTranslate = require('gulp-angular-translate');

gulp.task('i18n', function () {
  return gulp
    .src('src/**/*.html')
    .pipe(angularTranslate({defaultLang: 'es', lang: ['es', 'en'], safeMode: true}))
    .pipe(gulp.dest('dist/i18n/'));
});
```

### Testing con múltiples idiomas

- Define `LANG` como variable de entorno en el pipeline (`npm run test -- --lang=en`).
- Mockea `$translateProvider` en tests unitarios para evitar llamadas HTTP.
- Añade pruebas e2e que validen traducciones críticas (`expect(element(by.id('title')).getText()).toEqual('Informe');`).

## Seguridad

- Habilita **Strict Contextual Escaping (SCE)** (`$sce`) para evitar inyecciones de HTML no seguras.
- Ejecuta `npm audit` y revisa dependencias con `retire.js` para detectar vulnerabilidades en librerías antiguas.
- Configura **Content Security Policy (CSP)** y **Subresource Integrity (SRI)** para scripts y estilos.

