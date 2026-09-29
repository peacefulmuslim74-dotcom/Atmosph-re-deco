import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Check, ArrowUpRight, Navigation } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, addContactMessage, getWhatsAppUrl } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;

    addContactMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject || 'Contact showroom',
      message: form.message
    });

    setIsSent(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1E1B18]/10 pb-8 mb-12">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
          <span className="font-mono text-[#1E1B18]">CONTACT & ACCÈS</span>
          <span>—</span>
          <span>LES ALMADIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
          Visiter le Showroom
        </h1>
        <p className="text-sm text-[#544D42] max-w-2xl mt-3 font-light leading-relaxed">
          Nous vous accueillons au showroom pour découvrir nos pièces de mobilier, collections d'objets décoratifs ou initier votre projet sur mesure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left: Contact Info & Opening Hours */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="p-8 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-6">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#8C8375]">
                COORDONNÉES OFFICIELLES
              </span>
              <h2 className="text-2xl font-serif-display text-[#1E1B18] mt-1">
                {settings.storeName} Décoration
              </h2>
            </div>

            <div className="space-y-4 text-xs text-[#4A443B] font-light">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#8C6D4F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1E1B18] text-sm">{settings.address}</p>
                  <p className="text-[#7A7265]">{settings.neighborhood}, {settings.city} — {settings.country}</p>
                  <p className="text-[11px] text-[#8C8375] font-mono mt-0.5">Dakar, Presqu'île du Cap-Vert</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#8C6D4F] shrink-0" />
                <div>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-mono text-sm hover:text-[#1E1B18] font-medium">
                    {settings.phone}
                  </a>
                  <p className="text-[10px] text-[#8C8375]">Ligne showroom & renseignements</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#8C6D4F] shrink-0" />
                <div>
                  <a href={`mailto:${settings.email}`} className="text-sm hover:text-[#1E1B18] font-medium">
                    {settings.email}
                  </a>
                  <p className="text-[10px] text-[#8C8375]">Courrier électronique public</p>
                </div>
              </div>
            </div>

            {/* Configurable Opening Hours */}
            <div className="pt-4 border-t border-[#1E1B18]/10 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#1E1B18]">
                <Clock size={15} className="text-[#8C6D4F]" />
                <span>Horaires du Showroom</span>
              </div>
              <div className="space-y-1.5 text-xs text-[#5C564B] pl-6 font-light">
                <div className="flex justify-between">
                  <span>Lundi au Vendredi</span>
                  <span className="font-mono font-medium text-[#1E1B18]">{settings.openingHoursWeekday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-mono font-medium text-[#1E1B18]">{settings.openingHoursSaturday}</span>
                </div>
                <div className="flex justify-between text-[#8C8375]">
                  <span>Dimanche</span>
                  <span className="font-mono">{settings.openingHoursSunday}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl("Bonjour Atmosphère Décoration, je souhaite préparer ma visite au showroom des Almadies.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider font-medium transition-luxury flex items-center justify-center gap-2"
              >
                <span>Écrire sur WhatsApp direct</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Location & Access Instructions */}
          <div className="p-6 bg-[#FBF9F5] border border-[#1E1B18]/10 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#8C6D4F]">
              <Navigation size={16} />
              <h3 className="font-serif-display text-base text-[#1E1B18]">
                Itinéraire d'accès aux Almadies
              </h3>
            </div>
            <p className="text-[#5C564B] leading-relaxed font-light">
              Le showroom est situé directement sur l'axe principal de la <strong>Route des Almadies</strong>, facilement accessible depuis le Rond-Point Ngor ou la Corniche Ouest. Des places de stationnement sont disponibles à proximité immédiate pour nos visiteurs.
            </p>
          </div>

        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 bg-[#FBF9F5] p-8 sm:p-10 border border-[#1E1B18]/10 shadow-sm">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-serif-display text-[#1E1B18]">
              Formulaire de Contact Direct
            </h2>
            <p className="text-xs text-[#7A7265] font-light">
              Vous avez une question sur une pièce, un tarif sur demande ou souhaitez organiser une consultation privée ?
            </p>
          </div>

          {isSent ? (
            <div className="p-8 bg-[#EFE9E0] border border-[#1E1B18]/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1E1B18] text-white flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-serif-display text-[#1E1B18]">
                Message envoyé avec succès
              </h3>
              <p className="text-xs text-[#5C564B] max-w-sm mx-auto font-light">
                Votre demande a bien été transmise à notre équipe. Nous vous recontacterons très rapidement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+221 ..."
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Adresse Email (facultatif)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre.email@domaine.sn"
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Sujet de votre démarche
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Renseignement meuble, visite showroom..."
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Votre Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Écrivez votre message ici..."
                  className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury"
              >
                Transmettre mon message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
