export interface ClinicConfig {
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  logoUrl: string;
  location: {
    city: string;
    state: string;
    country: string;
    fullAddress: string;
    mapPlaceholderUrl: string;
    mapEmbedUrl: string;
  };
  contact: {
    phone: string;
    formattedPhone: string;
    email: string;
    instagram: string;
    instagramUrl: string;
  };
  physiotherapist: {
    name: string;
    title: string;
    qualifications: string;
    affiliations: string[];
    experienceYears: number;
    bio: string;
    philosophy: string;
    imageUrl: string;
    heroImageUrl?: string;
  };
  stats: {
    patientsHelped: string;
    yearsExperience: string;
    satisfactionRate: string;
    specializedServices: string;
  };
  googleSheetWebhookUrl?: string;
}

export interface PhysiotherapyService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  benefits: string[];
  iconName: string;
  duration?: string;
  techniques?: string[];
  recommendedFor?: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatmentType: string;
  quote: string;
  rating: number;
  location?: string;
  avatarUrl?: string;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ConditionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  region?: 'spine' | 'joint' | 'sports' | 'postop' | 'general';
}

export interface TreatmentItem {
  id: string;
  name: string;
  category: 'Neuro & Pediatric' | 'Musculoskeletal & Spine' | 'Post-Surgical & Ortho';
  simpleDesc: string;
  iconName: string;
}

export interface RecoveryStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface AppointmentData {
  fullName: string;
  email?: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceId?: string;
  conditionName?: string;
  message?: string;
}

export interface AppointmentResult {
  success: boolean;
  message: string;
  bookingId?: string;
  submittedAt?: string;
}

export type ThemeOption = 'default' | 'diwali' | 'holi' | 'navratri' | 'patriotic';

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  posterUrl?: string;
  category: 'Clinic Facility' | 'Therapy Sessions' | 'Rehab Exercises' | 'Equipment';
  description?: string;
}

export interface StoreItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Spine & Support' | 'Exercise & Rehab' | 'Pain Relief' | 'Knee & Joint';
  imageUrl: string;
  inStock: boolean;
  rating: number;
  badge?: string;
}

export interface CartItem {
  product: StoreItem;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  description: string;
}

export interface ClinicSchedule {
  operatingDays: string;
  openingTime: string;
  closingTime: string;
  sundayNotice: string;
  helplinePhone: string;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  items: { title: string; quantity: number; price: number }[];
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  referralCode?: string;
  createdAt: string;
}
