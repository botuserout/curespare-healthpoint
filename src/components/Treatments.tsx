import React, { useState } from 'react';
import { treatmentsData } from '../data/treatments';
import type { TreatmentItem } from '../types';
import { Activity, Baby, Smile, HeartPulse, Shield, Zap, Compass, Flame, RotateCw, Stethoscope, UserCheck, Heart, ArrowRight, Calendar, Sparkles, Bone } from 'lucide-react';

interface TreatmentsProps {
  onOpenBooking: (serviceId?: string, conditionName?: string) => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Neuro & Pediatric', 'Musculoskeletal & Spine', 'Post-Surgical & Ortho'];

  const filteredTreatments = selectedCategory === 'All'
    ? treatmentsData
    : treatmentsData.filter((t) => t.category === selectedCategory);

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-[#0B4336] group-hover:text-white transition-colors duration-200";
    switch (iconName) {
      case 'Baby': return <Baby className={iconClass} />;
      case 'Smile': return <Smile className={iconClass} />;
      case 'HeartPulse': return <HeartPulse className={iconClass} />;
      case 'Shield': return <Shield className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Compass': return <Compass className={iconClass} />;
      case 'Flame': return <Flame className={iconClass} />;
      case 'RotateCw': return <RotateCw className={iconClass} />;
      case 'Stethoscope': return <Stethoscope className={iconClass} />;
      case 'UserCheck': return <UserCheck className={iconClass} />;
      case 'Heart': return <Heart className={iconClass} />;
      case 'Bone': return <Bone className={iconClass} />;
      default: return <Activity className={iconClass} />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Neuro & Pediatric':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B4336] bg-[#DCE9D9] px-2.5 py-1 rounded-md border border-[#A8C99D]/50">
            NEURO & PEDIATRIC
          </span>
        );
      case 'Musculoskeletal & Spine':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#07382D] bg-[#F7F8F4] px-2.5 py-1 rounded-md border border-[#DDE3DE]">
            MUSCULOSKELETAL
          </span>
        );
      case 'Post-Surgical & Ortho':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B4336] bg-[#E8F5E9] px-2.5 py-1 rounded-md border border-[#A8C99D]/60">
            POST-SURGICAL
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B4336] bg-[#F7F8F4] px-2.5 py-1 rounded-md border border-[#DDE3DE]">
            CLINICAL
          </span>
        );
    }
  };

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-[#F7F8F4] relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0B4336]" />
              <span>Specialized Care Spectrum</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight mt-2">
              Clinical Treatments
            </h2>
            <p className="text-sm sm:text-base text-[#4E5651] mt-2 max-w-xl leading-relaxed">
              Targeted neuro-rehabilitation, orthopedic care, pediatric therapy, and pain management for long-term physical recovery.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold py-2 px-4 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B4336] text-white shadow-md'
                    : 'bg-white text-[#5D6661] hover:bg-[#DCE9D9] hover:text-[#07382D] border border-[#DDE3DE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTreatments.map((treatment: TreatmentItem) => (
            <div
              key={treatment.id}
              onClick={() => onOpenBooking('', treatment.name)}
              className="bg-white p-5 rounded-2xl border border-[#DDE3DE] hover:border-[#0B4336] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  {/* Icon Container with hover contrast fix */}
                  <div className="w-10 h-10 rounded-xl bg-[#DCE9D9]/80 group-hover:bg-[#0B4336] flex items-center justify-center transition-colors duration-200 shadow-xs">
                    {getIcon(treatment.iconName)}
                  </div>

                  {/* Clean Category Badge */}
                  {getCategoryBadge(treatment.category)}
                </div>

                <h3 className="text-base font-bold text-[#111714] group-hover:text-[#0B4336] transition-colors mb-2 leading-snug">
                  {treatment.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#4E5651] leading-relaxed font-normal">
                  {treatment.simpleDesc}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="pt-4 mt-4 border-t border-[#DDE3DE]/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#0B4336] tracking-wide">
                  Clinical Protocol
                </span>
                <span className="text-xs font-bold text-[#0B4336] group-hover:text-[#07382D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0B4336] group-hover:text-[#07382D]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#07382D] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-white/10">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">Need guidance on your specific condition?</h4>
            <p className="text-xs sm:text-sm text-white/80 mt-0.5">Consult Dr. Chandan Kumar for a personalized diagnostic assessment.</p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#A8C99D] hover:bg-[#b8d8ac] text-[#07382D] text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-full shadow transition-all transform hover:-translate-y-0.5 cursor-pointer flex-shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
};
