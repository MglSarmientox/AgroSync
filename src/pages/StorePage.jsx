import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin, Package, ShieldCheck, MessageCircle, Phone,
  Mail, Star, Award, Users,
  ChevronRight, Globe, Calendar, Building2, Tag, LogIn, Store, Heart,
  Camera, BarChart3, Settings, Pencil, ShoppingCart, Megaphone,
  Check, Sparkles, ImageIcon, FileText,
} from 'lucide-react';
import { useFollow } from '../context/FollowContext';
import { useMessages } from '../context/MessageContext';
import { useAuth } from '../context/AuthContext';
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

// ── MI LOCAL (LOGGED IN) ────────────────────────────────────
const setupItems = [
  { id: 'logo', icon: Camera, label: 'Sube el logo de tu empresa', hint: 'Usa el botón de la cámara sobre tu logo' },
  { id: 'banner', icon: ImageIcon, label: 'Ponle un banner a tu local', hint: 'Usa el botón "Cambiar banner" arriba' },
  { id: 'info', icon: FileText, label: 'Cuenta la historia de tu empresa', hint: 'Qué exportas y hacia dónde' },
  { id: 'producto', icon: Package, label: 'Publica tu primer producto', hint: 'Tu catálogo sale al Marketplace' },
  { id: 'certificaciones', icon: ShieldCheck, label: 'Añade tus certificaciones', hint: 'Genera confianza en tus clientes' },
  { id: 'contacto', icon: Phone, label: 'Verifica tus datos de contacto', hint: 'Email de comercio y WhatsApp' },
];

