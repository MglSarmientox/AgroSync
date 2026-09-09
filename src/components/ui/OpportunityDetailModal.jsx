import { X, TrendingUp, Package, MapPin, Clock, MessageCircle, Store, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import VerificationBadge from './VerificationBadge';

const typeConfig = {
  blue: { badge: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  green: { badge: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  amber: { badge: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
};

export default function OpportunityDetailModal({ opp, onClose }) {
  const { user, openAuth } = useAuth();
  const { startConversation, sendMessage } = useMessages();
  const navigate = useNavigate();

  if (!opp) return null;

  const config = typeConfig[opp.typeColor] || typeConfig.blue;
  const company = companies.find((c) => c.name === opp.company);

  const handleContact = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    if (!company) return;
    startConversation(company.id);
    sendMessage(
      company.id,
      `Hola, me interesa su oportunidad: "${opp.title}". ¿Podemos coordinar? Busco ${opp.quantity}${opp.category ? ` de ${opp.category}` : ''}.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 px-6 py-6">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 text-green-100 hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {opp.type}
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {opp.company}
              </span>
              {opp.companyVerified && <VerificationBadge status="verified" size="sm" />}
            </div>
            <p className="text-green-200/70 text-xs mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {opp.location}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-2 leading-snug" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {opp.title}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-5">{opp.description}</p>

          {/* Detalle de lo que necesita */}
          <div className="rounded-2xl border border-stone-100 bg-stone-50/60 p-4 mb-5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3">
              Lo que necesita la empresa
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wide">Producto</div>
                  <div className="text-sm font-semibold text-stone-800">{opp.category}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wide">Cantidad / kilos</div>
                  <div className="text-sm font-semibold text-stone-800">{opp.quantity}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wide">Presupuesto</div>
                  <div className="text-sm font-semibold text-stone-800">{opp.budget}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wide">Vigencia</div>
                  <div className="text-sm font-semibold text-stone-800">{opp.deadline} · hace {opp.postedDays}d</div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleContact}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-green-900/20"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </button>
            {company && (
              <button
                onClick={() => { onClose(); navigate(`/empresa/${company.slug}`); }}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-green-600 text-green-700 font-bold text-sm hover:bg-green-50 transition-all active:scale-95"
              >
                <Store className="w-4 h-4" />
                Ver local
              </button>
            )}
          </div>

          {!user && (
            <p className="text-[11px] text-stone-400 mt-3 text-center">
              Necesitas iniciar sesión para contactar por mensajes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}