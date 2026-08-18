import { createContext, useContext, useMemo, useState } from 'react';

interface QuoteModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  return ctx;
}
