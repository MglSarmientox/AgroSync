import { ArrowRight, MapPin, Package } from 'lucide-react';
import { companies } from '../../data/mockData';
import VerificationBadge from '../ui/VerificationBadge';
import { useNavigate } from 'react-router-dom';

function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/empresa/${company.slug}`)}
      className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 cursor-pointer card-hover group"
    >
      {/* Cover gradient */}
      <div className={`h-20 bg-gradient-to-r ${company.coverColor} relative rounded-t-2xl overflow-hidden`}>
        {/* Plan badge */}
        {company.plan === 'Pro' && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400/90 text-amber-900 text-[10px] font-bold tracking-wide">
            PRO
          </span>
        )}
      </div>

      {/* Company identity */}
      <div className="px-5 pb-5">
        {/* Logo avatar */}
        <div
          className="w-14 h-14 -mt-7 rounded-xl border-4 shadow-lg flex items-center justify-center text-2xl bg-white relative z-10"
          style={{ borderColor: company.logoColor }}
        >
          {company.logo}
        </div>

        <div className="mt-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-stone-800 text-sm group-hover:text-green-700 transition-colors">
              {company.name}
            </h3>
            {company.verified && <VerificationBadge status="verified" size="xs" />}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
              {company.sector}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-4">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{company.location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs border-t border-stone-50 pt-3">
          <div className="flex items-center gap-1 text-stone-500">
            <Package className="w-3.5 h-3.5 text-green-500" />
            <span>{company.stats.products} productos</span>
          </div>
          <span className="text-amber-600 font-semibold">⭐ {company.stats.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedCompanies() {
  const featured = companies.filter((c) => c.featured);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Empresas del Centro Comercial
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Empresas Destacadas
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Locales verificados con los mejores productos del agro colombiano
            </p>
          </div>
          <button
            onClick={() => navigate('/directorio')}
            className="flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors flex-shrink-0"
          >
            Ver directorio completo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}
