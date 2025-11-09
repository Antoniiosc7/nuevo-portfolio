---
title: Observabilidad
sidebar_label: Observabilidad
sidebar: estrategiaSidebar
---

# Observabilidad en Angular

Controlar la experiencia del usuario en producción requiere instrumentación y monitoreo desde el día uno.

## Instrumentación esencial

- **Web Vitals**: captura LCP, CLS, FID (o INP) con la librería oficial y envía datos a tu APM.
- **Errores de cliente**: usa `ErrorHandler` personalizado para registrar trazas con contextos de usuario.
- **Performance marks**: marca interacciones clave (`performance.mark`) para medir latencia de componentes.

## Integraciones sugeridas

- **OpenTelemetry**: integra `@opentelemetry/api` y exporta trazas a servicios como Jaeger o Grafana Tempo.
- **Logs estructurados**: envía eventos JSON a plataformas como Datadog o Elastic.
- **Feature flags**: registra qué variaciones están activas para correlacionarlas con KPIs.

## Paneles recomendados

- Tiempos de carga segmentados por dispositivo y región.
- Errores JavaScript por versión y tipo.
- Latencia de APIs consumidas desde Angular.
- Tasa de conversión antes y después de releases.

## Alertas

- **Degradación de LCP** > 2.5 s durante 5 minutos.
- **Errores críticas** por minuto > 30.
- **Desfase de sincronización** entre front y backend (cuando cambian contratos).

## Checklist de observabilidad

- [ ] ErrorHandler centralizado.
- [ ] Reporte automático de Web Vitals.
- [ ] Integración con herramientas de sesión (FullStory, LogRocket) opcional.
- [ ] Playbooks documentados para incidentes.


