import React, { useState } from 'react';
import { conditionsData } from '../data/conditions';
import {
  Activity,
  Zap,
  Trophy,
  Shield,
  HeartPulse,
  Flame,
  UserCheck,
  Compass,
  ArrowRight,
  FolderOpen,
  Calendar,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface ConditionsProps {
  onOpenBooking?: (serviceId?: string, conditionName?: string) => void;
}

export const Conditions: React.FC<ConditionsProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIcon = (iconName: string, isHovered: boolean = false) => {
    const iconClass = `w-5 h-5 transition-colors duration-300 ${
      isHovered ? 'text-[#A8C99D]' : 'text-[#0B4336]'
    }`;
    switch (iconName) {
      case 'Activity':
        return <Activity className={iconClass} strokeWidth={2} />;
      case 'Zap':
        return <Zap className={iconClass} strokeWidth={2} />;
      case 'Trophy':
        return <Trophy className={iconClass} strokeWidth={2} />;
      case 'Shield':
        return <Shield className={iconClass} strokeWidth={2} />;
      case 'HeartPulse':
        return <HeartPulse className={iconClass} strokeWidth={2} />;
      case 'Flame':
        return <Flame className={iconClass} strokeWidth={2} />;
      case 'UserCheck':
        return <UserCheck className={iconClass} strokeWidth={2} />;
      default:
        return <Compass className={iconClass} strokeWidth={2} />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Conditions' },
    { id: 'spine', label: 'Spine & Back' },
    { id: 'joint', label: 'Joints & Mobility' },
    { id: 'sports', label: 'Sports & Muscle' },
    { id: 'postop', label: 'Post-Surgical' },
  ];

  const filteredConditions =
    activeTab === 'all'
      ? conditionsData
      : conditionsData.filter((c) => c.region === activeTab);

  // Set default expanded card if none hovered
  const activeConditionId = hoveredId || (filteredConditions[0]?.id ?? 'back-pain');

  return (
    <section id="conditions" className="py-20 lg:py-28 bg-[#0B4336] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#A8C99D]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#A8C99D]/30 text-[#A8C99D] text-xs font-bold uppercase tracking-widest backdrop-blur-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A8C99D]" />
            <span>Interactive Folder Directory</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Conditions We Treat
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 leading-relaxed font-normal">
            Hover over any medical folder tab to reveal targeted clinical treatment protocols, symptoms managed, and recovery pathways.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setHoveredId(null);
              }}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#A8C99D] text-[#07382D] shadow-md font-bold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DESKTOP VIEW: Interactive Stacked Folder Deck (Laptops & Desktops) */}
        <div className="hidden lg:flex max-w-6xl mx-auto h-[460px] rounded-3xl bg-[#07382D] border border-white/15 p-3 shadow-2xl overflow-hidden relative">
          {filteredConditions.map((condition, index) => {
            const isActive = activeConditionId === condition.id;
            const folderNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={condition.id}
                onMouseEnter={() => setHoveredId(condition.id)}
                className={`relative h-full rounded-2xl transition-all duration-500 ease-out cursor-pointer overflow-hidden border flex flex-col justify-between ${
                  isActive
                    ? 'flex-[3.5] bg-[#F7F8F4] text-[#111714] border-white shadow-2xl z-30 scale-[1.01]'
                    : 'flex-[0.85] bg-[#07382D] text-white/70 border-white/10 hover:border-[#A8C99D]/50 hover:bg-white/5 z-10'
                }`}
              >
                {/* Folder Top Tab Header Cutout */}
                <div
                  className={`p-5 flex items-center justify-between transition-colors duration-300 ${
                    isActive ? 'bg-[#DCE9D9]/80 border-b border-[#A8C99D]/40' : 'bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-[#0B4336] text-[#A8C99D]'
                          : 'bg-white/10 text-[#A8C99D]'
                      }`}
                    >
                      FILE #{folderNum}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#0B4336]' : 'text-white/60'
                      }`}
                    >
                      {condition.region ? condition.region.toUpperCase() : 'CLINICAL'} PROTOCOL
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-[#0B4336] shadow-sm' : 'bg-white/10'
                    }`}
                  >
                    {getIcon(condition.iconName, isActive)}
                  </div>
                </div>

                {/* EXPANDED CONTENT (When Active/Hovered) */}
                {isActive ? (
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between animate-fadeIn">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B4336] bg-[#DCE9D9] px-3 py-1 rounded-full border border-[#A8C99D]">
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Active Clinical File</span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-[#111714] tracking-tight">
                        {condition.title}
                      </h3>

                      <p className="text-sm lg:text-base text-[#4E5651] leading-relaxed max-w-xl font-normal">
                        {condition.description}
                      </p>

                      <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-[#0B4336] font-semibold">
                        <div className="flex items-center gap-2 bg-[#F0F6F4] p-2.5 rounded-xl border border-[#DDE3DE]">
                          <CheckCircle2 className="w-4 h-4 text-[#0B4336]" />
                          <span>Evidence-based rehab</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F0F6F4] p-2.5 rounded-xl border border-[#DDE3DE]">
                          <CheckCircle2 className="w-4 h-4 text-[#0B4336]" />
                          <span>Non-surgical recovery</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button inside folder */}
                    <div className="pt-4 border-t border-[#DDE3DE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0B4336] animate-pulse"></span>
                        <span className="text-xs text-[#5D6661] font-medium">Ready for assessment</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenBooking) onOpenBooking('', condition.title);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-[#0B4336] hover:bg-[#07382D] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#A8C99D]" />
                        <span>Book Assessment for {condition.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#A8C99D]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* CONTRACTED STATE (Behind Stack View) */
                  <div className="p-4 flex-1 flex flex-col justify-between items-center text-center">
                    <div className="mt-4 rotate-0 lg:-rotate-90 origin-center whitespace-nowrap">
                      <p className="text-sm font-bold text-white tracking-wide">
                        {condition.title}
                      </p>
                    </div>

                    <div className="mb-2 text-[#A8C99D]">
                      <ChevronRight className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE & TABLET VIEW: Stacked Folder Cards Accordion */}
        <div className="lg:hidden space-y-3">
          {filteredConditions.map((condition, index) => {
            const isActive = activeConditionId === condition.id;
            const folderNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={condition.id}
                onClick={() => setHoveredId(isActive ? null : condition.id)}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-[#F7F8F4] text-[#111714] border-white shadow-xl'
                    : 'bg-[#07382D] text-white border-white/10 hover:border-white/30'
                }`}
              >
                {/* Folder Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-[#0B4336] text-[#A8C99D]'
                          : 'bg-white/10 text-[#A8C99D]'
                      }`}
                    >
                      #{folderNum}
                    </span>
                    <div>
                      <h3
                        className={`text-base font-bold ${
                          isActive ? 'text-[#111714]' : 'text-white'
                        }`}
                      >
                        {condition.title}
                      </h3>
                      <p
                        className={`text-[11px] ${
                          isActive ? 'text-[#5D6661]' : 'text-white/70'
                        }`}
                      >
                        {condition.region ? condition.region.toUpperCase() : 'CLINICAL'} PROTOCOL
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-[#0B4336]' : 'bg-white/10'
                      }`}
                    >
                      {getIcon(condition.iconName, isActive)}
                    </div>
                  </div>
                </div>

                {/* Mobile Expanded Folder Details */}
                {isActive && (
                  <div className="px-4 pb-5 pt-1 space-y-4 border-t border-[#DDE3DE]">
                    <p className="text-xs sm:text-sm text-[#4E5651] leading-relaxed">
                      {condition.description}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenBooking) onOpenBooking('', condition.title);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0B4336] text-white font-bold text-xs py-3 px-4 rounded-xl shadow cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#A8C99D]" />
                      <span>Book Assessment</span>
                    </button>
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
