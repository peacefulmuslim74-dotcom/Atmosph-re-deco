export type ProductCategory = 
  | 'Salon'
  | 'Chambre'
  | 'Espace enfant'
  | 'Table'
  | 'Décoration'
  | 'Luminaires'
  | 'Extérieur'
  | 'Accessoires';

export type ProductAvailability = 'En boutique' | 'Sur commande' | 'Sur mesure';

export interface Product {
  id: string;
  reference: string;
  name: string;
  category: ProductCategory;
  collection: string;
  description: string;
  price: number | null; // null means 'Prix sur demande'
  isPriceOnRequest: boolean;
  dimensions: string;
  materials: string;
  color: string;
  availability: ProductAvailability;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];
  isDemoAsset?: boolean;
}

export type BespokeStatus = 
  | 'nouveau'
  | 'en étude'
  | 'contact client'
  | 'proposition'
  | 'accepté'
  | 'refusé'
  | 'terminé';

export interface BespokeProject {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  projectType: string; // e.g. "Mobilier sur mesure", "Aménagement complet", "Conseil & Sélection"
  room: string; // e.g. "Salon", "Suite Parentale", "Salle à manger", "Terrasse", "Bureau", "Espace enfant"
  dimensions: string;
  budget?: string;
  description: string;
  referenceImages: string[];
  status: BespokeStatus;
  createdAt: string;
  internalNotes?: string;
}

export type PaymentMethod = 'wave' | 'orange_money';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderAuditLog {
  timestamp: string;
  event: string;
  details?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryZone: string;
  deliveryFee: number;
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentIntentId: string;
  transactionId: string;
  idempotencyKey: string;
  createdAt: string;
  auditLog: OrderAuditLog[];
}

export type MediaCategory = 
  | 'photos_boutique'
  | 'photos_produits'
  | 'projets'
  | 'realisations'
  | 'evenements';

export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  url: string;
  isDemo: boolean;
  caption: string;
  dateAdded: string;
}

export interface DeliveryZoneConfig {
  id: string;
  name: string;
  delay: string;
  fee: number; // in FCFA
  isConfigured: boolean;
  notes: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  address: string;
  neighborhood: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  openingHoursWeekday: string;
  openingHoursSaturday: string;
  openingHoursSunday: string;
  announcementText: string;
  showAnnouncement: boolean;
  currency: string;
  // Official Payment credentials configuration (editable by admin)
  waveMerchantId: string;
  waveApiKeyConfigured: boolean;
  orangeMoneyMerchantId: string;
  orangeMoneyApiKeyConfigured: boolean;
  metaTitle: string;
  metaDescription: string;
  adminPasscode?: string;
  instagramHandle?: string;
  instagramUrl?: string;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  permalink: string;
  categoryTag?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
