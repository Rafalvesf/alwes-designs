import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import useSectionSnapScroll from './hooks/useSectionSnapScroll';

function App() {
  useSectionSnapScroll();

  return (
    <>
      <Hero />
      <About />
      <Features />
    </>
  );
}

export default App;
