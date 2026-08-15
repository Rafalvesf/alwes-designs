import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from '../components/WordsPullUp';

const NAV_ITEMS = ['Work', 'Studio', 'Process', 'Services', 'Contact'];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="relative h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>

        <img
          src="/alwes-logo.png"
          alt="ALWES"
          className="absolute top-4 left-4 md:top-6 md:left-6 h-6 sm:h-8 z-10"
        />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[10px] sm:text-xs md:text-sm transition-colors"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div
          className="absolute left-3 sm:left-5 md:left-8 top-1/2 z-10"
          style={{ transform: 'translateY(-50%)' }}
        >
          <h1
            className="whitespace-nowrap leading-[0.85] tracking-[0.02em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ color: '#E1E0CC', fontFamily: "'Lostar', sans-serif", transform: 'rotate(-90deg)' }}
          >
            <WordsPullUp text="ALWES" showAsterisk />
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 right-0 md:left-auto p-8 sm:p-8 md:p-12 z-10">
          <div className="flex flex-col items-start gap-4 sm:gap-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0 md:ml-auto">
            <motion.p
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.2 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              ALWES is a design studio built around one craft: turning ideas into working
              portfolios and websites. Design, development and prototyping, handled end to
              end, under one roof.
            </motion.p>

            <motion.a
              href="#"
              className="group inline-flex items-center gap-2 bg-primary rounded-full pl-5 pr-1.5 py-1.5 sm:pl-6 sm:pr-2 sm:py-2 transition-all hover:gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            >
              <span className="text-black font-medium text-sm sm:text-base">
                Start a project
              </span>
              <span className="flex items-center justify-center bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:scale-110">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
