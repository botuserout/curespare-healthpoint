import type { AppointmentData, AppointmentResult } from '../types';
import { postLeadToGoogleSheet } from './googleSheetService';

/**
 * Submits an appointment request to the service layer.
 * Routes lead data directly to Google Sheet database + Local Backup.
 */
export const submitAppointment = async (
  data: AppointmentData
): Promise<AppointmentResult> => {
  // Basic front-end sanity check
  if (!data.fullName || !data.phone || !data.preferredDate || !data.preferredTime) {
    return {
      success: false,
      message: 'Please fill in all required appointment fields.',
    };
  }

  // Generate reference Lead ID
  const bookingId = `CSP-${Math.floor(100000 + Math.random() * 900000)}`;
  const submittedAt = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Submit to Google Sheet Integration Service
  return await postLeadToGoogleSheet(data, bookingId, submittedAt);
};
