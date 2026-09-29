import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';
import { InstagramFeed } from '../social/InstagramFeed';

import tableImg from '../../assets/images/table_art_vivre_1790648976139.jpg';
import sculptureImg from '../../assets/images/sculpture_objet_art_1790648987021.jpg';
import heroImg from '../../assets/images/hero_atmosphere_dakar_1790648952795.jpg';

export const InspirationsSection: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10 space-y-16">
      
      {/* Chapter Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">02</span>
            <span>—</span>
            <span>ÉDITORIAL & MATIÈRES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            Nos Inspirations
          </h2>
        </div>
        <p className="text-sm text-[#544D42] max-w-md font-light leading-relaxed">
          Un dialogue subtil entre les tonalités chaudes du littoral sénégalais, la minéralité des pierres locales et la noblesse des matières texturées.
        </p>
      </div>

      {/* Editorial Spread / Asymmetrical Magazine Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Vertical Large Visual with Story */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="relative aspect-[16/11] bg-[#EAE4DB] overflow-hidden border border-[#1E1B18]/10 group">
            <img
              src={tableImg}
              alt="Atmosphère — L'Art de vivre et de recevoir"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#FBF9F5]/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#1E1B18] font-mono">
              Inspiration I · La Table Vivante
            </div>
            <div className="absolute bottom-4 right-4 text-white text-[10px] font-mono drop-shadow">
              [Grès & Linge brut]
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C8375] font-mono">
              MOUVEMENT & MATÉRIALITÉ
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-display text-[#1E1B18]">
              Lenteur, matières vivantes et lumière naturelle
            </h3>
            <p className="text-sm text-[#595247] leading-relaxed font-light">
              La table n'est pas un décor figé : c'est un point de rencontre. Nous sélectionnons des pièces en céramique façonnées à la main, où chaque légère irrégularité témoigne du geste humain. Associées au lin non blanchi et au bois patiné, elles confèrent à l’espace de vie une sérénité authentique.
            </p>
          </div>
        </div>

        {/* Right Column: Two Stacked Curations & Design Philosophy */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          {/* Card 1: Sculptural Object */}
          <div className="p-6 bg-[#F5EFE6] border border-[#1E1B18]/10 space-y-4">
            <div className="aspect-[16/9] overflow-hidden bg-[#E2DBD1]">
              <img
                src={sculptureImg}
                alt="Objet sculptural céramique"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#8C8375]">
                Inspiration II · Silence des Formes
              </span>
              <h4 className="text-lg font-serif-display text-[#1E1B18]">
                L'objet comme présence silencieuse
              </h4>
              <p className="text-xs text-[#5C564B] leading-relaxed">
                Choisir peu de choses, mais choisir des pièces de caractère qui captent l’œil sans surcharger la respiration du lieu.
              </p>
            </div>
          </div>

          {/* Quotation / Architectural Philosophy */}
          <div className="p-8 bg-[#1E1B18] text-[#EFEBE4] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <blockquote className="font-serif-display text-xl sm:text-2xl leading-relaxed text-[#D8D2C6]">
                « L'art d'habiter ne consiste pas à remplir un espace, mais à lui offrir une âme par la justesse de chaque proportion. »
              </blockquote>
              <span className="font-script-signature text-2xl sm:text-3xl text-[#9BBA1A] block">
                Atmosphère · Dakar
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#9A9183] border-t border-[#36322C] pt-4">
              <span className="font-mono text-[11px] tracking-wider">ROUTE DES ALMADIES</span>
              <button
                onClick={() => setActivePage('galerie')}
                className="flex items-center gap-1.5 text-white hover:underline text-[11px] uppercase tracking-wider"
              >
                <span>Voir la galerie</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Official Instagram Live Stream Component */}
      <div className="pt-8">
        <InstagramFeed variant="light" />
      </div>

    </section>
  );
};
