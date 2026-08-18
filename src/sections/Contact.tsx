import { ArrowRight } from 'lucide-react';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import { useQuoteModal } from '../context/QuoteModalContext';
import { InstagramIcon, LinkedinIcon } from '../components/SocialIcons';

export default function Contact() {
  const { openModal } = useQuoteModal();

  return (
    <section
      id="contact"
      data-snap-center
      className="relative min-h-screen flex items-center bg-[#ddd0c3] py-16 sm:py-24 md:py-32 px-6 md:px-4 overflow-hidden [scroll-snap-align:center]"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative w-full bg-[#212121] rounded-2xl md:rounded-[2rem] max-w-4xl mx-auto px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28 text-center">
        <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
          Contacto
        </span>

        <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl mx-auto leading-[0.95] sm:leading-[0.9] text-white">
          <WordsPullUpMultiStyle
            segments={[{ text: 'Vamos construir algo útil.', className: 'italic font-serif' }]}
          />
        </h2>

        <p className="mt-6 sm:mt-8 max-w-xl mx-auto text-[#DEDBC8] text-xs sm:text-sm md:text-base">
          Tem um projeto, uma ideia ou um negócio que precisa de uma presença digital melhor?
        </p>

        <button
          type="button"
          onClick={openModal}
          className="group mt-8 sm:mt-10 inline-flex items-center gap-2 bg-primary rounded-full pl-5 pr-1.5 py-1.5 sm:pl-6 sm:pr-2 sm:py-2 transition-all hover:gap-3 w-fit mx-auto"
        >
          <span className="text-black font-medium text-sm sm:text-base">Começar projeto</span>
          <span className="flex items-center justify-center bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:scale-110">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
        </button>

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white transition-colors hover:bg-[#2a2a2a]"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white transition-colors hover:bg-[#2a2a2a]"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
