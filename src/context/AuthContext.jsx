import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const testUsers = [
  {
    id: 1,
    empresa: 'AgroVerde SAS',
    email: 'agroverde@test.com',
    password: 'demo123',
    sector: 'Cacao',
    location: 'Valle del Cauca',
    verified: true,
    plan: 'Pro',
    slug: 'agroverde-sas',
  },
  {
    id: 2,
    empresa: 'FrutiAndes Ltda.',
    email: 'frutiandes@test.com',
    password: '1234',
    sector: 'Frutas',
    location: 'Antioquia',
    verified: true,
    plan: 'Advance',
    slug: 'frutiandes',
  },
  {
    id: 3,
    empresa: 'CafeSur Colombia',
    email: 'cafesur@test.com',
    password: '1234',
    sector: 'Café',
    location: 'Huila',
    verified: true,
    plan: 'Advance',
    slug: 'cafesur-colombia',
  },
  {
    id: 4,
    empresa: 'AgroPack Solutions',
    email: 'agropack@test.com',
    password: '1234',
    sector: 'Insumos',
    location: 'Bogotá D.C.',
    verified: true,
    plan: 'Business',
    slug: 'agropack-solutions',
  },
  {
    id: 5,
    empresa: 'BioHerbal del Campo',
    email: 'bioherbal@test.com',
    password: '1234',
    sector: 'Insumos',
    location: 'Nariño',
    verified: false,
    plan: 'Pro',
    slug: 'bioherbal-del-campo',
  },
  {
    id: 6,
    empresa: 'Trópico Cacao SAS',
    email: 'tropico@test.com',
    password: '1234',
    sector: 'Cacao',
    location: 'Santander',
    verified: true,
    plan: 'Business',
    slug: 'tropico-cacao-sas',
  },
  {
    id: 7,
    empresa: 'Carlos Ramírez',
    email: 'carlos@test.com',
    password: '1234',
    sector: 'Hortalizas',
    location: 'Cundinamarca',
    verified: false,
    plan: 'Básico',
    tipo: 'persona',
    newCompany: false,
    slug: 'carlos-ramirez',
  },
];

function serializeUser(user) {
  const safe = { ...user };
  delete safe.password;
  return safe;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clamp(text, max) {
  return String(text ?? '').trim().replace(/\s+/g, ' ').slice(0, max);
}

// Lista blanca: recupera del localStorage SOLO campos conocidos y con tipos
// controlados. Impide que un localStorage manipulado inyecte datos raros o
// campos extra (password, __proto__, etc.) dentro del estado de la app.
function sanitizePersistedUser(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const id = Number(raw.id);
  const tipo = raw.tipo === 'persona' ? 'persona' : 'empresa';
  const plan = typeof raw.plan === 'string' && raw.plan ? raw.plan.slice(0, 20) : 'Básico';
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase().slice(0, 80) : '';
  if (!EMAIL_PATTERN.test(email)) return null;
  return {
    id: Number.isFinite(id) ? Math.floor(id) : Date.now(),
    tipo,
    empresa: typeof raw.empresa === 'string' ? raw.empresa.trim().slice(0, 60) : '',
    email,
    sector: typeof raw.sector === 'string' ? raw.sector.trim().slice(0, 40) : '',
    location: typeof raw.location === 'string' ? raw.location.trim().slice(0, 40) : '',
    verified: raw.verified === true,
    plan,
    newCompany: raw.newCompany === true,
    slug: typeof raw.slug === 'string' ? raw.slug.trim().slice(0, 80) : '',
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return sanitizePersistedUser(JSON.parse(localStorage.getItem('agrosync_user')));
    } catch {
      return null;
    }
  });
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const login = useCallback((email, password) => {
    const found = testUsers.find(
      (u) => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.password === password
    );
    if (!found) {
      return { ok: false, error: 'Credenciales incorrectas. Revisa el email y la contraseña.' };
    }
    const safe = serializeUser(found);
    setUser(safe);
    localStorage.setItem('agrosync_user', JSON.stringify(safe));
    return { ok: true, user: safe };
  }, []);

  const register = useCallback((data) => {
    const isPersona = data.tipo === 'persona';
    const displayName = clamp(isPersona ? data.nombreCompleto : data.empresa, 60);
    const email = String(data.email ?? '').trim().toLowerCase().slice(0, 80);
    if (!displayName) {
      return { ok: false, error: isPersona ? 'Ingresa tu nombre completo.' : 'Ingresa el nombre de la empresa.' };
    }
    if (!EMAIL_PATTERN.test(email)) {
      return { ok: false, error: 'El email no es válido. Revisa que tenga formato nombre@dominio.co' };
    }
    const newUser = sanitizePersistedUser({
      id: Date.now(),
      tipo: isPersona ? 'persona' : 'empresa',
      empresa: displayName,
      email,
      sector: clamp(data.sector, 40),
      location: clamp(data.location, 40),
      verified: false,
      plan: 'Básico',
      newCompany: true,
      slug: displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80),
    });
    setUser(newUser);
    localStorage.setItem('agrosync_user', JSON.stringify(newUser));
    return { ok: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('agrosync_user');
  }, []);

  const openAuth = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  }, []);

  const closeAuth = useCallback(() => setShowAuth(false), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        showAuth,
        authMode,
        setAuthMode,
        openAuth,
        closeAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}