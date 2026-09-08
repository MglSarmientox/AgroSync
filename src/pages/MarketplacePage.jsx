import { useState } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, Store, ShieldCheck, X } from 'lucide-react';
import { products, categories, companies } from '../data/mockData';
import { ProductCard } from '../components/home/FeaturedProducts';
import { useNavigate } from 'react-router-dom';

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price_asc', label: 'Menor precio' },
  { value: 'price_desc', label: 'Mayor precio' },
  { value: 'name', label: 'Nombre A-Z' },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  const filtered = products
    .filter((p) => {
      const matchCategory =
        activeCategory === 'all' || p.category.toLowerCase() === activeCategory;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.featured ? 1 : -1;
    });

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);

  return (
    <main className="pt-16 min-h-screen bg-stone-50">
      {/* ── PAGE HEADER ── */}
      <div className="bg-green-950 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Marketplace Agro<span className="text-green-400">Sync</span>
            </h1>
            <p className="text-green-300/60 text-sm">
              {products.length} productos de empresas verificadas del sector agroindustrial
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos o empresas..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-green-900/60 border border-green-700/50 text-green-100 placeholder-green-500 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-green-700 text-white shadow-md shadow-green-900/20'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-stone-500 text-sm">
            <span className="font-semibold text-stone-700">{filtered.length}</span> resultados
            {activeCategory !== 'all' && (
              <span> en <span className="text-green-700 font-semibold">{categories.find(c => c.id === activeCategory)?.label}</span></span>
            )}
          </p>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-600 focus:outline-none focus:border-green-500 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {/* View toggle */}
            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-green-700 text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-green-700 text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl mb-4 block">🌾</span>
            <h3 className="text-stone-700 font-semibold text-lg mb-2">No encontramos resultados</h3>
            <p className="text-stone-400 text-sm">Intenta con otra categoría o término de búsqueda</p>
            <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="mt-4 text-green-700 font-semibold text-sm hover:underline">
              Limpiar filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-3">
            {filtered.map((product) => {
              const availabilityColor = {
                'Disponible': 'text-green-700 bg-green-50 border-green-200',
                'Bajo Pedido': 'text-amber-700 bg-amber-50 border-amber-200',
                'Temporada': 'text-blue-700 bg-blue-50 border-blue-200',
              };
              return (
                <div key={product.id} className="bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 p-4 flex items-center gap-4 group">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: product.imageBg }}
                  >
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-semibold text-stone-800 text-sm group-hover:text-green-700 transition-colors truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {product.companyVerified && <ShieldCheck className="w-3.5 h-3.5 text-green-500" />}
                      <span className="text-xs text-stone-400">{product.companyName}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-stone-900 text-sm">{formatPrice(product.price)}<span className="text-stone-400 font-normal text-xs">/{product.unit}</span></div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${availabilityColor[product.availability]}`}>
                      {product.availability}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/empresa/${companies.find(c => c.id === product.companyId)?.slug || ''}`)}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-green-200 text-green-700 text-xs font-semibold hover:bg-green-50 transition-all flex-shrink-0"
                  >
                    <Store className="w-3.5 h-3.5" />
                    Ver Local
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
