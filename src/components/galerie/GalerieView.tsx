import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MediaCategory } from '../../types';
import { Image, Upload, AlertCircle, Plus, Trash2 } from 'lucide-react';

export const GalerieView: React.FC = () => {
  const { media, addMediaItem, deleteMediaItem, setActivePage } = useStore();

  const [activeCategory, setActiveCategory] = useState<MediaCategory>('photos_boutique');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Media Form
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const categories: { id: MediaCategory; label: string; desc: string }[] = [
    {
      id: 'photos_boutique',
      label: 'La Boutique & Showroom',
      desc: 'Vues scénographiques réelles de l’espace Route des Almadies.'
    },
    {
      id: 'photos_produits',
      label: 'Photos Produits',
      desc: 'Gros plans matières, détails de fabrication et fiches objets.'
    },
    {
      id: 'projets',
      label: 'Projets en Conception',
      desc: 'Planches tendances, esquisses d’architectes et maquettes.'
    },
    {
      id: 'realisations',
      label: 'Réalisations Clients',
      desc: 'Mobilier installé chez nos clients et intérieurs terminés.'
    },
    {
      id: 'evenements',
      label: 'Événements & Expositions',
      desc: 'Vernissages, rencontres d’artistes et présentations exclusives à Dakar.'
    }
  ];

  const currentMediaList = media.filter(m => m.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setUploadedUrl(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedUrl || !newTitle) return;

    addMediaItem({
      title: newTitle,
      category: activeCategory,
      url: uploadedUrl,
      isDemo: false, // Uploaded by merchant
      caption: newCaption || 'Photographie officielle Atmosphère Décoration'
    });

    setNewTitle('');
    setNewCaption('');
    setUploadedUrl('');
    setShowUploadModal(false);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1E1B18]/10 pb-8 mb-12">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#736B5F] mb-3">
          <span className="font-mono text-[#1E1B18]">MÉDIATHÈQUE</span>
          <span>—</span>
          <span>ARCHIVES & IMAGES</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-light text-[#1E1B18] tracking-tight">
              Galerie Visuelle
            </h1>
            <p className="text-sm text-[#544D42] max-w-2xl mt-3 font-light leading-relaxed">
              Espace dédié aux photographies du showroom, des réalisations chez nos clients et de nos événements d’art de vivre à Dakar.
            </p>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider flex items-center gap-2 transition-luxury self-start sm:self-auto shrink-0"
          >
            <Plus size={14} />
            <span>Ajouter une photo</span>
          </button>
        </div>
      </div>

      {/* Notice Banner: No Invented Photos Guarantee */}
      <div className="mb-10 p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 flex items-start gap-3 text-xs text-[#5C564B]">
        <AlertCircle size={16} className="text-[#8C6D4F] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-medium text-[#1E1B18]">Politique de sincérité visuelle :</strong> Les visuels étiquetés <span className="font-mono text-[10px] bg-[#EAE4DB] px-1 py-0.5 text-[#1E1B18]">[DÉMO]</span> sont des propositions scénographiques temporaires. L'équipe d'Atmosphère peut téléverser directement les véritables clichés de la boutique et des projets via le bouton d'ajout ou l'espace administrateur.
        </div>
      </div>

      {/* Physically Separated Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1E1B18]/10 pb-4 mb-8">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const count = media.filter(m => m.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider transition-luxury flex items-center gap-2 border ${
                isSelected 
                  ? 'bg-[#1E1B18] text-white border-[#1E1B18]' 
                  : 'bg-[#FBF9F5] text-[#544E44] border-[#1E1B18]/10 hover:border-[#1E1B18]/30'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#EAE4DB] text-[#544E44]'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Current Category Description */}
      <div className="mb-8 text-xs text-[#7A7265] font-light">
        {categories.find(c => c.id === activeCategory)?.desc}
      </div>

      {/* Media Gallery Grid */}
      {currentMediaList.length === 0 ? (
        <div className="py-24 text-center space-y-4 bg-[#F6F2EC] border border-[#1E1B18]/10 p-8">
          <Image size={32} className="mx-auto text-[#A89F90]" />
          <h3 className="font-serif-display text-2xl text-[#1E1B18]">
            Cet espace d'exposition est actuellement vide
          </h3>
          <p className="text-xs text-[#6B6357] max-w-md mx-auto">
            Aucune photo n'a encore été téléversée dans cette section. Vous pouvez ajouter un premier visuel dès maintenant.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-2.5 bg-[#1E1B18] text-white text-xs uppercase tracking-wider"
          >
            Téléverser une première photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentMediaList.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FBF9F5] border border-[#1E1B18]/10 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-[#EAE4DB] overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {item.isDemo && (
                  <div className="absolute top-3 left-3 bg-[#1E1B18]/90 text-white px-2.5 py-1 text-[10px] font-mono tracking-wider">
                    DÉMO CONCEPTION
                  </div>
                )}

                {/* Delete button (for admin/user convenience) */}
                <button
                  onClick={() => deleteMediaItem(item.id)}
                  className="absolute top-3 right-3 p-1.5 bg-[#FBF9F5]/90 hover:bg-red-600 hover:text-white text-[#1E1B18] rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Supprimer ce média"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8375]">
                  <span>DATE : {item.dateAdded}</span>
                  <span>{item.isDemo ? 'ÉDITORIAL' : 'OFFICIEL'}</span>
                </div>
                <h3 className="font-serif-display text-lg text-[#1E1B18]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C564B] leading-relaxed font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] max-w-lg w-full p-6 sm:p-8 border border-[#1E1B18]/20 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3">
              <h3 className="font-serif-display text-2xl text-[#1E1B18]">
                Ajouter une photographie
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-xs uppercase text-[#8C8375] hover:text-[#1E1B18]"
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Catégorie du média
                </label>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Titre de la photo *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex : Nouvelle vitrine Route des Almadies..."
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Légende ou description
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Ex : Mobilier de salon en bois massif installé en septembre..."
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Fichier image *
                </label>
                <div className="p-6 border-2 border-dashed border-[#1E1B18]/20 bg-[#F6F2EC] text-center space-y-2">
                  <Upload size={20} className="mx-auto text-[#8C6D4F]" />
                  <label className="cursor-pointer text-xs uppercase tracking-wider font-medium text-[#1E1B18] hover:underline block">
                    <span>Parcourir une image locale</span>
                    <input
                      type="file"
                      required={!uploadedUrl}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {uploadedUrl && (
                <div className="aspect-[16/9] w-full bg-[#EAE4DB] overflow-hidden border border-[#1E1B18]/10">
                  <img src={uploadedUrl} alt="Aperçu" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-[#1E1B18]/20 text-xs uppercase tracking-wider"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!uploadedUrl || !newTitle}
                  className="px-6 py-2 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider disabled:opacity-50"
                >
                  Publier dans la galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
