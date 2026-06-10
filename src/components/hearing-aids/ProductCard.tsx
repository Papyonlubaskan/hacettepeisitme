import { Link } from 'react-router-dom';
import type { HearingAidProduct } from '@/mocks/hearingAids';
import AdaptiveImage from '@/components/hearing-aids/AdaptiveImage';

interface ProductCardProps {
  product: HearingAidProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <AdaptiveImage
        src={product.image}
        alt={`${product.lineName} ${product.name}`}
        className="bg-brand-cream rounded-none"
        maxWidthClass="max-w-full"
      />
      <div className="p-6">
        <p className="text-xs font-semibold text-brand-accent uppercase tracking-wide mb-1">{product.lineName}</p>
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
