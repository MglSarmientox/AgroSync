import { Leaf, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  plataforma: [
    { label: 'Inicio', to: '/' },
    { label: 'Marketplace', to: '/marketplace' },
    { label: 'Directorio de Empresas', to: '/directorio' },
    { label: 'Mi Local', to: '/mi-local' },
  ],
  empresa: [
    { label: 'Acerca de AgroSync', to: '#' },
    { label: 'Planes y Precios', to: '#' },
    { label: 'Verificación', to: '#' },
    { label: 'Blog Agro', to: '#' },
  ],
  soporte: [
    { label: 'Centro de Ayuda', to: '#' },
    { label: 'Contacto', to: '#' },
    { label: 'Términos de Uso', to: '#' },
    { label: 'Política de Privacidad', to: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-200">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Agro<span className="text-green-400">Sync</span>
                </span>
                <span className="text-green-600 text-[9px] font-medium tracking-widest uppercase">Centro Comercial Digital</span>
              </div>
            </Link>
            <p className="text-green-400/70 text-sm leading-relaxed mb-6 max-w-sm">
              El ecosistema digital donde las empresas agroindustriales colombianas se conectan, 
              descubren y hacen negocios. Descubrir → Conectar → Negociar.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400/60 text-xs">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Bogotá D.C., Colombia</span>
              </div>
              <div className="flex items-center gap-2 text-green-400/60 text-xs">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>hola@agrosync.co</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-green-200 font-semibold text-sm uppercase tracking-wider mb-4">
                {section === 'plataforma' ? 'Plataforma' : section === 'empresa' ? 'Empresa' : 'Soporte'}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-green-400/60 text-sm hover:text-green-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="border-t border-green-800/40 pt-8 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Empresas activas', value: '234+' },
              { label: 'Productos en catálogo', value: '1,847+' },
              { label: 'Transacciones', value: '5,620+' },
              { label: 'Departamentos', value: '28' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-green-300 font-bold text-xl">{value}</div>
                <div className="text-green-500/60 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-800/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-500/50 text-xs">
            © 2026 AgroSync. Todos los derechos reservados.
          </p>
          <p className="text-green-600/40 text-xs">
            Hecho con 🌱 para el sector agroindustrial colombiano
          </p>
        </div>
      </div>
    </footer>
  );
}
