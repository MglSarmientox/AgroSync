import { Leaf, Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeSplash({ user, onContinue }) {
  return (
    <button
      type="button"
      onClick={onContinue}
      className="fixed inset-0 z-[500] cursor-pointer text-left bg-gradient-to-br from-green-950 via-green-900 to-emerald-900 animate-fade-in overflow-hidden"
      style={{ animationDuration: '0.6s' }}
    >
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-green-500/15 blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl animate-blob" style={{ animationDelay: '-6s' }} />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-black/30 mb-6 animate-float">
          <Leaf className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>

        <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <Sparkles className="w-4 h-4" />
          Tu local ha nacido
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          ¡Bienvenido a la familia
        </h1>
        <p className="text-green-300 font-semibold text-2xl sm:text-3xl pb-1 border-b-2 border-green-500/40 mb-5 px-6">
          {user?.empresa}!
        </p>
        <p className="text-green-200/60 text-sm max-w-sm mb-10">
          Te damos la bienvenida a AgroSync. Aquí tu empresa se presenta ante el campo colombiano: revisa tu local y completa los pasos para salir a la vitrina.
        </p>

        <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-green-100 text-sm font-semibold hover:bg-white/15 transition-colors animate-float" style={{ animationDelay: '-1.5s' }}>
          Ir a Mi Local
          <ArrowRight className="w-4 h-4 text-green-300" />
        </div>
      </div>
    </button>
  );
}