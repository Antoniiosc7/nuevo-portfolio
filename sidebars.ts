import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  angularSidebar: [
    'angular/vision-general',
    'angular/plataforma',
    'angular/novedades',
    'angular/mejores-practicas',
    'angular/migracion',
  ],
  angularJsSidebar: [
    'angular/angularjs/introduccion',
    'angular/angularjs/primeros-pasos',
    'angular/angularjs/modulos-y-bootstrapping',
    'angular/angularjs/arquitectura',
    'angular/angularjs/directivas-y-componentes',
    'angular/angularjs/filtros-y-pipes',
    'angular/angularjs/routing-y-estados',
    'angular/angularjs/formularios-y-validacion',
    'angular/angularjs/testing-y-quality',
    'angular/angularjs/build-y-deploy',
    'angular/angularjs/herramientas',
  ],
  springFrameworkSidebar: [
    'spring/framework-fundamentos',
    'spring/framework-configuracion',
    'spring/framework-web',
    'spring/framework-data',
    'spring/framework-seguridad',
    'spring/framework-mensajeria',
  ],
  springBootSidebar: [
    'spring/introduccion',
    'spring/diferencias-spring-boot',
    'spring/boot-autoconfiguracion',
    'spring/arquitectura',
    'spring/rest-apis',
    'spring/testing',
    'spring/despliegue',
  ],
  springSecuritySidebar: [
    'spring/security/guia-completa',
  ],
  microserviciosSidebar: [
    'spring/microservicios/arquitectura',
    'spring/microservicios/conectividad',
  ],
  electronSidebar: [
    'electron/introduccion',
    'electron/angular-integration',
    'electron/packaging',
  ],
  estrategiaSidebar: [
    'estrategia/seleccion-tecnologica',
    'estrategia/escalado-equipos',
    'estrategia/observabilidad',
  ],
};

export default sidebars;
