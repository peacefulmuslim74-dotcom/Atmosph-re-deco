import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface CollectionItem {
  id: ProductCategory;
  title: string;
  subtitle: string;
  countLabel: string;
  materialHighlight: string;
}

export const CollectionsSection: React.FC = () => {
  const { setActivePage, products } = useStore();

  const collections: CollectionItem[] = [
    {
      id: 'Salon',
      title: 'Salon & Assises',
      subtitle: 'Canapés architecturaux, fauteuils organiques, tables basses en bois noble',
      countLabel: 'Pièces maîtresses & Sur-mesure',
      materialHighlight: 'Bois massif, bouclé, lin lourd'
    },
    {
      id: 'Chambre',
      title: 'Chambre & Linge',
      subtitle: 'Têtes de lit tapissées, chevets sculptés et matières respirantes',
      countLabel: 'Repos & Atmosphère feutrée',
      materialHighlight: 'Pur lin lavé, chêne clair'
    },
    {
      id: 'Espace enfant',
      title: 'Espace Enfant',
      subtitle: 'Mobilier évolutif, rangements épurés et douces teintes naturelles',
      countLabel: 'Design & Sécurité',
      materialHighlight: 'Hêtre naturel sans solvant'
    },
    {
      id: 'Table',
      title: 'Art de la Table',
      subtitle: 'Céramiques d’auteur, plats en grès, couverts laiton et verres soufflés',
      countLabel: 'Moments partagés',
      materialHighlight: 'Grès chamotté, verre artisanal'
    },
    {
      id: 'Décoration',
      title: 'Objets & Sculptures',
      subtitle: 'Vases monoxyles, miroirs architecturaux et curiosités esthétiques',
      countLabel: 'Curations & Pièces singulières',
      materialHighlight: 'Terre cuite, travertin, bronze'
    },
    {
      id: 'Luminaires',
      title: 'Luminaires & Éclairage',
      subtitle: 'Suspensions aériennes, lampes à poser en pierre et appliques sculpturales',
      countLabel: 'Lumière chaleureuse',
      materialHighlight: 'Opaline, laiton patiné, albâtre'
    },
    {
      id: 'Extérieur',
      title: 'Extérieur & Terrasses',
      subtitle: 'Mobilier résistant aux embruns marins des Almadies et salons ombragés',
      countLabel: 'Vie en plein air',
      materialHighlight: 'Teck imputrescible, cordage tressé'
    },
    {
      id: 'Accessoires',
      title: 'Accessoires & Textiles',
      subtitle: 'Coussins texturés, plaids tissés main et petits éléments d’élégance',
      countLabel: 'Détails de caractère',
      materialHighlight: 'Laine naturelle, coton sauvage'
    }
  ];

  const handleSelectCollection = (cat: ProductCategory) => {
    setActivePage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="collections-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10">
      
      {/* Editorial Chapter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">01</span>
            <span>—</span>
            <span>CATALOGUE MAISON</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            Les Collections
          </h2>
        </div>
        <p className="text-sm text-[#544D42] max-w-md font-light leading-relaxed">
          Chaque pièce proposée chez Atmosphère est pensée pour dialoguer avec l’architecture et le rythme des intérieurs de Dakar.
        </p>
      </div>

      {/* Structured Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((item, index) => {
          const productCount = products.filter(p => p.category === item.id).length;
          
          return (
            <div
              key={item.id}
              onClick={() => handleSelectCollection(item.id)}
              className="group p-6 bg-[#F6F2EC] hover:bg-[#EFE9E0] border border-[#1E1B18]/5 transition-luxury flex flex-col justify-between min-h-[260px] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#8E8679]">
                  <span className="font-mono text-[11px] text-[#1E1B18]">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] tracking-wider uppercase">
                    {productCount} {productCount > 1 ? 'sélections' : 'sélection'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif-display font-medium text-[#1E1B18] group-hover:text-[#8C6D4F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C564B] mt-2 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1E1B18]/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#787164] font-light">
                  {item.materialHighlight}
                </span>
                <span className="text-[#1E1B18] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chapter Footer Action */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setActivePage('catalogue')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1E1B18] hover:text-[#8C6D4F] border-b border-[#1E1B18] pb-1 transition-colors"
        >
          <span>Consulter l'ensemble du catalogue et disponibilités</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

    </section>
  );
};
