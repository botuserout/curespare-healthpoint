import React from 'react';
import { clinicConfig } from '../config/clinic';
import { MapPin, Phone, Mail, Share2, Clock, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F7F8F4] relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111714] tracking-tight mt-2">
            Visit CureSpare HealthPoint
          </h2>
          <p className="text-sm sm:text-base text-[#5D6661] mt-2">
            Our clinic is conveniently located at Trisulia Square, Cuttack, Odisha. Contact us by phone or email to inquire about appointments or specialized neuro-rehab treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Details Grid */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address & Location */}
            <div className="bg-white p-6 rounded-2xl border border-[#DDE3DE] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCE9D9] text-[#0B4336] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#111714]">Clinic Address</h3>
                <p className="text-sm text-[#5D6661]">{clinicConfig.location.fullAddress}</p>
                <a
                  href={clinicConfig.location.mapPlaceholderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#0B4336] font-bold hover:underline pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Phone & Email Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <a
                href={`tel:${clinicConfig.contact.phone}`}
                className="bg-white p-6 rounded-2xl border border-[#DDE3DE] shadow-sm hover:border-[#A8C99D] hover:shadow-md transition-all flex flex-col items-start gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DCE9D9] text-[#0B4336] flex items-center justify-center group-hover:bg-[#0B4336] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#5D6661]">Phone Support</h4>
                  <p className="text-base font-bold text-[#111714] group-hover:text-[#0B4336] transition-colors mt-0.5">
                    {clinicConfig.contact.formattedPhone}
                  </p>
                  <span className="text-[11px] text-[#0B4336] font-medium">Click to call directly</span>
                </div>
              </a>

              <a
                href={`mailto:${clinicConfig.contact.email}`}
                className="bg-white p-6 rounded-2xl border border-[#DDE3DE] shadow-sm hover:border-[#A8C99D] hover:shadow-md transition-all flex flex-col items-start gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DCE9D9] text-[#0B4336] flex items-center justify-center group-hover:bg-[#0B4336] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#5D6661]">Email Consultation</h4>
                  <p className="text-xs font-bold text-[#111714] group-hover:text-[#0B4336] transition-colors mt-0.5 truncate max-w-[180px]">
                    {clinicConfig.contact.email}
                  </p>
                  <span className="text-[11px] text-[#0B4336] font-medium">Send email message</span>
                </div>
              </a>

            </div>

            {/* Instagram & Social Media */}
            <div className="bg-white p-6 rounded-2xl border border-[#DDE3DE] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#5D6661]">Instagram Profile</h4>
                  <p className="text-sm font-bold text-[#111714]">@{clinicConfig.contact.instagram}</p>
                </div>
              </div>

              <a
                href={clinicConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F7F8F4] hover:bg-[#0B4336] text-[#07382D] hover:text-white text-xs font-bold py-2 px-4 rounded-xl transition-all"
              >
                Follow Us
              </a>
            </div>

          </div>

          {/* Right Column: Hours & Live Google Maps Embed */}
          <div className="lg:col-span-6">
            <div className="bg-[#07382D] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#A8C99D]/20 text-[#A8C99D] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Clinic Hours</h3>
                    <p className="text-xs text-[#A8C99D]">Prior Appointments Recommended</p>
                  </div>
                </div>

                <a
                  href={clinicConfig.location.mapPlaceholderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 bg-[#A8C99D] hover:bg-[#b8d8ac] text-[#07382D] text-xs font-bold py-2 px-3.5 rounded-full transition-all"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-white/85 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span>Monday – Saturday</span>
                  <span className="font-bold text-white">09:00 AM – 08:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span className="font-bold text-[#A8C99D]">By Emergency Booking</span>
                </div>
              </div>

              {/* Live Interactive Google Maps iFrame */}
              <div className="pt-2">
                <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-white/20 shadow-md bg-slate-900">
                  <iframe
                    src={clinicConfig.location.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="CureSpare HealthPoint Google Maps Location"
                    className="w-full h-full rounded-xl"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
