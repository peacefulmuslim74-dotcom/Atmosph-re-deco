import { 
  Product, 
  BespokeProject, 
  Order, 
  MediaItem, 
  StoreSettings, 
  DeliveryZoneConfig,
  ContactMessage,
  InstagramPost 
} from '../types';

// Images generated for editorial presentation
import heroImg from '../assets/images/hero_atmosphere_dakar_1790648952795.jpg';
import craftImg from '../assets/images/craft_sur_mesure_1790648964083.jpg';
import tableImg from '../assets/images/table_art_vivre_1790648976139.jpg';
import sculptureImg from '../assets/images/sculpture_objet_art_1790648987021.jpg';
import instaShowroomImg from '../assets/images/insta_showroom_almadies_1790652248047.jpg';
import instaCraftImg from '../assets/images/insta_atelier_craft_1790652259351.jpg';
import instaLightingImg from '../assets/images/insta_lighting_dusk_1790652270415.jpg';

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'ATMOSPHÈRE',
  tagline: "L'ART D'HABITER",
  address: 'Route des Almadies',
  neighborhood: 'Almadies',
  city: 'Dakar',
  country: 'Sénégal',
  phone: '+221 77 651 01 13',
  email: 'atmosphere@orange.sn',
  whatsappNumber: '221776510113',
  openingHoursWeekday: '09h30 — 19h00',
  openingHoursSaturday: '10h00 — 19h00',
  openingHoursSunday: 'Fermé (Sur rendez-vous pour projets)',
  announcementText: '',
  showAnnouncement: false,
  currency: 'FCFA',
  waveMerchantId: 'WAVE-SN-ATMOS-DAKAR',
  waveApiKeyConfigured: false,
  orangeMoneyMerchantId: 'OM-SN-ATMOSPHERE-776510113',
  orangeMoneyApiKeyConfigured: false,
  metaTitle: "Atmosphère Décoration Dakar — L'Art d'Habiter",
  metaDescription: "Maison de décoration d'intérieur, mobilier contemporain, objets d'art et créations sur mesure aux Almadies, Dakar.",
  adminPasscode: 'atmosphere2024',
  instagramHandle: '@atmospheredakar',
  instagramUrl: 'https://www.instagram.com/atmospheredakar'
};

