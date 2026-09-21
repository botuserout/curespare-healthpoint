import React from 'react';
import { clinicConfig } from '../config/clinic';
import { UserCheck, BookOpenCheck, Stethoscope, Cpu, ShieldAlert } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const doctor = clinicConfig.physiotherapist;

  const pillars = [
    {
      title: 'Personalized Treatment',
      desc: 'No generic exercise sheets. Every rehabilitation plan is customized to your exact biomechanical and neurological metrics.',
      icon: UserCheck,
    },
    {
      title: 'Evidence-Based Approach',
      desc: 'All treatment methods are grounded in current musculoskeletal and neurological clinical research.',
      icon: BookOpenCheck,
    },
    {
      title: 'Experienced Care',
      desc: `Led by ${doctor.name} (${doctor.qualifications}) with extensive clinical experience from SVNIRTAR Olatpur and SCB Medical College.`,
      icon: Stethoscope,
    },
    {
      title: 'Modern Techniques',
      desc: 'Combining manual therapy, neuro-rehabilitation, electrotherapy, dry needling, and therapeutic exercise.',
      icon: Cpu,
    },
    {
      title: 'Long-Term Recovery',
      desc: 'We focus on educating patients and strengthening movement patterns to prevent injury recurrence.',
      icon: ShieldAlert,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Intro */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold">
              Why Patients Trust Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111714] tracking-tight mt-2 leading-tight">
              Clinical Excellence & Dedicated Patient Care
            </h2>
            <p className="text-sm text-[#4E5651] mt-4 leading-relaxed">
              At {clinicConfig.name}, we believe healthcare should be compassionate, transparent, and driven by measurable recovery outcomes.
            </p>
          </div>

          {/* Right 5 Pillars */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border border-[#DDE3DE] bg-[#F7F8F4]/60 hover:bg-white hover:border-[#0B4336] hover:shadow-md transition-all ${
                    idx === pillars.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#DCE9D9] text-[#0B4336] flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-4 h-4 text-[#0B4336]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base font-bold text-[#111714]">{pillar.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E5651] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
