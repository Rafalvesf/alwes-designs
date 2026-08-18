function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

interface TopBannerProps {
  variant?: 'dark' | 'light';
}

export default function TopBanner({ variant = 'dark' }: TopBannerProps) {
  const isLight = variant === 'light';

  return (
    <nav className="sticky top-0 inset-x-0 z-10 flex items-center justify-center px-4 sm:px-6 py-3">
      <button
        type="button"
        onClick={() => scrollToSection('work')}
        aria-label="Work"
        className="relative z-10"
      >
        <img
          src={`${import.meta.env.BASE_URL}alwes-logo.png`}
          alt="ALWES"
          className={`h-5 sm:h-6 ${isLight ? 'invert' : ''}`}
        />
      </button>
    </nav>
  );
}
