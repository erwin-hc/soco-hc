// lib/strapi.ts
import type { CalendarData, InicioData } from "./strapi-types";
import type { Show } from "@/components/show-card";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export function getStrapiMedia(url?: string | null) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

async function fetchAPI(path: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${STRAPI_URL}/api${path}${query ? `?${query}` : ""}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${path}: ${res.status}`);
  }

  return res.json();
}

export async function getInicio(): Promise<InicioData | null> {
  try {
    const timestamp = new Date().getTime();
    const json = await fetchAPI("/inicio", {
      "populate[Integrantes][populate][Imagem]": "true",
      "populate[CapaCelular]": "true",
      "populate[CapaDesktop]": "true",
      _t: timestamp.toString(),
    });
    return json.data as InicioData;
  } catch (error) {
    console.error("Erro ao buscar dados do Início:", error);
    return null;
  }
}

export async function getShows(): Promise<CalendarData[] | null> {
  try {
    const timestamp = new Date().getTime();
    const json = await fetchAPI("/calendars", {
      "populate[image]": "true",
      sort: "date:asc",
      _t: timestamp.toString(),
    });
    return json.data as CalendarData[];
  } catch (error) {
    console.error("Erro ao buscar dados dos Shows:", error);
    return null;
  }
}

function parseISODate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export function mapCalendarToShow(calendar: CalendarData): Show {
  const local = [calendar.local, calendar.adress].filter(Boolean).join(", ")

  return {
    id: calendar.documentId || String(calendar.id),
    title: calendar.title || "",
    local,
    city: calendar.city || "",
    date: calendar.date ? parseISODate(calendar.date) : undefined,
    time: calendar.time || "",
    image: getStrapiMedia(calendar.image?.url) || "/placeholder.svg",
    linkIngresso: calendar.linkIngresso || "",
    description: calendar.description,
  }
}