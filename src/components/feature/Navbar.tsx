import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setScrolled(window.scrollY > 60);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Ana Sayfa', to: '/' },
    { label: 'Ücretsiz Test', to: '/ucretsiz-isitme-testi' },
    { label: 'Online Test', to: '/online-isitme-testi' },
    { label: 'SGK Ödeme Tutarı', to: '/sgk-odeme-tutarlari' },
    { label: 'Hakkımızda', to: '/hakkimizda' },
    { label: 'Randevu', to: '/randevu' },
    { label: 'İletişim', to: '/iletisim' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-brand-dark/30 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/local-images/brand-logo-navbar.webp"
              alt="Hacettepe İşitme Cihazları"
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <span
                className={`text-base font-semibold tracking-tight transition-colors ${
                  scrolled ? 'text-brand-dark' : 'text-white'
                }`}
              >
                Hacettepe İşitme
              </span>
              <p
                className={`text-[11px] leading-tight transition-colors ${
                  scrolled ? 'text-gray-500' : 'text-white/80'
                }`}
              >
                Samsun
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium whitespace-nowrap transition-colors drop-shadow-sm ${
                  scrolled
                    ? isActive(link.to)
                      ? 'text-brand-accent'
                      : 'text-gray-700 hover:text-brand-accent'
                    : isActive(link.to)
                      ? 'text-brand-accent'
                      : 'text-white hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button + Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+905380260564"
              className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent/10">
                <i className="ri-phone-line text-brand-accent" />
              </span>
              <span className="hidden lg:inline">0 (538) 026 05 64</span>
            </a>
            <Link
              to="/randevu"
              className="inline-flex items-center gap-2 bg-brand-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap"
            >
              <span>Randevu Oluştur</span>
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              scrolled ? 'text-brand-dark' : 'text-white'
            }`}
            aria-label="Menüyü Aç"
          >
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-brand-light text-brand-accent'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <a
              href="tel:+905380260564"
              className="flex items-center gap-3 py-3 px-4 text-sm text-gray-700"
            >
              <i className="ri-phone-line text-brand-accent" />
              0 (538) 026 05 64
            </a>
            <a
              href="tel:+905442368336"
              className="flex items-center gap-3 py-3 px-4 text-sm text-gray-700"
            >
              <i className="ri-phone-line text-brand-accent" />
              0 (544) 236 83 36
            </a>
            <Link
              to="/randevu"
              className="flex items-center justify-center gap-2 bg-brand-accent text-white text-sm font-semibold py-3 rounded-full mt-2"
            >
              <span>Randevu Oluştur</span>
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}