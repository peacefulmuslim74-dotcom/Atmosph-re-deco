import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EditorialHero } from './components/home/EditorialHero';
import { CollectionsSection } from './components/home/CollectionsSection';
import { InspirationsSection } from './components/home/InspirationsSection';
import { SurMesureSection } from './components/home/SurMesureSection';
import { BoutiqueSection } from './components/home/BoutiqueSection';
import { CadeauxSection } from './components/home/CadeauxSection';
import { DakarSection } from './components/home/DakarSection';
import { ContactPreviewSection } from './components/home/ContactPreviewSection';
import { CatalogueView } from './components/catalogue/CatalogueView';
import { SurMesureView } from './components/surmesure/SurMesureView';
import { GalerieView } from './components/galerie/GalerieView';
import { LivraisonView } from './components/livraison/LivraisonView';
import { ContactView } from './components/contact/ContactView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ProductModal } from './components/catalogue/ProductModal';
import { InstagramFeed } from './components/social/InstagramFeed';
import { FadeIn } from './components/common/FadeIn';
import { MessageCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activePage, 
    settings, 
    getWhatsAppUrl, 
    selectedProductForModal, 
    setSelectedProductForModal 
  } = useStore();

  // Update dynamic document title based on page & settings
  useEffect(() => {
    const titles: Record<string, string> = {
      home: `${settings.storeName} Dakar — ${settings.tagline}`,
      catalogue: `Catalogue & Mobilier — ${settings.storeName} Dakar`,
      'sur-mesure': `Atelier Sur-Mesure — ${settings.storeName} Dakar`,
      inspirations: `Inspirations & Matières — ${settings.storeName} Dakar`,
      boutique: `La Boutique & Pièces Uniques — ${settings.storeName} Dakar`,
      galerie: `Galerie Scénographique — ${settings.storeName} Dakar`,
      livraison: `Livraison Dakar & Sénégal — ${settings.storeName}`,
      contact: `Showroom & Contact Almadies — ${settings.storeName}`,
      admin: `Espace Administrateur — ${settings.storeName}`
    };
    document.title = titles[activePage] || `${settings.storeName} Dakar`;
  }, [activePage, settings]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FBF9F5] text-[#1E1B18] font-sans-body">
      
      {/* Strict 3-zone Header & Navigation */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <FadeIn duration={800} direction="none">
              <EditorialHero />
            </FadeIn>
            
            <FadeIn duration={700}>
              <CollectionsSection />
            </FadeIn>

            <FadeIn duration={700}>
              <InspirationsSection />
            </FadeIn>

            <FadeIn duration={700}>
              <SurMesureSection />
            </FadeIn>

            <FadeIn duration={700}>
              <BoutiqueSection />
            </FadeIn>

            <FadeIn duration={700}>
              <CadeauxSection />
            </FadeIn>

            <FadeIn duration={700}>
              <DakarSection />
            </FadeIn>

            <FadeIn duration={700}>
              <ContactPreviewSection />
            </FadeIn>

            <FadeIn duration={700}>
              <InstagramFeed variant="light" />
            </FadeIn>
          </>
        )}

        {activePage === 'catalogue' && <CatalogueView />}
        {activePage === 'boutique' && <CatalogueView />}
        {activePage === 'inspirations' && (
          <div className="pt-8">
            <InspirationsSection />
            <CadeauxSection />
          </div>
        )}
        {activePage === 'sur-mesure' && <SurMesureView />}
        {activePage === 'galerie' && <GalerieView />}
        {activePage === 'livraison' && <LivraisonView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'admin' && (
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        )}
      </main>

      {/* Slide-over Cart & Wave/OM Checkout Modals */}
      <CartDrawer />
      <CheckoutModal />

      {/* Global Product Detail Modal */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}

      {/* Editorial Footer */}
      <Footer />

      {/* Discreet Mobile Floating WhatsApp Trigger (Under 15% mobile viewport cap) */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-5 z-30 p-3.5 bg-[#1E1B18] text-[#FBF9F5] rounded-full shadow-xl hover:bg-[#38332D] transition-transform active:scale-95 flex items-center justify-center border border-white/20"
        aria-label="Contacter sur WhatsApp"
        title="WhatsApp direct"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
