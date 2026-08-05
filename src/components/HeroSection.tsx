import { ArrowPill } from './ArrowPill'
import { Marquee } from './Marquee'
import { stackItems } from '../data/marquee'

export function HeroSection() {
  return (
    <section className="flex-1 px-6 pt-20 pb-6 flex items-end">
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 96px)' }}>
        <video
          className="object-cover absolute inset-0 w-full h-full"
          src="/media/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
          <h1
            className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            I build.
            <br />
            I break.
          </h1>
          <p
            className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
            style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
          >
            I&apos;m Paul — a web and backend developer. I build fast, reliable products in Rust,
            TypeScript and Java, with a white-hat eye for security.
          </p>
          <ArrowPill label="Get in touch" href="#contact" large fixedLight />
          <div className="mt-24 w-full max-w-md">
            <Marquee
              items={stackItems}
              name="stackMarquee"
              duration={22}
              gapClass="mx-7"
              colorClass="text-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
