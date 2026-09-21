import type {
  ThemeOption,
  ClinicSchedule,
  MediaItem,
  StoreItem,
  Coupon,
} from '../types';
import { clinicConfig } from '../config/clinic';
import { defaultCoupons } from './couponService';

// Initial Seed Data
export const initialSchedule: ClinicSchedule = {
  operatingDays: 'Monday – Saturday',
  openingTime: '09:00 AM',
  closingTime: '08:00 PM',
  sundayNotice: 'Sunday by Emergency Appointment',
  helplinePhone: clinicConfig.contact.phone,
};

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Advanced Electrotherapy & Neuro Rehab Room',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    category: 'Clinic Facility',
    description: 'Modern clinical space equipped with TENS, IFT, and ultrasound units for targeted spinal and joint recovery.',
  },
  {
    id: 'med-2',
    title: 'Dr. Chandan Kumar Patient Consultation',
    type: 'image',
    url: clinicConfig.physiotherapist.heroImageUrl || clinicConfig.physiotherapist.imageUrl,
    category: 'Therapy Sessions',
    description: 'Dr. Chandan Kumar evaluating spinal alignment and neurological muscle responses.',
  },
  {
    id: 'med-3',
    title: 'Lumbar Spine & Sciatica Decompression Protocol',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Standard embed demo
    posterUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    category: 'Rehab Exercises',
    description: 'Step-by-step video exercise guide for lower back pain relief and posture correction.',
  },
  {
    id: 'med-4',
    title: 'Post-ACL Knee Flexion Exercises',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    posterUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    category: 'Rehab Exercises',
    description: 'Controlled range-of-motion knee therapy demonstration for post-surgical rehabilitation.',
  },
  {
    id: 'med-5',
    title: 'Pediatric & Cerebral Palsy Gait Trainer',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    category: 'Equipment',
    description: 'Specialized pediatric mobility equipment for motor skill development and balance retraining.',
  },
];

export const initialStoreProducts: StoreItem[] = [
  {
    id: 'prod-1',
    title: 'Ergonomic Cervical Spine Support Pillow',
    description: 'Contoured memory foam pillow designed to relieve neck stiffness, cervical spondylosis, and morning headaches.',
    price: 899,
    originalPrice: 1299,
    category: 'Spine & Support',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    rating: 5,
    badge: 'BESTSELLER',
  },
  {
    id: 'prod-2',
    title: 'Adjustable Lumbar Support Belt for Back Pain',
    description: 'Breathable spinal compression belt providing immediate relief for sciatica, herniated discs, and lower back strain.',
    price: 649,
    originalPrice: 999,
    category: 'Spine & Support',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    rating: 5,
    badge: 'DOCTOR RECOMMENDED',
  },
  {
    id: 'prod-3',
    title: 'Physio Resistance Loops & Bands Set (5 Resistance Levels)',
    description: 'Heavy-duty latex resistance bands for rotator cuff, glute strengthening, and post-injury rehab exercises.',
    price: 499,
    originalPrice: 799,
    category: 'Exercise & Rehab',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    rating: 4.8,
  },
  {
    id: 'prod-4',
    title: 'Digital Dual-Channel TENS Pulse Massager',
    description: 'Portable electrotherapy device for chronic joint pain relief, muscle spasms, and nerve pain management.',
    price: 1499,
    originalPrice: 2199,
    category: 'Pain Relief',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    rating: 4.9,
    badge: 'POPULAR',
  },
  {
    id: 'prod-5',
    title: 'High-Density Deep Tissue Foam Roller',
    description: 'Trigger point myofascial release roller for muscle recovery, tight IT bands, and spinal flexibility.',
    price: 599,
    originalPrice: 899,
    category: 'Exercise & Rehab',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    rating: 4.7,
  },
  {
    id: 'prod-6',
    title: 'Neoprene Patella Knee Compression Support Sleeve',
    description: 'Anatomical knee sleeve providing lateral stability and pain reduction for arthritis and ligament strain.',
    price: 449,
    originalPrice: 699,
    category: 'Knee & Joint',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    rating: 4.8,
  },
];

// Storage Keys
const KEYS = {
  THEME: 'curespare_theme',
  SCHEDULE: 'curespare_schedule',
  MEDIA: 'curespare_media',
  STORE: 'curespare_store',
  COUPONS: 'curespare_coupons',
};

// Simple Event Emitter for reactive UI updates
type Listener = () => void;
const listeners = new Set<Listener>();

const notify = () => {
  listeners.forEach((fn) => fn());
};

export const subscribeAdminStore = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Helper methods to read/write state
export const getActiveTheme = (): ThemeOption => {
  try {
    const saved = localStorage.getItem(KEYS.THEME) as ThemeOption;
    if (saved) return saved;
  } catch (e) {}
  return 'default';
};

export const setActiveTheme = (theme: ThemeOption) => {
  try {
    localStorage.setItem(KEYS.THEME, theme);
    notify();
  } catch (e) {}
};

export const getClinicSchedule = (): ClinicSchedule => {
  try {
    const saved = localStorage.getItem(KEYS.SCHEDULE);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return initialSchedule;
};

export const saveClinicSchedule = (schedule: ClinicSchedule) => {
  try {
    localStorage.setItem(KEYS.SCHEDULE, JSON.stringify(schedule));
    notify();
  } catch (e) {}
};

export const getMediaItems = (): MediaItem[] => {
  try {
    const saved = localStorage.getItem(KEYS.MEDIA);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return initialMedia;
};

export const saveMediaItems = (items: MediaItem[]) => {
  try {
    localStorage.setItem(KEYS.MEDIA, JSON.stringify(items));
    notify();
  } catch (e) {}
};

export const getStoreProducts = (): StoreItem[] => {
  try {
    const saved = localStorage.getItem(KEYS.STORE);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return initialStoreProducts;
};

export const saveStoreProducts = (products: StoreItem[]) => {
  try {
    localStorage.setItem(KEYS.STORE, JSON.stringify(products));
    notify();
  } catch (e) {}
};

export const getAdminCoupons = (): Coupon[] => {
  try {
    const saved = localStorage.getItem(KEYS.COUPONS);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return defaultCoupons;
};

export const saveAdminCoupons = (coupons: Coupon[]) => {
  try {
    localStorage.setItem(KEYS.COUPONS, JSON.stringify(coupons));
    notify();
  } catch (e) {}
};
