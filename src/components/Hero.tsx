import React from 'react';
import { clinicConfig } from '../config/clinic';
import { Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="hero"
      className="relative bg-[#0B4336] text-white pt-28 pb-16 lg:pt-36 lg:pb-28 overflow-hidden"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A8C99D]/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#07382D] rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Eyebrow Badge with Brand Logo */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-[#A8C99D]/30 backdrop-blur-sm">
              <img src={clinicConfig.logoUrl} alt={clinicConfig.name} className="w-5 h-5 rounded-full object-cover border border-[#A8C99D]" />
              <span className="text-xs uppercase tracking-widest text-[#A8C99D] font-semibold">
                {clinicConfig.subtitle} • Trisulia Square, {clinicConfig.location.city}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white">
              Physiotherapy & Neuro-Rehabilitation in Cuttack
              <span className="font-editorial italic font-normal text-[#A8C99D] block text-2xl sm:text-3xl font-sans mt-2">
                Move Better. Live Stronger.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed font-normal">
              Specialized neuro-rehabilitation, musculoskeletal physiotherapy, and integrated pharmacy care led by <strong className="text-white">{clinicConfig.physiotherapist.name}</strong> ({clinicConfig.physiotherapist.qualifications}) at Trisulia Square, Cuttack.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 bg-[#A8C99D] hover:bg-[#b8d8ac] text-[#07382D] font-bold text-sm tracking-wide py-3.5 px-7 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#A8C99D] focus:ring-offset-2 focus:ring-offset-[#0B4336]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm py-3.5 px-6 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#A8C99D]" />
              </a>
            </div>

            {/* Trust Pill / Stats */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B4336] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Recovered physiotherapy patient review"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B4336] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Neuro rehabilitation patient avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B4336] object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                    alt="Sports injury rehabilitation patient avatar"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#A8C99D]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs text-white/80 font-medium">
                    Trusted by <strong className="text-white">{clinicConfig.stats.patientsHelped}</strong> patients
                  </span>
                </div>
              </div>

              <div className="h-6 w-px bg-white/15 hidden sm:block"></div>

              <div className="flex items-center gap-2 text-xs text-white/80">
                <ShieldCheck className="w-4 h-4 text-[#A8C99D]" />
                <span>SCB & SVNIRTAR Trained Care</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Hero Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#A8C99D]/30 to-transparent blur-xl opacity-60"></div>
              
              {/* Primary Card Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#07382D]">
                <img
                  src={clinicConfig.physiotherapist.heroImageUrl || clinicConfig.physiotherapist.imageUrl}
                  alt={`${clinicConfig.physiotherapist.name} - Senior Consultant Physiotherapist in Cuttack`}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Overlay Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#07382D]/90 backdrop-blur-md border border-white/15 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#A8C99D] flex-shrink-0 bg-white">
                    <img src={clinicConfig.logoUrl} alt={clinicConfig.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#A8C99D]">Lead Clinical Director</p>
                    <p className="text-sm font-bold text-white">{clinicConfig.physiotherapist.name}</p>
                    <p className="text-[11px] text-white/80">{clinicConfig.physiotherapist.qualifications}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
