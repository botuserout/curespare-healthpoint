import React from 'react';
import { clinicConfig } from '../config/clinic';
import { Users, Award, HeartHandshake, Stethoscope } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      value: clinicConfig.stats.patientsHelped,
      label: 'Patients Treated',
      subtext: 'Rehabilitated across Odisha',
      icon: Users,
    },
    {
      value: clinicConfig.stats.yearsExperience,
      label: 'Clinical Experience',
      subtext: 'SVNIRTAR & SCB Medical',
      icon: Award,
    },
    {
      value: clinicConfig.stats.satisfactionRate,
      label: 'Satisfaction Rate',
      subtext: 'Verified patient feedback',
      icon: HeartHandshake,
    },
    {
      value: clinicConfig.stats.specializedServices,
      label: 'Clinical Protocols',
      subtext: 'Neuro, Ortho & Physio',
      icon: Stethoscope,
    },
  ];

  return (
    <section className="bg-[#07382D] text-white py-10 border-y border-white/10 relative overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center ${
                  index > 0 ? 'pt-6 lg:pt-0' : ''
                }`}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-[#A8C99D] mb-3">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white tracking-tight font-sans">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#A8C99D] uppercase tracking-wider mt-1">
                  {item.label}
                </span>
                <span className="text-[11px] text-white/60 mt-0.5 font-normal">
                  {item.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
