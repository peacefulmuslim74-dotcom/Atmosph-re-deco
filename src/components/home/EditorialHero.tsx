import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AtmosphereLogo } from '../common/AtmosphereLogo';

import heroImg from '../../assets/images/hero_atmosphere_dakar_1790648952795.jpg';
import craftImg from '../../assets/images/craft_sur_mesure_1790648964083.jpg';

export const EditorialHero: React.FC = () => {
  const { setActivePage, getWhatsAppUrl } = useStore();

  const scrollToNext = () => {
    const el = document.getElementById('collections-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Top Editorial Index & Coordinates */}
      <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-4 text-xs tracking-[0.2em] uppercase text-[#736B5F]">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[#1E1B18]">VOL. XXIV</span>
          <span>—</span>
          <span>DAKAR · 14°44' N / 17°31' W</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>ROUTE DES ALMADIES</span>
          <span>·</span>
          <span>MAISON D'INTÉRIEUR</span>
        </div>
      </div>

      {/* Main Architectural Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
        
        {/* Left Column: Expressive Typography & Manifesto with Logo */}
        <div className="lg:col-span-5 space-y-8 z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <AtmosphereLogo size="md" />
              <div>
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#736B5F] block font-mono">
                  IDENTITÉ OFFICIELLE · DAKAR
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-[#1E1B18] font-medium">
                  Maison de Création & Mobilier
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif-display font-medium text-[#1E1B18] tracking-tight leading-[1.05]">
                ATMOSPHÈRE
              </h1>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="font-script-signature text-4xl sm:text-5xl text-[#1E1B18] tracking-wide">
                  L'Art d'Habiter
                </span>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-24 bg-[#1E1B18]" />

          <p className="text-sm sm:text-base text-[#474138] leading-relaxed font-light max-w-md">
            Entre la lumière atlantique de la presqu'île des Almadies et l'élégance contemporaine des lignes pures. Mobilier sur mesure, matières brutes, art de la table et pièces uniques pour intérieurs d'exception.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('catalogue')}
              className="px-6 py-3.5 bg-[#1E1B18] text-[#FBF9F5] hover:bg-[#38332D] text-xs tracking-[0.16em] uppercase transition-luxury"
            >
              Explorer les Collections
            </button>
            <button
              onClick={() => setActivePage('sur-mesure')}
              className="px-6 py-3.5 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#EFEAE2] text-xs tracking-[0.16em] uppercase transition-luxury flex items-center gap-2"
            >
              <span>Atelier Sur-Mesure</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Editorial Micro Information */}
          <div className="pt-4 flex items-center gap-6 text-xs text-[#7A7265] border-t border-[#1E1B18]/10">
            <div>
              <span className="block font-mono text-[10px] text-[#A89F91]">LOCALISATION</span>
              <span className="text-[#1E1B18] font-medium">Almadies, Dakar</span>
            </div>
            <div className="w-[1px] h-6 bg-[#1E1B18]/10" />
            <div>
              <span className="block font-mono text-[10px] text-[#A89F91]">CONFECT. ATELIER</span>
              <span className="text-[#1E1B18] font-medium">Bois nobles & Pierres</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Editorial Photographic Composition */}
        <div className="lg:col-span-7 relative">
          
          {/* Vertical Typography Line */}
          <div className="hidden xl:block absolute -left-8 top-12 -rotate-90 origin-top-left text-[10px] tracking-[0.35em] text-[#8E8679] uppercase font-mono select-none">
            SCÉNOGRAPHIE INTÉRIEURE · ATMOSPHÈRE
          </div>

          {/* Main Visual Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-[#ECE6DD] border border-[#1E1B18]/10 shadow-sm group">
            <img
              src={heroImg}
              alt="Atmosphère Décoration Dakar — Scénographie d'intérieur contemporain aux Almadies"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Measured luxury scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            
            {/* Visual caption */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white text-xs">
              <span className="text-[11px] tracking-widest uppercase font-light drop-shadow">
                Collection Almadies · Matières texturées & Lumière
              </span>
              <span className="text-[10px] opacity-75 font-mono">
                [Visuel éditorial conceptuel]
              </span>
            </div>
          </div>

          {/* Secondary Inset Photographic Card (Craftsmanship / Detail) */}
          <div className="hidden sm:block absolute -bottom-8 -left-6 sm:-bottom-10 sm:-left-8 w-44 md:w-56 aspect-[4/3] bg-[#FBF9F5] p-2 border border-[#1E1B18]/15 shadow-xl transition-transform duration-500 hover:-translate-y-1">
            <div className="relative w-full h-full overflow-hidden bg-[#E2DBD1]">
              <img
                src={craftImg}
                alt="Détail de confection et sur-mesure"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 left-2 text-[9px] uppercase tracking-wider text-white font-mono drop-shadow">
                Atelier Sur-Mesure
              </div>
            </div>
          </div>

          {/* Official Brand Stamp on Top Right */}
          <div className="absolute -top-5 -right-5 z-20">
            <AtmosphereLogo size="md" />
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator & Fast Links */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1E1B18]/10 text-xs text-[#7A7265]">
        <button
          onClick={scrollToNext}
          className="flex items-center gap-2 hover:text-[#1E1B18] transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.18em] uppercase text-[11px]">Découvrir l'univers</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>

        <div className="flex items-center gap-6 tracking-[0.14em] text-[11px] uppercase">
          <span className="hidden md:inline">Mobilier</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">Objets de collection</span>
          <span className="hidden md:inline">·</span>
          <span>Commandes personnalisées</span>
        </div>
      </div>

    </section>
  );
};