export const INITIAL_DELIVERY_ZONES: DeliveryZoneConfig[] = [
  {
    id: 'zone-dakar-ville',
    name: 'Dakar (Almadies, Ngor, Mermoz, Plateau, Fann, Point E)',
    delay: '24h à 48h ouvrées',
    fee: 5000,
    isConfigured: true,
    notes: 'Livraison soignée avec protection renforcée pour objets d’art et verrerie.'
  },
  {
    id: 'zone-banlieue',
    name: 'Banlieue de Dakar (Rufisque, Guédiawaye, Pikine, Diamniadio)',
    delay: '48h à 72h ouvrées',
    fee: 10000,
    isConfigured: true,
    notes: 'Prise de rendez-vous téléphonique avant expédition.'
  },
  {
    id: 'zone-regions',
    name: 'Petite Côte & Autres Régions (Saly, Somone, Saint-Louis)',
    delay: '3 à 5 jours ouvrés',
    fee: 25000,
    isConfigured: true,
    notes: 'Transport dédié pour mobilier volumineux ou expédition sécurisée.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    reference: 'ATM-SLN-001',
    name: 'Canapé Architectural Incurvé',
    category: 'Salon',
    collection: 'Almadies Monolithe',
    description: 'Structure sculpturale aux proportions équilibrées, habillage en bouclé sable texturé haute résistance. Pièce maîtresse conçue pour capter la lumière naturelle.',
    price: null,
    isPriceOnRequest: true,
    dimensions: 'L 240 x P 105 x H 78 cm',
    materials: 'Bois massif d’iroko sélectionné, tissu bouclé haute densité, assise mousse haute résilience',
    color: 'Sable écru & Terre douce',
    availability: 'Sur commande',
    isNew: true,
    isFeatured: true,
    images: [heroImg],
    isDemoAsset: true
  },
  {
    id: 'prod-02',
    reference: 'ATM-ART-002',
    name: 'Vase Céramique Monoxyle N°4',
    category: 'Décoration',
    collection: 'Terre & Silence',
    description: 'Vase sculptural modelé à la main avec finition émaillée brute et pigment minéral. Une pièce forte à poser sur console ou table basse.',
    price: 65000,
    isPriceOnRequest: false,
    dimensions: 'Diamètre 28 cm x H 42 cm',
    materials: 'Grès chamotté haute température, engobe naturel minéral',
    color: 'Terre cuite texturée & Noir anthracite',
    availability: 'En boutique',
    isNew: true,
    isFeatured: true,
    images: [sculptureImg],
    isDemoAsset: true
  },
  {
    id: 'prod-03',
    reference: 'ATM-TAB-003',
    name: 'Service de Table en Grès Naturel',
    category: 'Table',
    collection: 'Atelier Table',
    description: 'Ensemble de 6 assiettes plates et 6 assiettes creuses aux bords organiques légèrement irréguliers. Alliance parfaite entre artisanat d’exception et usage quotidien.',
    price: 145000,
    isPriceOnRequest: false,
    dimensions: 'Assiette plate Ø 27 cm, creuse Ø 21 cm',
    materials: 'Grès émaillé alimentaire, résistant lave-vaisselle',
    color: 'Blanc cassé mat & liseré sable',
    availability: 'En boutique',
    isNew: false,
    isFeatured: true,
    images: [tableImg],
    isDemoAsset: true
  },
  {
    id: 'prod-04',
    reference: 'ATM-SUR-004',
    name: 'Table Basse Assemblage Laiton & Bois Noble',
    category: 'Salon',
    collection: 'Studio Sur-Mesure',
    description: 'Table basse basse d’architecte réalisée sur mesure selon les dimensions de votre pièce. Plateau en bois massif traité aux huiles mates naturelles et incrustation de profilé laiton brossé.',
    price: null,
    isPriceOnRequest: true,
    dimensions: 'Dimensions personnalisées (Exemple: 140 x 70 x 36 cm)',
    materials: 'Bois noble massif, laiton brossé satiné',
    color: 'Chêne fumé ou Noyer naturel, laiton doré mat',
    availability: 'Sur mesure',
    isNew: true,
    isFeatured: true,
    images: [craftImg],
    isDemoAsset: true
  },
  {
    id: 'prod-05',
    reference: 'ATM-LUM-005',
    name: 'Suspension Murale Sphère & Travertin',
    category: 'Luminaires',
    collection: 'Ombres & Lumières',
    description: 'Applique sculpturale en travertin naturel beige et globe en verre opalin soufflé bouche. Lumière chaleureuse et diffuse idéale pour couloir ou tête de lit.',
    price: 95000,
    isPriceOnRequest: false,
    dimensions: 'L 20 x P 18 x H 38 cm',
    materials: 'Travertin beige naturel non rebouché, laiton, opaline',
    color: 'Pierre travertin & Laiton satiné',
    availability: 'En boutique',
    isNew: false,
    isFeatured: false,
    images: [sculptureImg],
    isDemoAsset: true
  },
  {
    id: 'prod-06',
    reference: 'ATM-CHM-006',
    name: 'Tête de Lit Tapissée Lin Lavé Lourd',
    category: 'Chambre',
    collection: 'Almadies Repos',
    description: 'Confection sur mesure dans nos ateliers partenaires. Rembourrage généreux, housse amovible en pur lin lavé 420g/m² d’une grande douceur tactile.',
    price: null,
    isPriceOnRequest: true,
    dimensions: 'Pour lit 160x200 ou 180x200 cm (H 120 cm)',
    materials: 'Pur lin européen lavé, structure bois et mousse haute résilience',
    color: 'Sable chaud, ficelle ou charbon',
    availability: 'Sur commande',
    isNew: false,
    isFeatured: false,
    images: [heroImg],
    isDemoAsset: true
  },
  {
    id: 'prod-07',
    reference: 'ATM-ENF-007',
    name: 'Lit Cabane & Banquette Évolutive Enfant',
    category: 'Espace enfant',
    collection: 'Petits Mondes',
    description: 'Mobilier pensé pour grandir avec l’enfant, lignes épurées et sécurisées sans angles vifs. Finition vernis à l’eau écologique sans COV.',
    price: 280000,
    isPriceOnRequest: false,
    dimensions: 'L 196 x P 96 x H 145 cm (couchage 90x190)',
    materials: 'Hêtre massif et contreplaqué bouleau certifié',
    color: 'Bois clair naturel & Blanc soie',
    availability: 'Sur commande',
    isNew: true,
    isFeatured: false,
    images: [craftImg],
    isDemoAsset: true
  },
  {
    id: 'prod-08',
    reference: 'ATM-EXT-008',
    name: 'Fauteuil Lounge d’Extérieur Corde & Teck',
    category: 'Extérieur',
    collection: 'Breeze Almadies',
    description: 'Conçu pour résister à l’air marin de la presqu’île des Almadies. Tressage manuel en corde polyoléfine traitée anti-UV et bois résistant.',
    price: 195000,
    isPriceOnRequest: false,
    dimensions: 'L 78 x P 82 x H 74 cm',
    materials: 'Teck naturel imputrescible, cordage imputrescible, coussin déperlant',
    color: 'Bois miel & Corde beige sable',
    availability: 'En boutique',
    isNew: false,
    isFeatured: false,
    images: [heroImg],
    isDemoAsset: true
  },
  {
    id: 'prod-09',
    reference: 'ATM-ACC-009',
    name: 'Plaid Pure Laine & Coton Épais Tissé Main',
    category: 'Accessoires',
    collection: 'Touchers Nobles',
    description: 'Tissage artisanal aux finitions frangées discrètes. Apporte relief et chaleur sur un canapé ou en bout de lit.',
    price: 48000,
    isPriceOnRequest: false,
    dimensions: '140 x 200 cm',
    materials: '70% laine naturelle, 30% coton brut',
    color: 'Écru naturel & trame taupe subtile',
    availability: 'En boutique',
    isNew: false,
    isFeatured: false,
    images: [tableImg],
    isDemoAsset: true
  }
];

