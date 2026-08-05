import { Marquee } from './Marquee'
import { backerItems } from '../data/backers'

export function BackedBySection() {
  return (
    <section id="stack" className="bg-[#F5F5F5] dark:bg-[#0e0e11] px-6 py-8">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <p className="text-black/70 dark:text-white/70 text-base leading-relaxed">
          From frontends to backends —
          <br />
          I build for the web, end to end.
        </p>
        <div className="md:col-span-3">
          <Marquee
            items={backerItems}
            name="backersMarquee"
            duration={30}
            gapClass="mx-10"
            colorClass="text-black/50 dark:text-white/50"
          />
        </div>
      </div>
    </section>
  )
}
