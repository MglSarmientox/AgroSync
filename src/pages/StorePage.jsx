import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin, Package, ShieldCheck, MessageCircle, Phone,
  Mail, Settings, Star, Award, Users, TrendingUp,
  ChevronRight, ExternalLink, Globe, Calendar, Building2, Tag, LogIn, Store, Heart
} from 'lucide-react';
import { useFollow } from '../context/FollowContext';
import { useMessages } from '../context/MessageContext';
import { companies, products } from '../data/mockData';
import VerificationBadge from '../components/ui/VerificationBadge';
import { ProductCard } from '../components/home/FeaturedProducts';

const tabs = [
  { id: 'about', label: 'Acerca de la Empresa' },
  { id: 'catalog', label: 'Catálogo de Productos' },
  { id: 'certifications', label: 'Certificaciones y Contacto' },
];

// ── ABOUT TAB ──────────────────────────────────────────────
function AboutTab({ company }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main description */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
          <h3 className="font-bold text-stone-800 text-base mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-green-600" />
            Nuestra Historia
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">{company.about}</p>
        </div>

        {/* Key info grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Calendar, label: 'Fundada en', value: company.founded },
            { icon: Users, label: 'Empleados', value: company.employees },
            { icon: MapPin, label: 'Ubicación', value: company.location },
            { icon: Tag, label: 'Sector', value: company.sector },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4.5 h-4.5 text-green-600" />
              </div>
              <div>
                <div className="text-stone-400 text-[10px] uppercase tracking-wide font-medium">{label}</div>
                <div className="text-stone-800 font-semibold text-sm">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats sidebar */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-5 text-white shadow-lg">
          <h4 className="font-semibold text-green-100 text-sm mb-4">Estadísticas del Local</h4>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{company.stats.rating}</div>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(company.stats.rating) ? 'text-amber-300 fill-amber-300' : 'text-green-600'}`} />
                ))}
                <span className="text-green-300 text-xs ml-1">Calificación</span>
              </div>
            </div>
            <div className="border-t border-green-600/40 pt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">{company.stats.products}</div>
                <div className="text-green-300 text-xs">Productos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{company.stats.sales}</div>
                <div className="text-green-300 text-xs">Ventas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan badge */}
        <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-stone-700 text-sm">Plan {company.plan}</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">ACTIVO</span>
          </div>
          <p className="text-stone-500 text-xs">Beneficios premium activos en esta empresa</p>
        </div>
      </div>
    </div>
  );
}

// ── CATALOG TAB ────────────────────────────────────────────
function CatalogTab({ companyProducts }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-stone-700 text-sm">
          {companyProducts.length} productos disponibles
        </h3>
        <span className="text-green-700 text-xs font-semibold">Ver todos</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {companyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// ── CERTIFICATIONS TAB ─────────────────────────────────────
function CertificationsTab({ company }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Certifications */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
        <h3 className="font-bold text-stone-800 text-base mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-600" />
          Certificaciones
        </h3>
        <div className="space-y-3">
          {company.certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-green-800 text-sm">{cert}</span>
              <ChevronRight className="w-4 h-4 text-green-400 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
        <h3 className="font-bold text-stone-800 text-base mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" />
          Información de Contacto
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <Mail className="w-4.5 h-4.5 text-green-700" />
            </div>
            <div>
              <div className="text-stone-400 text-[10px] uppercase tracking-wide">Email comercial</div>
              <div className="text-stone-700 text-sm font-medium">{company.contactEmail}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <Phone className="w-4.5 h-4.5 text-green-700" />
            </div>
            <div>
              <div className="text-stone-400 text-[10px] uppercase tracking-wide">WhatsApp empresarial</div>
              <div className="text-stone-700 text-sm font-medium">{company.whatsapp}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-green-700" />
            </div>
            <div>
              <div className="text-stone-400 text-[10px] uppercase tracking-wide">Sitio web</div>
              <div className="text-stone-700 text-sm font-medium">{company.website}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <MapPin className="w-4.5 h-4.5 text-green-700" />
            </div>
            <div>
              <div className="text-stone-400 text-[10px] uppercase tracking-wide">Ubicación</div>
              <div className="text-stone-700 text-sm font-medium">{company.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STORE PAGE ─────────────────────────────────────────────
export default function StorePage() {
  const { slug } = useParams();
  const { isFollowing, toggleFollow } = useFollow();
  const { startConversation } = useMessages();
  const [activeTab, setActiveTab] = useState('about');

  // Si no hay slug, mostramos el empty state de "Iniciar sesión"
  if (!slug) {
    return (
      <main className="pt-16 min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl border border-stone-100 p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-6 shadow-sm border border-green-200/50">
              <Store className="w-10 h-10 text-green-700" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              ¿Deseas ser parte de AgroSync?
            </h2>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed px-4">
              Estás a un paso de llevar tu empresa al siguiente nivel. Crea tu local digital, presenta tus productos y conecta con cientos de empresas del sector agroindustrial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-sm transition-all shadow-lg shadow-green-900/20 active:scale-95">
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold text-sm transition-all active:scale-95">
                Registrar Empresa
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const company = companies.find(c => c.slug === slug);
  const companyProducts = company ? products.filter((p) => p.companyId === company.id) : [];

  if (!company) {
    return <main className="pt-32 text-center text-stone-500 min-h-screen bg-stone-50">Empresa no encontrada.</main>;
  }

  return (
    <main className="pt-16 min-h-screen bg-stone-50">
      {/* ── BANNER ── */}
      <div className={`relative h-52 sm:h-64 lg:h-72 bg-gradient-to-r ${company.coverColor} overflow-hidden`}>
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Removed Gestión Empresarial since this is a public view */}
      </div>

      {/* ── IDENTITY CARD ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 relative z-10 mb-6">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {/* Logo */}
              <div
                className="w-24 h-24 -mt-12 sm:-mt-14 rounded-2xl border-4 shadow-xl flex items-center justify-center text-5xl flex-shrink-0 bg-white relative z-10"
                style={{ borderColor: company.logoColor }}
              >
                {company.logo}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {company.name}
                  </h1>
                  <VerificationBadge status={company.verified ? 'verified' : 'unverified'} size="md" />
                  {company.plan === 'Pro' && (
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">⭐ PRO</span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-green-500" />
                    {company.sector}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-blue-500" />
                    {company.stats.products} productos
                  </span>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4 max-w-2xl">
                  {company.description}
                </p>

                {/* ── ACTION BUTTONS ── */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => toggleFollow(company.name, company.slug)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2 ${
                      isFollowing(company.slug)
                        ? 'border-green-100 bg-green-50 text-green-700 hover:bg-green-100'
                        : 'border-green-600 bg-white text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFollowing(company.slug) ? 'fill-current' : ''}`} />
                    {isFollowing(company.slug) ? 'Siguiendo' : 'Seguir'}
                  </button>
                  <button
                    onClick={() => startConversation(company.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contactar
                  </button>

                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20B555] text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/20"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp Empresarial
                  </a>

                  <a
                    href={`mailto:${company.contactEmail}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-green-300 text-stone-700 font-semibold text-sm transition-all duration-200 hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    Correo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-stone-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all relative flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-green-700 border-b-2 border-green-600 -mb-px bg-green-50/50'
                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5 sm:p-6">
            {activeTab === 'about' && <AboutTab company={company} />}
            {activeTab === 'catalog' && <CatalogTab companyProducts={companyProducts} />}
            {activeTab === 'certifications' && <CertificationsTab company={company} />}
          </div>
        </div>
      </div>

      {/* ── CONTACT MODAL ── */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setContactModalOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                  {company.logo}
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-sm">Contactar a {company.name}</h3>
                  <p className="text-stone-400 text-xs">Por AgroSync Chat</p>
                </div>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <textarea
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-700 text-sm resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all"
              rows={4}
              placeholder="Escribe tu mensaje de contacto o consulta comercial..."
            />
            <p className="text-stone-400 text-xs mt-2 mb-4">Este mensaje se enviará a través del chat interno de AgroSync.</p>

            <div className="flex gap-3">
              <button
                onClick={() => setContactModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-all"
              >
                Cancelar
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-semibold transition-all shadow-lg">
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
