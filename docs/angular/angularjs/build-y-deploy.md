---
title: Build y despliegue en producción
sidebar_label: Build y despliegue
sidebar: angularJsSidebar
---

# Build y despliegue en producción

Una vez que la aplicación funciona en local, necesitas un pipeline para empaquetar, optimizar y desplegar tus assets.

## Objetivos del build

- Minificar y concatenar JavaScript, CSS y plantillas HTML.
- Versionar archivos (hash) para cache busting.
- Generar mapas de fuentes (source maps) para depuración.
- Ejecutar tests y linters antes de publicar.

## Estrategia con Webpack

```bash
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env \
  html-webpack-plugin mini-css-extract-plugin terser-webpack-plugin css-minimizer-webpack-plugin \
  --save-dev
```

`webpack.config.js` (simplificado):

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => ({
  entry: './src/app.module.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'production' ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: [['@babel/preset-env', {targets: 'defaults'}]]},
        },
      },
      {test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
      {test: /\.html$/, loader: 'ngtemplate-loader!html-loader'},
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: argv.mode === 'production' ? '[name].[contenthash].css' : '[name].css'}),
    new HtmlWebpackPlugin({template: './src/index.html'}),
  ],
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    port: 3000,
  },
});
```

- Usa `ngtemplate-loader` para precargar plantillas.
- `historyApiFallback` soporta HTML5 mode en routing.

## Alternativas legacy

- **Gulp**: `gulp-uglify`, `gulp-sass`, `gulp-angular-templatecache`.
- **Grunt**: `grunt-contrib-uglify`, `grunt-contrib-less`, `grunt-filerev`.
- Si tu proyecto ya usa Grunt/Gulp, puedes modernizar paso a paso sin reescribir todo.

## Preparar assets estáticos

1. Ejecuta `npm run build` y sube el contenido de `dist/` a tu servidor web (Nginx, Apache, S3 + CloudFront…).
2. Configura **HTTP/2** y **compresión gzip/brotli**.
3. Añade encabezados de caché con expiraciones altas (`Cache-Control: max-age=31536000`) y hash en el nombre del archivo.
4. Configura una ruta catch-all (`try_files $uri $uri/ /index.html`) para SPA.

## Variables de entorno

- Usa `angular.constant` para definir endpoints según entorno:

```js
angular.module('demoApp').constant('API_BASE', window.__CONFIG__.apiBase);
```

- Genera un archivo `config.js` por entorno y cárgalo antes del bundle:

```html
<script src="/config/config.prod.js"></script>
<script src="/dist/main.abc123.js"></script>
```

## Gestión de traducciones en el build

- Mantén los catálogos en `src/i18n/<lang>/<part>.json`.
- Usa plugins como `gulp-angular-translate`, `angular-translate-loader-static-files` o `webpack-angular-translate` para concatenar y minificar los diccionarios.
- Genera bundles separados por idioma cuando el tamaño es crítico (`dist/es/app-es.[hash].js`, `dist/en/app-en.[hash].js`) y sirve el correspondiente desde tu CDN.
- Valida traducciones con scripts automáticos (`yarn i18n:check`) que detectan claves huérfanas o faltantes comparando idiomas.

### Ejemplo con Webpack y `ContextReplacementPlugin`

```js
const webpack = require('webpack');

plugins: [
  new webpack.ContextReplacementPlugin(/i18n[\\/]/, (context) => {
    if (!/lang/.test(context.context)) {
      context.regExp = /es|en|fr/;
    }
  }),
];
```

### Arquitectura multilingüe en producción

| Estrategia | Ventajas | Consideraciones |
| --- | --- | --- |
| **Cargar un único bundle + catálogos diferidos** | Menor coste de build y caching sencillo. | Requiere HTTP adicional al cambiar de idioma. |
| **Bundles por idioma** | Elimina peticiones extra, mejora el primer render. | Necesitas lógica en CDN/servidor para servir el asset correcto. |
| **Catálogos compartidos vía CDN** | Ideal cuando múltiples apps comparten traducciones. | Versiona y firma los catálogos para evitar “cache poisoning”. |

## Observabilidad

- Habilita **$logProvider.debugEnabled(false)** en producción.
- Instrumenta errores con `$exceptionHandler` y servicios como Sentry o LogRocket.
- Expon métricas de performance con `window.performance` + `PerformanceObserver`.

## Checklist de producción

- [ ] Build minificado y hash en archivos.
- [ ] Source maps privados para depuración.
- [ ] Tests unitarios y e2e en verde.
- [ ] Linter y auditoría (`npm audit`, `eslint`).
- [ ] Configuración de servidor con fallback a `index.html`.
- [ ] Monitorización de errores y logs.
- [ ] Documentación de rollback (versionado de artefactos).

## Integración con CI/CD

Ejemplo en GitLab CI:

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm run lint
    - npm run test -- --single-run

build:
  stage: build
  script:
    - npm ci
    - npm run build -- --mode production
  artifacts:
    paths:
      - dist

deploy:
  stage: deploy
  script:
    - rsync -avz dist/ user@server:/var/www/app
  only:
    - main
```

## Plan de salida

- Mantén entornos `dev`, `staging`, `prod`.
- Versiona releases con etiquetas git (`v1.12.0-legacy`) y conserva builds anteriores para rollback.
- Documenta dependencias críticas (plugins jQuery, polyfills) y revisa su estado de mantenimiento.