export const INITIAL_BESPOKE_PROJECTS: BespokeProject[] = [
  {
    id: 'proj-01',
    clientName: 'Mme Aminata D.',
    clientPhone: '+221 77 123 45 67',
    clientEmail: 'aminata.d@gmail.com',
    projectType: 'Mobilier sur mesure',
    room: 'Salon & Salle à manger',
    dimensions: 'Pièce de 55 m², hauteur sous plafond 3.10 m',
    budget: 'Sur devis personnalisé',
    description: 'Création d’un buffet bas en bois massif avec incrustations laiton et d’une table à manger 10 couverts adaptée à notre nouvelle villa aux Almadies.',
    referenceImages: [craftImg],
    status: 'en étude',
    createdAt: '2026-09-24 14:32',
    internalNotes: 'Contact téléphonique pris le 25 sept. Premier croquis d’agencement en cours avec l’atelier.'
  },
  {
    id: 'proj-02',
    clientName: 'M. Jean-Paul K.',
    clientPhone: '+221 78 456 78 90',
    clientEmail: 'jp.k@studio-archi.sn',
    projectType: 'Aménagement complet & Décoration',
    room: 'Terrasse couverte & Suite parentale',
    dimensions: 'Terrasse 35 m²',
    budget: 'Non spécifié',
    description: 'Sélection complète de mobilier résistant au climat des Almadies (teck, cordages marins) et luminaires chaleureux.',
    referenceImages: [heroImg],
    status: 'nouveau',
    createdAt: '2026-09-27 10:15',
    internalNotes: 'Dossier reçu via le formulaire du site web. À recontacter par WhatsApp.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ATM-2026-0042',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Vase céramique
        quantity: 1
      }
    ],
    subtotal: 65000,
    deliveryZone: 'Dakar (Almadies, Ngor, Mermoz, Plateau, Fann, Point E)',
    deliveryFee: 5000,
    totalAmount: 70000,
    customerName: 'Fatou Sow',
    customerPhone: '+221 77 987 65 43',
    customerEmail: 'fatou.sow@orange.sn',
    deliveryAddress: 'Villa 14, Rue des Étoiles, Almadies, Dakar',
    paymentMethod: 'wave',
    paymentStatus: 'success',
    paymentIntentId: 'pi_wave_9941a87b32c0',
    transactionId: 'WAVE-TX-8827103',
    idempotencyKey: 'idemp_wave_779876543_179060',
    createdAt: '2026-09-26 16:45',
    auditLog: [
      { timestamp: '2026-09-26 16:44:12', event: 'Payment Intent Created', details: 'Method: Wave, Amount: 70000 XOF' },
      { timestamp: '2026-09-26 16:44:58', event: 'Wave Webhook Received', details: 'Status: 200 OK, Transaction confirmed by Wave Senegal' },
      { timestamp: '2026-09-26 16:45:00', event: 'Order Confirmed', details: 'Notification dispatched to atmosphere@orange.sn' }
    ]
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-01',
    title: 'Scénographie d’Intérieur Almadies',
    category: 'photos_boutique',
    url: heroImg,
    isDemo: true,
    caption: '[DÉMO / Espace réservé à la boutique — Prêt pour vos photos d’Atmosphère]',
    dateAdded: '2026-09-20'
  },
  {
    id: 'med-02',
    title: 'Détail de Menuiserie et Laiton',
    category: 'projets',
    url: craftImg,
    isDemo: true,
    caption: '[DÉMO / Réalisation atelier — Assemblage de matières nobles]',
    dateAdded: '2026-09-22'
  },
  {
    id: 'med-03',
    title: 'Art de la Table & Grès Minéral',
    category: 'photos_produits',
    url: tableImg,
    isDemo: true,
    caption: '[DÉMO / Pièces d’art de vivre sélectionnées pour Dakar]',
    dateAdded: '2026-09-23'
  },
  {
    id: 'med-04',
    title: 'Objet Sculptural Minéral',
    category: 'photos_produits',
    url: sculptureImg,
    isDemo: true,
    caption: '[DÉMO / Curations d’objets décoratifs contemporains]',
    dateAdded: '2026-09-24'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'Cabinet d’Architecture K&S',
    email: 'contact@ks-architecture.sn',
    phone: '+221 77 444 33 22',
    subject: 'Demande de collaboration mobilier de projet',
    message: 'Bonjour l’équipe Atmosphère, nous préparons l’aménagement d’un hôtel particulier à Ngor et souhaiterions visiter votre showroom aux Almadies pour sélectionner plusieurs pièces.',
    createdAt: '2026-09-25 11:20',
    isRead: false
  }
];

