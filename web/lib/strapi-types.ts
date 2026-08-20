// lib/strapi-types.ts
// Tipos para os dados retornados pela API do Strapi v5

export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: Record<string, unknown> | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
}

export interface IntegranteItem {
  id: number
  nome?: string
  instrumento?: string
  facebook?: string
  instagram?: string
  Imagem?: StrapiMedia | null
}

export interface InicioData {
  id: number
  documentId: string
  CapaCelular?: StrapiMedia | null
  CapaDesktop?: StrapiMedia | null
  Logo_Titulo?: string
  Historia_Titulo?: string
  Historia_Conteudo?: string
  Integrantes?: IntegranteItem[]
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface CalendarData {
  id: number
  documentId: string
  title?: string
  local?: string
  adress?: string
  city?: string
  date?: string
  time?: string
  image?: StrapiMedia | null
  linkIngresso?: string
  description?: unknown
  slug?: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}
