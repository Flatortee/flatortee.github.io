import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { TechStackSection } from '@/components/home/TechStackSection'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { EngineTeaser } from '@/components/home/EngineTeaser'
import { CTASection } from '@/components/home/CTASection'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flatorte — Developer & Engineer',
  description: 'Developer portfolio — creator of Nanally Engine. Building immersive experiences.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <FeaturedProjects />
      <EngineTeaser />
      <CTASection />
      <Footer />
    </>
  )
}
