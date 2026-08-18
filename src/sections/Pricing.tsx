import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import useHorizontalScroll from '../hooks/useHorizontalScroll';
import { BASE_FEATURES } from '../data/pricing';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      className={`relative rounded-2xl bg-[#212121] p-6 sm:p-8 flex flex-col ${className}`}
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
  const { scrollRef, isDragging, handleWheel, handlePointerDown, handlePointerMove, endDrag } =
    useHorizontalScroll<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative min-h-dvh bg-black py-16 sm:py-24 px-6 sm:px-8 md:px-6 overflow-hidden"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center mb-10 sm:mb-14">
        <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
          Serviços
        </span>
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
          <WordsPullUpMultiStyle
            segments={[{ text: 'Preços feitos à sua medida.', className: 'text-white' }]}
          />
        </h2>
        <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
          <WordsPullUpMultiStyle
            segments={[{ text: 'Comece pela base, cresça quando precisar.', className: 'text-gray-500' }]}
          />
        </h2>
      </div>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`relative max-w-6xl mx-auto flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 h-[560px] sm:h-[480px] overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-2 -mx-6 px-6 sm:mx-auto sm:px-0 [&::-webkit-scrollbar]:hidden sm:cursor-auto ${
          isDragging ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        <CardShell index={0} className="relative h-full snap-center sm:snap-align-none shrink-0 sm:shrink w-full sm:w-auto">
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

        <PricingCardShell index={1} className="h-full snap-center sm:snap-align-none shrink-0 sm:shrink w-full sm:w-auto">
          <span className="text-white text-xs sm:text-sm tracking-widest">01 — WEBSITE</span>

          <h3 className="mt-4 text-2xl sm:text-3xl text-white">A partir de 790€</h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            A base para colocar o seu negócio online.
          </p>

          <ul className="mt-6 space-y-2.5 flex-1">
            {BASE_FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PricingCardShell>

        <PricingCardShell index={2} className="h-full snap-center sm:snap-align-none shrink-0 sm:shrink w-full sm:w-auto">
          <span className="text-white text-xs sm:text-sm tracking-widest">02 — PERSONALIZE</span>

          <h3 className="mt-4 text-xl sm:text-2xl text-white">O que precisa além da base?</h3>
          <p className="mt-3 text-xs sm:text-sm text-gray-400">
            O seu negócio não precisa de funcionalidades que não vai utilizar.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 flex-1">
            Escolha apenas o que faz sentido para o seu projeto e nós adicionamos ao website.
          </p>

          <p className="mt-6 text-xs sm:text-sm text-gray-500 leading-relaxed">
            Booking · E-commerce · CRM · Landing Pages · SEO avançado · Automações · Multilingue ·
            Pagamentos · ...
          </p>

          <p className="mt-4 text-[11px] sm:text-xs text-gray-500 italic">
            Cada módulo tem o seu próprio custo.
          </p>
        </PricingCardShell>

        <PricingCardShell
          index={3}
          className="h-full snap-center sm:snap-align-none shrink-0 sm:shrink w-full sm:w-auto mr-6 sm:mr-0"
        >
          <span className="text-white text-xs sm:text-sm tracking-widest">03 — À SUA MEDIDA</span>

          <h3 className="mt-4 text-xl sm:text-2xl text-white">
            Construa apenas o que precisa.
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 flex-1">
            Começamos com a base de 790€ e adicionamos apenas as funcionalidades que o seu
            negócio necessita.
          </p>

          <div className="mt-6 text-xs sm:text-sm text-white space-y-1">
            <p>Website Base 790€</p>
            <p className="text-gray-500">+</p>
            <p>Módulos selecionados</p>
            <p className="text-gray-500">=</p>
            <p>Projeto final</p>
          </div>

          <p className="mt-4 text-[11px] sm:text-xs text-gray-500 italic leading-relaxed">
            Sem funcionalidades desnecessárias.
            <br />
            Sem pacotes que não se adaptam ao seu negócio.
          </p>

          <CardCta label="Falar connosco" />
        </PricingCardShell>
      </div>
    </section>
  );
}
