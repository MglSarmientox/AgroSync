import { Leaf, Mail, Phone, MapPin, MessageCircle, Globe, Share2, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Directorio', to: '/directorio' },
  { label: 'Siguiendo', to: '/siguiendo' },
  { label: 'Mi Local', to: '/mi-local' },
];

const socialLinks = [
  { label: 'Sitio web', href: 'https://agrosync.co', icon: Globe },
  { label: 'Redes sociales', href: 'https://instagram.com', icon: Share2 },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Link2 },
  { label: 'WhatsApp', href: 'https://wa.me/573001234567', icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-200 border-t border-green-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Agro<span className="text-green-400">Sync</span>
              </span>
              <span className="text-green-600 text-[8px] font-medium tracking-widest uppercase">Centro Comercial Digital</span>
            </div>
          </Link>

          {/* Quick links */}
          <nav className="hidden md:flex items-center gap-5">
            {quickLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-green-400/70 text-xs font-medium hover:text-green-300 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="mailto:hola@agrosync.co"
              className="flex items-center gap-1.5 text-green-400/70 text-xs hover:text-green-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              hola@agrosync.co
            </a>
            <a
              href="tel:+573001234567"
              className="flex items-center gap-1.5 text-green-400/70 text-xs hover:text-green-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +57 300 123 4567
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-green-500/50 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              Bogotá D.C., Colombia
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-green-400/70 hover:text-white hover:bg-green-900/60 hover:scale-105 active:scale-95 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-green-800/30 py-2 px-1 flex items-center justify-between gap-2">
          <p className="text-green-500/50 text-[11px]">
            © 2026 AgroSync. Todos los derechos reservados.
          </p>
          <p className="text-green-600/40 text-[11px] hidden sm:block">
            Hecho con 🌱 para el agro colombiano
          </p>
        </div>
      </div>
    </footer>
  );
}