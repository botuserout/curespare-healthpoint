import React from 'react';
import type { PhysiotherapyService } from '../types';
import { servicesData } from '../data/services';
import { ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface ServicesProps {
  onInspectService: (service: PhysiotherapyService) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onInspectService, onOpenBooking }) => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F7F8F4] relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold">
              Clinical Specializations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight mt-2">
              Physiotherapy Services
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#4E5651] max-w-md leading-relaxed">
            Evidence-based treatment protocols customized for joint mechanics, muscle recovery, post-surgical rehabilitation, and long-term strength.
          </p>
        </div>

        {/* 3-Column Services Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#DDE3DE] hover:border-[#0B4336] shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer"
              onClick={() => onInspectService(service)}
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-[#07382D]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#07382D] text-[11px] uppercase tracking-wider font-bold py-1 px-3 rounded-full shadow-xs">
                    {service.title}
                  </span>

                  {service.duration && (
                    <span className="absolute bottom-3 left-4 text-white/95 text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#A8C99D]" strokeWidth={1.75} />
                      <span>{service.duration}</span>
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#111714] group-hover:text-[#0B4336] transition-colors">
                      {service.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectService(service);
                      }}
                      className="w-8 h-8 rounded-full bg-[#F7F8F4] group-hover:bg-[#0B4336] text-[#0B4336] group-hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      aria-label={`Inspect ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  </div>

                  <p className="text-sm text-[#4E5651] leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2 pt-2 border-t border-[#DDE3DE]">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#111714]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B4336] flex-shrink-0" strokeWidth={1.75} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking(service.id);
                  }}
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-[#F7F8F4] group-hover:bg-[#0B4336] text-[#07382D] group-hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
