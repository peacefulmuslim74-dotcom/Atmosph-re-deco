import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartCount, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    setIsCheckoutOpen,
    setActivePage
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#1E1B18]/15 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#1E1B18]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#1E1B18]" />
            <h3 className="font-serif-display text-xl text-[#1E1B18]">
              Votre Sélection
            </h3>
            <span className="text-xs font-mono text-[#8C8375]">
              ({cartCount})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#736B5F] hover:text-[#1E1B18] transition-colors"
            aria-label="Fermer le panier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag size={36} className="mx-auto text-[#C9BFB0]" strokeWidth={1} />
              <p className="font-serif-display text-lg text-[#1E1B18]">
                Votre panier est vide
              </p>
              <p className="text-xs text-[#7A7265] max-w-xs mx-auto">
                Explorez nos collections pour sélectionner du mobilier contemporain et des objets d'art.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('catalogue');
                }}
                className="px-5 py-2.5 bg-[#1E1B18] text-white text-xs uppercase tracking-wider"
              >
                Découvrir le catalogue
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/5 flex gap-4 items-center"
              >
                <div className="w-16 h-16 bg-[#E5DFD6] shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-serif-display text-[#1E1B18] truncate font-medium">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#7A7265] font-mono">
                    {item.product.price ? `${item.product.price.toLocaleString('fr-FR')} FCFA` : 'Sur demande'}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center border border-[#1E1B18]/15 bg-[#FBF9F5]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-[#544E44] hover:text-[#1E1B18]"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2 text-xs font-mono tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-[#544E44] hover:text-[#1E1B18]"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#8C8375] hover:text-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-[#1E1B18] tabular-nums">
                    {item.product.price ? `${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA` : '—'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout Trigger */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#1E1B18]/10 bg-[#F6F2EC] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C564B]">
                <span>Sous-total articles :</span>
                <span className="font-mono text-[#1E1B18] tabular-nums font-semibold">
                  {cartTotal.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <div className="flex justify-between text-[#7A7265] text-[11px]">
                <span>Frais de livraison à Dakar :</span>
                <span>Calculés à l'étape suivante</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3.5 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury flex items-center justify-center gap-2"
            >
              <span>Valider la commande</span>
              <ArrowRight size={14} />
            </button>

            <p className="text-[10px] text-center text-[#8C8375] font-light">
              Paiement sécurisé au Sénégal par Wave ou Orange Money.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
