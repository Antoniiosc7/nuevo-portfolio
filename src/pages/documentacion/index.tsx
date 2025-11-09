import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const sections = [
  {
    id: 'angular',
    title: 'Angular moderno',
    description:
      'Standalone components, signals, tooling avanzado y guías de migración para proyectos empresariales.',
    href: '/docs/angular/vision-general',
    highlights: ['Arquitectura', 'Tooling y CI/CD', 'Migración a v18'],
  },
  {
    id: 'angularjs',
    title: 'AngularJS legacy',
    description:
      'Comprende a fondo el framework clásico: scopes, digest cycle, directivas, servicios y despliegue.',
    href: '/docs/angular/angularjs/introduccion',
    highlights: ['Bootstrapping', 'Directivas y pipes', 'Testing y despliegue'],
  },
  {
    id: 'spring-framework',
    title: 'Spring Framework',
    description:
      'Contenedor IoC, configuración avanzada, MVC, datos y mensajería para aplicaciones Java escalables.',
    href: '/docs/spring/framework-fundamentos',
    highlights: ['IoC y DI', 'Spring MVC y WebFlux', 'Integración con datos'],
  },
  {
    id: 'spring-boot',
    title: 'Spring Boot',
    description:
      'Autoconfiguración, empaquetado, Actuator, perfiles y mejores prácticas para microservicios productivos.',
    href: '/docs/spring/introduccion',
    highlights: ['Autoconfiguración', 'API REST', 'Testing y despliegue'],
  },
  {
    id: 'spring-security',
    title: 'Spring Security',
    description:
      'Control total sobre autenticación, autorización, gestión de tokens JWT y estrategias de protección.',
    href: '/docs/spring/security/guia-completa',
    highlights: ['JWT y OAuth2', 'Token lifecycle', 'Buenas prácticas'],
  },
  {
    id: 'microservicios',
    title: 'Microservicios en Java',
    description:
      'Patrones de arquitectura, comunicación y resiliencia para ecosistemas distribuidos con Spring.',
    href: '/docs/spring/microservicios/arquitectura',
    highlights: ['Arquitectura hexagonal', 'Service discovery', 'Observabilidad'],
  },
  {
    id: 'electron',
    title: 'Electron',
    description:
      'Construye aplicaciones de escritorio con Angular y web stack, con empaquetado y distribución profesional.',
    href: '/docs/electron/introduccion',
    highlights: ['Fundamentos', 'Integración con Angular', 'Packaging'],
  },
  {
    id: 'estrategia',
    title: 'Guías estratégicas',
    description:
      'Selección tecnológica, escalado de equipos y observabilidad para proyectos digitales de larga duración.',
    href: '/docs/estrategia/seleccion-tecnologica',
    highlights: ['Roadmaps', 'Procesos de equipo', 'Observabilidad'],
  },
];

export default function DocumentationLanding(): JSX.Element {
  return (
    <Layout
      title="Documentación"
      description="Explora guías técnicas sobre Angular, Spring y más tecnologías utilizadas en mi día a día."
    >
      <main className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Documentación técnica</p>
          <h1>Selecciona la tecnología que quieres explorar</h1>
          <p className={styles.subtitle}>
            Cada sección está organizada con su propio índice para que encuentres rápidamente prácticas, ejemplos y
            procesos de despliegue. Empieza por la visión general o salta directamente al capítulo que necesites.
          </p>
        </section>

        <section className={styles.subheader}>
          <span className={styles.subheaderLabel}>Stacks disponibles:</span>
          <nav className={styles.subheaderNav} aria-label="Navegación rápida de tecnologías">
            {sections.map((section) => (
              <Link key={section.id} className={styles.subheaderChip} to={section.href}>
                {section.title}
              </Link>
            ))}
          </nav>
        </section>

        <section className={styles.grid}>
          {sections.map((section) => (
            <article key={section.id} className={styles.card}>
              <div className={styles.cardBody}>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <ul className={styles.pills}>
                  {section.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.cardFooter}>
                <Link className={styles.cardLink} to={section.href}>
                  Abrir documentación →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}

