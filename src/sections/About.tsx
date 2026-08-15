import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import AnimatedLetter from '../components/AnimatedLetter';

const BODY_TEXT =
  'Over the last several years, I have designed and built websites and portfolios for founders, studios, and independent creators, turning early ideas into polished, working products through design, code, and rapid prototyping.';

export default function About() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = BODY_TEXT.split('');
  const totalChars = chars.length;

  return (
    <section
      data-snap-center
      className="min-h-screen flex items-center bg-black py-16 sm:py-24 md:py-32 px-6 md:px-4 [scroll-snap-align:center]"
    >
      <div className="w-full bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28 text-center">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest">
          Design &amp; development
        </span>

        <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-primary">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Alwes,', className: 'font-normal' },
              { text: 'a self-taught designer & developer.', className: 'italic font-serif' },
              {
                text: 'I have skills in interface design, front-end development, and rapid prototyping.',
                className: 'font-normal',
              },
            ]}
          />
        </h2>

        <p
          ref={containerRef}
          className="mt-8 sm:mt-10 max-w-2xl mx-auto text-[#DEDBC8] text-xs sm:text-sm md:text-base"
        >
          {chars.map((char, i) => {
            const charProgress = i / totalChars;
            const range: [number, number] = [charProgress - 0.1, charProgress + 0.05];
            return <AnimatedLetter key={i} char={char} progress={scrollYProgress} range={range} />;
          })}
        </p>
      </div>
    </section>
  );
}
