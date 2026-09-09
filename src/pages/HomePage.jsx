import HeroSection from '../components/home/HeroSection';
import OpportunitiesSection from '../components/home/OpportunitiesSection';
import FeaturedCompanies from '../components/home/FeaturedCompanies';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Footer from '../components/layout/Footer';
import { ArrowRight, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CtaBanner() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-green-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(245,158,11,0.05)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 shadow-xl shadow-green-900/50">
          <Leaf className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          ¿Tu empresa aún no está en AgroSync?
        </h2>
        <p className="text-green-300/70 text-lg mb-8 max-w-2xl mx-auto">
          Abre tu local digital, presenta tus productos y conecta con cientos de empresas del sector agroindustrial colombiano.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-bold text-sm transition-all duration-200 hover:scale-105 shadow-xl shadow-green-900/40">
            Crear mi Local Gratis
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/directorio')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-green-700 text-green-300 hover:bg-green-900/50 font-semibold text-sm transition-all"
          >
            Explorar Empresas
          </button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <OpportunitiesSection />
      <FeaturedCompanies />
      <FeaturedProducts />
      <CtaBanner />
      <Footer />
    </main>
  );
}
