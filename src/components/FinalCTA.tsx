import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { clinicConfig } from '../config/clinic';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#0B4336] text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A8C99D]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <span className="text-xs uppercase tracking-widest text-[#A8C99D] font-bold">
          Start Your Recovery
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-3 leading-tight">
          Ready to move <br className="hidden sm:block" />
          <span className="font-editorial italic font-normal text-[#A8C99D]">
            with confidence?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto mt-4 leading-relaxed font-normal">
          Take the first step toward better movement, pain relief, and a stronger recovery with individualized clinical guidance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#A8C99D] hover:bg-[#b8d8ac] text-[#07382D] font-bold text-sm tracking-wide py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#A8C99D]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Appointment</span>
          </button>

          <a
            href={`tel:${clinicConfig.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm py-4 px-7 rounded-full transition-all"
          >
            <Phone className="w-4 h-4 text-[#A8C99D]" />
            <span>Call: {clinicConfig.contact.formattedPhone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
