import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight, Compass, MessageCircle, Layers, Hammer, Truck } from 'lucide-react';

import craftImg from '../../assets/images/craft_sur_mesure_1790648964083.jpg';

export const SurMesureSection: React.FC = () => {
  const { setActivePage } = useStore();

  const steps = [
    {
      num: '01',
      title: 'Idée & Envie',
      icon: Compass,
      desc: 'Vous nous partagez vos envies, les dimensions de votre pièce ou vos inspirations visuelles (photos, esquisses, plans d’architecte).'
    },
    {
      num: '02',
      title: 'Échange & Étude',
      icon: MessageCircle,
      desc: 'Nous étudions l’espace et échangeons au showroom des Almadies ou à distance pour affiner les volumes et l’usage souhaité.'
    },
    {
      num: '03',
      title: 'Sélection des Matières',
      icon: Layers,
      desc: 'Choix minutieux des essences de bois massifs, finitions métalliques (laiton brossé, noir mat), pierres et étoffes (lin lavé, bouclé).'
    },
    {
      num: '04',
      title: 'Création Artisanale',
      icon: Hammer,
      desc: 'Mise en œuvre par nos maîtres ébénistes et artisans partenaires. Chaque assemblage fait l’objet d’un soin rigoureux.'
    },
    {
      num: '05',
      title: 'Livraison & Installation',
      icon: Truck,
      desc: 'Acheminement soigné et mise en place dans votre intérieur à Dakar ou dans les régions du Sénégal selon vos disponibilités.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10">
      
      {/* Chapter Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">03</span>
            <span>—</span>
            <span>ATELIER & COMMANDES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            Le Sur-Mesure
          </h2>
        </div>
        <div className="max-w-md space-y-2">
          <p className="text-sm text-[#544D42] font-light leading-relaxed">
            Pour les pièces aux dimensions spécifiques, les agencements complets ou les créations uniques adaptées à vos espaces de vie.
          </p>
          <p className="text-xs text-[#8C8375] font-light italic">
            * Les délais de fabrication et budgets sont établis sur étude personnalisée sans barème générique.
          </p>
        </div>
      </div>

      {/* Visual Feature Grid with Image & Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left Column: Workshop Craft Visual */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] bg-[#E5DFD6] overflow-hidden border border-[#1E1B18]/10 group">
            <img
              src={craftImg}
              alt="Atelier de création sur-mesure Atmosphère Dakar"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#E2DBD1]">
                Atelier Atmosphère
              </span>
              <h3 className="text-2xl font-serif-display text-white">
                Donner corps à votre vision
              </h3>
              <p className="text-xs text-[#E0D8CB] font-light leading-relaxed">
                Du meuble singulier à l'aménagement complet de villa ou d'appartement contemporain.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: The 5 Steps */}
        <div className="lg:col-span-7 space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 bg-[#F6F2EC] border border-[#1E1B18]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-luxury hover:bg-[#EFE9E0]"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs font-semibold text-[#8C6D4F] w-6">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E5DFD6] flex items-center justify-center text-[#1E1B18]">
                    <Icon size={16} />
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-base font-serif-display font-medium text-[#1E1B18]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#5C564B] mt-0.5 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Action Banner to dedicated page */}
      <div className="p-8 bg-[#1E1B18] text-[#EFEBE4] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-serif-display text-white">
            Vous avez un projet d'aménagement à Dakar ?
          </h3>
          <p className="text-xs text-[#A69E90] mt-1 max-w-lg font-light">
            Déposez votre cahier des charges, dimensions et images de référence via notre formulaire dédié. Nous étudions chaque demande avec attention.
          </p>
        </div>
        <button
          onClick={() => setActivePage('sur-mesure')}
          className="px-8 py-3.5 bg-[#FBF9F5] text-[#1E1B18] hover:bg-[#E2D8CC] text-xs uppercase tracking-[0.16em] font-medium transition-luxury whitespace-nowrap flex items-center gap-2"
        >
          <span>Déposer un projet sur mesure</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

    </section>
  );
};
