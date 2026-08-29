import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import staticHomePagePlugin from './plugins/static-home-page';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sticky Notes in Menubar',
  tagline: 'Floating notes with beautiful colors for tasks, ideas and to-dos.',
  favicon: 'img/favicon.png',
  
  customFields: {
    appurl: 'https://apps.apple.com/in/app/quick-note-in-the-menu/id1472935217?mt=12'
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  
  url: 'https://quicknoteapp.com',
  baseUrl: '/',

  trailingSlash: true, // Ensure URLs end with a trailing slash
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kaunteya', // Usually your GitHub org/user name.
  projectName: 'qn-website', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  // The home page is a plain HTML/CSS/JS page in `home/`, not a Docusaurus
  // page. Everything under /docs and /blog is still built by Docusaurus.
  plugins: [staticHomePagePlugin],

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
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
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Quick Note',
      logo: {
        alt: 'Quick Note Logo',
        src: 'img/app-icon.png',
        // The home page is a plain static page (home/index.html), not a
        // Docusaurus route. target '_top' makes this a regular <a>, so the
        // router doesn't try (and fail) to navigate to it client-side.
        href: '/',
        target: '_top',
      },
      items: [
        {to: '/docs', label: 'Docs', position: 'left'}
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
