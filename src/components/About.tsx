import React from 'react';
import { clinicConfig } from '../config/clinic';
import { Award, HeartPulse, GraduationCap, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  const doctor = clinicConfig.physiotherapist;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Image Composition & Official Logo Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Backing decorative card */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-[#DCE9D9] -z-10"></div>
              
              {/* Doctor portrait / clinic presentation */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#DDE3DE] bg-[#07382D] relative">
                <img
                  src={doctor.imageUrl}
                  alt={`${doctor.name}, Senior Consultant Physiotherapist & Neuro-Rehab Specialist in Cuttack`}
                  className="w-full h-[450px] sm:h-[500px] object-cover object-top opacity-95"
                />

                {/* Floating Official Brand Logo Badge */}
                <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-lg">
                  <img
                    src={clinicConfig.logoUrl}
                    alt={`${clinicConfig.name} logo - Physiotherapy & Rehabilitation Cuttack`}
                    className="w-10 h-10 rounded-full object-cover border border-[#A8C99D]"
                  />
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{clinicConfig.name}</p>
                    <p className="text-[10px] text-[#A8C99D] font-medium">{clinicConfig.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Floating Credentials Pill */}
              <div className="absolute -bottom-6 -right-2 sm:right-4 bg-[#07382D] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#A8C99D]/20 flex items-center justify-center text-[#A8C99D]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white leading-none">{doctor.experienceYears}+ Years</p>
                    <p className="text-xs text-[#A8C99D] mt-0.5">Clinical Practice Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Profile & Qualifications */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold">
                Lead Consultant & Director
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight mt-2 leading-tight">
                Care that moves <br />
                <span className="font-editorial italic font-normal text-[#0B4336]">
                  with you.
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-base text-[#5D6661] leading-relaxed">
              <div className="flex flex-wrap items-center gap-2 text-[#07382D] font-bold text-xl">
                <GraduationCap className="w-6 h-6 text-[#0B4336]" />
                <span>{doctor.name}</span>
                <span className="text-xs font-semibold text-[#0B4336] bg-[#DCE9D9] px-3 py-1 rounded-full border border-[#A8C99D]">
                  {doctor.qualifications}
                </span>
              </div>
              
              <p className="text-sm sm:text-base leading-relaxed">{doctor.bio}</p>

              {/* Affiliation Badges */}
              <div className="p-4 rounded-xl bg-[#F7F8F4] border border-[#DDE3DE] space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-[#0B4336] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#0B4336]" />
                  Clinical Training & Institutions
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {doctor.affiliations.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold text-[#111714] bg-white px-3 py-1.5 rounded-lg border border-[#DDE3DE]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0B4336]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Philosophy Quote Card */}
              <div className="p-5 rounded-2xl bg-[#07382D] text-white space-y-2 border border-white/10 shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#A8C99D]">
                  <HeartPulse className="w-4 h-4 text-[#A8C99D]" />
                  <span>Treatment Philosophy</span>
                </div>
                <p className="text-sm font-editorial italic text-white/95 leading-relaxed">
                  "{doctor.philosophy}"
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#0B4336] hover:bg-[#07382D] text-white text-sm font-bold py-3.5 px-7 rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Book Consultation with Dr. Chandan</span>
                <ArrowRight className="w-4 h-4 text-[#A8C99D]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
