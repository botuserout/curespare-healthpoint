import React, { useState } from 'react';
import { clinicConfig } from '../config/clinic';
import { Phone, Mail, MapPin, Share2, ArrowUp } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Approach', href: '#journey' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07382D] text-white pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-[#A8C99D]/40 p-0.5 flex-shrink-0">
                <img
                  src={clinicConfig.logoUrl}
                  alt={clinicConfig.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-tight">
                  {clinicConfig.name}
                </span>
                <span className="text-[10px] tracking-widest text-[#A8C99D] uppercase font-semibold">
                  {clinicConfig.subtitle}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
              Providing patient-centered physiotherapy and rehabilitation care in Cuttack, Odisha. Restoring freedom of movement through evidence-based treatments.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={clinicConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram page"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#A8C99D] text-white hover:text-[#07382D] flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#A8C99D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#A8C99D] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#A8C99D]">
              Contact Clinic
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A8C99D] flex-shrink-0" />
                <a href={`tel:${clinicConfig.contact.phone}`} className="hover:underline">
                  {clinicConfig.contact.formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A8C99D] flex-shrink-0" />
                <a href={`mailto:${clinicConfig.contact.email}`} className="hover:underline truncate max-w-[200px]">
                  {clinicConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8C99D] flex-shrink-0 mt-0.5" />
                <span>{clinicConfig.location.fullAddress}</span>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="lg:col-span-2 flex lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-4 rounded-full border border-white/15 transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#A8C99D]" />
            </button>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
          <p className="text-[11px] text-white/50 leading-relaxed text-center sm:text-left">
            <strong className="text-white/70 font-semibold">Medical Disclaimer:</strong> The information provided on this website is for educational and appointment booking purposes only and does not substitute professional medical advice, diagnosis, or treatment. Always consult Dr. Chandan Kumar or a qualified healthcare provider for personalized medical evaluation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4 pt-2">
            <p>© {new Date().getFullYear()} {clinicConfig.name} ({clinicConfig.location.fullAddress}). All rights reserved.</p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setLegalType('privacy')}
                className="hover:text-[#A8C99D] transition-colors focus:outline-none"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalType('terms')}
                className="hover:text-[#A8C99D] transition-colors focus:outline-none"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Legal Modal */}
      <LegalModal
        isOpen={!!legalType}
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </footer>
  );
};
