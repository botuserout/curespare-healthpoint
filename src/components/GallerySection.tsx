import React, { useState } from 'react';
import type { MediaItem } from '../types';
import { getMediaItems } from '../services/adminStoreService';
import { Camera, Video, Play, Image, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [mediaList] = useState<MediaItem[]>(getMediaItems());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const categories = ['All', 'Clinic Facility', 'Therapy Sessions', 'Rehab Exercises', 'Equipment'];

  const filteredMedia =
    selectedCategory === 'All'
      ? mediaList
      : mediaList.filter((m) => m.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F7F8F4] relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#0B4336]" />
              <span>Clinical Facility & Rehab Demos</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight mt-2">
              Media Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#4E5651] mt-2 max-w-xl leading-relaxed">
              Explore our state-of-the-art neuro-rehab center, advanced electrotherapy equipment, and video demonstration protocols.
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

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#DDE3DE] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-[#07382D] cursor-pointer"
                onClick={() => {
                  if (item.type === 'video') {
                    setActiveVideoUrl(item.url);
                  } else {
                    setActiveLightboxImg(item.url);
                  }
                }}
              >
                <img
                  src={item.type === 'video' ? (item.posterUrl || item.url) : item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Media Type Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                  {item.type === 'video' ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-[#A8C99D]" />
                      <span>Video Demo</span>
                    </>
                  ) : (
                    <>
                      <Image className="w-3.5 h-3.5 text-[#A8C99D]" />
                      <span>Photo</span>
                    </>
                  )}
                </div>

                {/* Video Play Trigger Icon */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#0B4336]/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform border border-[#A8C99D]/40">
                      <Play className="w-6 h-6 fill-current text-[#A8C99D] ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0B4336] tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-[#111714] mt-1 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-[#5D6661] mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Lightbox Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-2xl bg-black overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative pt-[56.25%] w-full">
              <iframe
                src={activeVideoUrl}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Clinical Video Demo"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={activeLightboxImg} alt="Clinic photo preview" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};
