import { ArrowRightIcon } from './ArrowRightIcon'

export function UseCasesSection() {
  return (
    <section id="work" className="bg-[#F5F5F5] dark:bg-[#0e0e11] px-6 py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:pr-12 md:pt-2">
          <p className="text-black/60 dark:text-white/60 text-sm mb-2">Paul in practice</p>
          <h2
            className="text-black dark:text-white text-5xl md:text-6xl font-medium leading-none mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            What I do
          </h2>
          <p className="text-black/60 dark:text-white/60 text-base leading-relaxed max-w-sm">
            From polished frontends to solid backends, I build web products end to end — and keep
            them secure by thinking like an attacker who&apos;s on your side.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden min-h-[720px]">
          <video
            className="object-cover absolute inset-0 w-full h-full"
            src="/media/usecases.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="relative z-10 p-10 md:p-12">
            <h3
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-5"
              style={{ letterSpacing: '-0.03em' }}
            >
              WinShield
            </h3>
            <p className="text-black/70 text-base max-w-md mb-8">
              DDoS protection and a universal captcha that filters bots before they ever reach the
              backend. Built end to end in Rust and React.
            </p>
            <a href="https://winshield.cc/" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRightIcon className="w-4 h-4 text-black" />
              </span>
              <span className="text-black font-medium">Know more</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
