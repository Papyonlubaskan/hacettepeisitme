import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 animate-fadeInUp">
      <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-gray-50 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10">
        <h1 className="text-xl md:text-2xl font-semibold mt-6">Sayfa Bulunamadı</h1>
        <p className="mt-2 text-base text-gray-400 font-mono">{location.pathname}</p>
        <p className="mt-4 text-lg md:text-xl text-gray-500">Aradığınız sayfa mevcut değil. Ana sayfaya dönmek için aşağıdaki butonu kullanabilirsiniz.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008f7f] transition-all mt-8"
        >
          <i className="ri-home-line" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>
    </div>
  );
}
