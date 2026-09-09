import { X, ShoppingCart, Trash2, Minus, Plus, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

const unitShort = (unit) => {
  if (unit === 'kg') return 'kg';
  if (unit === 'litro') return 'L';
  return unit;
};

export default function CartDrawer() {
  const { cartOpen, closeCart, items, setQty, removeFromCart, itemCount, subtotal } = useCart();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  const goMarketplace = () => {
    closeCart();
    navigate('/marketplace');
  };

  return (
    <div className="fixed inset-0 z-[180]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closeCart} />

      <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-4 duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <ShoppingCart className="w-4.5 h-4.5 text-green-700" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-base leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Tu carrito
              </h2>
              <span className="text-[11px] text-stone-400">{itemCount} ítem{itemCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <button onClick={closeCart} className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors" aria-label="Cerrar carrito">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-stone-300" />
            </div>
            <p className="text-stone-600 font-semibold text-sm mb-1">Tu carrito está vacío</p>
            <p className="text-stone-400 text-xs mb-6 max-w-[220px]">
              Explora el Marketplace y agrega productos de las empresas del sector.
            </p>
            <button
              onClick={goMarketplace}
              className="px-5 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-green-900/20"
            >
              Ir al Marketplace
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 p-3.5 rounded-2xl border border-stone-100 bg-white shadow-sm">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: item.imageBg }}
                  >
                    {item.image}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-stone-800 leading-snug">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Empresa de la que viene el producto */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <Store className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span className="text-[11px] text-stone-500">{item.companyName}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(item.productId, item.qty - 1)}
                          className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 active:scale-90 transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-stone-800 w-16 text-center">
                          {item.qty} <span className="text-[10px] text-stone-400 font-medium">{unitShort(item.unit)}</span>
                        </span>
                        <button
                          onClick={() => setQty(item.productId, item.qty + 1)}
                          className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 active:scale-90 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-bold text-stone-900 text-sm">{formatPrice(item.price * item.qty)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-100 p-4 space-y-3 bg-stone-50/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-600">Subtotal</span>
                <span className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                La facturación, los medios de pago y el envío llegarán muy pronto. Por ahora solo arma tu pedido.
              </p>
              <button
                disabled
                className="w-full py-3 rounded-xl bg-stone-200 text-stone-400 text-sm font-bold cursor-not-allowed"
                title="Próximamente"
              >
                Continuar con el pedido
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}