import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, ShieldCheck, MapPin, Clock, ArrowUpRight, AlertCircle } from 'lucide-react';

export const LivraisonView: React.FC = () => {
  const { deliveryZones, setActivePage, getWhatsAppUrl } = useStore();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1E1B18]/10 pb-8 mb-12">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
          <span className="font-mono text-[#1E1B18]">SERVICES & EXPÉDITIONS</span>
          <span>—</span>
          <span>SÉNÉGAL</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
          Livraison & Acheminement Soigné
        </h1>
        <p className="text-sm text-[#544D42] max-w-2xl mt-3 font-light leading-relaxed">
          Chaque pièce de mobilier ou objet décoratif requiert une attention méticuleuse. Nous assurons une livraison adaptée aux contraintes de votre domicile à Dakar et dans toutes les régions du Sénégal.
        </p>
      </div>

      {/* Admin Notice */}
      <div className="mb-10 p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 flex items-start gap-3 text-xs text-[#5C564B]">
        <AlertCircle size={16} className="text-[#8C6D4F] shrink-0 mt-0.5" />
        <div>
          <strong className="font-medium text-[#1E1B18]">Tarification administrable :</strong> Les montants et délais ci-dessous sont configurés par l'administration d'Atmosphère Décoration. Pour les pièces volumineuses ou les accès complexes (étages sans ascenseur), une étude spécifique peut être demandée.
        </div>
      </div>

      {/* The 3 Official Zones */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-serif-display text-[#1E1B18]">
          Zones Tarifaires Actuelles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryZones.map((zone) => (
            <div
              key={zone.id}
              className="p-6 bg-[#FBF9F5] border border-[#1E1B18]/10 flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#8C6D4F]">
                  <MapPin size={16} />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#1E1B18] font-medium">
                    {zone.name.split('(')[0]}
                  </span>
                </div>

                <h3 className="font-serif-display text-xl text-[#1E1B18]">
                  {zone.name}
                </h3>

                <p className="text-xs text-[#665F53] leading-relaxed font-light">
                  {zone.notes}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E1B18]/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C8375] flex items-center gap-1 font-mono">
                    <Clock size={12} /> Délais :
                  </span>
                  <span className="font-medium text-[#1E1B18]">{zone.delay}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C8375] font-mono">Tarif indicatif :</span>
                  <span className="text-base font-semibold text-[#1E1B18] font-mono tabular-nums">
                    {zone.fee.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement & Care Standards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 bg-[#F6F2EC] border border-[#1E1B18]/10 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8C6D4F]">
            <ShieldCheck size={18} />
            <h3 className="font-serif-display text-lg text-[#1E1B18]">
              Protection Objets Fragiles & Verrerie
            </h3>
          </div>
          <p className="text-xs text-[#5C564B] leading-relaxed font-light pl-6">
            Tous nos vases, pièces en céramique émaillée, vaisselle et luminaires sont conditionnés dans des emballages renforcés conçus pour absorber les vibrations du transport urbain.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8C6D4F]">
            <Truck size={18} />
            <h3 className="font-serif-display text-lg text-[#1E1B18]">
              Mobilier Lourd & Montage sur Place
            </h3>
          </div>
          <p className="text-xs text-[#5C564B] leading-relaxed font-light pl-6">
            Pour les canapés, tables en bois massif et buffets de grande envergure, la livraison s'accompagne de l'installation dans la pièce de votre choix et du retrait des emballages.
          </p>
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="p-8 bg-[#1E1B18] text-[#EFEBE4] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-serif-display text-white">
            Une question sur une adresse spécifique ?
          </h3>
          <p className="text-xs text-[#A89F90] mt-1 font-light">
            Contactez notre coordinateur logistique pour planifier un créneau horaire précis.
          </p>
        </div>
        <a
          href={getWhatsAppUrl("Bonjour, je souhaite des précisions concernant les modalités de livraison à mon adresse.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#FBF9F5] text-[#1E1B18] hover:bg-[#E2DBD1] text-xs uppercase tracking-wider font-medium transition-luxury flex items-center gap-2 shrink-0"
        >
          <span>Échanger avec le service livraison</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

    </div>
  );
};
