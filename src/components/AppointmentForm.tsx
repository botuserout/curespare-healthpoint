import React, { useState } from 'react';
import type { AppointmentData, AppointmentResult } from '../types';
import { submitAppointment } from '../services/appointmentService';
import { servicesData } from '../data/services';
import { clinicConfig } from '../config/clinic';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, AlertCircle, Loader2, Stethoscope, MessageCircle } from 'lucide-react';

interface AppointmentFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
  initialServiceId?: string;
  initialCondition?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  isModal = false,
  initialServiceId = '',
  initialCondition = '',
}) => {
  const [formData, setFormData] = useState<AppointmentData>({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    serviceId: initialServiceId,
    conditionName: initialCondition,
    message: '',
  });

  const [prevProps, setPrevProps] = useState({ initialServiceId, initialCondition });

  if (prevProps.initialServiceId !== initialServiceId || prevProps.initialCondition !== initialCondition) {
    setPrevProps({ initialServiceId, initialCondition });
    setFormData((prev) => ({
      ...prev,
      serviceId: initialServiceId || prev.serviceId,
      conditionName: initialCondition || prev.conditionName,
    }));
  }

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AppointmentResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setResult(null);

    // Form Validation
    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (formData.email && formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setValidationError('Please enter a valid phone number.');
      return;
    }
    if (!formData.preferredDate) {
      setValidationError('Please select a preferred appointment date.');
      return;
    }
    if (!formData.preferredTime) {
      setValidationError('Please select a preferred time slot.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await submitAppointment(formData);
      setResult(res);
      if (res.success) {
        // Clear form after successful submit
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          serviceId: '',
          conditionName: '',
          message: '',
        });
      }
    } catch (err) {
      console.error('Appointment submission error:', err);
      setResult({
        success: false,
        message: 'An unexpected error occurred. Please try calling us directly.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedServiceName = servicesData.find((s) => s.id === formData.serviceId)?.title || 'General Consultation';
  const whatsappUrl = `https://wa.me/91${clinicConfig.contact.phone}?text=${encodeURIComponent(
    `Hello Dr. Chandan Kumar, I would like to schedule an appointment for ${selectedServiceName}.`
  )}`;

  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-8 shadow-editorial border border-[#DDE3DE] ${
        isModal ? '' : 'max-w-2xl mx-auto'
      }`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#111714] tracking-tight">Book an Appointment</h3>
        <p className="text-sm text-[#5D6661] mt-1">
          Select your preferred time. Our clinical team will reach out to confirm your consultation.
        </p>
      </div>

      {/* Success Banner */}
      {result?.success && (
        <div className="mb-6 p-5 rounded-2xl bg-[#DCE9D9]/70 border border-[#A8C99D] text-[#07382D] space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-[#0B4336]" />
            <span>Appointment Request Received</span>
          </div>
          <p className="text-xs sm:text-sm text-[#111714] leading-relaxed">{result.message}</p>
          
          {result.bookingId && (
            <div className="flex items-center justify-between text-xs font-mono bg-white/80 px-3.5 py-2 rounded-xl border border-[#A8C99D]/50">
              <span className="text-[#5D6661]">Reference ID:</span>
              <span className="font-bold text-[#0B4336]">{result.bookingId}</span>
            </div>
          )}

          {/* Quick Connect Action Buttons */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>
            <a
              href={`tel:${clinicConfig.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#0B4336] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow hover:shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-[#A8C99D]" />
              <span>Call Clinic Now</span>
            </a>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {(validationError || (result && !result.success)) && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{validationError || result?.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D6661]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] placeholder-[#5D6661]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
              Email Address <span className="text-[#5D6661] text-[10px] font-normal uppercase">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D6661]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com (optional)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] placeholder-[#5D6661]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D6661]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9664969994"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] placeholder-[#5D6661]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Service Selector Dropdown */}
        <div>
          <label htmlFor="serviceId" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
            Service Required
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D6661]">
              <Stethoscope className="w-4 h-4" />
            </div>
            <select
              id="serviceId"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all"
            >
              <option value="">General Physiotherapy Consultation</option>
              {servicesData.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferredDate" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D6661]">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D6661]">
                <Clock className="w-4 h-4" />
              </div>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all appearance-none"
              >
                <option value="">Select a time slot</option>
                <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coupon or Referral Code Input */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-[#111714] uppercase tracking-wider mb-1.5">
            Describe your condition or notes (Optional)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-[#5D6661]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              id="message"
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Back pain for 2 weeks, post-knee surgery recovery, etc. (Coupon / Referral code e.g. HEALTH10, REF-RAMESH can also be included here)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm text-[#111714] placeholder-[#5D6661]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336] focus:border-transparent transition-all"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0B4336] hover:bg-[#07382D] text-white font-bold text-sm tracking-wide py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B4336] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Request...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-[#A8C99D]" />
              <span>Book an Appointment</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-[#5D6661] pt-1">
          🔒 Your contact details are stored securely for appointment scheduling purposes only.
        </p>
      </form>
    </div>
  );
};
