---
title: Novedades principales
sidebar_label: Novedades
sidebar: angularSidebar
---

# Novedades por versión de Angular

Angular evoluciona rápidamente. Esta cronología resume los cambios más relevantes desde Angular 13 hasta la versión 18, con foco en aquello que impacta en proyectos empresariales.

## Resumen rápido

| Versión | Lanzamiento | Cambios clave |
| --- | --- | --- |
| 18 | Sep 2025 | Signals omnipresentes, control flow `@if/@for`, builder esbuild, hydration parcial. |
| 17 | Mar 2025 | Standalone por defecto, `@defer` blocks, CLI modernizada, i18n simplificado. |
| 16 | Sep 2024 | Signals (preview), zoneless CD, SSR mejorado, DevTools renovado. |
| 15 | Nov 2022 | Standalone APIs estables, directivas standalone, `RouterLinkActive` mejorado. |
| 14 | Jun 2022 | Typed forms, CLI streamlined, componentes opcionales sin NgModules. |
| 13 | Nov 2021 | Eliminación de ViewEngine, componentes standalone en experimental, ESBuild preview. |

> Recuerda ejecutar `ng update` en cada ciclo mayor y revisar el [Angular Update Guide](https://angular.dev/update-guide) para tareas específicas.

---

## Angular 18 (septiembre 2025)

### Signals en todo el framework

- Formularios reactivos y template-driven expuestos como signals (`form.valueSignal`).
- Router con `route.dataSignal`, `paramSignal` y `defer` para carga perezosa declarativa.
- `@angular/core` incorpora `computedAsync` para componer efectos con peticiones HTTP.

```ts
import {computed, signal} from '@angular/core';

const carrito = signal([{sku: 'A12', unidades: 1}]);
const total = computed(() => carrito().reduce((acc, item) => acc + item.unidades * precio(item.sku), 0));
```

### Builder basado en esbuild

- Compilaciones y pruebas hasta 40 % más rápidas.
- Soporte nativo para CSS Modules, Sass y PostCSS.
- API extensible mediante `angular.json` (`"builder": "@angular-devkit/build-angular:browser-esbuild"`).

### Angular Material Renaissance

- Nuevos *design tokens* alineados con Material 3.
- Componentes reescritos con Lit para reducir el peso del bundle.
- Mejoras de accesibilidad con soporte completo de `aria-*` y gestos.

### DevTools y DX

- Explorador de signals en la extensión oficial.
- Visualización de frames bloqueados y recomendaciones de optimización.
- `ng g @angular/pwa` renueva la plantilla con soporte precache granulado.

---

## Angular 17 (marzo 2025)

- **Standalone por defecto**: `ng new` genera proyectos sin NgModules; `provideRouter` se adopta en plantillas.
- **Control flow `@defer`** para cargar componentes cuando el usuario interactúa o la red lo permite.
- **Internationalization** simplificada (`ng extract-i18n --format=json`, mensajes con interpolación tipada).
- **CLI** actualiza los generadores (`ng generate component`) para soportar `styleUrls` array y `signals`.

---

## Angular 16 (septiembre 2024)

- **Signals (developer preview)** introducen un modelo reactivo nativo.
- **Zoneless change detection** con `bootstrapApplication(AppComponent, {providers: [provideExperimentalZonelessChangeDetection()]})`.
- **SSR mejorado** con streaming out-of-the-box y `transferState` optimizado.
- **HttpClient** añade `withFetch()` para usar `fetch` en lugar de XHR.

---

## Angular 15 (noviembre 2022)

- **Standalone APIs estables**: `bootstrapApplication()`, `provideHttpClient()`.
- **Router** soporta `Route.title`, `Route.providers` y guardias en línea.
- **Directive Composition API** permite reutilizar lógica sin herencia.
- **Angular Material** actualiza a MDC y Documentación con API typed.

---

## Angular 14 (junio 2022)

- **Typed Reactive Forms**: `FormControl<string>` evita castings manuales.
- `inject()` disponible en componentes, directivas y pipes.
- `Standalone Components` en modo developer preview.
- CLI admite configuraciones basadas en `strictTemplates` y `strictInjectionParameters` por defecto.

---

## Angular 13 (noviembre 2021)

- **Ivy-only**: se elimina ViewEngine, simplificando paquetes de terceros.
- `ng update` incluye migraciones automáticas a RxJS 7.
- Soporte de ESBuild (opt-in) con `ng build --configuration esbuild`.
- Nuevos paquetes de testing que eliminan dependencias a `zone.js` en escenarios específicos.

---

## Recomendaciones para actualizar

1. **Revisa breaking changes** de la guía oficial y del repositorio `angular/angular`.
2. **Ejecuta `ng update`** para aplicar migraciones automáticas.
3. **Actualiza dependencias críticas** (Angular Material, CDK, NgRx, Transloco) siguiendo sus propias guías.
4. **Refactoriza gradualmente** hacia standalone y signals; no es necesario migrar todo de golpe.
5. **Automatiza pruebas**: prioriza suites e2e y contractuales antes de la fecha de actualización.

Con esta visión puedes planificar con seguridad la adopción de nuevas versiones y aprovechar sus beneficios sin sobresaltos.

