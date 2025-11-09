import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const aboutParagraphs = [
  '👋 Soy Antonio Saborido Campos, Ingeniero Informático especializado en desarrollo web Full Stack para el sector público y privado.',
  '🚀 Cuento con más de 3 años de experiencia construyendo soluciones escalables con Angular y Spring Boot, aplicando microservicios, buenas prácticas y metodologías ágiles.',
  '🌍 Mi motivación es crear productos que generen impacto social real, cuidando la calidad del código, la seguridad y la experiencia de usuario.',
  '📚 Me entusiasma seguir aprendiendo y aportar en proyectos innovadores donde la tecnología mejora la vida de las personas.',
];

const experience = [
  {
    date: 'Noviembre 2025 – Actualidad',
    title: 'T-Systems · Analista Programador',
    location: 'Proyecto Generalitat de Catalunya · Barcelona, España',
    description:
      'Proyecto de digitalización para la Generalitat de Catalunya, desarrollando módulos críticos con Angular, Spring Boot y Oracle SQL.',
    bullets: [
      'Implemento nuevas funcionalidades front-end y back-end asegurando consistencia entre capas y cumplimiento de estándares corporativos.',
      'Diseño flujos de integración continua y despliegue para garantizar entregas frecuentes y seguras.',
      'Analizo y optimizo consultas Oracle SQL para mantener tiempos de respuesta estables en escenarios de alto volumen.',
      'Coordino entregables con equipos funcionales y técnicos distribuidos, priorizando la calidad y la comunicación clara.',
    ],
    logo: {src: '/img/logos/t-systems.png', alt: 'Logo T-Systems'},
  },
  {
    date: 'Octubre 2023 – Octubre 2025',
    title: 'Babel · Software Engineer Full Stack',
    location: 'Sevilla, España',
    description:
      'Desarrollo Full Stack con Angular (v13–v19) y Spring Boot (Java 11–17) en proyectos de digitalización para la Junta de Andalucía.',
    bullets: [
      'Diseño de microservicios propios e integración con ecosistemas corporativos, asegurando escalabilidad y seguridad.',
      'Modelado y optimización de bases de datos Oracle SQL y PL/SQL para garantizar rendimiento en producción.',
      'Construcción de interfaces accesibles alineadas con la identidad corporativa y orientadas a mejorar la atención ciudadana.',
      'Aplicación de Lombok, Hibernate, JPQL, Mockito y SonarQube, reforzando la calidad y mantenibilidad del software.',
      'Colaboración con equipos multifuncionales, facilitando la alineación de objetivos y la entrega continua mediante CI/CD.',
    ],
    logo: {src: '/img/logos/babel_logo.jpeg', alt: 'Logo Babel'},
  },
  {
    date: 'Diciembre 2022 – Septiembre 2023',
    title: 'I3US Institute · Software Engineer Full Stack - Investigador',
    location: 'Universidad de Sevilla · Sevilla, España',
    description:
      'Diseño e implementación de un microservicio integrado en Bluejay, framework open-source para auditar equipos ágiles en colaboración con UC Berkeley.',
    bullets: [
      'Desarrollo Full Stack con Angular 16 y Spring Boot (Java 17) desplegado en el ecosistema Governify.',
      'Integración con microservicios existentes mediante REST APIs, extendiendo métricas y prácticas auditables.',
      'Trabajo en un entorno académico internacional con validación de resultados en escenarios reales de docencia.',
      'Puesta en producción del TFG “Modelado, métricas y análisis de Acuerdos de Equipo para el Desarrollo Software”.',
    ],
    logo: {src: '/img/logos/i3us.png', alt: 'Logo I3US Institute'},
  },
];

const education = [
  {
    date: 'Octubre 2019 – Julio 2024',
    title: 'Universidad de Sevilla',
    description: 'Grado en Ingeniería Informática · Ingeniería del Software',
    location: 'Sevilla, España',
    logo: {src: '/img/logos/us.png', alt: 'Logo Universidad de Sevilla'},
  },
];

const certifications = [
  {
    date: '2024',
    title: 'Certificación DevOps Foundation · DevOps Institute',
    pdfUrl: '/assets/pdfs/devops.pdf',
  },
  {
    date: '2024',
    title: 'Certificación Scrum Master · Scrum Manager',
    pdfUrl: '/assets/pdfs/cert_scrum_master.pdf',
  },
  {
    date: '2024',
    title: 'Certificación ITIL Foundation · PeopleCert & Axelos',
    pdfUrl: '/assets/pdfs/itil.pdf',
  },
  {
    date: '2023',
    title: 'Certificado Inglés C1 · British Council',
    pdfUrl: '/assets/pdfs/ingles-c1.pdf',
  },
];

