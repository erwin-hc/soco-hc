import Hero from "@/components/hero"
import { getInicio } from "@/lib/strapi"

export default async function HomePage() {
  const dados = await getInicio()
  
  return (
  <Hero dados={dados}/>
)
}
