import { setRequestLocale } from "next-intl/server"
import { use } from "react"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Stack } from "@/components/sections/stack"
import { Work } from "@/components/sections/work"

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return (
    <main className="flex-1">
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <About />
    </main>
  )
}
