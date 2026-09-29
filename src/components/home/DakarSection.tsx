import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Compass, Sun, Wind, ArrowUpRight } from 'lucide-react';
import { AtmosphereLogo } from '../common/AtmosphereLogo';

export const DakarSection: React.FC = () => {
  const { settings, setActivePage } = useStore();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10">
      
      {/* Chapter Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">06</span>
            <span>—</span>
            <span>ANCRAGE & GÉOGRAPHIE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            Dakar & Les Almadies
          </h2>
        </div>
        <p className="text-sm text-[#544D42] max-w-md font-light leading-relaxed">
          Un ancrage singulier sur la presqu’île du Cap-Vert, où l’architecture contemporaine rencontre l’intensité de la lumière atlantique.
        </p>
      </div>

      {/* Main Architectural Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Authentic Architectural Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4 text-sm text-[#4A443B] leading-relaxed font-light">
            <p>
              Implantée sur la <strong className="font-medium text-[#1E1B18]">Route des Almadies</strong>, Atmosphère Décoration s’inscrit au cœur d’un quartier vibrant et cosmopolite, marqué par des villas d’architectes ouvertes sur l’océan et des intérieurs raffinés.
            </p>
            <p>
              Concevoir et choisir du mobilier à Dakar exige une sensibilité particulière aux éléments : l'air marin, la chaleur douce, la recherche d'ombres apaisantes et la circulation fluide de l'air. C'est pourquoi nous privilégions des essences de bois denses, des tissus respirants en lin ou coton brut, et des pierres naturelles minérales.
            </p>
            <p>
              Sans folklore artificiel ni clichés, notre démarche valorise un luxe sobre, intemporel et profondément adapté aux modes de vie contemporains au Sénégal.
            </p>
          </div>

          {/* Geographical Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1E1B18]/10 text-xs">
            <div className="p-4 bg-[#F5EFE6] border border-[#1E1B18]/5 space-y-1">
              <Sun size={16} className="text-[#8C6D4F]" />
              <p className="font-medium text-[#1E1B18] pt-1">Lumière Atlantique</p>
              <p className="text-[#6B6357] text-[11px] font-light">Teintes douces et reflets chauds</p>
            </div>
            <div className="p-4 bg-[#F5EFE6] border border-[#1E1B18]/5 space-y-1">
              <Wind size={16} className="text-[#8C6D4F]" />
              <p className="font-medium text-[#1E1B18] pt-1">Matières Adaptées</p>
              <p className="text-[#6B6357] text-[11px] font-light">Résistance au climat côtier</p>
            </div>
            <div className="p-4 bg-[#F5EFE6] border border-[#1E1B18]/5 space-y-1">
              <MapPin size={16} className="text-[#8C6D4F]" />
              <p className="font-medium text-[#1E1B18] pt-1">Almadies, Dakar</p>
              <p className="text-[#6B6357] text-[11px] font-light">Boutique & Showroom</p>
            </div>
          </div>
        </div>

        {/* Right Column: Stylized Minimalist Map / Coordinate Plate */}
        <div className="lg:col-span-6 bg-[#1E1B18] text-[#EFEBE4] p-8 sm:p-12 relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-[#A89F90] border-b border-[#36312B] pb-4">
              <span>REPÈRE GÉOGRAPHIQUE</span>
              <span>DAKAR · SÉNÉGAL</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <AtmosphereLogo size="xs" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C9BFB0]">
                  Showroom & Écrin Décoratif
                </span>
              </div>
              <h3 className="text-3xl font-serif-display text-white">
                Route des Almadies
              </h3>
              <p className="text-xs text-[#A89F90] font-mono">
                14°44'35.5"N 17°30'52.9"W · Presqu'île de Dakar
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#C9BFB0] border-t border-[#36312B] pt-4 font-light leading-relaxed">
              <p>
                Accueil du lundi au samedi pour découvrir nos pièces en situation ou étudier vos plans d'aménagement avec nos conseillers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setActivePage('contact')}
                  className="px-5 py-2.5 bg-[#FBF9F5] text-[#1E1B18] hover:bg-[#E2DBD1] text-xs uppercase tracking-wider font-medium transition-luxury flex items-center justify-center gap-2"
                >
                  <span>Plan d'accès & Horaires</span>
                  <ArrowUpRight size={13} />
                </button>
                <button
                  onClick={() => setActivePage('sur-mesure')}
                  className="px-5 py-2.5 border border-[#4A433A] text-white hover:border-white text-xs uppercase tracking-wider transition-colors"
                >
                  Projets d'intérieur
                </button>
              </div>
            </div>
          </div>

          {/* Compass Rose Ambient Background Graphic */}
          <div className="absolute -bottom-16 -right-16 text-[#292520] select-none pointer-events-none opacity-40">
            <Compass size={280} strokeWidth={0.5} />
          </div>
        </div>

      </div>

    </section>
  );
};
