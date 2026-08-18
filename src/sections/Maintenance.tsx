import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import useHorizontalScroll from '../hooks/useHorizontalScroll';
import { MAINTENANCE_PLANS } from '../data/pricing';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FUNNEL_STEPS = [
  { label: 'Website', value: '790€+' },
  { label: 'Manutenção', value: '79€/mês' },
  { label: 'Evolução', value: '149€/mês' },
  { label: 'Novos módulos', value: 'preço individual' },
];

interface PlanCardProps {
  index: number;
  label: string;
  price: number;
  description: string;
  features: string[];
  className?: string;
}

function PlanCard({ index, label, price, description, features, className = '' }: PlanCardProps) {
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
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl sm:text-2xl text-white">{label}</h3>
        <span className="shrink-0 text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-500 border border-gray-700 rounded-full px-2.5 py-1">
          Mensal
        </span>
      </div>
      <p className="mt-1 text-2xl sm:text-3xl text-white">
        {price}€<span className="text-sm sm:text-base text-gray-500">/mês</span>
      </p>
      <p className="mt-3 text-xs sm:text-sm text-gray-400">{description}</p>
      <p className="mt-1 text-[11px] sm:text-xs text-gray-500 italic">
        Plano opcional, independente do valor do website.
      </p>

      <ul className="mt-6 space-y-2.5 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
            <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Maintenance() {
  const { scrollRef, isDragging, handleWheel, handlePointerDown, handlePointerMove, endDrag } =
    useHorizontalScroll<HTMLDivElement>();

  return (
    <section
      id="maintenance"
      className="relative min-h-screen flex flex-col justify-center bg-black py-16 sm:py-24 px-6 sm:px-8 md:px-6 overflow-hidden"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
          Manutenção
        </span>
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
          <WordsPullUpMultiStyle
            segments={[{ text: 'Depois do website, continuamos consigo.', className: 'text-white' }]}
          />
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm text-gray-400">
          Planos de manutenção mensal, opcionais e separados do valor do website. Escolha o que
          faz sentido para o seu negócio — sem obrigação de aderir.
        </p>
      </div>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`relative max-w-4xl mx-auto flex sm:grid sm:grid-cols-2 gap-3 sm:gap-4 h-[520px] sm:h-auto overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-2 -mx-6 px-6 sm:mx-auto sm:px-0 [&::-webkit-scrollbar]:hidden sm:cursor-auto ${
          isDragging ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        {MAINTENANCE_PLANS.map((plan, i) => (
          <PlanCard
            key={plan.id}
            index={i}
            label={plan.label}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            className="h-full snap-center sm:snap-align-none shrink-0 sm:shrink w-full sm:w-auto"
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto mt-4 sm:mt-4 rounded-2xl bg-[#212121] px-6 py-5 sm:px-8 sm:py-6 text-center">
        <p className="text-sm sm:text-base text-white">Precisa de algo maior?</p>
        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          Novas funcionalidades, módulos e desenvolvimento personalizado são orçamentados
          separadamente.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
        {FUNNEL_STEPS.map((step) => (
          <div key={step.label}>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">
              {step.label}
            </p>
            <p className="mt-1 text-sm sm:text-base text-white">{step.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
