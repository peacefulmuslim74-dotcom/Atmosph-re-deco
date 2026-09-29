import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { X, ShoppingBag, ArrowUpRight, Check, Compass } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, getWhatsAppUrl, setActivePage } = useStore();

  const hasPrice = product.price !== null && !product.isPriceOnRequest;

  const handleInquireCustom = () => {
    onClose();
    setActivePage('sur-mesure');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        className="relative bg-[#FBF9F5] max-w-4xl w-full border border-[#1E1B18]/20 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#FBF9F5]/90 hover:bg-[#1E1B18] text-[#1E1B18] hover:text-white rounded-full flex items-center justify-center transition-colors"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Imagery */}
          <div className="relative aspect-square sm:aspect-auto bg-[#EFEAE2] overflow-hidden flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isDemoAsset && (
              <div className="absolute bottom-3 left-3 bg-[#1E1B18]/80 text-[#EFEBE4] px-2.5 py-1 text-[10px] font-mono tracking-wider">
                [Visuel conceptuel pour Atmosphère]
              </div>
            )}
          </div>

          {/* Right: Technical & Editorial Sheet */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#8C8375] border-b border-[#1E1B18]/10 pb-2">
                <span>{product.category} · {product.collection}</span>
                <span>RÉF : {product.reference}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif-display text-[#1E1B18] font-light">
                  {product.name}
                </h3>
                <div className="mt-2">
                  {hasPrice ? (
                    <span className="text-xl font-semibold text-[#1E1B18] font-mono tabular-nums">
                      {product.price?.toLocaleString('fr-FR')} FCFA
                    </span>
                  ) : (
                    <span className="text-sm font-serif-display italic text-[#8C6D4F]">
                      Prix sur demande / Fabrication sur mesure
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4A443B] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="space-y-2 pt-2 border-t border-[#1E1B18]/10 text-xs">
                <div className="grid grid-cols-3 py-1.5 border-b border-[#1E1B18]/5">
                  <span className="text-[#8C8375] font-mono">Dimensions</span>
                  <span className="col-span-2 text-[#1E1B18]">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-[#1E1B18]/5">
                  <span className="text-[#8C8375] font-mono">Matériaux</span>
                  <span className="col-span-2 text-[#1E1B18]">{product.materials}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-[#1E1B18]/5">
                  <span className="text-[#8C8375] font-mono">Finitions</span>
                  <span className="col-span-2 text-[#1E1B18]">{product.color}</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-[#1E1B18]/5">
                  <span className="text-[#8C8375] font-mono">Disponibilité</span>
                  <span className="col-span-2 text-[#1E1B18] font-medium">{product.availability}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#1E1B18]/10">
              {hasPrice ? (
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={15} />
                  <span>Ajouter au panier ({product.price?.toLocaleString('fr-FR')} FCFA)</span>
                </button>
              ) : null}

              {/* Direct WhatsApp Inquiry */}
              <a
                href={getWhatsAppUrl(`Bonjour Atmosphère Décoration, je souhaite me renseigner sur la pièce "${product.name}" (Réf : ${product.reference}). Pouvez-vous me préciser les délais et modalités ?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#EFEAE2] text-xs uppercase tracking-[0.14em] font-medium transition-luxury flex items-center justify-center gap-2 text-center"
              >
                <span>Renseignement WhatsApp direct</span>
                <ArrowUpRight size={14} />
              </a>

              {/* Custom Dimensions Request */}
              <button
                onClick={handleInquireCustom}
                className="w-full text-center text-[11px] text-[#7A7265] hover:text-[#1E1B18] underline tracking-wider uppercase transition-colors"
              >
                Demander cette pièce dans d'autres dimensions ou matières
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
