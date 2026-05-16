import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseDocsOptions(title: string): BaseLayoutProps {
  return {
    nav: {
      title,
      url: '/',
      transparentMode: 'top',
    },
    links: [
      { type: 'main', url: '/', text: 'Home', on: 'nav' },
      { type: 'main', url: '/portfolio', text: 'Portfolio', on: 'nav' },
      { type: 'main', url: '/engine', text: 'Engine', on: 'nav' },
      {
        type: 'menu',
        text: 'Docs',
        on: 'nav',
        items: [
          { url: '/docs-engine', text: 'Engine Docs', description: 'Prism Engine documentation' },
          { url: '/docs-csharp', text: 'C# Docs', description: 'Personal C# notes & patterns' },
          { url: '/docs-unity', text: 'Unity Docs', description: 'Unity workflows & reference' },
        ],
      },
    ],
    githubUrl: 'https://github.com/Flatortee/flatortee.github.io',
    searchToggle: {
      enabled: false,
    },
  };
}
