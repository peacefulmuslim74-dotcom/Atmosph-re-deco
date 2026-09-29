import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  BespokeProject, 
  Order, 
  MediaItem, 
  StoreSettings, 
  DeliveryZoneConfig, 
  ContactMessage, 
  CartItem, 
  BespokeStatus,
  PaymentMethod
} from '../types';
import { 
  INITIAL_SETTINGS, 
  INITIAL_DELIVERY_ZONES, 
  INITIAL_PRODUCTS, 
  INITIAL_BESPOKE_PROJECTS, 
  INITIAL_ORDERS, 
  INITIAL_MEDIA, 
  INITIAL_CONTACT_MESSAGES 
} from '../data/initialData';

interface StoreContextType {
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  
  deliveryZones: DeliveryZoneConfig[];
  updateDeliveryZone: (id: string, updates: Partial<DeliveryZoneConfig>) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  bespokeProjects: BespokeProject[];
  addBespokeProject: (project: Omit<BespokeProject, 'id' | 'createdAt' | 'status'>) => string;
  updateBespokeStatus: (id: string, status: BespokeStatus, notes?: string) => void;
  
  orders: Order[];
  processCheckout: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryAddress: string;
    deliveryZoneId: string;
    paymentMethod: PaymentMethod;
  }) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  
  media: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'dateAdded'>) => void;
  deleteMediaItem: (id: string) => void;
  
  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => void;
  markMessageRead: (id: string) => void;
  
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  
  activePage: string;
  setActivePage: (page: string) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  getWhatsAppUrl: (text?: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'atmosphere_settings_v2',
  DELIVERY: 'atmosphere_delivery_v1',
  PRODUCTS: 'atmosphere_products_v1',
  BESPOKE: 'atmosphere_bespoke_v1',
  ORDERS: 'atmosphere_orders_v1',
  MEDIA: 'atmosphere_media_v1',
  MESSAGES: 'atmosphere_messages_v1',
  CART: 'atmosphere_cart_v1'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state with fallback to initial data
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [deliveryZones, setDeliveryZones] = useState<DeliveryZoneConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DELIVERY);
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_ZONES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [bespokeProjects, setBespokeProjects] = useState<BespokeProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BESPOKE);
    return saved ? JSON.parse(saved) : INITIAL_BESPOKE_PROJECTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_MESSAGES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DELIVERY, JSON.stringify(deliveryZones));
  }, [deliveryZones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BESPOKE, JSON.stringify(bespokeProjects));
  }, [bespokeProjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Settings Actions
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Delivery Actions
  const updateDeliveryZone = (id: string, updates: Partial<DeliveryZoneConfig>) => {
    setDeliveryZones(prev => prev.map(zone => zone.id === id ? { ...zone, ...updates } : zone));
  };

  // Products Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, ...updates } : prod));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
  };

  // Bespoke Actions
  const addBespokeProject = (projectData: Omit<BespokeProject, 'id' | 'createdAt' | 'status'>): string => {
    const id = `proj-${Date.now()}`;
    const newProject: BespokeProject = {
      ...projectData,
      id,
      status: 'nouveau',
      createdAt: new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setBespokeProjects(prev => [newProject, ...prev]);
    return id;
  };

  const updateBespokeStatus = (id: string, status: BespokeStatus, notes?: string) => {
    setBespokeProjects(prev => prev.map(proj => {
      if (proj.id === id) {
        return {
          ...proj,
          status,
          internalNotes: notes !== undefined ? notes : proj.internalNotes
        };
      }
      return proj;
    }));
  };

  // Media Actions
  const addMediaItem = (itemData: Omit<MediaItem, 'id' | 'dateAdded'>) => {
    const newItem: MediaItem = {
      ...itemData,
      id: `med-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setMedia(prev => [newItem, ...prev]);
  };

  const deleteMediaItem = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
  };

  // Messages Actions
  const addContactMessage = (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isRead: false
    };
    setContactMessages(prev => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const price = item.product.price || 0;
    return acc + price * item.quantity;
  }, 0);

  // Official Architecture Checkout Simulation for Wave & Orange Money
  const processCheckout = async (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryAddress: string;
    deliveryZoneId: string;
    paymentMethod: PaymentMethod;
  }): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    const zone = deliveryZones.find(z => z.id === orderData.deliveryZoneId) || deliveryZones[0];
    const deliveryFee = zone.fee;
    const totalAmount = cartTotal + deliveryFee;

    const idempotencyKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const paymentIntentId = `pi_${orderData.paymentMethod}_${Math.random().toString(36).substring(2, 11)}`;
    const transactionId = `${orderData.paymentMethod.toUpperCase()}-TX-${Date.now().toString().slice(-6)}`;
    const orderNumber = `ATM-${new Date().getFullYear()}-${String(orders.length + 101).padStart(4, '0')}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      items: [...cart],
      subtotal: cartTotal,
      deliveryZone: zone.name,
      deliveryFee,
      totalAmount,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'success', // Simulated confirmed state by provider webhook
      paymentIntentId,
      transactionId,
      idempotencyKey,
      createdAt: new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      auditLog: [
        {
          timestamp: new Date().toISOString(),
          event: 'Payment Intent Created',
          details: `Method: ${orderData.paymentMethod}, Provider: ${orderData.paymentMethod === 'wave' ? 'Wave Digital Finance' : 'Orange Money Sénégal'}, Amount: ${totalAmount} FCFA, IdempotencyKey: ${idempotencyKey}`
        },
        {
          timestamp: new Date(Date.now() + 1500).toISOString(),
          event: `${orderData.paymentMethod.toUpperCase()} Webhook Verified`,
          details: `Signature valid, Transaction ID: ${transactionId}, Status: CONFIRMED`
        },
        {
          timestamp: new Date(Date.now() + 2000).toISOString(),
          event: 'Order Confirmed and Dispatched to Showroom',
          details: `Customer notification sent to ${orderData.customerPhone}`
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return { success: true, orderId: newOrder.orderNumber };
  };

  const getWhatsAppUrl = (text?: string): string => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const defaultMsg = "Bonjour Atmosphère Décoration, je vous contacte depuis votre site internet concernant une demande de mobilier ou de décoration d'intérieur.";
    const encoded = encodeURIComponent(text || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  return (
    <StoreContext.Provider value={{
      settings,
      updateSettings,
      deliveryZones,
      updateDeliveryZone,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      bespokeProjects,
      addBespokeProject,
      updateBespokeStatus,
      orders,
      processCheckout,
      media,
      addMediaItem,
      deleteMediaItem,
      contactMessages,
      addContactMessage,
      markMessageRead,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      selectedProductForModal,
      setSelectedProductForModal,
      activePage,
      setActivePage,
      searchQuery,
      setSearchQuery,
      getWhatsAppUrl
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
