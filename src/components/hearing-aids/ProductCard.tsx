import { Link } from 'react-router-dom';
import type { HearingAidProduct } from '@/mocks/hearingAids';

interface ProductCardProps {
  product: HearingAidProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-brand-cream flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold text-brand-accent uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-lg font-bold text-brand-dark mb-1">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{product.type}</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{product.description}</p>
        <ul className="space-y-1 mb-5">
          {product.features.slice(0, 3).map((f) => (
            <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
              <i className="ri-check-line text-brand-accent" />
              {f}
            </li>
          ))}
        </ul>
        <Link
          to="/randevu"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-[#008f7f]"
        >
          Denemek İçin Randevu Al
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </div>
  );
}
