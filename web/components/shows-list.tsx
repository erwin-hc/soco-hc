"use client"

import { ShowCard, type Show } from "@/components/show-card"
import { motion, AnimatePresence } from "motion/react"
import { Footer } from "@/components/footer"

interface ShowsListProps {
  shows: Show[]
}

export function ShowsList({ shows }: ShowsListProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        key={"shows"}
        className="min-h-screen w-full px-2 py-4 md:px-8 md:py-16 opacity-80"
      >
        <header className="mx-auto mb-4 max-w-5xl">
          <h1 className="font-[Russo_One] uppercase px-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Próximos shows
          </h1>
        </header>

        <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 uppercase">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 0.9 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ShowCard show={show} reverse={index % 2 === 1} />
            </motion.div>
          ))}
        </section>
      </motion.div>
      <Footer />
    </AnimatePresence>
  )
}

