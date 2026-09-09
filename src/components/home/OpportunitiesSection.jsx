import { useState } from 'react';
import { ArrowRight, Clock, MapPin, TrendingUp } from 'lucide-react';
import { opportunities } from '../../data/mockData';
import VerificationBadge from '../ui/VerificationBadge';
import OpportunityDetailModal from '../ui/OpportunityDetailModal';

const typeConfig = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
};

function OpportunityCard({ opp, onSelect }) {
  const config = typeConfig[opp.typeColor] || typeConfig.blue;

  return (
    <div
      onClick={() => onSelect(opp)}
      className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300 p-5 card-hover group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {opp.type}
        </span>
        <span className="flex items-center gap-1 text-stone-400 text-xs">
          <Clock className="w-3 h-3" />
          Hace {opp.postedDays}d
        </span>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-stone-700">{opp.company}</span>
        {opp.companyVerified && <VerificationBadge status="verified" size="xs" />}
      </div>

      {/* Title */}
      <h3 className="text-stone-800 font-semibold text-sm leading-snug mb-2 group-hover:text-green-700 transition-colors">
        {opp.title}
      </h3>

      <p className="text-stone-500 text-xs leading-relaxed mb-4 line-clamp-2">
        {opp.description}
      </p>

      {/* Details */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <TrendingUp className="w-3.5 h-3.5 text-green-500" />
          <span>{opp.quantity}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>{opp.location}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={(e) => { e.stopPropagation(); onSelect(opp); }}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-green-200 text-green-700 text-xs font-semibold hover:bg-green-50 hover:border-green-300 transition-all"
      >
        Ver oportunidad
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function OpportunitiesSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              Tablón de Oportunidades
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Oportunidades Comerciales
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Conexiones B2B activas publicadas por empresas del sector
            </p>
          </div>
          <button className="flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors flex-shrink-0">
            Ver todas las oportunidades
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <OpportunityDetailModal opp={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