const projects = [
  {
    title: 'Jump Marius',
    description:
      'Juego de plataformas 2D construido con Python y Pygame. Incluye editor de niveles y lanzador propio.',
    repoUrl: 'https://github.com/Antoniiosc7/JumpMarius',
  },
  {
    title: 'Jersey Detection',
    description:
      'Sistema de detección de texto en camisetas de fútbol usando visión por computador con Python.',
    repoUrl: 'https://github.com/Antoniiosc7/JerseyDetection',
  },
  {
    title: 'Twitch Clips',
    description:
      'Integración de la API de Twitch en Svelte para explorar clips destacados de League of Legends.',
    repoUrl: 'https://github.com/Antoniiosc7/TwitchClips',
  },
  {
    title: 'API Tennis',
    description:
      'API REST en Express.js que expone estadísticas de tenis y automatiza ingestión de datos.',
    repoUrl: 'https://github.com/Antoniiosc7/TFG-Server',
  },
  {
    title: 'TP Tester (TFG)',
    description:
      'Microservicio para Bluejay que facilita la creación de métricas y TPAs. Incluye documentación y despliegue completo.',
    repoUrl: 'https://github.com/Antoniiosc7/tp-tester',
    demoUrl: 'https://tester.pompeia.governify.io/',
    highlight: true,
  },
  {
    title: 'Certificaciones',
    description:
      'Plataforma para practicar certificaciones oficiales. Angular 18 en el front y Spring Boot en el backend.',
    demoUrl: 'https://certs.antoniosaborido.es/',
  },
  {
    title: 'Juego de Plataformas en Angular',
    description:
      'Runner 2D con generación procedural de obstáculos y enemigos usando Angular y canvas.',
    repoUrl: 'https://github.com/Antoniiosc7/angular-plataformas',
    demoUrl: 'https://plataformas.antoniosaborido.es/',
  },
];

const featuredPages = [
  {
    title: 'Saborido Etiquetas',
    description: 'Catálogo digital de etiquetas para bodegas de Jerez.',
    url: 'https://saboridoetiquetas.es',
    image: 'https://saboridoetiquetas.es/assets/logo.png',
  },
  {
    title: 'Skill Jump',
    description: 'Juego de habilidad construido con Angular 19 y PixiJS.',
    url: 'https://skilljump.antoniosaborido.es/',
    image: 'https://skilljump.antoniosaborido.es/favicon.ico',
  },
  {
    title: 'Certificaciones',
    description: 'Plataforma de simulacros para certificaciones oficiales.',
    url: 'https://certs.antoniosaborido.es/',
    image: '/img/certificaciones.jpeg',
  },
  {
    title: 'TP Tester',
    description: 'Herramienta en producción para el grupo de investigación Bluejay.',
    url: 'https://tester.pompeia.governify.io/',
    image: 'https://tester.pompeia.governify.io/favicon.ico',
  },
  {
    title: 'PoliteiaSoft',
    description: 'Soluciones digitales para gestión de la organización y participación ciudadana.',
    url: 'https://politeiasoft.com',
    image: '/img/politeia.ico',
  },
  {
    title: 'ClickAware',
    description: 'Plataforma de concienciación y pruebas de phishing para empresas.',
    url: 'https://clickaware.es',
    image: '/img/clickaware.ico',
  },
];

const blogHighlights = [
  {
    title: 'TFG - Modelado y Prueba de TPAs',
    description:
      'Diseño del microservicio TP Tester para auditar equipos ágiles con Bluejay y la Universidad de California.',
    tag: 'TFG',
    to: '/blog/tfg-modelado-prueba-tpas',
  },
  {
    title: 'Proyecto de certificaciones',
    description:
      'Plataforma full stack para preparar certificaciones oficiales con Angular y Spring Boot.',
    tag: 'Angular & Spring',
    to: '/blog/proyecto-certificaciones',
  },
  {
    title: 'Reconocimiento de imágenes',
    description:
      'Sistema en Python que identifica camisetas de fútbol y recupera estadísticas desde EA Sports FC 24.',
    tag: 'Computer Vision',
    to: '/blog/reconocimiento-imagenes',
  },
  {
    title: 'Juego de la serpiente',
    description:
      'Reinvención del clásico Snake en Haskell, con generación procedural y modos de dificultad.',
    tag: 'Functional Programming',
    to: '/blog/juego-serpiente',
  },
];

const techHighlights = [
  'Java · Spring Boot · Hibernate · Lombok',
  'Angular 13-19 · TypeScript · RxJS',
  'Oracle SQL · PL/SQL · Optimización de consultas',
  'Microservicios · REST APIs · Integración Governify',
  'Calidad: Mockito, SonarQube, buenas prácticas',
  'DevOps: Docker, Jenkins, CI/CD, metodologías ágiles',
];

