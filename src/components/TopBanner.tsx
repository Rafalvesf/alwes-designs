const NAV_ITEMS = [
  { label: 'Work', target: 'work' },
  { label: 'Sobre nós', target: 'studio' },
  { label: 'Serviços', target: 'services' },
  { label: 'Manutenção', target: 'maintenance' },
  { label: 'Contact', target: 'contact' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function TopBanner() {
  return (
    <nav className="sticky top-0 inset-x-0 z-10 relative flex items-center justify-center bg-[#212121] px-4 sm:px-6 py-3">
      <button
        type="button"
        onClick={() => scrollToSection('work')}
        aria-label="Work"
        className="relative z-10"
      >
        <img
          src={`${import.meta.env.BASE_URL}alwes-logo.png`}
          alt="ALWES"
          className="h-5 sm:h-6"
        />
      </button>

      <ul className="hidden sm:flex absolute inset-y-0 right-4 sm:right-6 items-center gap-4 md:gap-6">
        {NAV_ITEMS.map(({ label, target }) => (
          <li key={target}>
            <button
              type="button"
              onClick={() => scrollToSection(target)}
              className="text-[11px] md:text-xs text-white/60 hover:text-white transition-colors"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
