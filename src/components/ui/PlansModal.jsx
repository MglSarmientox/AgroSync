import { useState } from 'react';
import { X, Check, Crown, Sparkles, Rocket } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const billingPeriods = [
  { id: 'mensual', label: 'Mensual' },
  { id: 'trimestral', label: 'Trimestral' },
  { id: 'semestral', label: 'Semestral' },
  { id: 'anual', label: 'Anual' },
];

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Para arrancar tu vitrina',
    icon: Sparkles,
    price: { mensual: 12900, trimestral: 34000, semestral: 59000, anual: 99000 },
    features: [
      '1 local digital',
      'Hasta 10 productos',
      'Insignia básica AgroSync',
      'Soporte por correo',
    ],
    cta: 'Empezar con Pro',
  },
  {
    id: 'advance',
    name: 'Advance',
    tagline: 'Para crecer en el mercado',
    icon: Rocket,
    price: { mensual: 23900, trimestral: 64000, semestral: 109000, anual: 199000 },
    features: [
      'Todo lo de Pro',
      'Hasta 50 productos',
      'Estadísticas de visitas',
      'Chat prioritario',
      'Promociones ilimitadas',
    ],
    cta: 'Avanzar a Advance',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Para líderes del agro',
    icon: Crown,
    price: { mensual: 39900, trimestral: 109000, semestral: 179000, anual: 299000 },
    features: [
      'Todo lo de Advance',
      'Productos ilimitados',
      'Análisis avanzado de visitas',
      'Gerente de cuenta',
      'Mayor visibilidad en el Directorio',
    ],
    cta: 'Subir a Business',
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

export default function PlansModal({ open, onClose }) {
  const { user } = useAuth();
  const [period, setPeriod] = useState('trimestral');

  if (!open) return null;

  const currentPlan = plans.find((p) => p.id === String(user?.plan || '').toLowerCase());

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-5xl mt-10 sm:mt-14 mb-10 animate-scale-in">
        <div className="bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 px-6 sm:px-8 py-7">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  <Crown className="w-4 h-4" />
                  Planes AgroSync
                </div>
                <h2 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Elige el plan para tu empresa
                </h2>
                <p className="text-green-200/70 text-sm mt-1.5 max-w-md">
                  {user?.empresa ? `${user.empresa}, cada plan incluye ventajas para crecer tu vitrina y vender más.` : 'Cada plan incluye ventajas para crecer tu vitrina y vender más.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 text-green-100 hover:bg-white/20 transition-colors flex-shrink-0"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Billing toggle */}
            <div className="relative mt-5 inline-flex rounded-xl bg-black/20 border border-white/10 p-1 gap-1 overflow-x-auto max-w-full">
              {billingPeriods.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setPeriod(b.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    period === b.id
                      ? 'bg-white text-green-800 shadow'
                      : 'text-green-100/70 hover:text-green-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plans grid */}
          <div className="p-5 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isCurrent = currentPlan?.id === plan.id;
                const isFeatured = plan.id === 'advance';
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl border flex flex-col transition-all duration-200 ${
                      isFeatured
                        ? 'bg-gradient-to-b from-green-50 to-white border-green-400 shadow-xl shadow-green-900/10'
                        : 'bg-white border-stone-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isFeatured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Más popular
                      </span>
                    )}

                    <div className="p-5 sm:p-6 pb-0 flex flex-col flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isFeatured ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-stone-900 text-base leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{plan.name}</h3>
                          <p className="text-stone-400 text-[11px] mt-0.5">{plan.tagline}</p>
                        </div>
                        {isCurrent && (
                          <span className="ml-auto px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold uppercase border border-amber-200">
                            Tu plan
                          </span>
                        )}
                      </div>

                      <div className="mt-3 mb-4">
                        <div className="text-3xl font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          {formatPrice(plan.price[period])}
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5">
                          por {billingPeriods.find((b) => b.id === period)?.label.toLowerCase()}
                        </div>
                        {period !== 'anual' && (
                          <div className="text-[11px] text-green-600 font-semibold mt-1">
                            o {formatPrice(plan.price.anual)} al año
                          </div>
                        )}
                      </div>

                      <ul className="space-y-2.5 mb-5 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3" strokeWidth={3} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <button
                        disabled={isCurrent}
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                          isCurrent
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : isFeatured
                              ? 'bg-green-700 hover:bg-green-600 text-white shadow-lg shadow-green-900/20'
                              : 'border-2 border-green-600 text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {isCurrent ? 'Plan actual' : plan.cta}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-stone-400 mt-6">
              Facturación electrónica habilitada. Puedes cambiar de plan o cancelar cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}