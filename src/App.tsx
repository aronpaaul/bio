import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { InfoSection } from './components/InfoSection'
import { BackedBySection } from './components/BackedBySection'
import { UseCasesSection } from './components/UseCasesSection'
import { ContactSection } from './components/ContactSection'
import { Reveal } from './components/Reveal'
import { useScrollMemory } from './hooks/useScrollMemory'

export function App() {
  useScrollMemory()
  return (
    <div id="top" className="flex flex-col bg-[#F5F5F5] dark:bg-[#0e0e11]">
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
      <Reveal>
        <InfoSection />
      </Reveal>
      <Reveal>
        <BackedBySection />
      </Reveal>
      <Reveal>
        <UseCasesSection />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </div>
  )
}
