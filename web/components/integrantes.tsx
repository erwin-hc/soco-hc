import type { InicioData, IntegranteItem } from "@/lib/strapi-types"
import { Integrante } from "./foto-integrantes"
import { motion, AnimatePresence } from "motion/react"

type IntegranteCompativel = Omit<IntegranteItem, "id"> & {
  id?: number
  imagem?: string
}

const integranteStyle = `
transition-all 
duration-150 
ease-in-out 
grayscale
group-hover:grayscale
group-hover:grayscale-50
p-2
`

const membros: IntegranteCompativel[] = [
  { nome: "Murilo",   imagem: '/murilo.png',   instrumento: "Guitarra/Voz", facebook: "https://www.facebook.com/socohxcx", instagram: "https://www.instagram.com/socohc/" },  
  { nome: "Montanha", imagem: '/montanha.png', instrumento: "Bateria", facebook: "https://www.facebook.com/socohxcx", instagram: "https://www.instagram.com/montanhacore/" },
  { nome: "Minch",    imagem: '/minch.png',    instrumento: "Baixo/Voz", facebook: "https://www.facebook.com/fabiominch/", instagram: "https://www.instagram.com/socohc/" },
]

interface IntegrantesProps {
    dados?: InicioData | null
}

const Integrantes = ({dados}: IntegrantesProps) => {
  const integrantes: IntegranteCompativel[] =
    (dados?.Integrantes?.length ?? 0) > 0 ? (dados?.Integrantes ?? []) : membros

  return (
     <motion.div
          key={"integrantes"}
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0 , opacity: 0.80 }} 
          viewport={{ once: false, amount: 0.1 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="max-w-7xl mx-auto"
      >

        
          <div className="flex items-end justify-center my-5">
            <div
              className={`relative flex flex-col sm:flex-row max-w-4xl px-4 gap-4`}
            >
              {integrantes.map((integrante) => (
              <div 
              key={integrante.id ?? integrante.nome}
              className="group flex items-center flex-col justify-center w-80 ">
              <Integrante integrante={integrante} className={integranteStyle} />              
              </div>
              ))}
            </div>
          </div>        
      </motion.div>
  )
}

export default Integrantes