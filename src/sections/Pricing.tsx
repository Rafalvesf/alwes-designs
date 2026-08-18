import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import TopBanner from '../components/TopBanner';
import { BASE_FEATURES } from '../data/pricing';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MOBILE_FEATURE_LIMIT = 4;

interface PricingCardShellProps {
  index: number;
  className?: string;
  children: React.ReactNode;
}

function PricingCardShell({ index, className = '', children }: PricingCardShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl bg-[#212121] p-5 sm:p-8 flex flex-col ${className}`}
      initial={{ y: 24, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface CardShellProps {
  index: number;
  className?: string;
  children: React.ReactNode;
}

function CardShell({ index, className = '', children }: CardShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CardCta({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        if (!onClick) return;
        e.preventDefault();
        onClick();
      }}
      className="group mt-8 inline-flex items-center gap-2 bg-primary rounded-full pl-5 pr-1.5 py-1.5 w-fit transition-all hover:gap-3"
    >
      <span className="text-black font-medium text-xs sm:text-sm">{label}</span>
      <span className="flex items-center justify-center bg-black rounded-full w-8 h-8 transition-transform group-hover:scale-110">
        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
      </span>
    </a>
  );
}

export default function Pricing() {
  return (
    <section id="services" className="relative min-h-dvh flex flex-col bg-black overflow-hidden">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />
      <TopBanner />

      <div className="relative flex-1 flex flex-col justify-center py-10 sm:py-24 px-6 sm:px-8 md:px-6">
        <div className="relative max-w-6xl mx-auto text-center mb-6 sm:mb-14">
          <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
            Serviços
          </span>
          <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle
              segments={[{ text: 'Preços feitos à sua medida.', className: 'text-white' }]}
            />
          </h2>
          <h2 className="mt-2 hidden sm:block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Comece pela base, cresça quando precisar.', className: 'text-gray-500' },
              ]}
            />
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sm:h-[480px]">
          <CardShell index={0} className="relative h-48 sm:h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-lg sm:text-xl" style={{ color: '#E1E0CC' }}>
                Your ideas, made real.
              </span>
            </div>
          </CardShell>

          <PricingCardShell index={1} className="sm:h-full">
            <span className="text-white text-xs sm:text-sm tracking-widest">01 — WEBSITE</span>

            <h3 className="mt-4 text-2xl sm:text-3xl text-white">A partir de 790€</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              A base para colocar o seu negócio online.
            </p>

            <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5 flex-1">
              {BASE_FEATURES.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-2 text-xs sm:text-sm text-gray-400 ${
                    i >= MOBILE_FEATURE_LIMIT ? 'hidden sm:flex' : ''
                  }`}
                >
                  <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
              {BASE_FEATURES.length > MOBILE_FEATURE_LIMIT && (
                <li className="sm:hidden text-[11px] text-gray-500 italic">
                  + {BASE_FEATURES.length - MOBILE_FEATURE_LIMIT} incluídos
                </li>
              )}
            </ul>
          </PricingCardShell>

          <PricingCardShell index={2} className="sm:h-full">
            <span className="text-white text-xs sm:text-sm tracking-widest">02 — PERSONALIZE</span>

            <h3 className="mt-4 text-xl sm:text-2xl text-white">O que precisa além da base?</h3>
            <p className="mt-3 text-xs sm:text-sm text-gray-400">
              O seu negócio não precisa de funcionalidades que não vai utilizar.
            </p>
            <p className="mt-2 hidden sm:block text-xs sm:text-sm text-gray-400 flex-1">
              Escolha apenas o que faz sentido para o seu projeto e nós adicionamos ao website.
            </p>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 leading-relaxed">
              Booking · E-commerce · CRM · Landing Pages · SEO avançado · Automações · Multilingue ·
              Pagamentos · ...
            </p>

            <p className="mt-4 hidden sm:block text-[11px] sm:text-xs text-gray-500 italic">
              Cada módulo tem o seu próprio custo.
            </p>
          </PricingCardShell>

          <PricingCardShell index={3} className="sm:h-full">
            <span className="text-white text-xs sm:text-sm tracking-widest">03 — À SUA MEDIDA</span>

            <h3 className="mt-4 text-xl sm:text-2xl text-white">Construa apenas o que precisa.</h3>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 flex-1">
              Começamos com a base de 790€ e adicionamos apenas as funcionalidades que o seu
              negócio necessita.
            </p>

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-white space-y-1">
              <p>Website Base 790€</p>
              <p className="text-gray-500">+</p>
              <p>Módulos selecionados</p>
              <p className="text-gray-500">=</p>
              <p>Projeto final</p>
            </div>

            <p className="mt-4 hidden sm:block text-[11px] sm:text-xs text-gray-500 italic leading-relaxed">
              Sem funcionalidades desnecessárias.
              <br />
              Sem pacotes que não se adaptam ao seu negócio.
            </p>

            <CardCta label="Falar connosco" />
          </PricingCardShell>
        </div>
      </div>
    </section>
  );
}
