import { useFollow } from '../context/FollowContext';
import { companies } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, Filter } from 'lucide-react';
import VerificationBadge from '../components/ui/VerificationBadge';

function FollowedCompanyCard({ company }) {
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
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-stone-800 text-base group-hover:text-green-700 transition-colors">
              {company.name}
            </h3>
            {company.verified && <VerificationBadge status="verified" size="xs" />}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
              {company.sector}
            </span>
            <span className="text-[10px] text-stone-400">{company.location}</span>
          </div>
          
          <div className="flex items-center justify-between border-t border-stone-50 pt-3">
            <span className="text-xs font-semibold text-green-700">{company.stats.products} productos</span>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              ⭐ {company.stats.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FollowingPage() {
  const { followedSlugs } = useFollow();
  const navigate = useNavigate();

  const followedCompanies = companies.filter((c) => followedSlugs.includes(c.slug));

  return (
    <main className="pt-24 pb-20 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-semibold text-sm tracking-wide">RED DE CONTACTOS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Siguiendo
            </h1>
            <p className="text-stone-500 mt-2 max-w-2xl text-sm">
              Las empresas y aliados estratégicos que sigues en AgroSync. Mantente al tanto de sus nuevos productos y novedades.
            </p>
          </div>
        </div>

        {/* List */}
        {followedCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {followedCompanies.map((company) => (
              <FollowedCompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-green-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Aún no sigues a ninguna empresa</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
              Explora nuestro directorio o el marketplace para descubrir nuevos socios comerciales.
            </p>
            <button 
              onClick={() => navigate('/directorio')}
              className="px-6 py-2.5 rounded-xl bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
            >
              Explorar Directorio
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
