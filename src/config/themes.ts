import type { ThemeOption } from '../types';

export interface ThemeColors {
  id: ThemeOption;
  name: string;
  festivalName: string;
  primary: string;
  dark: string;
  accent: string;
  accentHover: string;
  bannerMessage?: string;
  badgeEmoji: string;
}

export const themeConfigs: Record<ThemeOption, ThemeColors> = {
  default: {
    id: 'default',
    name: 'Clinical Emerald',
    festivalName: 'Standard Clinical Theme',
    primary: '#0B4336',
    dark: '#07382D',
    accent: '#A8C99D',
    accentHover: '#b8d8ac',
    badgeEmoji: '🌿',
  },
  diwali: {
    id: 'diwali',
    name: 'Diwali Golden Lights',
    festivalName: 'Happy Diwali ✨',
    primary: '#7A1C1C',
    dark: '#4A0E0E',
    accent: '#D4AF37',
    accentHover: '#E5C158',
    bannerMessage: '🪔 Wishing you a Happy & Healthier Diwali! Special 20% discount code: FESTIVE20',
    badgeEmoji: '🪔',
  },
  holi: {
    id: 'holi',
    name: 'Holi Colors Celebration',
    festivalName: 'Happy Holi 🎨',
    primary: '#6B124B',
    dark: '#42072D',
    accent: '#FF4081',
    accentHover: '#FF6B9D',
    bannerMessage: '🎨 Happy Holi! Celebrate vibrant movement with code: FESTIVE20',
    badgeEmoji: '🎨',
  },
  navratri: {
    id: 'navratri',
    name: 'Navratri Royal Crimson',
    festivalName: 'Subho Navratri 🚩',
    primary: '#800000',
    dark: '#4D0000',
    accent: '#FFD700',
    accentHover: '#FFE033',
    bannerMessage: '🚩 Festive Blessings! Use coupon HEALTH10 for consultation & tool discounts',
    badgeEmoji: '🚩',
  },
  patriotic: {
    id: 'patriotic',
    name: 'Independence & Republic Day',
    festivalName: 'Happy Independence Day 🇮🇳',
    primary: '#B45309',
    dark: '#78350F',
    accent: '#10B981',
    accentHover: '#34D399',
    bannerMessage: '🇮🇳 Freedom of Movement for Every Indian! Use code CUTTACK50',
    badgeEmoji: '🇮🇳',
  },
};
