import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Antonio Saborido',
  tagline: 'Ingeniero de Software y Desarrollador Full Stack',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://antoniosaborido.es',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'antoniosaborido',
  projectName: 'portfolio',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/antonio-social-card.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      title: 'Antonio Saborido',
      items: [
        {to: '/', label: 'Inicio', position: 'left'},
        {to: '/#about', label: 'Sobre mí', position: 'left'},
        {to: '/#experience', label: 'Experiencia', position: 'left'},
        {to: '/#projects', label: 'Proyectos', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/documentacion', label: 'Documentación', position: 'left', activeBaseRegex: 'docs|documentacion'},
        {
          href: 'https://antoniosaborido.es/cvs/resumeES.pdf',
          label: 'CV',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/antoniosaborido/',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://github.com/Antoniiosc7',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Perfil',
          items: [
            {
              label: 'Sobre mí',
              to: '/#about',
            },
            {
              label: 'Experiencia',
              to: '/#experience',
            },
          ],
        },
        {
          title: 'Documentación',
          items: [
            {
              label: 'Angular',
              to: '/docs/angular/vision-general',
            },
            {
              label: 'Spring',
              to: '/docs/spring/introduccion',
            },
            {
              label: 'Guías Estratégicas',
              to: '/docs/estrategia/seleccion-tecnologica',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/antoniosaborido/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Antoniiosc7',
            },
            {
              label: 'Correo',
              href: 'mailto:antoniosaboridocampos@gmail.com',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Antonio Saborido Campos. Todo el contenido está disponible para fines profesionales.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
