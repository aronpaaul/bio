import { ArrowPill } from './ArrowPill'

export function InfoSection() {
  return (
    <section id="about" className="bg-[#F5F5F5] dark:bg-[#0e0e11] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h2
              className="text-black dark:text-white text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Meet Paul.
            </h2>
            <ArrowPill label="See the work" href="#work" />
          </div>
          <p className="text-black/70 dark:text-white/70 text-2xl md:text-3xl leading-relaxed">
            Paul is a 16-year-old web and backend developer from Stockholm. He builds fast, reliable
            products — and looks at them the way an attacker would, only to make them safer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className="lg:col-span-2 rounded-2xl p-7 min-h-[20rem] flex flex-col justify-between"
            style={{ backgroundImage: "url('/media/bloom.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <h3 className="text-black text-2xl font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>
              Products that ship
            </h3>
            <p className="text-black/70 text-base max-w-xs">
              Web apps and backends that stay fast and stable under real traffic — built in Rust,
              TypeScript and React.
            </p>
          </div>

          <div className="bg-[#2B2644] rounded-2xl p-7 min-h-[20rem] flex flex-col justify-between dark:border dark:border-white/10">
            <h3 className="text-white text-2xl font-medium leading-snug">
              Backends that
              <br />
              scale.
            </h3>
            <p className="text-white/60 text-base">
              APIs, services and infrastructure designed to stay reliable as the load grows.
            </p>
          </div>

          <div className="bg-[#2B2644] rounded-2xl p-7 min-h-[20rem] flex flex-col justify-between dark:border dark:border-white/10">
            <h3 className="text-white text-2xl font-medium leading-snug">
              White-hat by
              <br />
              default.
            </h3>
            <p className="text-white/60 text-base">
              I probe software the way an attacker would — only to make it safer, and never to break
              what isn&apos;t mine.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
