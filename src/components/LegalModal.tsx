import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { clinicConfig } from '../config/clinic';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#DDE3DE] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#0B4336] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A8C99D]" />
            <h3 className="text-lg font-bold">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-[#5D6661] space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-[#111714]">
                Privacy Policy for {clinicConfig.name}
              </p>
              <p>
                At {clinicConfig.name}, we are committed to protecting the privacy and personal health information of our patients. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our website and scheduling consultation services.
              </p>

              <h4 className="font-bold text-[#111714] text-xs uppercase tracking-wider">1. Information Collection</h4>
              <p>
                We collect information provided directly by you through our online appointment form, including your name, phone number, email address, preferred date, time, and optional clinical notes.
              </p>

              <h4 className="font-bold text-[#111714] text-xs uppercase tracking-wider">2. Use of Information</h4>
              <p>
                Your contact details are used strictly for appointment scheduling, patient communications, consultation reminders, and answering clinical inquiries. We do not sell or share patient data with third-party advertisers.
              </p>

              <h4 className="font-bold text-[#111714] text-xs uppercase tracking-wider">3. Data Security</h4>
              <p>
                We employ standard administrative and technical safeguards to protect your personal details against unauthorized access, loss, or disclosure.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#111714]">
                Terms & Conditions for {clinicConfig.name}
              </p>
              <p>
                By accessing or using the website of {clinicConfig.name}, you agree to comply with and be bound by the following terms of service.
              </p>

              <h4 className="font-bold text-[#111714] text-xs uppercase tracking-wider">1. Clinical Disclaimer</h4>
              <p>
                The information provided on this website is for educational and appointment scheduling purposes only and does not constitute formal medical diagnosis or emergency medical advice. Always consult directly with a certified healthcare practitioner.
              </p>

              <h4 className="font-bold text-[#111714] text-xs uppercase tracking-wider">2. Appointment Scheduling</h4>
              <p>
                Submitting an appointment request through our website reserves a tentative slot. Our clinical coordinator will contact you via phone or email to confirm your consultation time based on practitioner availability.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F8F4] border-t border-[#DDE3DE] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0B4336] text-white text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-[#07382D] transition-colors"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
