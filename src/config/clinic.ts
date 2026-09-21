import type { ClinicConfig } from '../types';

export const clinicConfig: ClinicConfig = {
  name: 'CureSpare HealthPoint',
  subtitle: 'Integrated Pharmacy & Physio',
  tagline: 'Move Better. Live Stronger.',
  category: 'Physiotherapy, Neurological Rehab & Pharmacy',
  logoUrl: '/logo.png',
  location: {
    city: 'Cuttack',
    state: 'Odisha',
    country: 'India',
    fullAddress: 'Kunheipara, Trisulia Square, Cuttack, Odisha, India',
    mapPlaceholderUrl: 'https://www.google.com/maps/place/OMPC+PHYSIOTHERAPY+%26+REHABILITATION+CENTRE/@20.4412909,85.8411978,17z',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.581628937666!2d85.84119779999999!3d20.4412909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190daeaab2b7bf%3A0x2ef4e80c344900ba!2sOMPC%20PHYSIOTHERAPY%20%26%20REHABILITATION%20CENTRE!5e0!3m2!1sen!2sin!4v1790011574327!5m2!1sen!2sin',
  },
  contact: {
    phone: '9827061438',
    formattedPhone: '+91 98270 61438',
    email: 'support.curespare@gmail.com',
    instagram: 'curespare_healthpoint',
    instagramUrl: 'https://instagram.com/curespare_healthpoint',
  },
  physiotherapist: {
    name: 'Dr. Chandan Kumar',
    title: 'Senior Consultant Physiotherapist & Neuro-Rehab Specialist',
    qualifications: 'BPT, MPT (Neuro), MIAP',
    affiliations: [
      'SVNIRTAR, Olatpur',
      'SCB Medical College, Cuttack',
    ],
    experienceYears: 10,
    bio: 'Specialist in Neurological Rehabilitation, Musculoskeletal Therapy, and Movement Disorders. Trained at SVNIRTAR Olatpur and SCB Medical College, Cuttack, Dr. Chandan Kumar brings evidence-based neuro-physiotherapy and integrated clinical care to patients across Odisha.',
    philosophy: 'Rehabilitation is about rewiring movement pathways, restoring independence, and empowering every patient with comprehensive clinical care.',
    imageUrl: '/doctor.jpg',
    heroImageUrl: '/dr-chandan-hero.jpg',
  },
  stats: {
    patientsHelped: '1,000+',
    yearsExperience: '10+',
    satisfactionRate: '95%',
    specializedServices: '6',
  },
  // Google Apps Script Web App Webhook URL for Google Sheets lead integration
  googleSheetWebhookUrl: import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbw6jDSHa4CNJ2B7ZSATdXPUugdc2Bg8ulOz0Va3E4T6bY07X-d4ov--L_bNJMHqPJe7/exec',
};
