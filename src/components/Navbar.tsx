import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../config/clinic';
import { treatmentsData } from '../data/treatments';
import { getClinicSchedule } from '../services/adminStoreService';
import {
  Menu,
  X,
  Calendar,
  Phone,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Shield,
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenCart,
  onOpenAdmin,
  cartCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsDropdownOpen, setIsTreatmentsDropdownOpen] = useState(false);
  const [schedule] = useState(getClinicSchedule());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Treatments', href: '#treatments', isDropdown: true },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Physio Store', href: '#store' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const categories = [
    { title: 'Neuro & Pediatric', items: treatmentsData.filter((t) => t.category === 'Neuro & Pediatric') },
    { title: 'Musculoskeletal & Spine', items: treatmentsData.filter((t) => t.category === 'Musculoskeletal & Spine') },
    { title: 'Post-Surgical & Ortho', items: treatmentsData.filter((t) => t.category === 'Post-Surgical & Ortho') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B4336]/95 backdrop-blur-md shadow-lg border-b border-white/10 text-white'
          : 'bg-[#0B4336] text-white'
      }`}
    >
      {/* Announcement Bar */}
      <div className="bg-[#07382D] text-[11px] font-medium text-white/85 py-1.5 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>📍 Trisulia Square, Cuttack, Odisha</span>
            <span>•</span>
            <span>🕒 {schedule.operatingDays}: {schedule.openingTime} - {schedule.closingTime}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#A8C99D] transition-colors font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#A8C99D]" />
              <span>Admin Panel</span>
            </button>
            <span>•</span>
            <a href={`tel:${schedule.helplinePhone}`} className="hover:text-[#A8C99D] transition-colors font-semibold">
              📞 Direct Helpline: {clinicConfig.contact.formattedPhone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo with Official Image */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#A8C99D] rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-[#A8C99D]/40 p-0.5 group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src={clinicConfig.logoUrl}
              alt={clinicConfig.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-tight font-sans">
              {clinicConfig.name}
            </span>
            <span className="text-[10px] tracking-wider text-[#A8C99D] uppercase font-semibold">
              {clinicConfig.subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 relative" aria-label="Main Navigation">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setIsTreatmentsDropdownOpen(true)}
                  onMouseLeave={() => setIsTreatmentsDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-[#A8C99D] transition-colors focus:outline-none"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTreatmentsDropdownOpen ? 'rotate-180 text-[#A8C99D]' : ''}`} />
                  </a>

                  {/* Mega-Dropdown Menu */}
                  {isTreatmentsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[850px] animate-fadeIn">
                      <div className="bg-white rounded-2xl shadow-2xl border border-[#DDE3DE] p-6 text-[#111714] grid grid-cols-3 gap-6">
                        {categories.map((cat, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="flex items-center gap-1.5 border-b border-[#DDE3DE] pb-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#0B4336]" />
                              <h4 className="text-xs uppercase tracking-wider font-bold text-[#0B4336]">
                                {cat.title}
                              </h4>
                            </div>
                            <div className="space-y-2.5">
                              {cat.items.map((item) => (
                                <a
                                  key={item.id}
                                  href="#treatments"
                                  onClick={() => setIsTreatmentsDropdownOpen(false)}
                                  className="block p-2 rounded-xl hover:bg-[#F7F8F4] transition-colors group/item"
                                >
                                  <p className="text-xs font-bold text-[#111714] group-hover/item:text-[#0B4336] transition-colors">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-[#5D6661] leading-tight mt-0.5 font-normal">
                                    {item.simpleDesc}
                                  </p>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-white/80 hover:text-[#A8C99D] transition-colors focus:outline-none focus:text-[#A8C99D]"
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Cart Icon Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#A8C99D]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#25D366] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href={`tel:${clinicConfig.contact.phone}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-[#A8C99D] transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            aria-label={`Call clinic at ${clinicConfig.contact.formattedPhone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#A8C99D]" />
            <span>{clinicConfig.contact.formattedPhone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#A8C99D] hover:bg-[#b8d8ac] text-[#07382D] text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 focus:outline-none cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center lg:hidden gap-2">
          {/* Mobile Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-white/10 text-white"
          >
            <ShoppingBag className="w-4 h-4 text-[#A8C99D]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#25D366] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="bg-[#A8C99D] text-[#07382D] text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" />
            <span>Book</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#A8C99D]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#07382D] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto custom-scrollbar">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-white/90 hover:text-[#A8C99D] py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 text-xs font-bold text-[#A8C99D] py-2 bg-white/10 rounded-lg"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center bg-[#A8C99D] text-[#07382D] font-bold py-3 rounded-xl text-sm"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
