import { useState } from 'react';
import { Search, MapPin, Package, ShieldCheck, Filter, Building2, X } from 'lucide-react';
import { companies } from '../data/mockData';
import VerificationBadge from '../components/ui/VerificationBadge';
import { useNavigate } from 'react-router-dom';

const sectors = ['Todos', 'Café', 'Cacao', 'Frutas', 'Insumos', 'Maquinaria'];

function CompanyDirectoryCard({ company }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/empresa/${company.slug}`)}
      className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 cursor-pointer card-hover group"
    >
      {/* Cover */}
      <div className={`h-24 bg-gradient-to-r ${company.coverColor} relative rounded-t-2xl overflow-hidden`}>
        {company.plan === 'Pro' && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400/90 text-amber-900 text-[10px] font-bold">PRO</span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="px-5 pb-5">
        {/* Avatar */}
        <div className="w-16 h-16 -mt-8 rounded-xl border-4 shadow-lg flex items-center justify-center text-3xl bg-white relative z-10" style={{ borderColor: company.logoColor }}>
          {company.logo}
        </div>

        <div className="mt-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-stone-800 text-sm group-hover:text-green-700 transition-colors leading-tight">{company.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 font-medium">{company.sector}</span>
              </div>
            </div>
            <VerificationBadge status={company.verified ? 'verified' : 'unverified'} size="xs" />
          </div>

          <div className="flex items-center gap-1.5 text-stone-400 text-xs mt-2 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{company.location}</span>
          </div>

          <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-4">
            {company.description}
          </p>

          {/* Certifications */}
          {company.certifications.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {company.certifications.slice(0, 2).map((cert) => (
                <span key={cert} className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                  {cert}
                </span>
              ))}
              {company.certifications.length > 2 && (
                <span className="px-2 py-0.5 rounded-full bg-stone-50 text-stone-400 text-[10px]">
                  +{company.certifications.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-50 text-xs text-stone-500">
            <div className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-green-500" />
              {company.stats.products} productos
            </div>
            <div className="flex items-center gap-1">
              <span className="text-amber-500">⭐</span>
              {company.stats.rating}
            </div>
            <div className="text-green-600 font-semibold">
              {company.stats.sales} ventas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [activeSector, setActiveSector] = useState('Todos');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = companies.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchSector = activeSector === 'Todos' || c.sector === activeSector;
    const matchVerified = !verifiedOnly || c.verified;
    return matchSearch && matchSector && matchVerified;
  });

  return (
    <main className="pt-16 min-h-screen bg-stone-50">
      {/* Page header */}
      <div className="bg-green-950 pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Directorio de Empresas
            </h1>
          </div>
          <p className="text-green-300/60 text-sm mb-6 ml-11">
            Descubre y conecta con {companies.length} empresas del sector agroindustrial en AgroSync
          </p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar empresa o ubicación..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-green-900/60 border border-green-700/50 text-green-100 placeholder-green-500 text-sm focus:outline-none focus:border-green-500 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
          {/* Sector pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeSector === sector
                    ? 'bg-green-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Verified toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                verifiedOnly
                  ? 'border-green-400 bg-green-50 text-green-700'
                  : 'border-stone-200 bg-white text-stone-500 hover:border-green-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Solo verificadas
            </button>

            <span className="text-stone-400 text-xs">{filtered.length} empresas</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl mb-4 block">🏢</span>
            <h3 className="text-stone-700 font-semibold text-lg mb-2">No encontramos empresas</h3>
            <p className="text-stone-400 text-sm">Intenta ajustar tus filtros</p>
            <button onClick={() => { setSearch(''); setActiveSector('Todos'); setVerifiedOnly(false); }} className="mt-4 text-green-700 font-semibold text-sm hover:underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((company) => (
              <CompanyDirectoryCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
