import React from 'react';
import type { PhysiotherapyService } from '../types';
import { X, Clock, CheckCircle2, Shield, Calendar, Activity, Sparkles, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: PhysiotherapyService | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      {/* Outer Card with Rounded Corners & overflow-hidden */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-[#DDE3DE] overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#111714] shadow-md transition-all focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#111714]" />
        </button>

        {/* Scrollable Modal Body Container with custom-scrollbar */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          
          {/* Hero Header Image Banner */}
          <div className="relative h-64 sm:h-72 w-full bg-[#07382D] overflow-hidden">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07382D] via-[#07382D]/40 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-16 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8C99D]/20 border border-[#A8C99D]/40 text-[#A8C99D] text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                <Activity className="w-3.5 h-3.5" />
                <span>Clinical Service Specialization</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {service.title}
              </h2>
              {service.duration && (
                <div className="flex items-center gap-1.5 text-xs text-[#A8C99D] mt-1.5 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Body Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Overview Paragraph */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#0B4336] mb-1.5">
                Service Overview
              </h3>
              <p className="text-sm sm:text-base text-[#5D6661] leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Key Clinical Benefits */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#0B4336] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0B4336]" />
                <span>Key Patient Benefits</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F7F8F4] border border-[#DDE3DE] flex items-start gap-2.5 text-xs font-semibold text-[#111714]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0B4336] flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Techniques Applied */}
            {service.techniques && service.techniques.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#0B4336] mb-2.5 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#0B4336]" />
                  <span>Evidence-Based Techniques Included</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.techniques.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#DCE9D9]/60 text-[#07382D] border border-[#A8C99D]/40 font-medium px-3 py-1.5 rounded-lg"
                    >
                      • {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Conditions */}
            {service.recommendedFor && service.recommendedFor.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#0B4336] mb-2">
                  Recommended For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.recommendedFor.map((cond, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#F7F8F4] text-[#5D6661] border border-[#DDE3DE] px-3 py-1 rounded-md"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#DDE3DE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#5D6661]">Ready to start your treatment plan?</p>
                <p className="text-sm font-bold text-[#111714]">Schedule an evaluation with Dr. Chandan Kumar</p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBookService(service.id);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B4336] hover:bg-[#07382D] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#A8C99D]" />
                <span>Book For {service.title}</span>
                <ArrowRight className="w-4 h-4 text-[#A8C99D]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
