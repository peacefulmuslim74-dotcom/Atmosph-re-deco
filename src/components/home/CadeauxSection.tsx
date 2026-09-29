import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight, Gift, Sparkles, HeartHandshake } from 'lucide-react';

import tableImg from '../../assets/images/table_art_vivre_1790648976139.jpg';
import sculptureImg from '../../assets/images/sculpture_objet_art_1790648987021.jpg';

export const CadeauxSection: React.FC = () => {
  const { setActivePage, getWhatsAppUrl } = useStore();

  const giftHighlights = [
    {
      title: 'Objets Sculpturaux & Céramiques',
      desc: 'Des pièces modelées ou sculptées qui traversent le temps, pensées comme des œuvres intimistes à poser.',
      icon: Sparkles
    },
    {
      title: 'Art de la Table & Convivialité',
      desc: 'Assiettes en grès naturel, plats généreux et accessoires de service pour célébrer l’art de recevoir à Dakar.',
      icon: Gift
    },
    {
      title: 'Sélections Délicates & Textiles',
      desc: 'Plaids tissés à la main, coussins en lin texturé et objets de senteur pour sublimer le quotidien.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10">
      
      {/* Chapter Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">05</span>
            <span>—</span>
            <span>ATTENTIONS D'EXCEPTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            Idées Cadeaux
          </h2>
        </div>
        <p className="text-sm text-[#544D42] max-w-md font-light leading-relaxed">
          Offrir une pièce Atmosphère, c’est transmettre un fragment d’art de vivre, façonné avec patience et discernement.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 3 Gift Features */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            {giftHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/5 space-y-2 hover:bg-[#EFEAE2] transition-colors"
                >
                  <div className="flex items-center gap-3 text-[#8C6D4F]">
                    <Icon size={18} />
                    <h3 className="text-lg font-serif-display text-[#1E1B18] font-medium">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#595247] leading-relaxed font-light pl-7">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePage('catalogue')}
              className="px-6 py-3 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider transition-luxury"
            >
              Explorer les objets de collection
            </button>
            <a
              href={getWhatsAppUrl("Bonjour, je recherche une idée cadeau d'exception chez Atmosphère Décoration. Pouvez-vous me conseiller sur vos pièces actuelles ?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#1E1B18] hover:underline"
            >
              <span>Conseil cadeau personnalisé</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Right: Gift Visual Collage */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-[#E5DFD6] overflow-hidden border border-[#1E1B18]/10">
              <img
                src={sculptureImg}
                alt="Idée cadeau objet d'art Atmosphère"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-[11px] text-[#7A7265] font-mono text-center">
              PIÈCES SCULPTURALES
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="aspect-[3/4] bg-[#E5DFD6] overflow-hidden border border-[#1E1B18]/10">
              <img
                src={tableImg}
                alt="Art de la table cadeau"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-[11px] text-[#7A7265] font-mono text-center">
              ARTS DE LA TABLE
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
