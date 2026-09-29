import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { ArrowUpRight, ShoppingBag, Eye } from 'lucide-react';

export const BoutiqueSection: React.FC = () => {
  const { 
    products, 
    addToCart, 
    setSelectedProductForModal, 
    setActivePage,
    getWhatsAppUrl 
  } = useStore();

  // Featured pieces
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10">
      
      {/* Chapter Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">04</span>
            <span>—</span>
            <span>SHOWROOM & ÉCRIN</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            La Boutique
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActivePage('catalogue')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#1E1B18] hover:text-[#8C6D4F] transition-colors"
          >
            <span>Voir tout le catalogue</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Product Grid - 4 Columns Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => {
          const hasPrice = product.price !== null && !product.isPriceOnRequest;
          
          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between bg-[#FBF9F5] border border-[#1E1B18]/5 transition-luxury hover:border-[#1E1B18]/20"
            >
              {/* Product Visual Container */}
              <div 
                onClick={() => setSelectedProductForModal(product)}
                className="relative aspect-[4/3] bg-[#EFE9E0] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle availability badge (unboxed editorial text) */}
                <div className="absolute top-3 left-3 bg-[#FBF9F5]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-wider uppercase font-mono text-[#1E1B18]">
                  {product.availability}
                </div>

                {/* Quick view button overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="px-4 py-2 bg-[#FBF9F5] text-[#1E1B18] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-md">
                    <Eye size={13} />
                    <span>Détails de la pièce</span>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C8375] font-mono mb-1">
                    <span>{product.category}</span>
                    <span>{product.reference}</span>
                  </div>
                  <h3 
                    onClick={() => setSelectedProductForModal(product)}
                    className="text-lg font-serif-display font-medium text-[#1E1B18] hover:text-[#8C6D4F] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#5C564B] mt-1.5 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Materials & Dimensions Specs */}
                <div className="pt-3 border-t border-[#1E1B18]/5 text-[11px] text-[#7A7265] space-y-1 font-light">
                  <p className="truncate">
                    <span className="font-normal text-[#1E1B18]">Matière :</span> {product.materials}
                  </p>
                  <p className="truncate">
                    <span className="font-normal text-[#1E1B18]">Dim :</span> {product.dimensions}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-[#1E1B18]/10 flex items-center justify-between">
                  <div>
                    {hasPrice ? (
                      <span className="text-sm font-semibold text-[#1E1B18] font-mono tabular-nums">
                        {product.price?.toLocaleString('fr-FR')} FCFA
                      </span>
                    ) : (
                      <span className="text-xs font-serif-display italic text-[#8C6D4F]">
                        Prix sur demande
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {hasPrice ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white transition-luxury"
                        title="Ajouter au panier"
                        aria-label="Ajouter au panier"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    ) : (
                      <a
                        href={getWhatsAppUrl(`Bonjour, je souhaite me renseigner sur le tarif et la disponibilité de la pièce : ${product.name} (${product.reference}).`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white text-[11px] tracking-wider uppercase transition-luxury"
                      >
                        Demander
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
