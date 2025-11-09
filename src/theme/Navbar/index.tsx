import React from 'react';
import Navbar from '@theme-original/Navbar';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

type DocSection = {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
};

const docSections: DocSection[] = [
  {
    label: 'Angular',
    href: '/docs/angular/vision-general',
    isActive: (pathname) =>
      pathname.startsWith('/docs/angular') && !pathname.startsWith('/docs/angular/angularjs'),
  },
  {
    label: 'AngularJS',
    href: '/docs/angular/angularjs/introduccion',
    isActive: (pathname) => pathname.startsWith('/docs/angular/angularjs'),
  },
  {
    label: 'Spring Framework',
    href: '/docs/spring/framework-fundamentos',
    isActive: (pathname) => pathname.startsWith('/docs/spring/framework'),
  },
  {
    label: 'Spring Boot',
    href: '/docs/spring/introduccion',
    isActive: (pathname) =>
      pathname.startsWith('/docs/spring') &&
      !pathname.startsWith('/docs/spring/framework') &&
      !pathname.startsWith('/docs/spring/security') &&
      !pathname.startsWith('/docs/spring/microservicios'),
  },
  {
    label: 'Spring Security',
    href: '/docs/spring/security/guia-completa',
    isActive: (pathname) => pathname.startsWith('/docs/spring/security'),
  },
  {
    label: 'Microservicios Java',
    href: '/docs/spring/microservicios/arquitectura',
    isActive: (pathname) => pathname.startsWith('/docs/spring/microservicios'),
  },
  {
    label: 'Electron',
    href: '/docs/electron/introduccion',
    isActive: (pathname) => pathname.startsWith('/docs/electron'),
  },
  {
    label: 'Guías estratégicas',
    href: '/docs/estrategia/seleccion-tecnologica',
    isActive: (pathname) => pathname.startsWith('/docs/estrategia'),
  },
];

export default function NavbarWrapper(props): JSX.Element {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith('/docs');

  return (
    <>
      <Navbar {...props} />
      {isDocsPage && (
        <div className={styles.docsSubheader} role="navigation" aria-label="Navegación de documentación">
          <div className={styles.docsSubheaderInner}>
            {docSections.map((section) => (
              <Link
                key={section.label}
                className={clsx(styles.docsChip, {
                  [styles.docsChipActive]: section.isActive(location.pathname),
                })}
                to={section.href}
              >
                {section.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

