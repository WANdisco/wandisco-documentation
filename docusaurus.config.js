const path = require("path");

const site_urls = {
  wandisco: {
    url: 'https://docs.wandisco.com',
    baseUrl: '/live-data-plane/',
  },
  github: {
    url: 'https://wandisco.github.io',
    baseUrl: '/wandisco-documentation/',
  }
}

const { url = "http://localhost", baseUrl = "/" } = site_urls[process.env.WAND_BUILD];

module.exports = {
  title: "WANdisco LiveData Plane",
  tagline: "Documentation",
  url,
  baseUrl,
  favicon: "img/favicon.png",
  organizationName: "WANdisco",
  projectName: "wandisco-documentation",
  themeConfig: {
    sidebarCollapsible: true,
    navbar: {
      title: "WANdisco Fusion",
      logo: {
        alt: "WANdisco Fusion Logo",
        src: "img/favicon.png",
      },
      items: [
        {
          to: "docs/product-concepts/benefits",
          label: "Product Concepts",
          position: "right",
        },
        {
          to: "docs/quickstarts/preparation/get-started",
          label: "Guides",
          position: "right",
        },
      //  { to: "docs/docs/doc1", label: "Docs", position: "right" },
        { to: "docs/glossary/a", label: "Glossary", position: "right" },
        //  {doc: 'api/api', label: 'API', position: 'right'},
      //  { to: "docs/help/need_help", label: "Help", position: "right" },
      ],
    },
    algolia: {
      apiKey: "456e573413aa88e9ec072a585bec45683",
      indexName: "wandisco",

      //contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {
        facetFilters: [`tags:${process.env.WAND_BUILD}`]
      },
    },
    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/quickstarts/preparation/get-started",
            },
            {
              label: "Product User Guides",
              href: "https://docs.wandisco.com",
            },
            {
              label: "Knowledge Base",
              href: "https://community.wandisco.com/s/knowledge-base",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "WANdisco Community",
              href: "https://community.wandisco.com/",
            },
            {
              label: "Partners",
              href: "//wandisco.com/partners",
            },
            {
              label: "Twitter",
              href: "//twitter.com/WANdisco",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Help",
              to: "docs/help/need_help",
            },
            {
              label: "Blog",
              href: "https://wandisco.com/blog",
            },
            {
              label: "Developer Blog",
              href: "https://blogs.wandisco.com/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WANdisco, Inc.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          path: 'docs',
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          //editUrl:
          //  "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
