import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Compass, 
  Layers, 
  Home, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X, 
  HelpCircle, 
  Sparkles 
} from 'lucide-react';

import craftImg from '../../assets/images/craft_sur_mesure_1790648964083.jpg';

export const SurMesureView: React.FC = () => {
  const { addBespokeProject, getWhatsAppUrl } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Votre Idée
    projectType: 'Mobilier sur mesure',
    stylePreference: 'Contemporain minimaliste aux matières texturées',
    
    // Step 2: Votre Espace
    room: 'Salon & Réception',
    dimensions: '',
    ceilingHeight: '',
    
    // Step 3: Votre Besoin
    description: '',
    budget: '',
    referenceImages: [] as string[],
    
    // Step 4: Coordonnées
    clientName: '',
    clientPhone: '',
    clientEmail: '',
  });

  const projectTypes = [
    { title: 'Mobilier sur mesure', desc: 'Table, buffet, canapé sur mesure, tête de lit, bibliothèque...' },
    { title: 'Aménagement complet', desc: 'Harmonisation globale d’une villa, appartement ou espace commercial à Dakar.' },
    { title: 'Sélection & Curations d’objets', desc: 'Conseil en art de vivre, luminaires, céramiques et accessoires décoratifs.' },
    { title: 'Confection textile & rideaux', desc: 'Lin lavé, coussins d’assise, rideaux sur mesure pour grandes baies vitrées.' },
  ];

  const roomsList = [
    'Salon & Réception',
    'Salle à manger',
    'Suite Parentale & Chambre',
    'Terrasse & Espace extérieur',
    'Bureau & Bibliothèque',
    'Espace Enfant',
    'Entrée & Couloirs',
    'Autre espace spécifique'
  ];

  // Image upload handler (base64 / preview)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData(prev => ({
            ...prev,
            referenceImages: [...prev.referenceImages, reader.result as string].slice(0, 5) // max 5 images
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    const newId = addBespokeProject({
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      projectType: formData.projectType,
      room: formData.room,
      dimensions: formData.dimensions ? `${formData.dimensions}${formData.ceilingHeight ? ` (Hauteur sous plafond : ${formData.ceilingHeight})` : ''}` : 'À définir lors de l’étude',
      budget: formData.budget || 'Non spécifié / Sur devis',
      description: `[Style souhaité : ${formData.stylePreference}]\n${formData.description}`,
      referenceImages: formData.referenceImages.length > 0 ? formData.referenceImages : [craftImg]
    });

    setSubmittedId(newId);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1E1B18]/10 pb-8 mb-12">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
          <span className="font-mono text-[#1E1B18]">STUDIO CONCEPTION</span>
          <span>—</span>
          <span>DAKAR & ALMADIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
          L'Atelier Sur-Mesure
        </h1>
        <p className="text-sm text-[#544D42] max-w-2xl mt-3 font-light leading-relaxed">
          Déposez votre cahier des charges pour une création de mobilier ou un projet d'aménagement intérieur personnalisé. Notre équipe aux Almadies prend en charge l'étude de votre espace.
        </p>
      </div>

      {submittedId ? (
        /* Confirmation Screen */
        <div className="p-8 sm:p-12 bg-[#F6F2EC] border border-[#1E1B18]/10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#1E1B18] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8C8375]">
              DOSSIER ENREGISTRÉ SOUS LA RÉFÉRENCE #{submittedId}
            </span>
            <h2 className="text-3xl font-serif-display text-[#1E1B18]">
              Votre projet a été transmis à l'atelier
            </h2>
            <p className="text-sm text-[#5C564B] max-w-lg mx-auto leading-relaxed font-light">
              Merci Mme/M. <strong className="font-medium text-[#1E1B18]">{formData.clientName}</strong>. Notre équipe va analyser les éléments de votre espace ({formData.room}) et vous recontactera directement au <strong className="font-mono text-[#1E1B18]">{formData.clientPhone}</strong>.
            </p>
          </div>

          <div className="p-4 bg-[#FBF9F5] border border-[#1E1B18]/10 max-w-md mx-auto text-left text-xs space-y-1 font-mono text-[#665E52]">
            <p><span className="text-[#1E1B18]">Type :</span> {formData.projectType}</p>
            <p><span className="text-[#1E1B18]">Pièce :</span> {formData.room}</p>
            <p><span className="text-[#1E1B18]">Statut dossier :</span> Enregistré (En étude initiale)</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(`Bonjour Atmosphère Décoration, je viens de soumettre mon projet sur-mesure sous la référence #${submittedId} (${formData.clientName} - ${formData.projectType}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider transition-luxury"
            >
              Échanger directement sur WhatsApp
            </a>
            <button
              onClick={() => {
                setSubmittedId(null);
                setStep(1);
              }}
              className="text-xs uppercase tracking-wider text-[#736B5F] hover:text-[#1E1B18] underline"
            >
              Déposer une autre demande
            </button>
          </div>
        </div>
      ) : (
        /* Multi-Step Interactive Form */
        <div className="bg-[#FBF9F5] border border-[#1E1B18]/10 p-6 sm:p-10 shadow-sm">
          
          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 mb-10 pb-6 border-b border-[#1E1B18]/10 text-xs">
            {[
              { num: 1, title: 'Votre Idée' },
              { num: 2, title: 'Votre Espace' },
              { num: 3, title: 'Votre Besoin' },
              { num: 4, title: 'Coordonnées' },
            ].map((s) => (
              <div 
                key={s.num} 
                className={`space-y-1 ${step >= s.num ? 'text-[#1E1B18]' : 'text-[#A89F90]'}`}
              >
                <div className={`h-1 w-full transition-colors ${step >= s.num ? 'bg-[#1E1B18]' : 'bg-[#E5DFD6]'}`} />
                <span className="font-mono text-[10px] block">0{s.num}.</span>
                <span className="font-medium text-[11px] hidden sm:block uppercase tracking-wider">{s.title}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* STEP 1: VOTRE IDÉE */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif-display text-[#1E1B18]">
                    1. Votre Idée & Ambition de Création
                  </h3>
                  <p className="text-xs text-[#736B5F] mt-1 font-light">
                    Sélectionnez la typologie de prestation souhaitée.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((type) => {
                    const isSelected = formData.projectType === type.title;
                    return (
                      <div
                        key={type.title}
                        onClick={() => setFormData({ ...formData, projectType: type.title })}
                        className={`p-5 border cursor-pointer transition-luxury ${
                          isSelected 
                            ? 'bg-[#1E1B18] text-white border-[#1E1B18]' 
                            : 'bg-[#F6F2EC] text-[#1E1B18] border-[#1E1B18]/5 hover:border-[#1E1B18]/20'
                        }`}
                      >
                        <h4 className="font-serif-display text-lg font-medium">
                          {type.title}
                        </h4>
                        <p className={`text-xs mt-1 leading-relaxed font-light ${isSelected ? 'text-[#D8D2C6]' : 'text-[#665F54]'}`}>
                          {type.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                    Style ou esprit de l'aménagement
                  </label>
                  <select
                    value={formData.stylePreference}
                    onChange={(e) => setFormData({ ...formData, stylePreference: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  >
                    <option value="Contemporain minimaliste aux matières texturées">Contemporain minimaliste aux matières texturées (bouclé, bois, laiton)</option>
                    <option value="Chaleureux minéral & Bois massif brut">Chaleureux minéral & Bois massif brut (iroko, chêne, teck)</option>
                    <option value="Lignes architecturales épurées & Teintes claires">Lignes architecturales épurées & Teintes claires (écru, sable, lin)</option>
                    <option value="Éclectique raffiné avec pièces d’art de collection">Éclectique raffiné avec pièces d’art de collection</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Étape suivante : Votre Espace</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: VOTRE ESPACE */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif-display text-[#1E1B18]">
                    2. Votre Espace de Vie
                  </h3>
                  <p className="text-xs text-[#736B5F] mt-1 font-light">
                    Précisez la pièce et les contraintes d'échelle.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                    Pièce concernée à Dakar
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {roomsList.map((r) => {
                      const isSel = formData.room === r;
                      return (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setFormData({ ...formData, room: r })}
                          className={`p-3 text-xs text-left border transition-luxury ${
                            isSel 
                              ? 'bg-[#1E1B18] text-white border-[#1E1B18]' 
                              : 'bg-[#F6F2EC] text-[#544E44] border-transparent hover:border-[#1E1B18]/20'
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                      Dimensions indicatives (Surface ou Longueur x Largeur)
                    </label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      placeholder="Ex : Pièce de 40 m² ou Mur de 3,80 m"
                      className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                      Hauteur sous plafond (si connue)
                    </label>
                    <input
                      type="text"
                      value={formData.ceilingHeight}
                      onChange={(e) => setFormData({ ...formData, ceilingHeight: e.target.value })}
                      placeholder="Ex : 2,90 m ou 3,20 m"
                      className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-xs text-[#544E44] hover:text-[#1E1B18] flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <ArrowLeft size={14} />
                    <span>Précédent</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Étape suivante : Votre Besoin</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: VOTRE BESOIN & UPLOAD */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif-display text-[#1E1B18]">
                    3. Votre Besoin & Visuels de Référence
                  </h3>
                  <p className="text-xs text-[#736B5F] mt-1 font-light">
                    Partagez les particularités, usages souhaités et photos de votre pièce.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                    Description détaillée de votre besoin *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Précisez vos attentes : nombre de convives, tonalités favorites, rangements nécessaires, contraintes particulières..."
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                    Budget indicatif envisagé (facultatif)
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Ex : 1 500 000 FCFA, 3 000 000 FCFA, ou À définir selon propositions"
                    className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#8C8375] font-light">
                    * Facultatif : nous créons des propositions adaptées à différentes échelles de projet.
                  </p>
                </div>

                {/* Upload Section */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                    Photos de votre espace ou images d'inspiration (Upload sécurisé)
                  </label>
                  
                  <div className="p-6 border-2 border-dashed border-[#1E1B18]/20 bg-[#F6F2EC] text-center space-y-3">
                    <Upload size={24} className="mx-auto text-[#8C6D4F]" />
                    <div>
                      <label className="cursor-pointer text-xs uppercase tracking-wider font-medium text-[#1E1B18] hover:underline">
                        <span>Sélectionner des images depuis votre appareil</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-[#8C8375] mt-1">
                        PNG, JPG, WebP jusqu'à 5 fichiers.
                      </p>
                    </div>
                  </div>

                  {formData.referenceImages.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {formData.referenceImages.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 bg-[#E5DFD6] border border-[#1E1B18]/10 group">
                          <img src={img} alt="Référence" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#1E1B18] text-white rounded-full flex items-center justify-center text-[10px]"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-xs text-[#544E44] hover:text-[#1E1B18] flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <ArrowLeft size={14} />
                    <span>Précédent</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-3 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Étape finale : Vos Coordonnées</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: VOS COORDONNÉES & TRANSMISSION */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif-display text-[#1E1B18]">
                    4. Vos Coordonnées pour l'Étude
                  </h3>
                  <p className="text-xs text-[#736B5F] mt-1 font-light">
                    Comment notre équipe aux Almadies peut-elle vous joindre pour échanger ?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                      Nom complet ou Cabinet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Mme Aminata D. / M. Oumar S."
                      className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                        Téléphone / WhatsApp à Dakar *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        placeholder="+221 77 ..."
                        className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-[#544E44] font-medium block">
                        Email (recommandé pour envoi de plans)
                      </label>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="contact@exemple.sn"
                        className="w-full px-4 py-3 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Recap Box */}
                <div className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs space-y-1.5 text-[#544E44]">
                  <p className="font-medium text-[#1E1B18] uppercase tracking-wider text-[11px]">
                    Résumé de votre demande :
                  </p>
                  <p>· Type : {formData.projectType}</p>
                  <p>· Pièce : {formData.room} {formData.dimensions && `(${formData.dimensions})`}</p>
                  <p>· {formData.referenceImages.length} image(s) jointe(s)</p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 text-xs text-[#544E44] hover:text-[#1E1B18] flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <ArrowLeft size={14} />
                    <span>Précédent</span>
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury"
                  >
                    Transmettre mon dossier à l'Atelier
                  </button>
                </div>
              </div>
            )}

          </form>

        </div>
      )}

    </div>
  );
};
