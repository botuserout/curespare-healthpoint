import React, { useState } from 'react';
import { faqData } from '../data/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE9D9] text-[#07382D] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patient Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111714] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#5D6661] mt-2">
            Everything you need to know about preparing for your consultation, session durations, and treatment plans.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-[#DDE3DE] rounded-2xl overflow-hidden bg-[#F7F8F4]/40 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-[#DCE9D9]/30 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-[#111714]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-[#DDE3DE] flex items-center justify-center text-[#0B4336] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#0B4336] text-white border-transparent' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5D6661] leading-relaxed border-t border-[#DDE3DE]/60 animate-fadeIn"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
