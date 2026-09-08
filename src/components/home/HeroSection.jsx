import { useState } from 'react';
import { Search, Sliders, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { stats } from '../../data/mockData';

const suggestions = ['Cacao orgánico', 'Café especial Huila', 'Maracuyá exportación', 'Empaques biodegradables'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/marketplace');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-green-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,197,94,0.12)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_80%,rgba(245,158,11,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(2,26,10,0.6)_100%)]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-green-500/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/60 border border-green-700/50 text-green-300 text-xs font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-green" />
            Plataforma B2B Agroindustrial de Colombia
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            El Centro Comercial{' '}
            <span className="gradient-text">Digital</span>{' '}
            de la{' '}
            <span className="gradient-text">Agroindustria</span>
          </h1>

          <p className="text-green-200/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Descubre empresas, explora productos y establece relaciones comerciales 
            en el ecosistema digital del agro colombiano.
          </p>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-4">
            <div className={`relative flex items-center rounded-2xl transition-all duration-300 ${
              focused
                ? 'ring-2 ring-green-400/50 shadow-2xl shadow-green-500/20'
                : 'shadow-xl shadow-black/30'
            }`}>
              <div className="flex-1 flex items-center bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl pr-2">
                <Search className="w-5 h-5 text-green-400 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Busca productos, empresas u oportunidades..."
                  className="flex-1 px-3 py-4 bg-transparent text-white placeholder-green-400/50 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <span className="hidden sm:inline">Buscar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            <span className="text-green-500/60 text-xs self-center">Sugerencias:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); navigate('/marketplace'); }}
                className="px-3 py-1 rounded-full bg-green-900/50 border border-green-700/40 text-green-300 text-xs hover:bg-green-800/60 hover:border-green-600/60 transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: `${stats.companies}+`, label: 'Empresas activas' },
              { value: `${stats.products.toLocaleString()}+`, label: 'Productos' },
              { value: `${stats.transactions.toLocaleString()}+`, label: 'Transacciones' },
              { value: `${stats.regions}`, label: 'Departamentos' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="glass rounded-2xl py-4 px-3 text-center border border-white/10"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {value}
                </div>
                <div className="text-green-400/60 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" />
    </section>
  );
}
