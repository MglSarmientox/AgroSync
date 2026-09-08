import { useState, useEffect } from 'react';
import {
  Leaf, Menu, X, Bell, ShoppingBag, Search,
  ChevronDown, LogIn, Building2, Store, Home,
  ShoppingCart, MessageCircle, Heart,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFollow } from '../../context/FollowContext';
import { useMessages } from '../../context/MessageContext';

const navLinks = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
  { to: '/directorio', label: 'Directorio', icon: Building2 },
  { to: '/siguiendo', label: 'Siguiendo', icon: Heart },
  { to: '/mi-local', label: 'Mi Local', icon: Store },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, unreadCount: notifUnread, markAllRead } = useFollow();
  const { toggleChat, unreadMessagesCount } = useMessages();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-green-950/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-green-800/30'
            : 'bg-green-950'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* LOGO */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Agro<span className="text-green-400">Sync</span>
                </span>
                <span className="text-green-500 text-[9px] font-medium tracking-widest uppercase">Centro Comercial Digital</span>
              </div>
            </Link>

            {/* NAV LINKS — Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(to)
                      ? 'text-green-300 bg-green-900/60'
                      : 'text-green-100/70 hover:text-green-200 hover:bg-green-900/40'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* RIGHT ACTIONS — Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-green-300/70 hover:text-green-300 hover:bg-green-900/50 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    if (notifUnread > 0) markAllRead();
                  }}
                  className="relative p-2 rounded-lg text-green-300/70 hover:text-green-300 hover:bg-green-900/50 transition-all"
                >
                  <Bell className="w-5 h-5" />
                  {notifUnread > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full pulse-green" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifOpen && (
                  <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden transform origin-top-right transition-all">
                    <div className="p-4 border-b border-stone-50 flex items-center justify-between bg-stone-50/50">
                      <h3 className="font-bold text-stone-800 text-sm">Notificaciones</h3>
                      <span className="text-xs text-stone-500">{notifications.length}</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="flex flex-col">
                          {notifications.map((notif) => (
                            <div key={notif.id} className="p-4 border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                              <p className="text-sm text-stone-800 mb-1">{notif.message}</p>
                              <span className="text-[10px] text-stone-400">{notif.time}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-stone-400 text-sm">
                          No tienes notificaciones nuevas
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bandeja */}
              <button 
                onClick={toggleChat}
                className="relative p-2 rounded-lg text-green-300/70 hover:text-green-300 hover:bg-green-900/50 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-amber-900 shadow-sm border border-green-950">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              <div className="w-px h-6 bg-green-800" />

              {/* Auth CTA */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-green-900/40 hover:shadow-green-600/30 hover:scale-105 active:scale-95">
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </button>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex lg:hidden items-center gap-2">
              <button className="relative p-2 rounded-lg text-green-300/70 hover:text-green-300 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-lg text-green-200 hover:bg-green-900/50 transition-all"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* SEARCH BAR DROPDOWN — Desktop */}
          <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 pb-3' : 'max-h-0'}`}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              <input
                type="text"
                placeholder="Buscar productos, empresas, oportunidades..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-green-900/60 border border-green-700/50 text-green-100 placeholder-green-500 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all"
                autoFocus={searchOpen}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-green-950 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Agro<span className="text-green-400">Sync</span>
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-lg text-green-400 hover:bg-green-900/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-green-800/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            <input
              type="text"
              placeholder="Buscar en AgroSync..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-green-900/60 border border-green-700/50 text-green-100 placeholder-green-500 text-sm focus:outline-none focus:border-green-500 transition-all"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(to)
                  ? 'text-green-300 bg-green-900/60 border border-green-700/40'
                  : 'text-green-100/70 hover:text-green-200 hover:bg-green-900/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-4 py-5 border-t border-green-800/40 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-all shadow-lg">
            <LogIn className="w-4 h-4" />
            Iniciar Sesión
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-green-700 text-green-300 hover:bg-green-900/50 font-medium text-sm transition-all">
            Crear cuenta empresarial
          </button>
        </div>
      </div>
    </>
  );
}
