---
title: Mejores prácticas Angular 18
sidebar_label: Mejores prácticas
sidebar: angularSidebar
---

# Mejores prácticas para Angular 18

## Arquitectura de componentes

- Prefiere **standalone components**. Agrupa dependencias en `imports` localizados y crea *feature areas* con barriles (`index.ts`).
- Usa **signals para estado local** y limita NgRx/NgXs a estados compartidos complejos.
- Divide vistas extensas en componentes de presentación y contenedores con *signals selectors*.

## Rendimiento

1. **Hydration controlada**: usa `provideClientHydration` y define `deferBlockBehavior` para cargar widgets no críticos.
2. **@defer**: aplaza recursos pesados con estrategias `on idle`, `on viewport` o `on timer`.
3. **Componentes puros**: marca componentes con `changeDetection: OnPush` cuando el modelo no usa signals.
4. **Prefetch inteligente**: configura el Router con `withPreloading(PreloadAllModules)` y estrategias personalizadas basadas en signals.

## Accesibilidad

- Aplica `aria-*` semántico en formularios y menús.
- Usa Testing Library con `screen.findByRole` para validar la accesibilidad.
- Angular Material 18 ofrece *focus outlines* mejorados; evita sobreescribirlos.

## Testing

- Usa **Jest o Vitest** para pruebas unitarias rápidas.
- Pruebas de componentes con `TestBed.configureTestingModule({imports: [Component]})` para aprovechar *standalone*.
- Para efectos basados en signals, utiliza `effectCleanup()` en tus tests.

## Observabilidad

- Habilita `ng.profiler` en desarrollo y envía métricas de *Long Tasks* a herramientas como Lightrun o New Relic.
- Aprovecha `@angular/service-worker` con reporting de fallos en caché.

## Checklist de lanzamiento

- [ ] Auditoría de rendimiento con *Web Vitals*.
- [ ] Revisión de accesibilidad usando Axe DevTools.
- [ ] Validación de internacionalización (i18n) con localización en `es`, `en` y `fr`.
- [ ] Pruebas E2E con Playwright en navegadores principales.