function MiLocalDashboard({ user, toggleChat, unreadMessagesCount }) {
  const isNewCompany = !!user.newCompany;
  const [activeUtility, setActiveUtility] = useState(null);
  const [visits] = useState(() => {
    const now = Date.now();
    const today = new Date().toDateString();
    try {
      const saved = JSON.parse(localStorage.getItem('agrosync_milocal_visits'));
      const last = typeof saved?.last === 'number' ? saved.last : 0;
      const isFresh = last && now - last < 60000;
      const rawTotal = Number(saved?.total);
      const currentTotal = Number.isFinite(rawTotal) && rawTotal > 0 ? Math.floor(rawTotal) : 128;
      const currentToday = saved?.today === today && Number.isFinite(Number(saved?.todayCount))
        ? Math.max(0, Math.floor(Number(saved.todayCount)))
        : 0;

      if (isFresh) {
        return { total: currentTotal, today: currentToday };
      }

      const elapsedHours = Math.max((now - last) / 3600000, 0);
      const increment = Math.max(1, Math.min(14, Math.round(elapsedHours * 0.8)));
      const newTotal = currentTotal + increment;
      const newToday = currentToday + 1;
      localStorage.setItem('agrosync_milocal_visits', JSON.stringify({ total: newTotal, last: now, today, todayCount: newToday }));
      return { total: newTotal, today: newToday };
    } catch {
      localStorage.setItem('agrosync_milocal_visits', JSON.stringify({ total: 128, last: now, today, todayCount: 1 }));
      return { total: 128, today: 1 };
    }
  });

  const [done, setDone] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`agrosync_setup_${user.id}`));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const allDone = done.length === setupItems.length;
  const showAnalytics = !isNewCompany || allDone;
  const setupPct = Math.round((done.length / setupItems.length) * 100);

  const markItem = (id) => {
    if (done.includes(id)) return;
    const next = [...done, id];
    setDone(next);
    try {
      localStorage.setItem(`agrosync_setup_${user.id}`, JSON.stringify(next));
    } catch {
      // no bloqueamos la vista
    }
  };

  const toggleItem = (id) => {
    if (done.includes(id)) {
      const next = done.filter((d) => d !== id);
      setDone(next);
      try {
        localStorage.setItem(`agrosync_setup_${user.id}`, JSON.stringify(next));
      } catch {
        // no bloqueamos la vista
      }
    } else {
      markItem(id);
    }
  };

  const utilities = [
    { id: 'logo', icon: Camera, title: 'Logo y banner', desc: 'Sube la foto de tu logo y un banner de tu local. Es lo primero que ven los compradores: haz que destaque.' },
    { id: 'productos', icon: Package, title: 'Productos', desc: 'Publica lo que exportas o vendes: fotos, precios y disponibilidad. Tu catálogo se muestra en el Marketplace.' },
    { id: 'pedidos', icon: ShoppingCart, title: 'Pedidos', desc: 'Recibe y gestiona las órdenes de tus compradores en un solo lugar, con estados claros.' },
    { id: 'estadisticas', icon: BarChart3, title: 'Estadísticas', desc: 'Mira visitas a tu local, productos más vistos y ventas mes a mes para tomar mejores decisiones.' },
    { id: 'mensajes', icon: MessageCircle, title: 'Mensajes', desc: `Conversa con tus clientes y proveedores (${unreadMessagesCount} sin leer). Responde rápido para cerrar más negocios.` },
    { id: 'perfil', icon: Pencil, title: 'Perfil e historia', desc: 'Cuenta tu historia, certificaciones y contactos. Una empresa con buen perfil genera más confianza.' },
    { id: 'promociones', icon: Megaphone, title: 'Promociones', desc: 'Crea ofertas y descuentos por tiempo limitado para atraer más compradores a tu vitrina.' },
    { id: 'config', icon: Settings, title: 'Configuración', desc: 'Administra datos de tu empresa, red de contacto y preferencias de tu local.' },
  ];

  return (
    <main className="pt-16 min-h-screen bg-stone-50 pb-16">
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 h-44 sm:h-52 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <button
          onClick={() => markItem('banner')}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur text-green-100 text-xs font-semibold hover:bg-white/20 transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          Cambiar banner
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Identity card */}
        <div className="-mt-14 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative flex-shrink-0 w-fit">
                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-5xl">
                  🏷️
                </div>
                <button
                  onClick={() => markItem('logo')}
                  className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-105 active:scale-95"
                  title="Subir logo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {user.empresa}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold border border-amber-200">PLAN {user.plan}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-green-500" />
                    {user.sector}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    {user.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-blue-500" />
                    {user.email}
                  </span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed max-w-2xl">
                  Este es tu local digital. Desde aquí administras tu vitrina, tus productos y tu red de contactos en AgroSync.
                </p>
              </div>

              <button
                onClick={toggleChat}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-xs transition-all shadow-lg shadow-green-900/20 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Abrir mensajes
              </button>
            </div>
          </div>
        </div>

        {/* Welcome hero — solo para empresas recién registradas */}
        {isNewCompany && (
          <div className="mt-6 animate-fade-in-up">
            <div className="bg-gradient-to-r from-green-700 to-emerald-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-2 text-amber-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bienvenido a AgroSync
                </div>
                <h2 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  ¡Bienvenido a la familia AgroSync, {user.empresa}!
                </h2>
                <p className="text-green-100/85 text-sm mt-2 max-w-2xl">
                  Agradecemos que tu empresa se una a nuestra vitrina. Sigue los pasos de abajo para dejar tu local listo: cuando completes cada uno, se marcará automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Setup checklist */}
        {!allDone ? (
          <div className="mt-6 animate-fade-in-up">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-green-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Antes de usar la plataforma
                  </div>
                  <h3 className="font-bold text-stone-800 text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Deja tu local listo
                  </h3>
                  <p className="text-stone-500 text-sm mt-1 max-w-xl">
                    Completa estas tareas para presentar tu empresa de la mejor forma. Se marcan automáticamente al hacerlas.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-green-700" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{setupPct}%</div>
                  <div className="text-xs text-stone-400">{done.length}/{setupItems.length} completados</div>
                </div>
              </div>

              <div className="h-2 rounded-full bg-stone-100 overflow-hidden mb-5">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${setupPct}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {setupItems.map((item) => {
                  const Icon = item.icon;
                  const isDone = done.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all active:scale-[0.99] ${
                        isDone
                          ? 'border-green-300 bg-green-50'
                          : 'border-stone-100 bg-white hover:border-green-200 hover:bg-green-50/40'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold ${isDone ? 'text-green-800 line-through decoration-green-400/60' : 'text-stone-800'}`}>
                          {item.label}
                        </div>
                        <div className={`text-[11px] ${isDone ? 'text-green-600' : 'text-stone-400'}`}>
                          {isDone ? '¡Completado!' : item.hint}
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isDone ? 'border-green-600 bg-green-600' : 'border-stone-200'}`}>
                        {isDone && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 animate-fade-in-up">
            <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-xl p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    ¡Tu local está listo!
                  </h3>
                  <p className="text-green-100/85 text-sm max-w-xl">
                    Completaste todos los pasos. Tu empresa ya está lista para salir a la vitrina.
                  </p>
                </div>
              </div>
              <span className="hidden sm:block px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider flex-shrink-0">
                100% completo
              </span>
            </div>
          </div>
        )}

        {/* Utilities */}
        {showAnalytics && (
          <div className="mt-8">
            <h2 className="font-bold text-stone-800 text-lg mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Utilidades de tu local
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {utilities.map((u) => {
                const Icon = u.icon;
                const isActive = activeUtility === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => setActiveUtility(isActive ? null : u.id)}
                    className={`text-left rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      isActive
                        ? 'border-green-400 bg-green-50 shadow-md'
                        : 'bg-white border-stone-100 hover:border-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isActive && <Check className="w-4 h-4 text-green-600" />}
                    </div>
                    <h3 className="font-semibold text-stone-800 text-sm mb-1.5">{u.title}</h3>
                    <p className={`text-xs leading-relaxed transition-colors ${isActive ? 'text-green-900' : 'text-stone-500'}`}>
                      {u.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick stats */}
        {showAnalytics && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-700" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{visits.total}</div>
              <div className="text-xs text-stone-500 font-semibold mt-0.5">Visitas a tu local</div>
              <div className="text-[10px] text-green-600 mt-1">{visits.today} nuevo{visits.today !== 1 ? 's' : ''} visitante{visits.today !== 1 ? 's' : ''} hoy</div>
            </div>
            {[
              { label: 'Productos publicados', value: '0', trend: 'Sube tu primer producto' },
              { label: 'Pedidos recibidos', value: '0', trend: 'Llegan aquí' },
              { label: 'Mensajes', value: String(unreadMessagesCount), trend: 'Revisa tu bandeja' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
                <div className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-stone-500 font-semibold mt-0.5">{s.label}</div>
                <div className="text-[10px] text-green-600 mt-1">{s.trend}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ── STORE PAGE ─────────────────────────────────────────────
export default function StorePage() {
  const { slug } = useParams();
  const { isFollowing, toggleFollow } = useFollow();
  const { startConversation, unreadMessagesCount, toggleChat } = useMessages();
  const { user, openAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('about');

  // Si no hay slug, mostramos el empty state de "Iniciar sesión"
  // o el dashboard de "Mi Local" si hay sesión iniciada.
  if (!slug) {
    if (user) {
      return (
        <MiLocalDashboard
          user={user}
          toggleChat={toggleChat}
          unreadMessagesCount={unreadMessagesCount}
        />
      );
    }

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
              <button
                onClick={() => openAuth('login')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-sm transition-all shadow-lg shadow-green-900/20 active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </button>
              <button
                onClick={() => openAuth('register')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold text-sm transition-all active:scale-95"
              >
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
    </main>
  );
}
