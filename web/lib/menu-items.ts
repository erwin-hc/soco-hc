interface MenuItem {
  url?: string
  title?: string
  facebook?: string
  instagram?: string
}

export interface MenuItemsProps {
  [key: string]: MenuItem
}

export const menuItems: MenuItemsProps = {
  home: { url: "/home", title: "Início" },
  calendar: { url: "/shows", title: "Shows" },
  music: { url: "/musicas", title: "Músicas" },
  merch: { url: "https://soco-hc.catalog.yampi.io/camisetas?sort_by=name_asc", title: "Merchs" },
  facebook: { url: "https://www.facebook.com/socohxcx", title: "" },
  instagram: { url: "https://www.instagram.com/socohc/", title: "" },
}