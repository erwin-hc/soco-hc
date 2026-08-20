import { splitRegex } from "@/lib/utils";
import { motion } from "motion/react"
import type { InicioData } from "@/lib/strapi-types";

const charVariants = {
    hidden: {opacity:0},
    reveal: {opacity:1}
}

interface HistoriaProps {
    dados?: InicioData | null
}

const Historia = ({ dados }: HistoriaProps) => {
    const titulo = dados?.Historia_Titulo ?? `A HISTÓRIA POR TRÁS DO BARULHO`
    const historiaString = dados?.Historia_Conteudo ?? `A Soco HC é uma banda catarinense de hardcore formada em Barra Velha, no final de 2020. Conhecidos pelo som agressivo e letras de crítica social sobre política e desigualdade, eles se consolidaram no underground da região com os EPs "Filhos da Pandemia" (2023) e "Diferente do Combinado" (2025), além de singles como "Agro Caos"!`
    const charTitulo = splitRegex(titulo)
    const charHistoria = splitRegex(historiaString)

    return (

        <motion.div  
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.80 }}
          viewport={{ once: false, amount: 0.1 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="max-w-7xl mx-auto py-50 ">
          
          <h1        
          className="font-[Russo_One] uppercase px-10 py-8 text-3xl sm:px-12 sm:text-5xl text-white/80 ">
          {charTitulo}          
          </h1>

          <motion.p 
          initial="hidden"
          whileInView="reveal"
          transition={{staggerChildren:.008, delay: 0.05}}
          className="px-12 sm:px-16 text-2xl text-white/80  leading-relaxed sm:text-3xl opacity-85 tracking-wide ">
          {charHistoria.map( (char, index) => (
          <motion.span 
          key={char + index}
          transition={{duration:0.05}}
          variants={charVariants}          
          >
          {char}
          </motion.span>
          )) }
          </motion.p>

        </motion.div>
      );
}
 
export default Historia;