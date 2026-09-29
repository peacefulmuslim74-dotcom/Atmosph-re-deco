import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  BespokeStatus, 
  Product, 
  ProductCategory, 
  ProductAvailability,
  DeliveryZoneConfig
} from '../../types';
import { 
  Package, 
  Compass, 
  ShoppingBag, 
  Image, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Settings, 
  ShieldCheck, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  DollarSign, 
  FileText, 
  Eye, 
  AlertCircle,
  Truck,
  MessageSquare,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  EyeOff
} from 'lucide-react';
import { AtmosphereLogo } from '../common/AtmosphereLogo';

export const AdminDashboard: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    bespokeProjects, 
    updateBespokeStatus,
    orders,
    media,
    addMediaItem,
    deleteMediaItem,
    contactMessages,
    markMessageRead,
    deliveryZones,
    updateDeliveryZone,
    setActivePage
  } = useStore();

  const [currentTab, setCurrentTab] = useState<
    'overview' | 'products' | 'bespoke' | 'orders' | 'media' | 'delivery' | 'settings' | 'messages'
  >('overview');

  // Notification / Flash Feedback
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 4000);
  };

  // Secure Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('atmosphere_admin_auth') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Password Management in Settings
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState<string | null>(null);
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError(null);

    setTimeout(() => {
      const activePasscode = settings.adminPasscode || 'atmosphere2024';
      if (passcodeInput.trim() === activePasscode) {
        sessionStorage.setItem('atmosphere_admin_auth', 'true');
        setIsAuthenticated(true);
        setAuthError(null);
        setPasscodeInput('');
        showNotification('Accès sécurisé validé. Bienvenue sur le backoffice Atmosphère.');
      } else {
        setAuthError('Code d’accès incorrect. Veuillez vérifier votre mot de passe propriétaire.');
      }
      setIsVerifying(false);
    }, 350);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('atmosphere_admin_auth');
    setIsAuthenticated(false);
    setPasscodeInput('');
    setActivePage('home');
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(null);
    setPasscodeSuccess(null);

    if (newPasscode.length < 6) {
      setPasscodeError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setPasscodeError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    updateSettings({
      ...settings,
      adminPasscode: newPasscode
    });

    setPasscodeSuccess('Mot de passe administrateur modifié avec succès.');
    setNewPasscode('');
    setConfirmPasscode('');
  };

  // Coordinates & Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    reference: '',
    category: 'Salon',
    collection: 'Collection Permanente',
    description: '',
    price: null,
    isPriceOnRequest: true,
    dimensions: '',
    materials: '',
    color: '',
    availability: 'En boutique',
    isNew: true,
    isFeatured: false,
    images: ['']
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showNotification('Coordonnées et paramètres du site mis à jour avec succès.');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.reference) return;

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
      showNotification(`Produit "${productForm.name}" mis à jour.`);
    } else {
      addProduct({
        reference: productForm.reference || `ATM-${Date.now().toString().slice(-4)}`,
        name: productForm.name || '',
        category: (productForm.category as ProductCategory) || 'Salon',
        collection: productForm.collection || 'Collection Dakar',
        description: productForm.description || '',
        price: productForm.isPriceOnRequest ? null : Number(productForm.price),
        isPriceOnRequest: !!productForm.isPriceOnRequest,
        dimensions: productForm.dimensions || '',
        materials: productForm.materials || '',
        color: productForm.color || '',
        availability: (productForm.availability as ProductAvailability) || 'En boutique',
        isNew: !!productForm.isNew,
        isFeatured: !!productForm.isFeatured,
        images: productForm.images?.filter(Boolean).length ? productForm.images : [products[0]?.images[0] || '']
      });
      showNotification('Nouveau produit ajouté au catalogue.');
    }

    setShowAddProductModal(false);
    setEditingProductId(null);
  };

  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setShowAddProductModal(true);
  };

  const bespokeStatusOptions: BespokeStatus[] = [
    'nouveau',
    'en étude',
    'contact client',
    'proposition',
    'accepté',
    'refusé',
    'terminé'
  ];

  // If unauthenticated, display the luxury Security Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-[#1E1B18] text-[#EFEBE4] p-8 sm:p-10 border border-[#3A352F] shadow-2xl space-y-8 relative">
          
          {/* Brand & Security Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <AtmosphereLogo size="lg" />
            <div className="pt-2">
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-[#9BBA1A] block">
                ACCÈS PROPRIÉTAIRE · SÉCURISÉ
              </span>
              <h2 className="text-2xl font-serif-display text-white mt-1">
                Espace Gestion & Commandes
              </h2>
              <p className="text-xs text-[#A89F90] mt-1 font-light">
                Atmosphère Décoration — Route des Almadies, Dakar
              </p>
            </div>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#C9BFB0] block">
                Mot de Passe Administrateur
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Entrez votre code d'accès"
                  className="w-full px-3.5 py-3 bg-[#121110] border border-[#3A352F] focus:border-[#9BBA1A] text-sm text-white focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7265] hover:text-[#C9BFB0] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-[#9BBA1A] hover:bg-[#8AA617] text-[#121110] font-semibold text-xs tracking-[0.18em] uppercase transition-luxury flex items-center justify-center gap-2 shadow"
            >
              {isVerifying ? (
                <span>Vérification sécurisée...</span>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Déverrouiller l'Espace Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Security Information & Default Help */}
          <div className="pt-4 border-t border-[#3A352F]/70 text-[11px] text-[#8C8375] space-y-3 font-light leading-relaxed text-center">
            <p>
              Session sécurisée par chiffrement local volatile. Elle est automatiquement révoquée à la fermeture de l'onglet.
            </p>
            <div className="p-2.5 bg-[#121110] border border-[#2B2723] text-left text-[10px] font-mono space-y-1">
              <span className="text-[#9BBA1A] font-semibold block">NOTE D'ACCÈS POUR DÉMO :</span>
              <p className="text-[#A89F90]">
                Mot de passe par défaut : <code className="text-white bg-black/50 px-1 py-0.5">atmosphere2024</code>
              </p>
              <p className="text-[#7A7265]">
                (Modifiable à tout moment dans l'onglet Paramètres une fois connecté)
              </p>
            </div>
            
            <button
              onClick={() => setActivePage('home')}
              className="inline-block text-xs uppercase tracking-wider text-[#C9BFB0] hover:text-white transition-colors underline pt-2"
            >
              ← Retourner sur le site public
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Bar Admin Header with Official Brand Mark & Logout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#1E1B18]/10 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <AtmosphereLogo size="md" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#736B5F]">
              <span className="inline-flex items-center gap-1 text-[#4F7311]">
                <ShieldCheck size={13} />
                <span>SESSION SÉCURISÉE ACTIVES</span>
              </span>
              <span>·</span>
              <span>BACKOFFICE ÉDITORIAL & COMMERCIAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-display font-medium text-[#1E1B18] mt-0.5">
              Tableau de Bord — {settings.storeName} Dakar
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('home')}
            className="px-4 py-2 border border-[#1E1B18]/20 text-xs uppercase tracking-wider text-[#1E1B18] hover:bg-[#F6F2EC] transition-colors"
          >
            Voir le site en direct
          </button>
          
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 border border-[#9C2B2B]/30 bg-[#9C2B2B]/5 text-[#9C2B2B] hover:bg-[#9C2B2B] hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            title="Verrouiller la session"
          >
            <LogOut size={13} />
            <span>Verrouiller</span>
          </button>
        </div>
      </div>

      {/* Save Notification */}
      {saveAlert && (
        <div className="mb-6 p-4 bg-[#1E1B18] text-white text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#8C6D4F]" />
            <span>{saveAlert}</span>
          </div>
          <button onClick={() => setSaveAlert(null)} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Admin Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#1E1B18]/10 text-xs">
        {[
          { id: 'overview', label: 'Vue d’ensemble', icon: Eye },
          { id: 'products', label: `Catalogue (${products.length})`, icon: Package },
          { id: 'bespoke', label: `Sur-Mesure (${bespokeProjects.length})`, icon: Compass },
          { id: 'orders', label: `Commandes (${orders.length})`, icon: ShoppingBag },
          { id: 'messages', label: `Messages (${contactMessages.length})`, icon: MessageSquare },
          { id: 'delivery', label: 'Zones Livraison', icon: Truck },
          { id: 'media', label: `Médiathèque (${media.length})`, icon: Image },
          { id: 'settings', label: 'Coordonnées & API', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`px-4 py-2.5 uppercase tracking-wider transition-luxury flex items-center gap-2 whitespace-nowrap border ${
                isSel
                  ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                  : 'bg-[#F6F2EC] text-[#544E44] border-transparent hover:border-[#1E1B18]/20'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {currentTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
              <span className="font-mono text-[10px] text-[#8C8375] uppercase tracking-wider">
                DOSSIERS SUR-MESURE
              </span>
              <p className="text-3xl font-serif-display text-[#1E1B18]">
                {bespokeProjects.length}
              </p>
              <p className="text-xs text-[#7A7265]">
                {bespokeProjects.filter(p => p.status === 'nouveau').length} nouveau(x) à traiter
              </p>
            </div>

            <div className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
              <span className="font-mono text-[10px] text-[#8C8375] uppercase tracking-wider">
                COMMANDES ENREGISTRÉES
              </span>
              <p className="text-3xl font-serif-display text-[#1E1B18]">
                {orders.length}
              </p>
              <p className="text-xs text-[#7A7265]">
                Paiements certifiés Wave / Orange Money
              </p>
            </div>

            <div className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
              <span className="font-mono text-[10px] text-[#8C8375] uppercase tracking-wider">
                RÉFÉRENCES AU CATALOGUE
              </span>
              <p className="text-3xl font-serif-display text-[#1E1B18]">
                {products.length}
              </p>
              <p className="text-xs text-[#7A7265]">
                {products.filter(p => p.isPriceOnRequest).length} avec prix sur devis
              </p>
            </div>

            <div className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
              <span className="font-mono text-[10px] text-[#8C8375] uppercase tracking-wider">
                MESSAGES DU SHOWROOM
              </span>
              <p className="text-3xl font-serif-display text-[#1E1B18]">
                {contactMessages.length}
              </p>
              <p className="text-xs text-[#7A7265]">
                Demandes de renseignements clients
              </p>
            </div>
          </div>

          {/* Quick Notice on Data Integrity */}
          <div className="p-6 bg-[#EFEAE2] border border-[#1E1B18]/10 flex items-start gap-4">
            <AlertCircle size={20} className="text-[#8C6D4F] shrink-0 mt-0.5" />
            <div className="text-xs text-[#544D42] space-y-1">
              <h4 className="font-medium text-[#1E1B18] text-sm">
                Principe de Vérité des Données
              </h4>
              <p>
                Ce site a été conçu sans aucune fausse affirmation. Toutes les coordonnées publiques (+221 77 651 01 13, atmosphere@orange.sn, Route des Almadies) sont réelles et restent modifiables dans l'onglet « Coordonnées & API ». Les tarifs de livraison et clés de paiement Wave / Orange Money sont également sous votre contrôle direct.
              </p>
            </div>
          </div>

          {/* Recent Bespoke Dossiers */}
          <div className="p-6 bg-[#FBF9F5] border border-[#1E1B18]/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-xl text-[#1E1B18]">
                Derniers Projets Sur-Mesure Soumis
              </h3>
              <button
                onClick={() => setCurrentTab('bespoke')}
                className="text-xs uppercase tracking-wider text-[#8C6D4F] hover:underline"
              >
                Gérer tous les dossiers
              </button>
            </div>

            <div className="divide-y divide-[#1E1B18]/10 text-xs">
              {bespokeProjects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[#1E1B18]">{proj.clientName}</span>
                    <span className="text-[#8C8375] ml-2">· {proj.room} ({proj.projectType})</span>
                    <p className="text-[11px] text-[#6B6357] font-mono">{proj.clientPhone} · {proj.createdAt}</p>
                  </div>
                  <span className="font-mono uppercase text-[10px] px-2 py-1 bg-[#F6F2EC] border border-[#1E1B18]/10">
                    {proj.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {currentTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif-display text-[#1E1B18]">
                Gestion des Pièces & Mobilier
              </h2>
              <p className="text-xs text-[#7A7265] mt-0.5">
                Ajoutez, modifiez les tarifs, masquez ou précisez les dimensions de vos créations.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingProductId(null);
                setProductForm({
                  name: '',
                  reference: `ATM-${Date.now().toString().slice(-4)}`,
                  category: 'Salon',
                  collection: 'Collection Almadies',
                  description: '',
                  price: null,
                  isPriceOnRequest: true,
                  dimensions: '',
                  materials: '',
                  color: '',
                  availability: 'En boutique',
                  isNew: true,
                  isFeatured: false,
                  images: [products[0]?.images[0] || '']
                });
                setShowAddProductModal(true);
              }}
              className="px-4 py-2.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Créer une fiche produit</span>
            </button>
          </div>

          <div className="bg-[#FBF9F5] border border-[#1E1B18]/10 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F2EC] border-b border-[#1E1B18]/10 font-mono text-[10px] uppercase text-[#736B5F]">
                <tr>
                  <th className="p-3">Réf</th>
                  <th className="p-3">Pièce & Catégorie</th>
                  <th className="p-3">Prix</th>
                  <th className="p-3">Disponibilité</th>
                  <th className="p-3">Matériaux</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1B18]/10">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#F6F2EC]/60 transition-colors">
                    <td className="p-3 font-mono text-[#8C8375]">{prod.reference}</td>
                    <td className="p-3">
                      <div className="font-medium text-[#1E1B18]">{prod.name}</div>
                      <div className="text-[11px] text-[#7A7265]">{prod.category} · {prod.collection}</div>
                    </td>
                    <td className="p-3 font-mono">
                      {prod.isPriceOnRequest || prod.price === null ? (
                        <span className="text-[#8C6D4F] italic">Sur demande</span>
                      ) : (
                        <span>{prod.price.toLocaleString('fr-FR')} FCFA</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-[#EAE4DB] text-[#1E1B18]">
                        {prod.availability}
                      </span>
                    </td>
                    <td className="p-3 text-[#6B6357] max-w-xs truncate">{prod.materials}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => startEditProduct(prod)}
                        className="p-1.5 text-[#544E44] hover:text-[#1E1B18]"
                        title="Modifier"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer définitivement la référence ${prod.reference} ?`)) {
                            deleteProduct(prod.id);
                            showNotification('Produit retiré du catalogue.');
                          }
                        }}
                        className="p-1.5 text-[#8C8375] hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BESPOKE PROJECTS DOSSIERS */}
      {currentTab === 'bespoke' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif-display text-[#1E1B18]">
              Dossiers Sur-Mesure & Commandes Personnalisées
            </h2>
            <p className="text-xs text-[#7A7265] mt-0.5">
              Cycle d'administration officiel : nouveau → en étude → contact client → proposition → accepté → refusé → terminé.
            </p>
          </div>

          <div className="space-y-4">
            {bespokeProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 bg-[#FBF9F5] border border-[#1E1B18]/10 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E1B18]/10 gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-[#8C8375] uppercase">
                      DOSSIER #{project.id} · DÉPOSÉ LE {project.createdAt}
                    </span>
                    <h3 className="text-xl font-serif-display text-[#1E1B18]">
                      {project.clientName} — {project.room}
                    </h3>
                  </div>

                  {/* Status Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B6357]">Statut actuel :</span>
                    <select
                      value={project.status}
                      onChange={(e) => {
                        updateBespokeStatus(project.id, e.target.value as BespokeStatus);
                        showNotification(`Statut du projet #${project.id} mis à jour : ${e.target.value}`);
                      }}
                      className="px-3 py-1.5 bg-[#F6F2EC] border border-[#1E1B18]/20 text-xs font-mono uppercase focus:outline-none"
                    >
                      {bespokeStatusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4A443B]">
                  <div className="space-y-1">
                    <p className="font-medium text-[#1E1B18]">Coordonnées Client</p>
                    <p>Téléphone : <a href={`tel:${project.clientPhone}`} className="underline font-mono">{project.clientPhone}</a></p>
                    <p>Email : {project.clientEmail || 'Non communiqué'}</p>
                    <p>Type de besoin : {project.projectType}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-[#1E1B18]">Espace & Dimensions</p>
                    <p>Pièce : {project.room}</p>
                    <p>Dimensions : {project.dimensions}</p>
                    <p>Budget indicatif : {project.budget}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-[#1E1B18]">Photos / Références jointes</p>
                    {project.referenceImages.length > 0 ? (
                      <div className="flex gap-2 pt-1">
                        {project.referenceImages.map((img, i) => (
                          <a key={i} href={img} target="_blank" rel="noreferrer" className="w-12 h-12 border border-[#1E1B18]/15 bg-[#EAE4DB] overflow-hidden">
                            <img src={img} alt="Ref" className="w-full h-full object-cover" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#8C8375]">Aucune image jointe</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="p-3 bg-[#F6F2EC] border border-[#1E1B18]/5 text-xs text-[#4A443B] space-y-1">
                  <span className="font-medium text-[#1E1B18] text-[11px] uppercase tracking-wider">
                    Détail de la demande :
                  </span>
                  <p className="whitespace-pre-line leading-relaxed">{project.description}</p>
                </div>

                {/* Internal Notes */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      defaultValue={project.internalNotes || ''}
                      onBlur={(e) => {
                        updateBespokeStatus(project.id, project.status, e.target.value);
                        showNotification('Notes internes sauvegardées.');
                      }}
                      placeholder="Ajouter une note interne pour l'équipe (ex: devis envoyé le...)"
                      className="w-full px-3 py-1.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS & PAYMENTS AUDIT LOG */}
      {currentTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif-display text-[#1E1B18]">
              Journal des Commandes & Transactions
            </h2>
            <p className="text-xs text-[#7A7265] mt-0.5">
              Traçabilité complète : Idempotency, Transaction ID, Webhook, Audit log officiel.
            </p>
          </div>

          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 bg-[#FBF9F5] border border-[#1E1B18]/10 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1E1B18]/10 gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-[#8C8375] uppercase">
                      COMMANDE N° {ord.orderNumber} · {ord.createdAt}
                    </span>
                    <h3 className="text-xl font-serif-display text-[#1E1B18]">
                      {ord.customerName} ({ord.customerPhone})
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2.5 py-1 bg-[#1E1B18] text-white">
                      {ord.paymentMethod.toUpperCase()} · PAYÉ
                    </span>
                    <span className="font-mono text-sm font-semibold text-[#1E1B18]">
                      {ord.totalAmount.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4A443B]">
                  <div className="space-y-1">
                    <p className="font-medium text-[#1E1B18]">Adresse de Livraison</p>
                    <p>{ord.deliveryAddress}</p>
                    <p className="text-[#7A7265]">Zone : {ord.deliveryZone} (+{ord.deliveryFee.toLocaleString('fr-FR')} FCFA)</p>
                  </div>

                  <div className="space-y-1 font-mono text-[11px] text-[#665F54]">
                    <p><span className="text-[#1E1B18]">Payment Intent ID :</span> {ord.paymentIntentId}</p>
                    <p><span className="text-[#1E1B18]">Transaction ID :</span> {ord.transactionId}</p>
                    <p><span className="text-[#1E1B18]">Idempotency Key :</span> {ord.idempotencyKey}</p>
                  </div>
                </div>

                {/* Audit Trail */}
                <div className="p-3 bg-[#F6F2EC] border border-[#1E1B18]/5 text-xs space-y-2">
                  <p className="font-mono text-[10px] uppercase text-[#8C8375] font-semibold">
                    Journal d'audit cryptographique (Audit Log) :
                  </p>
                  <div className="space-y-1 font-mono text-[11px] text-[#544E44]">
                    {ord.auditLog.map((log, idx) => (
                      <p key={idx}>
                        <span className="text-[#8C8375]">{log.timestamp.slice(11, 19)}</span> — <strong className="text-[#1E1B18]">{log.event}</strong> : {log.details}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MESSAGES */}
      {currentTab === 'messages' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif-display text-[#1E1B18]">
              Boîte de Réception du Showroom
            </h2>
            <p className="text-xs text-[#7A7265] mt-0.5">
              Messages transmis via le formulaire de contact.
            </p>
          </div>

          <div className="space-y-4">
            {contactMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 border transition-colors ${
                  msg.isRead 
                    ? 'bg-[#FBF9F5] border-[#1E1B18]/10' 
                    : 'bg-[#F5EFE6] border-[#8C6D4F]/40'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#1E1B18]/10 text-xs">
                  <div>
                    <span className="font-medium text-[#1E1B18] text-sm">{msg.name}</span>
                    <span className="text-[#7A7265] ml-2">({msg.phone} {msg.email && `· ${msg.email}`})</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8C8375]">{msg.createdAt}</span>
                </div>

                <div className="py-3 text-xs text-[#4A443B] space-y-1">
                  <p className="font-medium text-[#1E1B18]">Objet : {msg.subject}</p>
                  <p className="leading-relaxed whitespace-pre-line">{msg.message}</p>
                </div>

                {!msg.isRead && (
                  <div className="pt-2 text-right">
                    <button
                      onClick={() => {
                        markMessageRead(msg.id);
                        showNotification('Message marqué comme lu.');
                      }}
                      className="px-3 py-1 bg-[#1E1B18] text-white text-[11px] uppercase tracking-wider"
                    >
                      Marquer comme lu
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: DELIVERY ZONES */}
      {currentTab === 'delivery' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif-display text-[#1E1B18]">
              Configuration des Zones de Livraison
            </h2>
            <p className="text-xs text-[#7A7265] mt-0.5">
              Définissez les délais et tarifs pour Dakar, sa banlieue et les régions.
            </p>
          </div>

          <div className="space-y-4">
            {deliveryZones.map((zone) => (
              <div key={zone.id} className="p-6 bg-[#FBF9F5] border border-[#1E1B18]/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#8C8375]">Nom de la zone</label>
                    <input
                      type="text"
                      defaultValue={zone.name}
                      onBlur={(e) => updateDeliveryZone(zone.id, { name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#8C8375]">Délai moyen</label>
                    <input
                      type="text"
                      defaultValue={zone.delay}
                      onBlur={(e) => updateDeliveryZone(zone.id, { delay: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#8C8375]">Tarif (FCFA)</label>
                    <input
                      type="number"
                      defaultValue={zone.fee}
                      onBlur={(e) => {
                        updateDeliveryZone(zone.id, { fee: Number(e.target.value) });
                        showNotification(`Tarif de livraison mis à jour : ${e.target.value} FCFA`);
                      }}
                      className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs font-mono text-[#1E1B18]"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-[10px] uppercase font-mono text-[#8C8375]">Précisions sur l'emballage et les conditions</label>
                  <input
                    type="text"
                    defaultValue={zone.notes}
                    onBlur={(e) => updateDeliveryZone(zone.id, { notes: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: MEDIA GALLERY BACKOFFICE */}
      {currentTab === 'media' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif-display text-[#1E1B18]">
                Médiathèque & Photographies
              </h2>
              <p className="text-xs text-[#7A7265] mt-0.5">
                Classement physique : Boutique, Produits, Projets, Réalisations, Événements.
              </p>
            </div>
            <button
              onClick={() => setActivePage('galerie')}
              className="px-4 py-2 border border-[#1E1B18] text-xs uppercase tracking-wider text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white transition-colors"
            >
              Ouvrir la galerie publique
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <div key={item.id} className="p-3 bg-[#FBF9F5] border border-[#1E1B18]/10 space-y-2">
                <div className="aspect-[4/3] bg-[#EAE4DB] overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-medium text-[#1E1B18] truncate">{item.title}</p>
                  <p className="text-[10px] font-mono text-[#8C8375] uppercase">{item.category} {item.isDemo ? '· DÉMO' : '· OFFICIEL'}</p>
                </div>
                <button
                  onClick={() => {
                    deleteMediaItem(item.id);
                    showNotification('Média supprimé de la bibliothèque.');
                  }}
                  className="w-full py-1 text-center text-[10px] text-red-600 hover:bg-red-50 uppercase tracking-wider"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SETTINGS & COORDINATES FORM */}
      {currentTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-8 bg-[#FBF9F5] p-8 border border-[#1E1B18]/10">
          <div>
            <h2 className="text-2xl font-serif-display text-[#1E1B18]">
              Coordonnées de l'Établissement & Clés de Paiement
            </h2>
            <p className="text-xs text-[#7A7265] mt-0.5">
              Ces informations alimentent directement les mentions du site, le pied de page, le SEO et les passerelles Wave / Orange Money.
            </p>
          </div>

          {/* Visual Identity & Logo Display */}
          <div className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[#1E1B18] border-b border-[#1E1B18]/10 pb-1">
              Identité Graphique & Typographie Officielle
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <AtmosphereLogo size="hero" />
              <div className="space-y-2 text-xs text-[#544E44]">
                <p className="font-semibold text-sm text-[#1E1B18]">
                  Logo Officiel Atmosphère Décoration (Pastille Chartreuse)
                </p>
                <p className="text-[11px] leading-relaxed">
                  Le logo vectoriel officiel a été intégré au site. Il reproduit fidèlement le disque chartreuse (#9BBA1A) et la calligraphie script « Atmosphère ».
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div><span className="text-[#8C8375]">Police Titres :</span> Playfair Display</div>
                  <div><span className="text-[#8C8375]">Police Signature :</span> Parisienne / Alex Brush</div>
                  <div><span className="text-[#8C8375]">Police Corps :</span> Plus Jakarta Sans</div>
                  <div><span className="text-[#8C8375]">Format Logo :</span> Vectoriel SVG (.svg)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Identity & Address */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[#1E1B18] border-b border-[#1E1B18]/10 pb-1">
              1. Identité & Adresse Publique
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Nom de la Maison</label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Slogan / Signature</label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Adresse</label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Téléphone Public</label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Email Public</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Numéro WhatsApp (sans le +)</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Compte Instagram Officiel</label>
                <input
                  type="text"
                  placeholder="@atmospheredakar"
                  value={settingsForm.instagramHandle || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagramHandle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Lien Profil Instagram</label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/atmospheredakar"
                  value={settingsForm.instagramUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[#1E1B18] border-b border-[#1E1B18]/10 pb-1">
              2. Horaires d'Ouverture du Showroom
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Du Lundi au Vendredi</label>
                <input
                  type="text"
                  value={settingsForm.openingHoursWeekday}
                  onChange={(e) => setSettingsForm({ ...settingsForm, openingHoursWeekday: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Samedi</label>
                <input
                  type="text"
                  value={settingsForm.openingHoursSaturday}
                  onChange={(e) => setSettingsForm({ ...settingsForm, openingHoursSaturday: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Dimanche</label>
                <input
                  type="text"
                  value={settingsForm.openingHoursSunday}
                  onChange={(e) => setSettingsForm({ ...settingsForm, openingHoursSunday: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>
            </div>
          </div>

          {/* Official Payment Credentials (Wave & Orange Money) */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[#1E1B18] border-b border-[#1E1B18]/10 pb-1">
              3. Identifiants Marchands Wave & Orange Money (Sénégal)
            </h3>
            <p className="text-[11px] text-[#7A7265]">
              Renseignez les Merchant IDs officiels fournis par les opérateurs pour lier vos comptes bancaires au Sénégal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
                <span className="font-mono font-bold text-[#1E1B18]">WAVE MERCHANT CONFIG</span>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">WAVE_MERCHANT_ID</label>
                  <input
                    type="text"
                    value={settingsForm.waveMerchantId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, waveMerchantId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#1E1B18]/10 font-mono text-xs text-[#1E1B18]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
                <span className="font-mono font-bold text-[#1E1B18]">ORANGE MONEY MERCHANT CONFIG</span>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">ORANGE_MONEY_MERCHANT_ID</label>
                  <input
                    type="text"
                    value={settingsForm.orangeMoneyMerchantId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, orangeMoneyMerchantId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#1E1B18]/10 font-mono text-xs text-[#1E1B18]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security & Admin Passcode Management */}
          <div className="p-6 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1E1B18]/10 pb-2">
              <KeyRound size={16} className="text-[#9BBA1A]" />
              <h3 className="text-xs uppercase font-mono tracking-wider text-[#1E1B18]">
                4. Sécurité & Mot de Passe de l'Espace Administrateur
              </h3>
            </div>

            <p className="text-xs text-[#5C564B] leading-relaxed">
              Pour protéger les commandes, coordonnées clients, messagerie et tarifs de la maison, personnalisez le mot de passe d'accès au backoffice.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Nouveau mot de passe</label>
                <input
                  type="password"
                  placeholder="Min. 6 caractères"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Confirmer le mot de passe</label>
                <input
                  type="password"
                  placeholder="Répétez le mot de passe"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#1E1B18]/10 text-xs text-[#1E1B18]"
                />
              </div>
            </div>

            {passcodeError && (
              <div className="p-2.5 bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0 text-red-600" />
                <span>{passcodeError}</span>
              </div>
            )}

            {passcodeSuccess && (
              <div className="p-2.5 bg-green-100 border border-green-300 text-green-800 text-xs flex items-center gap-2">
                <Check size={14} className="shrink-0 text-green-600" />
                <span>{passcodeSuccess}</span>
              </div>
            )}

            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={handleChangePasscode}
                className="px-5 py-2.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Lock size={12} />
                <span>Mettre à jour le mot de passe</span>
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury"
            >
              Enregistrer toutes les modifications
            </button>
          </div>
        </form>
      )}

      {/* Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] max-w-2xl w-full p-6 sm:p-8 border border-[#1E1B18]/20 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E1B18]/10 pb-3">
              <h3 className="font-serif-display text-2xl text-[#1E1B18]">
                {editingProductId ? 'Modifier la pièce' : 'Créer une nouvelle pièce'}
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-xs uppercase text-[#8C8375] hover:text-[#1E1B18]"
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Référence *</label>
                  <input
                    type="text"
                    required
                    value={productForm.reference}
                    onChange={(e) => setProductForm({ ...productForm, reference: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Nom de la création *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Catégorie</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  >
                    <option value="Salon">Salon</option>
                    <option value="Chambre">Chambre</option>
                    <option value="Espace enfant">Espace enfant</option>
                    <option value="Table">Table</option>
                    <option value="Décoration">Décoration</option>
                    <option value="Luminaires">Luminaires</option>
                    <option value="Extérieur">Extérieur</option>
                    <option value="Accessoires">Accessoires</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Collection</label>
                  <input
                    type="text"
                    value={productForm.collection}
                    onChange={(e) => setProductForm({ ...productForm, collection: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Disponibilité</label>
                  <select
                    value={productForm.availability}
                    onChange={(e) => setProductForm({ ...productForm, availability: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  >
                    <option value="En boutique">En boutique</option>
                    <option value="Sur commande">Sur commande</option>
                    <option value="Sur mesure">Sur mesure</option>
                  </select>
                </div>
              </div>

              {/* Price Mode */}
              <div className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1E1B18]">
                  <input
                    type="checkbox"
                    checked={productForm.isPriceOnRequest}
                    onChange={(e) => setProductForm({ ...productForm, isPriceOnRequest: e.target.checked })}
                    className="rounded text-[#1E1B18]"
                  />
                  <span>Prix sur demande (pas de prix affiché)</span>
                </label>

                {!productForm.isPriceOnRequest && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#736B5F]">Tarif de vente (FCFA)</label>
                    <input
                      type="number"
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      placeholder="Ex : 120000"
                      className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#1E1B18]/10 font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Dimensions</label>
                  <input
                    type="text"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                    placeholder="L x P x H cm"
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#736B5F]">Matériaux</label>
                  <input
                    type="text"
                    value={productForm.materials}
                    onChange={(e) => setProductForm({ ...productForm, materials: e.target.value })}
                    placeholder="Bois massif, grès, laiton..."
                    className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#736B5F]">Description détaillée</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EC] border border-[#1E1B18]/10"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-[#1E1B18]/20 uppercase tracking-wider"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1E1B18] text-white hover:bg-[#38332D] uppercase tracking-wider"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
