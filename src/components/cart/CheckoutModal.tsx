import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod } from '../../types';
import { 
  X, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  FileText,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    deliveryZones, 
    processCheckout, 
    settings 
  } = useStore();

  const [deliveryZoneId, setDeliveryZoneId] = useState<string>(deliveryZones[0]?.id || 'zone-dakar-ville');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wave');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+221 ');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Payment State Machine
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success' | 'failed'>('form');
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const currentZone = deliveryZones.find(z => z.id === deliveryZoneId) || deliveryZones[0];
  const finalTotal = cartTotal + (currentZone?.fee || 0);

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Veuillez remplir les informations obligatoires de livraison.');
      return;
    }

    setPaymentStep('processing');
    setStatusLog([
      `[1/4] Initialisation du Payment Intent (${paymentMethod.toUpperCase()})...`,
      `Génération de l'Idempotency Key & enregistrement de la session...`
    ]);

    // Step 2 simulated latency
    setTimeout(() => {
      setStatusLog(prev => [
        ...prev,
        `[2/4] Envoi de l'instruction de paiement au réseau ${paymentMethod === 'wave' ? 'Wave Digital Finance' : 'Orange Money Sénégal'}...`,
        `Demande d'autorisation émise vers le compte client ${customerPhone}...`
      ]);
    }, 1200);

    // Step 3 webhook simulation
    setTimeout(() => {
      setStatusLog(prev => [
        ...prev,
        `[3/4] Réception du Webhook officiel avec signature HMAC chiffrée...`,
        `Validation cryptographique du statut TRANSACTION_CONFIRMED...`
      ]);
    }, 2400);

    // Step 4 order creation & audit log
    setTimeout(async () => {
      const result = await processCheckout({
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress,
        deliveryZoneId,
        paymentMethod
      });

      if (result.success && result.orderId) {
        setStatusLog(prev => [
          ...prev,
          `[4/4] Commande ${result.orderId} validée. Journal d'audit archivé.`
        ]);
        setConfirmedOrderId(result.orderId);
        setPaymentStep('success');
      } else {
        setPaymentStep('failed');
      }
    }, 3600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setPaymentStep('form');
    setStatusLog([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FBF9F5] max-w-2xl w-full border border-[#1E1B18]/20 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#1E1B18]/10 flex items-center justify-between bg-[#F6F2EC]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C8375]">
              PAIEMENT MOBILE AU SÉNÉGAL
            </span>
            <h3 className="font-serif-display text-2xl text-[#1E1B18]">
              Finalisation de Commande
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-[#7A7265] hover:text-[#1E1B18] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {paymentStep === 'form' && (
          <form onSubmit={handleStartPayment} className="p-6 sm:p-8 space-y-6 text-xs max-h-[80vh] overflow-y-auto">
            
            {/* Delivery Details */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-[#1E1B18] font-semibold border-b border-[#1E1B18]/10 pb-1">
                1. Vos Coordonnées de Livraison à Dakar
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex : Fatou Sow"
                    className="w-full px-3 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Numéro de Téléphone (Mobile Money) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className="w-full px-3 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Adresse Email (pour le reçu de paiement)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="client@domaine.sn"
                    className="w-full px-3 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                    Zone de Livraison *
                  </label>
                  <select
                    value={deliveryZoneId}
                    onChange={(e) => setDeliveryZoneId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                  >
                    {deliveryZones.map(z => (
                      <option key={z.id} value={z.id}>
                        {z.name} (+{z.fee.toLocaleString('fr-FR')} FCFA)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#544E44] font-medium block">
                  Adresse précise & Repères à Dakar *
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ex : Almadies, en face de la pharmacie, Villa n°..."
                  className="w-full px-3 py-2.5 bg-[#F6F2EC] border border-[#1E1B18]/10 text-xs text-[#1E1B18] focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selection: Wave vs Orange Money */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-[#1E1B18] font-semibold border-b border-[#1E1B18]/10 pb-1">
                2. Sélection du Mode de Paiement Sécurisé
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {/* Wave */}
                <div
                  onClick={() => setPaymentMethod('wave')}
                  className={`p-4 border cursor-pointer transition-luxury space-y-2 ${
                    paymentMethod === 'wave'
                      ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                      : 'bg-[#F6F2EC] text-[#1E1B18] border-[#1E1B18]/10 hover:border-[#1E1B18]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold tracking-wider text-xs">WAVE SÉNÉGAL</span>
                    <Smartphone size={16} />
                  </div>
                  <p className={`text-[11px] font-light ${paymentMethod === 'wave' ? 'text-[#D8D2C6]' : 'text-[#6B6357]'}`}>
                    Paiement instantané avec validation par l'application Wave.
                  </p>
                </div>

                {/* Orange Money */}
                <div
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`p-4 border cursor-pointer transition-luxury space-y-2 ${
                    paymentMethod === 'orange_money'
                      ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                      : 'bg-[#F6F2EC] text-[#1E1B18] border-[#1E1B18]/10 hover:border-[#1E1B18]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold tracking-wider text-xs">ORANGE MONEY</span>
                    <Smartphone size={16} />
                  </div>
                  <p className={`text-[11px] font-light ${paymentMethod === 'orange_money' ? 'text-[#D8D2C6]' : 'text-[#6B6357]'}`}>
                    Validation par push mobile ou code USSD officiel (#144#).
                  </p>
                </div>
              </div>

              {/* Developer / Merchant Official Architecture Transparency */}
              <div className="p-3 bg-[#EFEAE2] border border-[#1E1B18]/10 text-[11px] text-[#665E52] space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#1E1B18]">
                  <Lock size={12} />
                  <span>Architecture API Officielle</span>
                </div>
                <p>
                  Les clés de production ({paymentMethod === 'wave' ? 'WAVE_API_KEY' : 'ORANGE_MONEY_API_KEY'}) et webhooks sont configurables par le propriétaire dans l'administration. En environnement de démonstration, la confirmation réelle par webhook est simulée avec idempotence et journalisation.
                </p>
              </div>
            </div>

            {/* Order Summary & Pricing Calculation */}
            <div className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 space-y-2">
              <div className="flex justify-between text-[#6B6357]">
                <span>Sous-total ({cart.length} articles) :</span>
                <span className="font-mono tabular-nums">{cartTotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-[#6B6357]">
                <span>Frais de livraison ({currentZone?.name.split('(')[0]}) :</span>
                <span className="font-mono tabular-nums">{currentZone?.fee.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1E1B18] pt-2 border-t border-[#1E1B18]/10">
                <span>Total à régler :</span>
                <span className="font-mono text-base tabular-nums">{finalTotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#1E1B18] text-white hover:bg-[#38332D] text-xs uppercase tracking-[0.16em] font-medium transition-luxury flex items-center justify-center gap-2"
            >
              <span>Confirmer & Régler via {paymentMethod === 'wave' ? 'Wave' : 'Orange Money'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* Processing State with Live Transaction Logs */}
        {paymentStep === 'processing' && (
          <div className="p-10 text-center space-y-6">
            <Loader2 size={36} className="mx-auto text-[#1E1B18] animate-spin" />
            <div className="space-y-1">
              <h4 className="font-serif-display text-2xl text-[#1E1B18]">
                Traitement de la Transaction
              </h4>
              <p className="text-xs text-[#7A7265]">
                Communication avec le serveur de paiement officiel...
              </p>
            </div>

            <div className="bg-[#1E1B18] text-[#EFEBE4] p-4 text-left font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
              {statusLog.map((log, i) => (
                <p key={i} className="text-[#A89F90]">{log}</p>
              ))}
            </div>

            <p className="text-[11px] text-[#8C8375] italic">
              Veuillez ne pas fermer cette fenêtre pendant la confirmation du webhook.
            </p>
          </div>
        )}

        {/* Success State */}
        {paymentStep === 'success' && (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1E1B18] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8C8375]">
                TRANSACTION CONFIRMÉE PAR WEBHOOK
              </span>
              <h3 className="font-serif-display text-3xl text-[#1E1B18]">
                Merci pour votre commande
              </h3>
              <p className="text-sm text-[#5C564B] max-w-md mx-auto leading-relaxed font-light">
                Votre paiement a été certifié avec succès. Notre équipe prépare votre sélection pour l'adresse indiquée à Dakar.
              </p>
            </div>

            <div className="p-4 bg-[#F6F2EC] border border-[#1E1B18]/10 max-w-md mx-auto text-left text-xs font-mono space-y-1 text-[#544E44]">
              <p><span className="text-[#1E1B18]">N° de Commande :</span> {confirmedOrderId}</p>
              <p><span className="text-[#1E1B18]">Mode :</span> {paymentMethod.toUpperCase()}</p>
              <p><span className="text-[#1E1B18]">Montant réglé :</span> {finalTotal.toLocaleString('fr-FR')} FCFA</p>
              <p><span className="text-[#1E1B18]">Statut Webhook :</span> 200 OK — Idempotence validée</p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#1E1B18] text-white text-xs uppercase tracking-wider"
            >
              Fermer et retourner au site
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
