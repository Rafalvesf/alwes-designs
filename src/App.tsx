import Hero from './sections/Hero';
import About from './sections/About';
import Pricing from './sections/Pricing';
import Maintenance from './sections/Maintenance';
import Contact from './sections/Contact';
import QuoteModal from './components/QuoteModal';
import NavFab from './components/NavFab';
import { QuoteModalProvider } from './context/QuoteModalContext';
import useSectionSnapScroll from './hooks/useSectionSnapScroll';

function App() {
  useSectionSnapScroll();

  return (
    <QuoteModalProvider>
      <Hero />
      <About />
      <Pricing />
      <Maintenance />
      <Contact />
      <NavFab />
      <QuoteModal />
    </QuoteModalProvider>
  );
}

export default App;
