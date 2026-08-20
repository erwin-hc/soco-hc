import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['pt-BR'],
    translations: {
      'pt-BR': {
        'Auth.form.welcome.title': ' ',
        'Auth.form.welcome.subtitle': ' ',                
        'content-type-builder.plugin.name': 'Criar Conteúdo',
        'content-manager.plugin.name':'Inserir Dados',
        'app.components.LeftMenu.navbrand.title': 'Painel Soco',
      },
    },
    head: {
      title: 'Painel Soco',
    },
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

        document.title = "Painel Soco";
    const titleObserver = new MutationObserver(() => {
      if (document.title !== "Painel Soco HC") {
        document.title = "Painel Soco HC";
      }
    });
    titleObserver.observe(document.querySelector("title") as Node, {
      childList: true,
    });
  },
};
