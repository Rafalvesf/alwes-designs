import { useRef, useState } from 'react';

export default function useHorizontalScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T>(null);
  const dragState = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleWheel = (e: React.WheelEvent<T>) => {
    const el = scrollRef.current;
    if (!el) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

    e.preventDefault();
    e.stopPropagation();
    el.scrollLeft += delta;
  };

  const handlePointerDown = (e: React.PointerEvent<T>) => {
    const el = scrollRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    dragState.current = { isDragging: true, startX: e.clientX, startScrollLeft: el.scrollLeft };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<T>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.isDragging) return;
    el.scrollLeft = dragState.current.startScrollLeft - (e.clientX - dragState.current.startX);
  };

  const endDrag = () => {
    dragState.current.isDragging = false;
    setIsDragging(false);
  };

  return { scrollRef, isDragging, handleWheel, handlePointerDown, handlePointerMove, endDrag };
}
