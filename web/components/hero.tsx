"use client"
import { LogoPequeno } from "@/components/logo"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import Integrantes from "./integrantes"
import Historia from "./historia"
import { Footer } from "./footer"
import type { InicioData } from "@/lib/strapi-types"
import { getStrapiMedia, getInicio } from "@/lib/strapi";
import { useState, useEffect } from "react";

interface HeroProps {
  dados?: InicioData | null
}

const Hero = ({ dados }: HeroProps) => {
  const fallbackCelular = "/banda_cel.png"
  const fallbackDesktop = "/foto.png"

  const [subTitle, setSubTitle] = useState<string>(dados?.Logo_Titulo ?? 'ANTIFASCISTA')
  // Começa sem imagem para evitar glitch de troca fallback -> Strapi
  const [capaCelular, setCapaCelular] = useState<string | null>(null)
  const [capaDesktop, setCapaDesktop] = useState<string | null>(null)

  // Busca os dados do Strapi automaticamente quando não são passados via props
  useEffect(() => {
    let ativo = true

    async function carregarDados() {
      // Se já veio via props, usa direto
      if (dados) {
        const celular = getStrapiMedia(dados.CapaCelular?.url)
        const desktop = getStrapiMedia(dados.CapaDesktop?.url)
        setSubTitle(dados.Logo_Titulo || "ANTIFASCISTA")
        setCapaCelular(celular || fallbackCelular)
        setCapaDesktop(desktop || fallbackDesktop)
        return
      }

      // Busca do Strapi quando o Hero é usado sem props (ex: página raiz após o vídeo)
      const dadosBuscados = await getInicio()
      if (!ativo || !dadosBuscados) return

      const celular = getStrapiMedia(dadosBuscados.CapaCelular?.url)
      const desktop = getStrapiMedia(dadosBuscados.CapaDesktop?.url)
      setSubTitle(dadosBuscados.Logo_Titulo || "ANTIFASCISTA")
      setCapaCelular(celular || fallbackCelular)
      setCapaDesktop(desktop || fallbackDesktop)
    }

    carregarDados()
    return () => {
      ativo = false
    }
  }, [dados])

  return (
    <div>
      <AnimatePresence>
        
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 0.80 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          key={"foto"}
          // Cor base exatamente #171717
          className="relative min-h-svh bg-[#171717] overflow-hidden"
        >

          {/* Wrapper das Imagens com MÁSCARA GRADIENTE embutida */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            }}
          >
            {capaCelular && (
              <div className="hidden max-[480px]:block w-full h-full relative grayscale-100">
                <Image
                  src={capaCelular}
                  fill
                  sizes="(max-width: 480px) 100vw, 100vw"
                  alt={"Foto da banda Soco Hardcore - Mobile"}
                  className="object-cover object-top-left"
                  loading="eager"
                  priority
                  onError={() => setCapaCelular("/banda_cel.png")}
                />
              </div>
            )}

            {capaDesktop && (
              <div className="hidden min-[481px]:block w-full h-full relative grayscale-100">
                <Image
                  src={capaDesktop}
                  fill
                  sizes="(max-width: 480px) 100vw, 100vw"
                  alt={"Foto da banda Soco Hardcore"}
                  className="object-cover object-center"
                  loading="eager"
                  priority
                  onError={() => setCapaDesktop("/foto.png")}
                />
              </div>
            )}

            {/* Escurecimento leve sobre a foto */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>

          {/* Gradiente extra suave para garantir a fusão total com a cor #171717 */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#171717] via-[#171717]/80 to-transparent pointer-events-none z-2" />

          {/* Conteúdo / Textos */}
          <div className="relative flex flex-col items-start justify-end h-[75vh] w-full z-10 max-w-7xl mx-auto px-10">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                key={"soco hc"}
                initial={{ x: -1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" , delay: 0.15}}
              >
                <div className="font-[Russo_One] text-5xl sm:text-8xl tracking-wider opacity-99 mb-4">
                  <LogoPequeno color="white" className="w-65"/>
                </div>
              </motion.div>
              <motion.div
                key={"hardcore"}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 1000, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" , delay: 0.15}}
              >
                <p className="font-[Russo_One] uppercase text-3xl sm:text-4xl tracking-wider opacity-99">
                  {subTitle}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <Historia key={"historia"} dados={dados}/>
        <Integrantes key={"integrantes"} dados={dados}/>
        <Footer/>
      </AnimatePresence>        
    </div>
  )
}

export default Hero