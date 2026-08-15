import { useEffect, useRef } from 'react';

const ANIMATION_LOCK_MS = 900;

export default function useSectionSnapScroll() {
  const isAnimating = useRef(false);

  useEffect(() => {
    const isPreciseInput = window.matchMedia('(pointer: fine)').matches;
    if (!isPreciseInput) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section'));
    if (sections.length === 0) return;

    const getCurrentIndex = () => {
      const target = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      sections.forEach((el, i) => {
        const center = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(center - target);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 2) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = getCurrentIndex() + direction;
      if (nextIndex < 0 || nextIndex >= sections.length) return;

      e.preventDefault();
      isAnimating.current = true;

      const target = sections[nextIndex];
      const block = target.dataset.snapCenter !== undefined ? 'center' : 'start';
      target.scrollIntoView({ behavior: 'smooth', block });

      window.setTimeout(() => {
        isAnimating.current = false;
      }, ANIMATION_LOCK_MS);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);
}
