import React, { useState } from 'react';
import type { Testimonial } from '../types';
import { testimonialsData } from '../data/testimonials';
import { Star, Quote, Plus, X, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(testimonialsData);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [newReview, setNewReview] = useState({
    patientName: '',
    treatmentType: 'Manual Therapy',
    rating: 5,
    quote: '',
    location: 'Cuttack, Odisha',
  });

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Neuro & Stroke Rehabilitation', label: 'Neuro & Stroke' },
    { id: 'Lumbar Sciatica & Disc Rehabilitation', label: 'Spine & Sciatica' },
    { id: 'Knee Osteoarthritis Management', label: 'Knee & Joint' },
    { id: 'Post-Surgical ACL Rehabilitation', label: 'Post-Surgical' },
  ];

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.treatmentType === activeFilter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.patientName || !newReview.quote) return;

    const created: Testimonial = {
      id: `rev-${Date.now()}`,
      patientName: newReview.patientName,
      treatmentType: newReview.treatmentType,
      quote: newReview.quote,
      rating: Number(newReview.rating),
      location: newReview.location || 'Cuttack, Odisha',
    };

    setReviews([created, ...reviews]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setNewReview({
        patientName: '',
        treatmentType: 'Manual Therapy',
        rating: 5,
        quote: '',
        location: 'Cuttack, Odisha',
      });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#F7F8F4] relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold">
              Patient Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111714] tracking-tight mt-2">
              Real Recovery Experiences
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0B4336] hover:bg-[#07382D] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-full shadow transition-all self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#A8C99D]" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#0B4336] text-white shadow-sm'
                  : 'bg-white text-[#5D6661] hover:bg-[#DCE9D9]/50 border border-[#DDE3DE]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border border-[#DDE3DE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#A8C99D]/40 mb-4" />
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#111714] font-editorial italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#DDE3DE] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#111714]">{item.patientName}</h3>
                  <p className="text-xs text-[#5D6661] mt-0.5">{item.location}</p>
                </div>
                <span className="text-[11px] bg-[#DCE9D9] text-[#07382D] font-bold px-3 py-1 rounded-full">
                  {item.treatmentType}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-[#DDE3DE]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F8F4] text-[#111714] hover:bg-[#DDE3DE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#111714] mb-1">Share Patient Feedback</h3>
            <p className="text-xs text-[#5D6661] mb-6">Your experience helps others find trusted physiotherapy care.</p>

            {submittedSuccess ? (
              <div className="p-6 text-center space-y-3 bg-[#DCE9D9]/60 rounded-xl text-[#07382D]">
                <CheckCircle2 className="w-10 h-10 text-[#0B4336] mx-auto" />
                <h4 className="font-bold text-lg">Thank You For Your Review!</h4>
                <p className="text-xs">Your story has been added to our patient experiences.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.patientName}
                    onChange={(e) => setNewReview({ ...newReview, patientName: e.target.value })}
                    placeholder="e.g. Priyanshu Das"
                    className="w-full px-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Treatment Type</label>
                    <select
                      value={newReview.treatmentType}
                      onChange={(e) => setNewReview({ ...newReview, treatmentType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm focus:outline-none"
                    >
                      <option value="Manual Therapy">Manual Therapy</option>
                      <option value="Sports Rehabilitation">Sports Rehab</option>
                      <option value="Pain Management">Pain Management</option>
                      <option value="Post-Surgery Rehabilitation">Post-Surgery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm focus:outline-none"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Your Review *</label>
                  <textarea
                    rows={3}
                    required
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder="Tell us how your treatment helped your recovery..."
                    className="w-full px-4 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B4336] text-white font-bold text-sm py-3 rounded-xl shadow hover:bg-[#07382D] transition-all"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
