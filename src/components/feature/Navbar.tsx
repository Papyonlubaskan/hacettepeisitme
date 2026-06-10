import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';
import { DEVICE_CATEGORIES } from '@/mocks/hearingAids';

type NavLink = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

const navLinks: NavLink[] = [
  { label: 'Ana Sayfa', to: '/' },
  {
    label: 'İşitme Cihazları',
    to: '/isitme-cihazlari',
    children: [
      { label: 'Tüm Cihazlar', to: '/isitme-cihazlari' },
      { label: 'Marka Katalogları', to: '/katalog' },
      ...DEVICE_CATEGORIES.map((c) => ({
        label: c.title.replace(' İşitme Cihazları', '').replace(' (RIC) Cihazlar', ''),
        to: `/isitme-cihazlari/${c.slug}`,
      })),
    ],
  },
  { label: 'Ücretsiz Test', to: '/ucretsiz-isitme-testi' },
  { label: 'Online Test', to: '/online-isitme-testi' },
  { label: 'SGK Ödeme Tutarı', to: '/sgk-odeme-tutarlari' },
  { label: 'Blog', to: '/blog' },
  { label: 'Hakkımızda', to: '/hakkimizda' },
  { label: 'Randevu', to: '/randevu' },
  { label: 'İletişim', to: '/iletisim' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [devicesOpen, setDevicesOpen] = useState(false);
  const [mobileDevicesOpen, setMobileDevicesOpen] = useState(false);
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
    setDevicesOpen(false);
    setMobileDevicesOpen(false);
    setScrolled(window.scrollY > 60);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/blog') {
      return location.pathname === path || location.pathname.startsWith('/blog/');
    }
    if (path === '/isitme-cihazlari') {
      return (
        location.pathname === path ||
        location.pathname.startsWith('/isitme-cihazlari/') ||
        location.pathname.startsWith('/katalog')
      );
    }
    return location.pathname === path;
  };

  const linkClass = (path: string) =>
    `relative text-sm font-medium whitespace-nowrap transition-colors drop-shadow-sm ${
      scrolled
        ? isActive(path)
          ? 'text-brand-accent'
          : 'text-gray-700 hover:text-brand-accent'
        : isActive(path)
          ? 'text-brand-accent'
          : 'text-white hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-brand-dark/30 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <nav className="flex items-center justify-between h-[72px]">
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
              <p className={`text-[11px] leading-tight transition-colors ${scrolled ? 'text-gray-500' : 'text-white/80'}`}>
                Samsun
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setDevicesOpen(true)}
                  onMouseLeave={() => setDevicesOpen(false)}
                >
                  <Link to={link.to} className={`${linkClass(link.to)} inline-flex items-center gap-1`}>
                    {link.label}
                    <i className="ri-arrow-down-s-line text-base" />
                    {isActive(link.to) && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-accent rounded-full" />
                    )}
                  </Link>
                  {devicesOpen ? (
                    <div className="absolute top-full left-0 pt-2 w-64">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-[70vh] overflow-y-auto">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-light hover:text-brand-accent transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link key={link.to} to={link.to} className={linkClass(link.to)}>
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-accent rounded-full" />
                  )}
                </Link>
              ),
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${SITE_PHONE_E164}`}
              className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent/10">
                <i className="ri-phone-line text-brand-accent" />
              </span>
              <span className="hidden xl:inline">{SITE_PHONE_DISPLAY}</span>
            </a>
            <Link
              to="/randevu"
              className="inline-flex items-center gap-2 bg-brand-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap"
            >
              <span>Randevu Oluştur</span>
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              scrolled ? 'text-brand-dark' : 'text-white'
            }`}
            aria-label="Menüyü Aç"
          >
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`} />
          </button>
        </nav>
      </div>

      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.to}>
                <button
                  type="button"
                  onClick={() => setMobileDevicesOpen(!mobileDevicesOpen)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium ${
                    isActive(link.to) ? 'bg-brand-light text-brand-accent' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                  <i className={`ri-arrow-${mobileDevicesOpen ? 'up' : 'down'}-s-line`} />
                </button>
                {mobileDevicesOpen ? (
                  <div className="pl-4 pb-2 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="py-2.5 px-4 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'bg-brand-light text-brand-accent' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="pt-2 border-t border-gray-100 mt-2">
            <a
              href={`tel:${SITE_PHONE_E164}`}
              className="flex items-center gap-3 py-3 px-4 text-sm text-gray-700"
            >
              <i className="ri-phone-line text-brand-accent" />
              {SITE_PHONE_DISPLAY}
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
