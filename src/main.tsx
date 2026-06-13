import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import './styles/base.css'
import './styles/layout.css'
import './styles/lang.css'
import './styles/header.css'
import './styles/nav.css'
import './styles/sections.css'
import './styles/content.css'
import './styles/widgets.css'
import './styles/ring.css'
import './styles/guestbook.css'
import './styles/forms.css'
import './styles/badges.css'
import './styles/footer.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
