import { useState } from 'react';
import {
  X, Mail, Lock, Eye, EyeOff, Store, LogIn, UserPlus, Building2,
  MapPin, Globe, Phone, Users, FileText, ShieldCheck, Leaf, User,
} from 'lucide-react';
import { useAuth, testUsers } from '../../context/AuthContext';

const sectorOptions = ['Café', 'Cacao', 'Frutas', 'Insumos', 'Maquinaria', 'Lácteos', 'Hortalizas', 'Otro'];

function LoginView({ onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) {
        onSuccess(result.user, false);
      } else {
        setError(result.error);
      }
    }, 450);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-stone-500 mb-1.5">Email corporativo</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="empresa@correo.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-stone-50 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 mb-1.5">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type={showPw ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-stone-200 text-sm bg-stone-50 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-900/20 disabled:opacity-60 disabled:pointer-events-none"
      >
        <LogIn className="w-4 h-4" />
        {loading ? 'Verificando...' : 'Iniciar Sesión'}
      </button>

      {/* Test accounts */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="h-px bg-stone-200 flex-1" />
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Cuentas de prueba</span>
          <div className="h-px bg-stone-200 flex-1" />
        </div>
        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
          {testUsers.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => { setEmail(u.email); setPassword(u.password); setError(''); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-stone-50 hover:bg-green-50 border border-stone-100 hover:border-green-200 transition-all text-left group"
            >
              <span className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-sm flex-shrink-0">
                {u.empresa[0]}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-stone-700 truncate">{u.empresa}</span>
                <span className="block text-[10px] text-stone-400 truncate">{u.email}</span>
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-500 group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                {u.password}
              </span>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

function RegisterView({ onSuccess }) {
  const { register } = useAuth();
  const [tipo, setTipo] = useState('empresa');
  const [form, setForm] = useState({
    tipo: 'empresa',
    nombreCompleto: '',
    empresa: '',
    nit: '',
    sector: '',
    location: '',
    email: '',
    phone: '',
    employees: '',
    description: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isPersona = tipo === 'persona';

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const switchTipo = (t) => {
    setTipo(t);
    setForm({ ...form, tipo: t });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!isPersona && !form.nit?.trim()) {
      setError('Ingresa el NIT de la empresa.');
      return;
    }
    if (form.password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      setLoading(false);
      if (result.ok) {
        onSuccess(result.user, true);
      }
    }, 600);
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm bg-stone-50 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      {/* Tipo de cuenta */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => switchTipo('empresa')}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
            !isPersona
              ? 'border-green-600 bg-green-50 text-green-700'
              : 'border-stone-200 bg-white text-stone-500 hover:border-green-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Empresa
        </button>
        <button
          type="button"
          onClick={() => switchTipo('persona')}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
            isPersona
              ? 'border-green-600 bg-green-50 text-green-700'
              : 'border-stone-200 bg-white text-stone-500 hover:border-green-200'
          }`}
        >
          <User className="w-4 h-4" />
          Persona natural
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {isPersona ? (
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-green-600" />
              Nombre completo *
            </label>
            <input value={form.nombreCompleto} onChange={set('nombreCompleto')} placeholder="Ej: Carlos Ramírez" required maxLength={60} className={inputClass} />
          </div>
        ) : (
          <>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-green-600" />
                Nombre de la empresa *
              </label>
              <input value={form.empresa} onChange={set('empresa')} placeholder="Ej: Café La Esperanza SAS" required maxLength={60} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-green-600" />
                NIT *
              </label>
              <input value={form.nit} onChange={set('nit')} placeholder="900000000-0" required maxLength={15} className={inputClass} />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-green-600" />
            {isPersona ? 'Actividad / sector *' : 'Sector agropecuario *'}
          </label>
          <select value={form.sector} onChange={set('sector')} required className={inputClass}>
            <option value="" disabled>Selecciona un sector</option>
            {sectorOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-green-600" />
            Ubicación (departamento) *
          </label>
          <input value={form.location} onChange={set('location')} placeholder="Ej: Huila" required maxLength={40} className={inputClass} />
        </div>

        {!isPersona && (
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-green-600" />
              Número de empleados
            </label>
            <select value={form.employees} onChange={set('employees')} className={inputClass}>
              <option value="" disabled>Selecciona</option>
              {['1-5', '5-10', '10-20', '20-50', '50-100', '100+'].map((n) => (
                <option key={n} value={n}>{n} empleados</option>
              ))}
            </select>
          </div>
        )}

        <div className={isPersona ? 'sm:col-span-2' : ''}>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-green-600" />
            {isPersona ? 'Email personal *' : 'Email corporativo *'}
          </label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="usuario@correo.com" required maxLength={80} className={inputClass} />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-green-600" />
            {isPersona ? 'Teléfono / WhatsApp *' : 'WhatsApp empresarial *'}
          </label>
          <input value={form.phone} onChange={set('phone')} placeholder="+57 300 000 0000" required maxLength={20} className={inputClass} />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-green-600" />
            {isPersona ? '¿A qué te dedicas en el agro?' : '¿A qué se dedica tu empresa?'}
          </label>
          <textarea
            value={form.description}
            onChange={set('description')}
            rows={2}
            maxLength={200}
            placeholder={isPersona ? 'Contanos brevemente qué producís o comercializás...' : 'Contanos brevemente qué producen o exportan...'}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-green-600" />
            Contraseña *
          </label>
          <input type="password" value={form.password} onChange={set('password')} placeholder="Mínimo 4 caracteres" required maxLength={40} className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5">Confirmar contraseña *</label>
          <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repite la contraseña" required maxLength={40} className={inputClass} />
        </div>
      </div>

      <div className="flex items-start gap-2 pt-1">
        <input type="checkbox" required id="terms" className="mt-0.5 accent-green-600" />
        <label htmlFor="terms" className="text-[11px] text-stone-500 leading-snug">
          Acepto los <span className="text-green-700 font-medium">Términos de Uso</span> y la{' '}
          <span className="text-green-700 font-medium">Política de Privacidad</span> de AgroSync.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-900/20 disabled:opacity-60 disabled:pointer-events-none"
      >
        <UserPlus className="w-4 h-4" />
        {loading ? 'Creando tu cuenta...' : isPersona ? 'Crear mi cuenta gratis' : 'Crear mi Local Gratis'}
      </button>
    </form>
  );
}

export default function AuthModal({ onAuthenticated }) {
  const { showAuth, closeAuth, authMode, setAuthMode } = useAuth();

  if (!showAuth) return null;

  const handleSuccess = (u, isNew) => {
    closeAuth();
    onAuthenticated(u, isNew);
  };

  const switchMode = (m) => setAuthMode(m);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={closeAuth}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-stone-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
              <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Agro<span className="text-green-600">Sync</span>
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">Centro Comercial Digital Agroindustrial</div>
            </div>
          </div>
          <button onClick={closeAuth} className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors" aria-label="Cerrar">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-5 pb-3">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-stone-100">
            <button
              onClick={() => switchMode('login')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                authMode === 'login' ? 'bg-white shadow text-green-700' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Iniciar Sesión
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                authMode === 'register' ? 'bg-white shadow text-green-700' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Registro
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          {authMode === 'login' ? (
            <>
              <div className="mb-5">
                <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Hola de nuevo 👋
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  Ingresa para seguir construyendo tu red agroindustrial.
                </p>
              </div>
              <LoginView onSuccess={handleSuccess} />
            </>
          ) : (
            <>
              <div className="mb-5">
                <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Crea tu cuenta en AgroSync 🌱
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  ¿Somos una empresa o una persona natural? Cualquier actor del agro puede ser parte de la vitrina.
                </p>
                <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-green-50 border border-green-100 text-green-800 text-xs">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  Datos usados solo para tu perfil público en AgroSync. Sin costos ocultos.
                </div>
              </div>
              <RegisterView onSuccess={handleSuccess} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}