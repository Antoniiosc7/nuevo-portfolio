---
title: Plan de migración a Angular 18
sidebar_label: Migración
sidebar: angularSidebar
---

# Plan de migración a Angular 18

Migrar a Angular 18 implica revisar dependencias, adoptar nuevas APIs y garantizar compatibilidad con tooling empresarial.

## Estrategia sugerida

1. **Auditoría inicial**
   - Ejecuta `ng update` para identificar gaps.
   - Evalúa dependencias de terceros (`npm outdated`).
2. **Actualizar al último Angular 17**
   - Asegura que el proyecto compila con `--configuration production`.
   - Migra a *standalone components* cuando sea viable.
3. **Adopción gradual de Angular 18**
   - Actualiza CLI y paquetes principales.
   - Refactoriza a signals en áreas críticas.
4. **Validación y despliegue**
   - Corre pruebas automatizadas.
   - Ejecuta pruebas manuales en navegadores objetivo.

## Checklist técnico

- [ ] Actualizar `typescript` a la versión 5.6.
- [ ] Sustituir builder Webpack por el nuevo builder (si usas personalizaciones, migra a plugins).
- [ ] Revisar librerías internas para asegurarte de que exportan `standalone components`.
- [ ] Adoptar el nuevo flujo de control (`@if`, `@for`) para plantillas nuevas.

## Riesgos comunes

- **Builders personalizados**: extensiones de Webpack requieren reescritura con la API moderna de CLI.
- **Dependencias de RxJS 6/7**: usa `rxjs-interop` y planifica actualización a RxJS 8.
- **Formularios reactivos**: valida que tus `FormGroup` se integren con signals antes de eliminar `valueChanges`.

## Comunicación

- Define ventanas de *feature freeze*.
- Notifica a negocio de posibles regresiones temporales en estadísticas de rendimiento.
- Elabora guías de adopción para equipos satélite.

## Recursos

- [Guía oficial de actualización](https://angular.dev/update-guide).
- Repositorio `angular-update-workshop` con ejemplos de migración automatizada.
- Plantillas Nx para Angular 18 con configuración optimizada.

