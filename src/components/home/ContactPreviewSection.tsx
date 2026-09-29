import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Check, ArrowUpRight } from 'lucide-react';

export const ContactPreviewSection: React.FC = () => {
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
      subject: form.subject || 'Demande via le site internet',
      message: form.message
    });

    setIsSent(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E1B18]/10">
      
      {/* Chapter Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
            <span className="font-mono text-[#1E1B18]">07</span>
            <span>—</span>
            <span>SHOWROOM & ÉCHANGES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
            Nous Contacter
          </h2>
        </div>
        <p className="text-sm text-[#544D42] max-w-md font-light leading-relaxed">
          Pour une visite personnalisée de notre showroom aux Almadies ou une question sur une pièce de nos collections.
        </p>
      </div>

      {/* 2-Column Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Store Details & Direct Communication */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#F6F2EC] border border-[#1E1B18]/5 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#8C8375]">
                SHOWROOM DAKAR
              </span>
              <h3 className="text-2xl font-serif-display text-[#1E1B18]">
                {settings.storeName} Décoration
              </h3>
            </div>

            <div className="space-y-4 text-sm text-[#4A443B] font-light">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#8C6D4F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1E1B18]">{settings.address}</p>
                  <p className="text-xs text-[#7A7265]">{settings.neighborhood}, {settings.city} — {settings.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#8C6D4F] shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-[#1E1B18] transition-colors">
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#8C6D4F] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#1E1B18] transition-colors">
                  {settings.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#1E1B18]/10 text-xs text-[#6B6357]">
                <Clock size={16} className="text-[#8C6D4F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1E1B18]">Horaires d'ouverture</p>
                  <p>Du lundi au vendredi : {settings.openingHoursWeekday}</p>
                  <p>Le samedi : {settings.openingHoursSaturday}</p>
                  <p className="text-[#8C8375]">Dimanche : {settings.openingHoursSunday}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider font-medium transition-luxury flex items-center justify-center gap-2"
              >
                <span>Écrire sur WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Clean Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FBF9F5] p-8 sm:p-10 border border-[#1E1B18]/10">
          <div className="mb-6 space-y-1">
            <h3 className="text-xl font-serif-display text-[#1E1B18]">
              Envoyer un message à l'équipe
            </h3>
            <p className="text-xs text-[#7A7265] font-light">
              Nous répondons avec soin sous 24h ouvrées.
            </p>
          </div>

          {isSent ? (
            <div className="p-8 bg-[#EFE9E0] border border-[#1E1B18]/10 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1E1B18] text-white flex items-center justify-center mx-auto">
                <Check size={20} />
              </div>
              <h4 className="text-lg font-serif-display text-[#1E1B18]">
                Votre message a été transmis
              </h4>
              <p className="text-xs text-[#5C564B] max-w-sm mx-auto">
                Merci. Notre équipe aux Almadies reviendra vers vous très prochainement par téléphone ou par email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="M. ou Mme..."
                    className="w-full px-3.5 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
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
                    className="w-full px-3.5 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
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
                    placeholder="adresse@exemple.sn"
                    className="w-full px-3.5 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Objet de votre demande
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Renseignement pièce, visite showroom..."
                    className="w-full px-3.5 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Votre Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Décrivez votre besoin ou les pièces qui retiennent votre attention..."
                  className="w-full px-3.5 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none focus:border-[#1E1B18]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E1B18] text-[#FBF9F5] hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury"
              >
                Envoyer ma demande à Atmosphère
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
};
