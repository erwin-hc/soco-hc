import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
        'pt-BR'
    ],
  },
  bootstrap(app: StrapiApp) {
    const style = document.createElement("style");
    style.innerHTML = `
      [href*="cloud.strapi.io"],
      [aria-label*="Deploy"],
      nav a[href*="deploy"],
      a[href*="/market.strpi.io"],
      [aria-label*="Loja"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  },
};
