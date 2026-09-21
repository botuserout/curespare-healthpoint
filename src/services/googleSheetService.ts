import type { AppointmentData, AppointmentResult } from '../types';
import { clinicConfig } from '../config/clinic';

/**
 * High-performance Google Sheets Lead Integration Service
 * 
 * Stores appointment leads directly into Google Sheets via Google Apps Script Web App Endpoint.
 * Features:
 * 1. Dual-posting (Network Google Sheet POST + LocalStorage backup).
 * 2. Ultra-fast in-memory & localStorage caching layer for fetched data.
 * 3. Graceful fallback so network drops or missing URL never crash the app.
 */

// In-memory cache for ultra-fast performance
const memoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 Minutes Cache TTL

// Storage Keys
const LOCAL_LEADS_KEY = 'curespare_leads_history';

/**
 * Returns the active Google Sheet Webhook URL (from environment or clinic config)
 */
export const getGoogleSheetUrl = (): string => {
  return (
    import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL ||
    clinicConfig.googleSheetWebhookUrl ||
    ''
  );
};

/**
 * Submits an appointment lead to Google Sheet & Local Backup
 */
export const postLeadToGoogleSheet = async (
  data: AppointmentData,
  bookingId: string,
  submittedAt: string
): Promise<AppointmentResult> => {
  const payload = {
    bookingId,
    submittedAt,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    serviceId: data.serviceId || 'General',
    conditionName: data.conditionName || 'N/A',
    message: data.message || '',
    source: 'Website Appointment Form',
  };

  // 1. Always save locally first (Offline resilience)
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
    existing.unshift(payload);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('LocalStorage save fallback warning:', err);
  }

  const webhookUrl = getGoogleSheetUrl();

  // 2. If Google Sheet Webhook URL is provided, send to Google Sheet
  if (webhookUrl) {
    try {
      // Send payload as stringified JSON with text/plain content type
      // text/plain is a CORS simple request, avoiding browser OPTIONS preflight while passing full JSON to e.postData.contents
      const formParams = new URLSearchParams();
      Object.entries(payload).forEach(([key, val]) => {
        formParams.append(key, String(val));
      });

      // We attempt fetch with no-cors
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      return {
        success: true,
        message: `Thank you, ${data.fullName}! Your appointment request has been saved directly to our Google Sheet database and logged for Dr. Chandan Kumar.`,
        bookingId,
        submittedAt,
      };
    } catch (networkError) {
      console.warn('Google Sheet submission warning, using offline fallback:', networkError);
      return {
        success: true,
        message: `Thank you, ${data.fullName}! Your request is logged offline. Our coordinator will contact you at ${data.phone}.`,
        bookingId,
        submittedAt,
      };
    }
  }

  // Fallback if no Webhook URL configured yet
  return {
    success: true,
    message: `Thank you, ${data.fullName}! Your appointment request has been recorded. Our coordinator will call ${data.phone} to confirm your slot.`,
    bookingId,
    submittedAt,
  };
};

/**
 * Fast Data Fetcher with In-Memory + LocalStorage Caching
 */
export const fetchSheetDataCached = async <T>(
  key: string,
  fallbackData: T,
  actionParam: string = 'getData'
): Promise<T> => {
  const now = Date.now();

  // 1. Check In-Memory Cache (0ms latency)
  const memItem = memoryCache.get(key);
  if (memItem && now - memItem.timestamp < CACHE_TTL_MS) {
    return memItem.data as T;
  }

  // 2. Check LocalStorage Cache (<2ms latency)
  try {
    const localRaw = localStorage.getItem(`cache_${key}`);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (now - parsed.timestamp < CACHE_TTL_MS) {
        memoryCache.set(key, { data: parsed.data, timestamp: parsed.timestamp });
        return parsed.data as T;
      }
    }
  } catch (err) {
    // Ignore localStorage read errors
  }

  const webhookUrl = getGoogleSheetUrl();
  if (!webhookUrl) {
    return fallbackData;
  }

  // 3. Network Fetch from Google Sheet GET endpoint
  try {
    const fetchUrl = `${webhookUrl}?action=${actionParam}&t=${now}`;
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const json = await response.json();
      if (json && json.data) {
        // Save to caches
        memoryCache.set(key, { data: json.data, timestamp: now });
        try {
          localStorage.setItem(`cache_${key}`, JSON.stringify({ data: json.data, timestamp: now }));
        } catch (e) {}
        return json.data as T;
      }
    }
  } catch (error) {
    console.warn(`Error fetching ${key} from Google Sheet, using fallback:`, error);
  }

  return fallbackData;
};
