import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, User, Briefcase, Wrench, Mail, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, target: 'work', label: 'Work' },
  { icon: User, target: 'studio', label: 'Sobre nós' },
  { icon: Briefcase, target: 'services', label: 'Serviços' },
  { icon: Wrench, target: 'maintenance', label: 'Manutenção' },
  { icon: Mail, target: 'contact', label: 'Contact' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function NavFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col gap-1 bg-black rounded-2xl p-2 min-w-[190px]"
          >
            {NAV_ITEMS.map(({ icon: Icon, target, label }) => (
              <button
                key={target}
                type="button"
                onClick={() => {
                  scrollToSection(target);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-[#212121] transition-colors text-sm"
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Navegação"
        className="flex items-center justify-center w-14 h-14 rounded-2xl md:rounded-[2rem] bg-primary text-black shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}
