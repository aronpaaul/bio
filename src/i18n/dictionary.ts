export interface Dictionary {
  siteTitle: string
  tagline: string
  enterLine: string
  marquee: string
  construction: string
  nav: { home: string; about: string; skills: string; projects: string; guestbook: string }
  aboutTitle: string
  aboutIntro: string
  aboutPoints: string[]
  skillsTitle: string
  projectsTitle: string
  guestbookTitle: string
  guestbookIntro: string
  guestEmpty: string
  guestLoading: string
  guestError: string
  formName: string
  formMessage: string
  formSubmit: string
  formFillBoth: string
  formAccepted: string
  formFailed: string
  formAlready: string
  formTooFast: string
  likeOk: string
  likeAlready: string
  likeFailed: string
  webRingTitle: string
  ringPrev: string
  ringRandom: string
  ringNext: string
  ringStatus: (position: number, total: number, name: string) => string
  counterLabel: string
  counterSince: string
  lastVisitLabel: string
  firstVisitor: string
  badges: string[]
  emailLink: string
  lastUpdated: string
  copyright: string
}
