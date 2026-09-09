import { ArrowRight, ShieldCheck, Store } from 'lucide-react';
import { products, companies } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, compact = false, onSelect }) {
  const navigate = useNavigate();

  const availabilityColor = {
    'Disponible': 'text-green-600 bg-green-50',
    'Bajo Pedido': 'text-amber-600 bg-amber-50',
    'Temporada': 'text-blue-600 bg-blue-50',
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 overflow-hidden card-hover group h-full ${onSelect ? 'cursor-pointer' : ''}`}
      onClick={() => onSelect?.(product)}
    >
      {/* Image area */}
      <div
        className="h-36 flex items-center justify-center text-5xl relative"
        style={{ backgroundColor: product.imageBg }}
      >
        <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{product.image}</span>
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.tags.slice(0, 1).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-semibold text-stone-600 border border-white/60">
              {tag}
            </span>
          ))}
        </div>
        {/* Availability */}
        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ${availabilityColor[product.availability] || 'text-stone-500 bg-stone-50'}`}>
          {product.availability}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">{product.category}</span>
        <h3 className="font-semibold text-stone-800 text-sm leading-snug mt-0.5 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {formatPrice(product.price)}
          </span>
          <span className="text-stone-400 text-xs ml-1">/ {product.unit}</span>
        </div>

        {/* Company */}
        <div
          className="flex items-center justify-between border-t border-stone-50 pt-3 cursor-pointer group/company"
          onClick={(e) => { e.stopPropagation(); navigate(`/empresa/${companies.find(c => c.id === product.companyId)?.slug || ''}`); }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {product.companyVerified && <ShieldCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
            <span className="text-xs text-stone-500 truncate group-hover/company:text-green-600 transition-colors">
              {product.companyName}
            </span>
          </div>
          <button
            className="flex items-center gap-1 text-[10px] font-semibold text-green-700 hover:text-green-600 whitespace-nowrap ml-2"
            onClick={(e) => { e.stopPropagation(); navigate(`/empresa/${companies.find(c => c.id === product.companyId)?.slug || ''}`); }}
          >
            <Store className="w-3 h-3" />
            Ver Local
          </button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">
              <span>🌿</span>
              Marketplace AgroSync
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Productos Destacados
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Los mejores productos del sector agroindustrial
            </p>
          </div>
          <button
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors flex-shrink-0"
          >
            Ver todo el Marketplace
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
