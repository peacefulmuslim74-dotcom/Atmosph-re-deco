import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory, ProductAvailability, Product } from '../../types';
import { ProductModal } from './ProductModal';
import { Search, SlidersHorizontal, ShoppingBag, Eye, X, ArrowUpRight, Loader2, ChevronDown, Sparkles } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export const CatalogueView: React.FC = () => {
  const { 
    products, 
    addToCart, 
    selectedProductForModal, 
    setSelectedProductForModal,
    searchQuery,
    setSearchQuery,
    getWhatsAppUrl
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [onlyNew, setOnlyNew] = useState(false);
  const [priceFilterType, setPriceFilterType] = useState<'all' | 'priced' | 'on_request'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name'>('newest');

  // Progressive Loading State
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [enableInfiniteScroll, setEnableInfiniteScroll] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Toutes les créations' },
    { id: 'Salon', label: 'Salon' },
    { id: 'Chambre', label: 'Chambre' },
    { id: 'Espace enfant', label: 'Espace enfant' },
    { id: 'Table', label: 'Art de la table' },
    { id: 'Décoration', label: 'Décoration & Objets' },
    { id: 'Luminaires', label: 'Luminaires' },
    { id: 'Extérieur', label: 'Extérieur' },
    { id: 'Accessoires', label: 'Accessoires' },
  ];

  const availabilities: { id: string; label: string }[] = [
    { id: 'all', label: 'Toutes disponibilités' },
    { id: 'En boutique', label: 'En boutique' },
    { id: 'Sur commande', label: 'Sur commande' },
    { id: 'Sur mesure', label: 'Sur mesure' },
  ];

  // Reset pagination when any filter or query changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, selectedAvailability, onlyNew, priceFilterType, sortBy, searchQuery]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Availability filter
      if (selectedAvailability !== 'all' && p.availability !== selectedAvailability) {
        return false;
      }
      // Only new filter
      if (onlyNew && !p.isNew) {
        return false;
      }
      // Price type
      if (priceFilterType === 'priced' && (p.price === null || p.isPriceOnRequest)) {
        return false;
      }
      if (priceFilterType === 'on_request' && p.price !== null && !p.isPriceOnRequest) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchMat = p.materials.toLowerCase().includes(q);
        const matchRef = p.reference.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchMat && !matchRef && !matchCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        return (a.price || 9999999) - (b.price || 9999999);
      }
      if (sortBy === 'price_desc') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    });
  }, [products, selectedCategory, selectedAvailability, onlyNew, priceFilterType, sortBy, searchQuery]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 400);
  };

  // Optional Infinite Scroll Trigger via IntersectionObserver
  useEffect(() => {
    if (!enableInfiniteScroll || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const target = sentinelRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [enableInfiniteScroll, hasMore, isLoadingMore]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedAvailability('all');
    setOnlyNew(false);
    setPriceFilterType('all');
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1E1B18]/10 pb-8 mb-12">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
          <span className="font-mono text-[#1E1B18]">CATALOGUE</span>
          <span>—</span>
          <span>ATMOSPHÈRE DAKAR</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
          Mobilier & Objets d'Intérieur
        </h1>
        <p className="text-sm text-[#544D42] max-w-2xl mt-3 font-light leading-relaxed">
          Découvrez nos collections actuelles, pièces disponibles au showroom des Almadies et créations confectionnées à la commande.
        </p>
      </div>

      {/* Control Bar: Categories & Filters */}
      <div className="space-y-6 mb-10">
        
        {/* Category Horizontal Scroll / Segmented Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-luxury whitespace-nowrap border ${
                  isSelected 
                    ? 'bg-[#1E1B18] text-[#FBF9F5] border-[#1E1B18]' 
                    : 'bg-[#F6F2EC] text-[#544E44] border-transparent hover:border-[#1E1B18]/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F6F2EC] border border-[#1E1B18]/5 text-xs text-[#544E44]">
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-[#8C8375] font-mono uppercase text-[10px]">Dispo :</span>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="bg-[#FBF9F5] px-2.5 py-1.5 border border-[#1E1B18]/10 text-xs focus:outline-none"
              >
                {availabilities.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>

            {/* Price Type */}
            <div className="flex items-center gap-2">
              <span className="text-[#8C8375] font-mono uppercase text-[10px]">Tarif :</span>
              <select
                value={priceFilterType}
                onChange={(e) => setPriceFilterType(e.target.value as any)}
                className="bg-[#FBF9F5] px-2.5 py-1.5 border border-[#1E1B18]/10 text-xs focus:outline-none"
              >
                <option value="all">Tous tarifs</option>
                <option value="priced">Prix affiché</option>
                <option value="on_request">Prix sur demande</option>
              </select>
            </div>

            {/* Only New checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
                className="rounded text-[#1E1B18] focus:ring-0"
              />
              <span>Nouveautés uniquement</span>
            </label>
          </div>

          {/* Right: Sort & Results Count */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[#7A7265]">
              {displayedProducts.length} sur {filteredProducts.length} {filteredProducts.length > 1 ? 'pièces' : 'pièce'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[#8C8375] font-mono uppercase text-[10px]">Trier :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FBF9F5] px-2.5 py-1.5 border border-[#1E1B18]/10 text-xs focus:outline-none"
              >
                <option value="newest">Nouveautés d'abord</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="name">Alphabétique (A-Z)</option>
              </select>
            </div>

            {(selectedCategory !== 'all' || selectedAvailability !== 'all' || onlyNew || priceFilterType !== 'all' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-[11px] underline text-[#8C6D4F] hover:text-[#1E1B18] transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#F6F2EC] border border-[#1E1B18]/10 p-8">
          <p className="font-serif-display text-2xl text-[#1E1B18]">
            Aucune pièce ne correspond à ces critères
          </p>
          <p className="text-xs text-[#6B6357] max-w-md mx-auto">
            Essayez de modifier vos filtres ou contactez-nous directement pour une recherche sur mesure dans notre showroom.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#1E1B18] text-white text-xs uppercase tracking-wider"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => {
              const hasPrice = product.price !== null && !product.isPriceOnRequest;
              
              return (
                <div
                  key={product.id}
                  className="group bg-[#FBF9F5] border border-[#1E1B18]/10 hover:border-[#1E1B18]/30 transition-luxury flex flex-col justify-between"
                >
                  {/* Visual Frame */}
                  <div 
                    onClick={() => setSelectedProductForModal(product)}
                    className="relative aspect-[4/3] bg-[#EAE4DB] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Availability badge */}
                    <div className="absolute top-3 left-3 bg-[#FBF9F5]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-wider uppercase font-mono text-[#1E1B18]">
                      {product.availability}
                    </div>

                    {product.isNew && (
                      <div className="absolute top-3 right-3 bg-[#1E1B18] text-white px-2 py-0.5 text-[9px] tracking-widest uppercase font-mono">
                        NOUVEAUTÉ
                      </div>
                    )}

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-[#FBF9F5] text-[#1E1B18] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow">
                        <Eye size={13} />
                        <span>Fiche détaillée</span>
                      </span>
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#8C8375] font-mono">
                        <span>{product.category}</span>
                        <span>RÉF : {product.reference}</span>
                      </div>

                      <h3 
                        onClick={() => setSelectedProductForModal(product)}
                        className="text-xl font-serif-display font-medium text-[#1E1B18] hover:text-[#8C6D4F] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#5C564B] line-clamp-2 leading-relaxed font-light pt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="pt-3 border-t border-[#1E1B18]/5 text-[11px] text-[#7A7265] space-y-1 font-light">
                      <p className="truncate">
                        <span className="font-normal text-[#1E1B18]">Matériaux :</span> {product.materials}
                      </p>
                      <p className="truncate">
                        <span className="font-normal text-[#1E1B18]">Dimensions :</span> {product.dimensions}
                      </p>
                    </div>

                    {/* Price & Primary Call to Action */}
                    <div className="pt-4 border-t border-[#1E1B18]/10 flex items-center justify-between">
                      <div>
                        {hasPrice ? (
                          <span className="text-base font-semibold text-[#1E1B18] font-mono tabular-nums">
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
                            className="px-3 py-2 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider transition-luxury flex items-center gap-1.5"
                          >
                            <ShoppingBag size={13} />
                            <span>Commander</span>
                          </button>
                        ) : (
                          <a
                            href={getWhatsAppUrl(`Bonjour Atmosphère Décoration, je souhaite une information sur le tarif et la commande de : ${product.name} (${product.reference}).`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white text-xs uppercase tracking-wider transition-luxury flex items-center gap-1"
                          >
                            <span>Demander</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Progressive Loading Navigation Module */}
          <div className="mt-16 pt-8 border-t border-[#1E1B18]/10 flex flex-col items-center justify-center space-y-4">
            
            {/* Visual Progress Bar */}
            <div className="w-full max-w-xs space-y-1.5 text-center">
              <div className="flex justify-between text-[11px] font-mono text-[#7A7265]">
                <span>Progression du catalogue</span>
                <span>{displayedProducts.length} / {filteredProducts.length} pièces</span>
              </div>
              <div className="w-full h-1 bg-[#EAE4DB] overflow-hidden">
                <div 
                  className="h-full bg-[#1E1B18] transition-all duration-500 ease-out"
                  style={{ width: `${(displayedProducts.length / filteredProducts.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Load More Button / Sentinel */}
            {hasMore ? (
              <div className="flex flex-col items-center gap-3 pt-2">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="px-8 py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury flex items-center gap-2.5 disabled:opacity-75 shadow-sm"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={14} className="animate-spin text-[#9BBA1A]" />
                      <span>Chargement des créations...</span>
                    </>
                  ) : (
                    <>
                      <span>Voir plus de créations</span>
                      <ChevronDown size={14} />
                    </>
                  )}
                </button>

                {/* Optional Continuous Scroll Switch */}
                <label className="flex items-center gap-2 text-[11px] text-[#7A7265] cursor-pointer hover:text-[#1E1B18] transition-colors select-none pt-1">
                  <input
                    type="checkbox"
                    checked={enableInfiniteScroll}
                    onChange={(e) => setEnableInfiniteScroll(e.target.checked)}
                    className="rounded text-[#1E1B18] focus:ring-0"
                  />
                  <span>Activer le défilement continu automatique (infinite scroll)</span>
                </label>

                {/* Sentinel Element for IntersectionObserver */}
                <div ref={sentinelRef} className="h-2 w-full" />
              </div>
            ) : (
              <div className="pt-2 text-center text-xs text-[#8C8375] font-light space-y-1">
                <p className="font-serif-display text-base text-[#1E1B18]">
                  Toutes les créations de cette sélection sont affichées
                </p>
                <p className="text-[11px]">
                  Vous recherchez une pièce spécifique ou sur mesure ? Consultez notre atelier Route des Almadies.
                </p>
              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
};
