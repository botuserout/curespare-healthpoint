import React, { useState } from 'react';
import type { CartItem, OrderData } from '../types';
import { validateDiscountCode, type ValidationResult } from '../services/couponService';
import { getGoogleSheetUrl } from '../services/googleSheetService';
import { X, Trash2, Plus, Minus, Tag, CheckCircle2, ShoppingBag, ShieldCheck, Loader2 } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<OrderData | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = validationResult?.isValid ? validationResult.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateDiscountCode(couponInput, subtotal);
    setValidationResult(result);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customerInfo.fullName.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const orderData: OrderData = {
      orderId,
      customerName: customerInfo.fullName,
      phone: customerInfo.phone,
      address: customerInfo.address,
      items: cartItems.map((item) => ({
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: finalTotal,
      discountAmount,
      couponCode: validationResult?.isValid ? couponInput.toUpperCase() : undefined,
      referralCode: validationResult?.isReferral ? couponInput.toUpperCase() : undefined,
      createdAt,
    };

    // 1. Local backup
    try {
      const savedOrders = JSON.parse(localStorage.getItem('curespare_store_orders') || '[]');
      savedOrders.unshift(orderData);
      localStorage.setItem('curespare_store_orders', JSON.stringify(savedOrders.slice(0, 50)));
    } catch (e) {}

    // 2. Post to Google Sheet Webhook if available
    const webhookUrl = getGoogleSheetUrl();
    if (webhookUrl) {
      try {
        const payload = {
          bookingId: orderId,
          submittedAt: createdAt,
          fullName: customerInfo.fullName,
          phone: customerInfo.phone,
          serviceId: `TOOL ORDER (${cartItems.length} items)`,
          message: `Delivery Address: ${customerInfo.address} | Items: ${cartItems.map((i) => `${i.product.title} (x${i.quantity})`).join(', ')} | Total: ₹${finalTotal}`,
        };

        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } catch (err) {}
    }

    setIsSubmitting(false);
    setOrderComplete(orderData);
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-[#DDE3DE] overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 bg-[#07382D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#A8C99D]" />
            <h3 className="text-lg font-bold">Physio Supporting Tools Cart</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto custom-scrollbar flex-1 p-6 space-y-6">
          
          {orderComplete ? (
            /* Order Success View */
            <div className="p-6 text-center space-y-4 bg-[#F0F6F4] rounded-2xl border border-[#A8C99D]">
              <CheckCircle2 className="w-12 h-12 text-[#0B4336] mx-auto" />
              <div>
                <h4 className="text-xl font-bold text-[#111714]">Order Confirmed!</h4>
                <p className="text-xs text-[#5D6661] mt-1">
                  Thank you, <strong className="text-[#0B4336]">{orderComplete.customerName}</strong>. Your physio equipment order has been registered.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl text-left border border-[#DDE3DE] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#5D6661]">Order ID:</span>
                  <span className="font-bold text-[#0B4336]">{orderComplete.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D6661]">Delivery Phone:</span>
                  <span className="font-bold">{orderComplete.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D6661]">Total Paid:</span>
                  <span className="font-bold text-[#0B4336]">₹{orderComplete.totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setOrderComplete(null);
                  onClose();
                }}
                className="w-full bg-[#0B4336] text-white font-bold text-xs uppercase py-3 rounded-xl shadow cursor-pointer"
              >
                Close & Continue Browsing
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#5D6661]/40 mx-auto" />
              <h4 className="text-base font-bold text-[#111714]">Your Cart is Empty</h4>
              <p className="text-xs text-[#5D6661]">Add orthopedic support tools from our store to get started.</p>
            </div>
          ) : (
            /* Active Cart Items & Checkout */
            <>
              {/* Item List */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-[#0B4336] tracking-wider">
                  Selected Items ({cartItems.length})
                </h4>
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-3.5 bg-[#F7F8F4] rounded-xl border border-[#DDE3DE]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-lg object-cover border border-[#DDE3DE]"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-[#111714] line-clamp-1">{item.product.title}</h5>
                        <p className="text-xs font-bold text-[#0B4336]">₹{item.product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white rounded-lg border border-[#DDE3DE]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-[#5D6661] hover:text-[#111714]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-[#5D6661] hover:text-[#111714]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon & Referral Code Input */}
              <div className="pt-2 border-t border-[#DDE3DE]">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5D6661]">
                      <Tag className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code or Referral (e.g. HEALTH10, REF-NAME)"
                      className="w-full pl-9 pr-3 py-2 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs font-mono uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0B4336] text-white font-bold text-xs uppercase px-4 py-2 rounded-xl hover:bg-[#07382D] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {validationResult && (
                  <p
                    className={`text-xs mt-2 font-medium ${
                      validationResult.isValid ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {validationResult.message}
                  </p>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 bg-[#F0F6F4] rounded-xl border border-[#A8C99D]/60 space-y-2 text-xs">
                <div className="flex justify-between text-[#5D6661]">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#111714]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Applied:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#0B4336] pt-2 border-t border-[#A8C99D]/40">
                  <span>Total Payable:</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Delivery Customer Details Form */}
              <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold text-[#0B4336] tracking-wider">
                  Delivery Details
                </h4>

                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={customerInfo.fullName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
                />

                <textarea
                  required
                  rows={2}
                  placeholder="Complete Delivery Address (Cuttack / Odisha) *"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0B4336] hover:bg-[#07382D] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#A8C99D]" />
                      <span>Confirm & Place Order (₹{finalTotal})</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
