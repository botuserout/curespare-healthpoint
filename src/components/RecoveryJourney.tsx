import React from 'react';
import { recoveryStepsData } from '../data/recoverySteps';
import { ArrowRight } from 'lucide-react';

export const RecoveryJourney: React.FC = () => {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-[#07382D] text-white relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#A8C99D] font-bold">
            Methodology & Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2">
            Your Recovery <span className="font-editorial italic font-normal text-[#A8C99D]">Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 leading-relaxed">
            Our structured 4-step rehabilitation process ensures evidence-based treatment, patient comfort, and long-term movement resilience.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {recoveryStepsData.map((step, index) => (
            <div
              key={step.stepNumber}
              className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#A8C99D]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold font-editorial text-[#A8C99D]/90 group-hover:text-[#A8C99D] transition-colors">
                    {step.stepNumber}
                  </span>
                  {index < recoveryStepsData.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-white/20 hidden lg:block" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A8C99D] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A8C99D] font-medium">
                <span>Phase {index + 1} Protocol</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8C99D]"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
