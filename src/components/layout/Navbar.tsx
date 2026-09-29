import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Search, ShoppingBag, Menu, X, ArrowUpRight, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { AtmosphereLogo } from '../common/AtmosphereLogo';

export const Navbar: React.FC = () => {
  const { 
    settings, 
    cartCount, 
    setIsCartOpen, 
    activePage, 
    setActivePage,
    searchQuery,
    setSearchQuery,
    getWhatsAppUrl,
    products,
    setSelectedProductForModal
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchCategories = [
    { id: 'all', label: 'Toutes' },
    { id: 'Salon', label: 'Salon' },
    { id: 'Chambre', label: 'Chambre' },
    { id: 'Luminaires', label: 'Luminaires' },
    { id: 'Table', label: 'Art de la table' },
    { id: 'Décoration', label: 'Décoration' },
    { id: 'Extérieur', label: 'Extérieur' },
  ];

  const suggestedKeywords = [
    'Canapé',
    'Suspension',
    'Fauteuil',
    'Table basse',
    'Céramique',
    'Sur mesure'
  ];

  const navLinks = [
    { id: 'catalogue', label: 'Collections' },
    { id: 'inspirations', label: 'Inspirations' },
    { id: 'sur-mesure', label: 'Sur-Mesure' },
    { id: 'boutique', label: 'La Boutique' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'contact', label: 'Contact' },
  ];

  // Close search with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Real-time live filtering
  const liveResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    // If no query and category is 'all', show nothing or first items as discovery
    if (!q && selectedSearchCategory === 'all') {
      return [];
    }

    return products.filter((p) => {
      // Category filter
      if (selectedSearchCategory !== 'all' && p.category.toLowerCase() !== selectedSearchCategory.toLowerCase()) {
        return false;
      }
      // Text match
      if (q) {
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchRef = p.reference.toLowerCase().includes(q);
        const matchMat = p.materials.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        return matchName || matchCat || matchRef || matchMat || matchDesc;
      }
      return true;
    });
  }, [products, searchQuery, selectedSearchCategory]);

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductForModal(product);
    setIsSearchOpen(false);
  };

  const handleGoToCatalogueWithSearch = () => {
    setActivePage('catalogue');
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#1E1B18]/10 transition-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark with Official Logo Badge */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group focus-visible:outline-none"
            >
              <AtmosphereLogo size="sm" />
              <div className="flex flex-col text-left">
                <span className="text-lg sm:text-xl font-serif-display tracking-[0.2em] text-[#1E1B18] uppercase block group-hover:opacity-80 transition-opacity leading-none">
                  ATMOSPHÈRE
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#7D766A] font-mono mt-1">
                  Décoration · Dakar
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase text-[#4A453E]">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#1E1B18] ${
                    isActive ? 'text-[#1E1B18] font-medium' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1E1B18]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Real-time Search Trigger */}
            <button
              onClick={handleOpenSearch}
              className={`p-2 transition-colors flex items-center gap-1.5 text-xs ${
                isSearchOpen ? 'text-[#1E1B18] font-medium' : 'text-[#3D3832] hover:text-[#1E1B18]'
              }`}
              aria-label="Recherche en direct"
              title="Rechercher des pièces ou par catégorie"
            >
              <Search size={18} strokeWidth={1.5} />
              <span className="hidden xl:inline text-[11px] uppercase tracking-wider text-[#736B5F]">Recherche</span>
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#3D3832] hover:text-[#1E1B18] transition-colors"
              aria-label="Panier d'achats"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1E1B18] text-white text-[10px] flex items-center justify-center rounded-full font-mono tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Project Inquiry or WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#1E1B18] text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white text-xs tracking-wider uppercase transition-luxury whitespace-nowrap"
            >
              <span>Échanger à Dakar</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Admin Link (Discreet) */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden md:inline-block text-[11px] tracking-widest uppercase transition-colors ${
                activePage === 'admin' 
                  ? 'text-[#1E1B18] font-semibold underline' 
                  : 'text-[#8C8477] hover:text-[#1E1B18]'
              }`}
              title="Administration de la boutique"
            >
              Admin
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E1B18]"
              aria-label="Ouvrir le menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Real-Time Live Search Panel */}
        {isSearchOpen && (
          <div className="border-t border-[#1E1B18]/10 bg-[#FBF9F5] shadow-xl transition-all">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 space-y-4">
              
              {/* Search Bar Input Row */}
              <div className="flex items-center gap-3 bg-white border border-[#1E1B18]/15 px-4 py-2.5 shadow-sm">
                <Search size={18} className="text-[#8C8375] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par nom de pièce, matière, catégorie (ex : canapé, bouclé, raphia)..."
                  className="w-full bg-transparent border-none text-sm text-[#1E1B18] placeholder-[#9E9689] focus:outline-none font-light"
                />
                
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#8E8679] hover:text-[#1E1B18] font-mono uppercase tracking-wider px-2"
                  >
                    Effacer
                  </button>
                )}

                <div className="h-4 w-[1px] bg-[#1E1B18]/10 shrink-0" />

                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs tracking-wider uppercase text-[#544E44] hover:text-[#1E1B18] flex items-center gap-1 font-mono shrink-0 pl-1"
                >
                  <X size={15} />
                  <span className="hidden sm:inline">Fermer</span>
                </button>
              </div>

              {/* Category Quick Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8375] shrink-0 mr-1">
                  Catégories :
                </span>
                {searchCategories.map((cat) => {
                  const isCatActive = selectedSearchCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedSearchCategory(cat.id)}
                      className={`px-3 py-1 text-[11px] tracking-wider uppercase transition-colors shrink-0 ${
                        isCatActive
                          ? 'bg-[#1E1B18] text-white font-medium'
                          : 'bg-[#F2ECE4] text-[#4A453E] hover:bg-[#E5DDD2]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Real-Time Live Results Container */}
              <div className="pt-2">
                {searchQuery.trim() === '' && selectedSearchCategory === 'all' ? (
                  /* Suggested Inspirations when empty */
                  <div className="py-4 border-t border-[#1E1B18]/5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#8C8375] font-light flex items-center gap-1.5 text-[11px]">
                      <Sparkles size={13} className="text-[#8C6D4F]" />
                      Recherches fréquentes :
                    </span>
                    {suggestedKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => setSearchQuery(kw)}
                        className="px-2.5 py-1 text-[11px] bg-white border border-[#1E1B18]/10 text-[#1E1B18] hover:border-[#1E1B18]/40 transition-colors"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                ) : liveResults.length > 0 ? (
                  /* Live Results List */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7265] border-b border-[#1E1B18]/10 pb-2">
                      <span>{liveResults.length} {liveResults.length > 1 ? 'créations trouvées en direct' : 'création trouvée'}</span>
                      <button
                        onClick={handleGoToCatalogueWithSearch}
                        className="text-[#8C6D4F] hover:text-[#1E1B18] underline transition-colors"
                      >
                        Afficher dans le catalogue complet
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
                      {liveResults.slice(0, 6).map((item) => {
                        const hasPrice = item.price !== null && !item.isPriceOnRequest;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectProduct(item)}
                            className="group flex items-center gap-3.5 p-2.5 bg-white border border-[#1E1B18]/10 hover:border-[#1E1B18]/40 transition-all cursor-pointer shadow-sm hover:shadow"
                          >
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-14 h-14 object-cover bg-[#EAE4DB] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C8375] block truncate">
                                {item.category} · {item.reference}
                              </span>
                              <h4 className="text-sm font-serif-display font-medium text-[#1E1B18] group-hover:text-[#8C6D4F] transition-colors truncate">
                                {item.name}
                              </h4>
                              <p className="text-[11px] font-mono text-[#1E1B18] mt-0.5">
                                {hasPrice ? `${item.price?.toLocaleString('fr-FR')} FCFA` : 'Sur demande'}
                              </p>
                            </div>
                            <Eye size={15} className="text-[#8C8375] group-hover:text-[#1E1B18] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        );
                      })}
                    </div>

                    {liveResults.length > 6 && (
                      <div className="pt-2 text-center">
                        <button
                          onClick={handleGoToCatalogueWithSearch}
                          className="text-xs uppercase tracking-wider font-mono text-[#1E1B18] hover:underline inline-flex items-center gap-1.5"
                        >
                          <span>Voir les {liveResults.length - 6} autres pièces dans le catalogue</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* No Results */
                  <div className="py-6 text-center text-xs text-[#7A7265] space-y-1">
                    <p className="font-serif-display text-base text-[#1E1B18]">
                      Aucun produit ne correspond à « {searchQuery} »
                    </p>
                    <p className="text-[11px]">
                      Essayez un autre mot-clé ou sélectionnez « Toutes » pour réinitialiser la catégorie.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay when search is open */}
      {isSearchOpen && (
        <div 
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 top-[160px] z-30 bg-black/30 backdrop-blur-xs transition-opacity" 
        />
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] z-50 bg-[#FBF9F5] border-t border-[#1E1B18]/10 flex flex-col justify-between p-6 overflow-y-auto lg:hidden">
          <div className="space-y-6 pt-4">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#8C8477]">
              Navigation
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left font-serif-display text-2xl text-[#1E1B18]"
              >
                Accueil & Éditorial
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left font-serif-display text-2xl ${
                    activePage === link.id ? 'text-[#8C6D4F] italic' : 'text-[#1E1B18]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('livraison')}
                className="text-left font-serif-display text-2xl text-[#1E1B18]"
              >
                Livraison à Dakar & Régions
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left font-serif-display text-2xl text-[#787166]"
              >
                Espace Administration
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1E1B18]/10 space-y-4">
            <div className="flex items-center gap-3">
              <AtmosphereLogo size="sm" />
              <div className="text-xs text-[#5C564B] space-y-0.5">
                <p className="font-medium text-[#1E1B18] uppercase tracking-wider">{settings.storeName} — Dakar</p>
                <p>{settings.address}, {settings.city}</p>
                <p>Tél : {settings.phone}</p>
              </div>
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#1E1B18] text-white flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
            >
              <span>Contacter sur WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
