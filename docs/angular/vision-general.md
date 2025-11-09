---
title: Visión general de Angular 18
sidebar_label: Visión general
sidebar: angularSidebar
---

# Angular 18 en resumen

Angular 18 consolida la transición hacia componentes *standalone* y un modelo reactivo basado en *signals*. La plataforma ofrece un flujo de trabajo opinado de principio a fin: desde la creación del proyecto hasta el despliegue, pasando por tooling, pruebas y mantenimiento.

## Objetivos principales

1. **Rendimiento consistente** tanto en renderizado inicial como en interacciones.
2. **Productividad** con herramientas que automatizan patrones repetitivos.
3. **Ecosistema con tipado fuerte** y APIs intuitivas.

## Arquitectura en capas

| Capa | Responsabilidad | Herramientas clave |
| --- | --- | --- |
| Presentación | Componentes standalone, templates HTML, estilos scoped | Signals, control flow `@if`, `@for`, Angular Material, CDK |
| Orquestación | Routers, resolvers, guards, servicios de UI | Router, `RouterOutlet`, `RouteConfig`, `provideRouter` |
| Dominio/servicios | Lógica de negocio, estado compartido, comunicación API | Servicios injectables, HttpClient, *state stores* basados en signals |
| Infraestructura | Integraciones externas, almacenamiento, logging | Http interceptors, providers personalizados, Angular Universal |

## Ciclo de renderizado y datos

1. **Detección de cambios** por zonas (Zone.js) o mediante el nuevo `NoopNgZone` + signals.
2. **Signals** representan estado derivado y se actualizan automáticamente.
3. **Control Flow** (`@if`, `@for`, `@switch`) utiliza compilación AOT para generar código altamente optimizado.
4. **Hydration parcial** sincroniza apps SSR con el cliente sin recomponer el árbol completo.

```ts
import {signal, computed} from '@angular/core';

const productos = signal([{id: 1, precio: 12, unidades: 2}]);
const total = computed(() => productos().reduce((acc, item) => acc + item.precio * item.unidades, 0));
```

## Workspace y tooling

- **Angular CLI** (`ng`) crea, prueba, lint y actualiza proyectos. Soporta workspaces multiproyecto y monorepos con Nx.
- **ESBuild builder** y **Lightning CSS** reducen tiempos de compilación hasta un 50 % respecto a webpack.
- **CLI schematics** permiten estandarizar estructuras en equipos grandes.
- **DevTools** incluye inspector de signals, análisis de rendimiento y recomendaciones de optimización.

## Testing integrado

- **Jasmine/Karma** como configuración por defecto.
- Integración oficial con **Vitest** y **Playwright** mediante `ng add`.
- `ComponentHarness` del CDK facilita pruebas de componentes desacoplados de la implementación de DOM.
- Los proyectos nuevos se generan con `TestModule` simplificado basado en `TestBed.configureTestingModule({imports: [...]})`.

## Distribución y despliegue

- Soporte oficial para `ng deploy` con adaptadores (Firebase, Vercel, Netlify, GitHub Pages).
- `ng build --watch` y `ng test --watch` se integran con Nx computation caching.
- `ng build --ssr` produce artefactos preparados para Node.js, Cloud Functions y plataformas edge.

## Compatibilidad

- **Node.js** ≥ 20.11.
- **TypeScript** 5.6.
- **RxJS** 8 (con compatibilidad para RxJS 7 mediante paquete `rxjs-interop`).
- Navegadores Evergreen (Chrome, Edge, Firefox, Safari) y Safari iOS 17+.

## Ciclo de lanzamientos

- Lanzamientos mayores en **marzo** y **septiembre**.
- **Minor releases** mensuales con mejoras graduales (18.1, 18.2…).
- **LTS** se extiende 18 meses desde cada versión mayor.

> Usa `ng update @angular/core@18 @angular/cli@18` para mantener un proyecto en la rama estable.

