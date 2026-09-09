import { useState } from 'react';
import { X, ShieldCheck, Minus, Plus, ShoppingCart, Store, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

const availabilityColor = {
  'Disponible': 'text-green-700 bg-green-50 border-green-200',
  'Bajo Pedido': 'text-amber-700 bg-amber-50 border-amber-200',
  'Temporada': 'text-blue-700 bg-blue-50 border-blue-200',
};

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart, openCart } = useCart();
  const { user, openAuth } = useAuth();
  const navigate = useNavigate();
  const [qty, setQty] = useState(10);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const company = companies.find((c) => c.id === product.companyId);
  const unitLabel = product.unit === 'kg' ? 'kilos' : product.unit === 'unidad' ? 'unidades' : product.unit === 'litro' ? 'litros' : product.unit;

  const handleAdd = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleGoCart = () => {
    openCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Image header */}
        <div className="relative">
          <div className="h-44 flex items-center justify-center text-7xl" style={{ backgroundColor: product.imageBg }}>
            <span className="drop-shadow-sm animate-float">{product.image}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 backdrop-blur shadow-md text-stone-500 hover:text-stone-800 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${availabilityColor[product.availability] || 'text-stone-500 bg-white border-stone-200'}`}>
            {product.availability}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-100">
                {t}
              </span>
            ))}
          </div>

          <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">{product.category}</span>
          <h2 className="text-xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {product.name}
          </h2>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {formatPrice(product.price)}
            </span>
            <span className="text-stone-400 text-sm">/ {product.unit}</span>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Descripción</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity + min order */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <div className="text-xs text-stone-400 mb-1">Pedido mínimo</div>
              <div className="font-semibold text-stone-700 text-sm">{product.minOrder}</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 mb-1">Disponible en stock</div>
              <div className="font-semibold text-green-700 text-sm">{product.availableQty.toLocaleString('es-CO')} {product.unit}</div>
            </div>
          </div>

          {/* Company */}
          <button
            onClick={() => navigate(`/empresa/${company?.slug || ''}`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100 hover:border-green-200 hover:bg-green-50/40 transition-all mb-5 text-left"
          >
            <div className="w-10 h-10 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-xl flex-shrink-0" style={{ borderColor: company?.logoColor }}>
              {company?.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-stone-800 truncate">{product.companyName}</span>
                {product.companyVerified && <ShieldCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
              </div>
              <span className="text-[11px] text-stone-400">{company?.location}</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-green-700 flex-shrink-0">
              <Store className="w-3.5 h-3.5" />
              Ver Local
            </span>
          </button>

          {/* Qty selector */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="text-xs font-semibold text-stone-500">Cantidad</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 5))}
                className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 active:scale-90 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center font-bold text-stone-800 text-sm">
                {qty} <span className="text-[10px] text-stone-400 font-medium">{unitLabel}</span>
              </span>
              <button
                onClick={() => setQty((q) => Math.min(product.availableQty, q + 5))}
                className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 active:scale-90 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg ${
                added ? 'bg-green-600 shadow-green-900/20' : 'bg-green-700 hover:bg-green-600 shadow-green-900/20'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Añadido al carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Agregar al carrito
                </>
              )}
            </button>
            {added && (
              <button
                onClick={handleGoCart}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-green-600 text-green-700 font-bold text-sm hover:bg-green-50 transition-all active:scale-95"
              >
                Ver carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}