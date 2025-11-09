---
title: Plataforma Angular
sidebar_label: Plataforma Angular
sidebar: angularSidebar
---

# Plataforma Angular

Angular combina un framework robusto con un conjunto de herramientas oficiales y un ecosistema vibrante. Esta página resume los pilares que la convierten en una plataforma completa.

## Arquitectura modular

- **Componentes standalone** declarados con `@Component({standalone: true})`, sin necesidad de NgModules.
- **Inyección de dependencias jerárquica** con `@Injectable({providedIn: 'root'})`, `EnvironmentInjector` y scaffolding para micro frontends.
- **Router modular** con `RouteConfig` tipado, lazy loading, `canMatch` y `data` fuertemente tipados.
- **Server Side Rendering** y **Edge Rendering** mediante Angular Universal y `@angular/ssr`.

## Rendimiento como primera clase

- Compilador Ivy + *Incremental build pipeline* reducen trabajo innecesario.
- **Signals** y `ChangeDetectionStrategy.OnPush` limitan el árbol a los componentes que realmente cambian.
- **Partial hydration** y `Defer blocks` (`@defer`, `@placeholder`, `@loading`) optimizan LCP en SSR.
- `ng build --configuration production` realiza *code-splitting*, *prefetching hints* y minificación avanzada.

## Experiencia de desarrollo

- **Angular CLI** automatiza generación de código, pruebas, empaquetado y actualizaciones (`ng generate`, `ng add`, `ng update`).
- **Esquemas personalizados** y `angular.json` permiten adaptar el workspace a las reglas del equipo.
- **DevTools** inspecciona signals, tiempo de detección de cambios y dependencias.
- Integración con **Nx**, **ESLint**, **Prettier**, **Husky** para pipelines CI/CD consistentes.

## Ecosistema

- **Angular Material** y **CDK** ofrecen componentes accesibles y base para sistemas de diseño corporativos.
- **CDK primitives** (overlay, portals, drag & drop, a11y) aceleran la creación de librerías propias.
- Integraciones con Storybook, Jest/Vitest, Cypress/Playwright listas mediante `ng add`.
- Comunidad activa con librerías de estado (`@ngrx/signals`, `ngx-translate`, `angular-three`) y herramientas (Nx, AnalogJS).

## Rutas de aprendizaje

1. Repasa la `Visión general` para entender los fundamentos del runtime.
2. Lee `Novedades por versión` para planificar actualizaciones.
3. Consulta `Mejores prácticas` y `Migración` si vienes de AngularJS o Angular pre-standalone.
4. Explora la sección `Electron` si necesitas empaquetar Angular como aplicación de escritorio.