export const INITIAL_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'insta-01',
    mediaUrl: instaShowroomImg,
    caption: 'Lumière matinale sur la nouvelle scénographie aux Almadies. Lignes sobres, matières brutes et lin texturé.',
    likes: 248,
    comments: 19,
    timestamp: 'Il y a 3 heures',
    permalink: 'https://www.instagram.com/atmospheredakar',
    categoryTag: 'Showroom Almadies'
  },
  {
    id: 'insta-02',
    mediaUrl: instaCraftImg,
    caption: 'Dans les coulisses de notre atelier à Dakar : tressage à la main de corde de raphia naturel sur structure en teck.',
    likes: 312,
    comments: 27,
    timestamp: 'Hier',
    permalink: 'https://www.instagram.com/atmospheredakar',
    categoryTag: 'Atelier Sur-Mesure'
  },
  {
    id: 'insta-03',
    mediaUrl: instaLightingImg,
    caption: 'Lumière tamisée au crépuscule. Nos suspensions organiques transforment l’atmosphère dès la tombée du jour.',
    likes: 421,
    comments: 34,
    timestamp: 'Il y a 2 jours',
    permalink: 'https://www.instagram.com/atmospheredakar',
    categoryTag: 'Luminaires'
  },
  {
    id: 'insta-04',
    mediaUrl: tableImg,
    caption: 'L’art de la table selon Atmosphère : grès artisanal, lin lavé et détails minéraux pour recevoir avec élégance.',
    likes: 189,
    comments: 14,
    timestamp: 'Il y a 4 jours',
    permalink: 'https://www.instagram.com/atmospheredakar',
    categoryTag: 'Art de Vivre'
  },
  {
    id: 'insta-05',
    mediaUrl: sculptureImg,
    caption: 'Sélection d’objets sculpturaux. Chaque pièce raconte une histoire de matière et d’équilibre.',
    likes: 275,
    comments: 21,
    timestamp: 'Il y a 5 jours',
    permalink: 'https://www.instagram.com/atmospheredakar',
    categoryTag: 'Objets d’Art'
  },
  {
    id: 'insta-06',
    mediaUrl: heroImg,
    caption: 'Collection permanente et pièces d’exception à découvrir au showroom Route des Almadies.',
    likes: 534,
    comments: 48,
    timestamp: 'Il y a 1 semaine',
    permalink: 'https://www.instagram.com/atmospheredakar',
    categoryTag: 'Collections'
  }
];