const heroHighlights = [
  {icon: '🚀', text: '3+ años como Ingeniero de Software'},
  {icon: '🛠️', text: 'Angular · Spring Boot · Oracle SQL'},
  {icon: '🏅', text: 'Certificaciones ITIL · Scrum · DevOps'},
];

const contactChips = [
  {icon: '📍', label: 'Jerez de la Frontera, España'},
  {
    icon: '🔗',
    label: 'linkedin.com/in/antonio-saborido',
    href: 'https://www.linkedin.com/in/antoniosaborido/',
  },
  {icon: '📞', label: '(+34) 693 41 52 57', href: 'tel:+34693415257'},
  {icon: '✉️', label: 'antonio.saborido01@gmail.com', href: 'mailto:antonio.saborido01@gmail.com'},
  {icon: '🌐', label: 'antoniosaborido.es', href: 'https://antoniosaborido.es'},
];

export default function Home(): ReactNode {
  return (
    <Layout
      description="Portfolio de Antonio Saborido: experiencia, proyectos y documentación técnica en Angular, Spring y DevOps."
      wrapperClassName={styles.pageWrapper}>
      <main className={styles.main}>
        <header className={styles.hero} id="inicio">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.heroKicker}>Ingeniero Informático · Full Stack</span>
              <h1 className={styles.heroTitle}>Antonio Saborido Campos</h1>
              <p className={styles.heroDescription}>
                Especialista en desarrollo web para el sector público y privado, combinando Angular y Spring
                Boot para crear productos escalables, seguros y orientados a la experiencia de usuario.
              </p>
              <div className={styles.heroHighlights}>
                {heroHighlights.map(highlight => (
                  <article key={highlight.text} className={styles.heroHighlight}>
                    <span className={styles.heroHighlightIcon} aria-hidden="true">
                      {highlight.icon}
                    </span>
                    <p>{highlight.text}</p>
                  </article>
                ))}
              </div>
              <div className={styles.heroActions}>
                <a
                  className={clsx('button button--lg', styles.primaryCta)}
                  href="https://antoniosaborido.es/cvs/resumeES.pdf"
                  target="_blank"
                  rel="noreferrer">
                  Descargar CV
                </a>
                <Link
                  className={clsx('button button--outline button--lg', styles.secondaryCta)}
                  to="/docs/angular/vision-general">
                  Ver documentación técnica
                </Link>
              </div>
              <ul className={styles.heroContactList}>
                {contactChips.map(chip => {
                  const content = (
                    <>
                      <span className={styles.heroContactIcon} aria-hidden="true">
                        {chip.icon}
                      </span>
                      {chip.label}
                    </>
                  );
                  return (
                    <li key={chip.label} className={styles.heroContactItem}>
                      {chip.href ? (
                        <a
                          className={styles.heroContactLink}
                          href={chip.href}
                          target={chip.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer">
                          {content}
                        </a>
                      ) : (
                        <span className={styles.heroContactLink}>{content}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <aside className={styles.heroProfile} aria-label="Perfil de Antonio Saborido">
              <div className={styles.heroPortrait}>
                <img src="/img/foto.png" alt="Antonio Saborido" loading="lazy" />
              </div>
              <div className={styles.heroProfileCard}>
                <p className={styles.heroSignature}>Antonio Saborido</p>
                <h2>Stack principal</h2>
                <p className={styles.heroProfileText}>
                  Angular, Spring Boot, bases de datos Oracle SQL, pipelines CI/CD con Jenkins y observabilidad con
                  Grafana y Prometheus.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className={styles.section} id="about">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Sobre mí</h2>
            <p className={styles.sectionSubtitle}>
              Una combinación de formación técnica, experiencia con clientes públicos y curiosidad
              constante.
            </p>
          </div>
          <div className={styles.card}>
            {aboutParagraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className={styles.section} id="experience">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Experiencia</h2>
            <p className={styles.sectionSubtitle}>
              Más de 3 años impulsando plataformas web full stack con Angular, Spring Boot y Oracle SQL.
            </p>
          </div>
          <ul className={styles.timeline}>
            {experience.map(item => (
              <li key={item.title} className={styles.timelineItem}>
                <div className={styles.timelineDate}>{item.date}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  {item.location && <p className={styles.timelineLocation}>{item.location}</p>}
                  <p>{item.description}</p>
                  {item.bullets && (
                    <ul className={styles.timelineList}>
                      {item.bullets.map(point => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {item.logo && (
                  <div className={styles.timelineLogo} aria-hidden="true">
                    <img src={item.logo.src} alt={item.logo.alt} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="education">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Educación</h2>
            <p className={styles.sectionSubtitle}>
              Formación universitaria y certificaciones que respaldan mi trabajo diario.
            </p>
          </div>
          <ul className={styles.timeline}>
            {education.map(item => (
              <li key={item.title} className={styles.timelineItem}>
                <div className={styles.timelineDate}>{item.date}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  {item.location && <p className={styles.timelineLocation}>{item.location}</p>}
                  <p>{item.description}</p>
                  {item.pdfUrl && (
                    <a className={styles.inlineLink} href={item.pdfUrl} target="_blank" rel="noreferrer">
                      {item.pdfLabel ?? 'Ver documento'}
                    </a>
                  )}
                </div>
                {item.logo && (
                  <div className={styles.timelineLogo} aria-hidden="true">
                    <img src={item.logo.src} alt={item.logo.alt} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="certifications">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Certificaciones y cursos</h2>
            <p className={styles.sectionSubtitle}>
              Invierto cada año en formación para mantenerme actualizado y aportar valor.
            </p>
          </div>
          <div className={styles.grid}>
            {certifications.map(item => (
              <article key={item.title} className={styles.timelineCard}>
                <span className={styles.cardBadge}>{item.date}</span>
                <h3>{item.title}</h3>
                {item.pdfUrl && (
                  <a className={styles.inlineLink} href={item.pdfUrl} target="_blank" rel="noreferrer">
                    Ver credencial
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="projects">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Proyectos destacados</h2>
            <p className={styles.sectionSubtitle}>
              Una mezcla de productos en producción, experimentos personales y colaboraciones
              académicas.
            </p>
          </div>
          <div className={styles.projectGrid}>
            {projects.map(project => (
              <article
                key={project.title}
                className={clsx(styles.projectCard, project.highlight && styles.projectHighlight)}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.cardLinks}>
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      Repositorio
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="pages">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Mis páginas</h2>
            <p className={styles.sectionSubtitle}>
              Proyectos en producción para practicar habilidades y ofrecer valor real.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {featuredPages.map(page => (
              <a key={page.title} className={styles.featureCard} href={page.url} target="_blank" rel="noreferrer">
                <div className={styles.featureImageWrapper}>
                  <img src={page.image} alt={page.title} loading="lazy" />
                </div>
                <div>
                  <h3>{page.title}</h3>
                  <p>{page.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section} id="blog">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Del blog</h2>
            <p className={styles.sectionSubtitle}>
              Artículos donde resumo aprendizajes y procesos reales de los proyectos.
            </p>
          </div>
          <div className={styles.blogGrid}>
            {blogHighlights.map(post => (
              <Link key={post.title} className={styles.blogCard} to={post.to}>
                {post.tag && <span className={styles.blogTag}>{post.tag}</span>}
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className={styles.inlineLink}>Leer artículo →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="docs">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Documentación técnica</h2>
            <p className={styles.sectionSubtitle}>
              Guías, buenas prácticas y estrategias que aplico en proyectos reales con Angular y
              Spring.
            </p>
          </div>
          <div className={styles.docGrid}>
            <Link className={styles.docCard} to="/docs/angular/vision-general">
              <strong>Angular</strong>
              <p>Visión general, novedades y mejores prácticas desde AngularJS hasta Angular 18.</p>
              <span className={styles.inlineLink}>Acceder a la guía →</span>
            </Link>
            <Link className={styles.docCard} to="/docs/spring/introduccion">
              <strong>Spring Boot</strong>
              <p>Arquitectura hexagonal, APIs REST, testing y despliegues listos para producción.</p>
              <span className={styles.inlineLink}>Explorar contenidos →</span>
            </Link>
            <Link className={styles.docCard} to="/docs/estrategia/seleccion-tecnologica">
              <strong>Guías estratégicas</strong>
              <p>Selección tecnológica, escalado de equipos y observabilidad aplicados a proyectos críticos.</p>
              <span className={styles.inlineLink}>Ver playbooks →</span>
            </Link>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionCompact)} id="stack">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Stack y fortalezas</h2>
            <p className={styles.sectionSubtitle}>
              Tecnologías y competencias que pongo al servicio de cada proyecto.
            </p>
          </div>
          <ul className={styles.techList}>
            {techHighlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={clsx(styles.section, styles.sectionCta)} id="contacto">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trabajemos juntos</h2>
            <p className={styles.sectionSubtitle}>
              Si necesitas a alguien que combine entrega rápida con calidad técnica, hablemos.
            </p>
          </div>
          <div className={styles.contactActions}>
            <a
              className={clsx('button button--lg', styles.primaryCta)}
              href="mailto:antoniosaboridocampos@gmail.com">
              Enviar correo
            </a>
            <a
              className={clsx('button button--outline button--lg', styles.secondaryCta)}
              href="https://www.linkedin.com/in/antoniosaborido/"
              target="_blank"
              rel="noreferrer">
              Contactar por LinkedIn
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
