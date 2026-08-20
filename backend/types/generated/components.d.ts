import type { Schema, Struct } from '@strapi/strapi';

export interface IntegrantesIntegranteItem extends Struct.ComponentSchema {
  collectionName: 'components_integrantes_integrante_items';
  info: {
    displayName: 'IntegranteItem';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    Imagem: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    instagram: Schema.Attribute.String;
    instrumento: Schema.Attribute.String;
    nome: Schema.Attribute.String;
  };
}

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: 'MenuItem';
  };
  attributes: {
    key: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'integrantes.integrante-item': IntegrantesIntegranteItem;
      'menu.menu-item': MenuMenuItem;
    }
  }
}
