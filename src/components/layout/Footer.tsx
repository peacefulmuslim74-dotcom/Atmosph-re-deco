import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import { AtmosphereLogo } from '../common/AtmosphereLogo';

export const Footer: React.FC = () => {
  const { settings, setActivePage, getWhatsAppUrl } = useStore();

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181614] text-[#EFEBE4] pt-20 pb-12 border-t border-[#292521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Banner with Official Brand Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#292521]">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <AtmosphereLogo size="md" />
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#A69E90] block font-mono">
                  DAKAR · ROUTE DES ALMADIES
                </span>
                <span className="text-xs text-[#EFEBE4] tracking-widest uppercase">
                  Maison de Décoration Intérieure
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-serif-display text-4xl sm:text-5xl text-white font-medium tracking-wide leading-tight">
                ATMOSPHÈRE
              </h3>
              <span className="font-script-signature block text-[#C9BFB0] font-normal text-3xl sm:text-4xl mt-1">
                L'art d'habiter
              </span>
            </div>
            <p className="text-sm text-[#A69E90] max-w-lg leading-relaxed font-light">
              Maison de création, mobilier d'exception, pièces d'art décoratif et atelier de sur-mesure. Une approche contemporaine et chaleureuse du design intérieur au Sénégal.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9BFB0] font-medium">
                  Le Showroom
                </p>
                <div className="text-sm text-[#A69E90] space-y-2 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#C9BFB0] shrink-0 mt-0.5" />
                    <span>{settings.address}, {settings.neighborhood}, {settings.city}, {settings.country}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-[#C9BFB0] shrink-0" />
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                      {settings.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-[#C9BFB0] shrink-0" />
                    <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9BFB0] font-medium">
                  Horaires d'Ouverture
                </p>
                <div className="text-sm text-[#A69E90] space-y-2 leading-relaxed">
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-[#C9BFB0] shrink-0" />
                    <span>Lun — Ven : {settings.openingHoursWeekday}</span>
                  </p>
                  <p className="pl-6">
                    Samedi : {settings.openingHoursSaturday}
                  </p>
                  <p className="pl-6 text-xs text-[#8C8375]">
                    Dimanche : {settings.openingHoursSunday}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={getWhatsAppUrl("Bonjour Atmosphère Décoration, je souhaite échanger au sujet d'un projet d'aménagement à Dakar.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#FBF9F5] text-[#181614] hover:bg-[#E2D8CC] text-xs uppercase tracking-[0.16em] font-medium transition-luxury"
              >
                <span>Échanger directement avec notre équipe</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#292521] text-xs">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9BFB0] font-semibold">
              Collections
            </p>
            <ul className="space-y-2 text-[#9A9183]">
              <li><button onClick={() => handleNav('catalogue')} className="hover:text-white transition-colors">Salon & Assises</button></li>
              <li><button onClick={() => handleNav('catalogue')} className="hover:text-white transition-colors">Chambre & Linge</button></li>
              <li><button onClick={() => handleNav('catalogue')} className="hover:text-white transition-colors">Art de la Table</button></li>
              <li><button onClick={() => handleNav('catalogue')} className="hover:text-white transition-colors">Luminaires & Éclairage</button></li>
              <li><button onClick={() => handleNav('catalogue')} className="hover:text-white transition-colors">Objets & Sculptures</button></li>
              <li><button onClick={() => handleNav('catalogue')} className="hover:text-white transition-colors">Mobilier Extérieur</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9BFB0] font-semibold">
              Maison & Savoir-Faire
            </p>
            <ul className="space-y-2 text-[#9A9183]">
              <li><button onClick={() => handleNav('sur-mesure')} className="hover:text-white transition-colors">Studio Sur-Mesure</button></li>
              <li><button onClick={() => handleNav('inspirations')} className="hover:text-white transition-colors">Inspirations Éditoriales</button></li>
              <li><button onClick={() => handleNav('galerie')} className="hover:text-white transition-colors">Galerie & Réalisations</button></li>
              <li><button onClick={() => handleNav('livraison')} className="hover:text-white transition-colors">Livraison Dakar & Régions</button></li>
              <li className="pt-1">
                <a 
                  href={settings.instagramUrl || 'https://www.instagram.com/atmospheredakar'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#9BBA1A]"
                >
                  <Instagram size={13} />
                  <span>Instagram {settings.instagramHandle || '@atmospheredakar'}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9BFB0] font-semibold">
              Services & Commandes
            </p>
            <ul className="space-y-2 text-[#9A9183]">
              <li><button onClick={() => handleNav('boutique')} className="hover:text-white transition-colors">La Boutique</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Prendre Rendez-vous</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Itinéraire Almadies</button></li>
              <li><button onClick={() => handleNav('admin')} className="hover:text-white transition-colors">Espace Propriétaire / Admin</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9BFB0] font-semibold">
              Paiement Sécurisé
            </p>
            <p className="text-[#9A9183] leading-relaxed">
              Paiements mobiles officiels au Sénégal pris en charge : Wave & Orange Money avec accusé de réception certifié.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2 py-1 bg-[#24211D] border border-[#3A352F] text-[10px] text-[#D8D2C6] tracking-wider uppercase font-mono">
                WAVE SN
              </span>
              <span className="px-2 py-1 bg-[#24211D] border border-[#3A352F] text-[10px] text-[#D8D2C6] tracking-wider uppercase font-mono">
                ORANGE MONEY
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & SEO Signature */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7265]">
          <p>
            © {new Date().getFullYear()} Atmosphère Décoration Dakar. Tous droits réservés. Route des Almadies, Dakar, Sénégal.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Décoration d'intérieur Dakar</span>
            <span>·</span>
            <span>Mobilier sur mesure</span>
            <span>·</span>
            <span>Almadies Sénégal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
