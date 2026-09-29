import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AtmosphereLogo } from '../common/AtmosphereLogo';
import { Lock, Eye, EyeOff, AlertCircle, X, ShieldAlert } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { settings, setActivePage } = useStore();

  // Basic password authentication check stored in component state (with session continuity)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('atmosphere_admin_auth') === 'true';
  });
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const validPasscode = settings.adminPasscode || 'atmosphere2024';

    setTimeout(() => {
      if (password.trim() === validPasscode) {
        sessionStorage.setItem('atmosphere_admin_auth', 'true');
        setIsAuthenticated(true);
        setPassword('');
        setErrorMessage(null);
      } else {
        setErrorMessage('Mot de passe incorrect. Veuillez réessayer.');
      }
      setIsSubmitting(false);
    }, 250);
  };

  const handleCancel = () => {
    setActivePage('home');
  };

  // If not authenticated, display the login modal
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div 
          className="bg-[#1E1B18] text-[#EFEBE4] max-w-md w-full p-6 sm:p-8 border border-[#3A352F] shadow-2xl relative overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-auth-title"
        >
          {/* Top close/cancel trigger */}
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-[#A89F90] hover:text-white transition-colors"
            aria-label="Fermer et retourner au site"
          >
            <X size={18} />
          </button>

          {/* Modal Header & Brand */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <AtmosphereLogo size="md" />
            <div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-mono text-[#9BBA1A]">
                <ShieldAlert size={12} />
                <span>Zone Restreinte</span>
              </div>
              <h2 id="admin-auth-title" className="text-2xl font-serif-display text-white mt-1">
                Connexion Administrateur
              </h2>
              <p className="text-xs text-[#A89F90] mt-1 font-light">
                {settings.storeName} — Route des Almadies, Dakar
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#C9BFB0] block">
                Mot de Passe Propriétaire
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-3.5 py-2.5 bg-[#121110] border border-[#3A352F] focus:border-[#9BBA1A] text-sm text-white focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7265] hover:text-[#C9BFB0] transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="w-1/3 py-2.5 border border-[#3A352F] text-xs uppercase tracking-wider text-[#C9BFB0] hover:text-white hover:bg-[#2B2723] transition-colors"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-2.5 bg-[#9BBA1A] hover:bg-[#8AA617] text-[#121110] font-semibold text-xs tracking-wider uppercase transition-luxury flex items-center justify-center gap-2 shadow disabled:opacity-75"
              >
                <Lock size={14} />
                <span>{isSubmitting ? 'Validation...' : 'Déverrouiller'}</span>
              </button>
            </div>
          </form>

          {/* Discreet Access Information */}
          <div className="mt-6 pt-4 border-t border-[#3A352F]/70 text-[11px] text-[#8C8375] font-light text-center space-y-1.5">
            <p>
              Accès protégé par mot de passe.
            </p>
            <p className="text-[10px] font-mono text-[#A89F90]">
              Mot de passe démo : <code className="text-white bg-black/60 px-1.5 py-0.5">atmosphere2024</code>
            </p>
          </div>

        </div>
      </div>
    );
  }

  // Once authenticated, render children (AdminDashboard)
  return <>{children}</>;
};
