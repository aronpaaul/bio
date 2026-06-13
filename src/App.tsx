import { SiteFrame } from './components/SiteFrame'
import { LanguagePicker } from './components/LanguagePicker'
import { PageHeader } from './components/PageHeader'
import { Marquee } from './components/Marquee'
import { UnderConstruction } from './components/UnderConstruction'
import { NavMenu } from './components/NavMenu'
import { RetroHr } from './components/RetroHr'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { GuestbookSection } from './components/GuestbookSection'
import { Sidebar } from './components/Sidebar'
import { PageFooter } from './components/PageFooter'
import { useTranslation } from './i18n/useTranslation'
import { useAnimatedTitle } from './hooks/useAnimatedTitle'

export function App() {
  const { t } = useTranslation()
  useAnimatedTitle(t.siteTitle)
  return (
    <SiteFrame>
      <LanguagePicker />
      <PageHeader />
      <Marquee text={t.marquee} />
      <UnderConstruction />
      <NavMenu />
      <RetroHr />
      <div className="contentRow">
        <div className="mainColumn">
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <GuestbookSection />
        </div>
        <Sidebar />
      </div>
      <RetroHr />
      <PageFooter />
    </SiteFrame>
  )
}
