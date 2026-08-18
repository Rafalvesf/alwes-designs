import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import AnimatedLetter from '../components/AnimatedLetter';

const BODY_TEXT_1 =
  'Criamos websites modernos e soluções digitais para negócios, marcas e criadores independentes.';
const BODY_TEXT_2 =
  'Da primeira ideia ao produto final, cada projeto combina design, desenvolvimento e funcionalidade para criar uma presença digital com o aspeto certo, que funciona na perfeição e apoia o negócio por trás dela.';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars1 = BODY_TEXT_1.split('');
  const chars2 = BODY_TEXT_2.split('');
  const totalChars = chars1.length + chars2.length;

  return (
    <section
      id="studio"
      data-snap-center
      className="relative min-h-screen flex items-center bg-[#ddd0c3] py-16 sm:py-24 md:py-32 px-6 md:px-4 overflow-hidden [scroll-snap-align:center]"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative w-full bg-[#212121] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28 text-center">
        <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
          Sobre nós
        </span>

        <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-white">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Experiências digitais,', className: 'font-normal' },
              { text: 'feitas com propósito.', className: 'italic font-serif' },
            ]}
          />
        </h2>

        <div ref={containerRef} className="mt-8 sm:mt-10 max-w-2xl mx-auto space-y-4">
          <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base">
            {chars1.map((char, i) => {
              const charProgress = i / totalChars;
              const range: [number, number] = [charProgress - 0.1, charProgress + 0.05];
              return <AnimatedLetter key={i} char={char} progress={scrollYProgress} range={range} />;
            })}
          </p>
          <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base">
            {chars2.map((char, i) => {
              const charProgress = (chars1.length + i) / totalChars;
              const range: [number, number] = [charProgress - 0.1, charProgress + 0.05];
              return <AnimatedLetter key={i} char={char} progress={scrollYProgress} range={range} />;
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
