import type { Coupon } from '../types';

// Default Active Coupons
export const defaultCoupons: Coupon[] = [
  {
    code: 'HEALTH10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% OFF on all consultations and physio tools',
  },
  {
    code: 'FESTIVE20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 300,
    description: '20% Festive Season Special Discount',
  },
  {
    code: 'CUTTACK50',
    discountType: 'fixed',
    discountValue: 50,
    minOrderValue: 200,
    description: 'Flat ₹50 OFF for Cuttack Residents',
  },
];

export interface ValidationResult {
  isValid: boolean;
  message: string;
  discountAmount: number;
  finalTotal: number;
  coupon?: Coupon;
  isReferral?: boolean;
}

/**
 * Validates a coupon or referral code and calculates the discount
 */
export const validateDiscountCode = (
  code: string,
  subtotal: number,
  customCoupons: Coupon[] = defaultCoupons
): ValidationResult => {
  const cleanCode = code.trim().toUpperCase();

  if (!cleanCode) {
    return {
      isValid: false,
      message: 'Please enter a coupon or referral code.',
      discountAmount: 0,
      finalTotal: subtotal,
    };
  }

  // 1. Check for Referral Code (starts with REF- or length >= 5)
  if (cleanCode.startsWith('REF-') || cleanCode === 'REFERRAL100') {
    const discountAmount = Math.min(100, subtotal);
    return {
      isValid: true,
      message: '🎉 Referral code applied! Flat ₹100 referral discount deducted.',
      discountAmount,
      finalTotal: Math.max(0, subtotal - discountAmount),
      isReferral: true,
    };
  }

  // 2. Check for standard/admin coupons
  const allCoupons = [...customCoupons, ...defaultCoupons];
  const found = allCoupons.find((c) => c.code.toUpperCase() === cleanCode);

  if (!found) {
    return {
      isValid: false,
      message: 'Invalid code. Try HEALTH10, FESTIVE20, or a REF- code.',
      discountAmount: 0,
      finalTotal: subtotal,
    };
  }

  if (found.minOrderValue && subtotal < found.minOrderValue) {
    return {
      isValid: false,
      message: `Code requires a minimum total of ₹${found.minOrderValue}.`,
      discountAmount: 0,
      finalTotal: subtotal,
    };
  }

  let discountAmount = 0;
  if (found.discountType === 'percentage') {
    discountAmount = Math.round((subtotal * found.discountValue) / 100);
  } else {
    discountAmount = found.discountValue;
  }

  discountAmount = Math.min(discountAmount, subtotal);

  return {
    isValid: true,
    message: `✅ Coupon ${found.code} applied! Saved ₹${discountAmount}.`,
    discountAmount,
    finalTotal: Math.max(0, subtotal - discountAmount),
    coupon: found,
  };
};
