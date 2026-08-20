import { ShowsList } from "@/components/shows-list"
import { getShows, mapCalendarToShow } from "@/lib/strapi"
import type { Show } from "@/components/show-card"

function sortShowsByDate(shows: Show[]): Show[] {
  const now = Date.now()
  
  // Futuros primeiro, do mais distante para o mais próximo
  const future = shows
    .filter((s) => !s.date || s.date.getTime() >= now)
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
  
  // Passados depois, do mais recente para o mais antigo
  const past = shows
    .filter((s) => s.date && s.date.getTime() < now)
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))

  return [...future, ...past]
}

const fallbackShows: Show[] = [
  {
    id: "1",
    title: "Paulera Noise Festival",
    local: "Quiosque Do Nono, Estrada do Atalho - 941, Vila Nova",
    city: "Joinville, SC",
    date: new Date('09/05/2026'),
    time: "15h",
    image: "/shows/show-01.png",
    linkIngresso:"https://101tickets.com.br/events/details/Paulera-Noise-Fest-05-09",
    description: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Após 3 anos, o Paulera retorna à estrada do atalho para sua 12ª edição!" },
          { type: "text", text: "E para esse retorno, temos o prazer de trazer dois nomes gigantes do hardcore nacional" },
          { type: "text", text: "@sociedadearmadahc, diretamente de Santos" },
          { type: "text", text: "@basttardzhc, diretamente de São Luís" },
          { type: "text", text: "unem a força de umas das principais referências da cena desde 1994" },
          { type: "text", text: "junto com um dos maiores expoentes do gênero na atualidade!" },
          { type: "text", text: "Nosso rolê ainda contará com outras 3 atrações de peso:" },
          { type: "text", text: "As já “pratas da casa”" },
          { type: "text", text: "@socohc" },
          { type: "text", text: "@asfixiamental" },
          { type: "text", text: "@dadkrents direto de Araranguá, pela primeira vez em Joinville." },
          { type: "text", text: "Tu não é doido de ficar de fora dessa né?!" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "SCREAM FEST",
    local: "Bro Cave",
    city: "Floripa, SC",
    date: new Date("08/08/26"),
    time: "18h",
    image: "/shows/show-02.png",
    linkIngresso:"",
    description: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Um evento com a temática do filme slasher que revolucionou o gênero nos anos 90. SOCO HC + EUTAH + PSICODOSY" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "santa catarina underground #5",
    local: "sosiedade laranjeiras, Rua do Centenário 38",
    city: "brusque, sc",
    date: new Date("01/24/26"),
    time: "16h",
    image: "/shows/show-03.png",    
    description: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "santa catarina underground #5." },
        ],
      },
    ],
  },
]

export default async function ShowsPage() {
  const dados = await getShows()

  
  const shows = sortShowsByDate(dados && dados.length > 0 ? dados.map(mapCalendarToShow) : fallbackShows)

  return <ShowsList shows={shows} />
}