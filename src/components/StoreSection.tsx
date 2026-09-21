import React, { useState } from 'react';
import type { StoreItem } from '../types';
import { getStoreProducts } from '../services/adminStoreService';
import { ShoppingBag, Star, ShieldCheck, ShoppingCart, Tag, Check } from 'lucide-react';

interface StoreSectionProps {
  onAddToCart: (product: StoreItem) => void;
  onOpenCart: () => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ onAddToCart, onOpenCart }) => {
  const [products] = useState<StoreItem[]>(getStoreProducts());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const categories = ['All', 'Spine & Support', 'Exercise & Rehab', 'Pain Relief', 'Knee & Joint'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAdd = (product: StoreItem) => {
    onAddToCart(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id="store" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#0B4336]" />
              <span>Doctor-Recommended Equipment</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight mt-2">
              Physio Supporting Tools Store
            </h2>
            <p className="text-sm sm:text-base text-[#4E5651] mt-2 max-w-xl leading-relaxed">
              Certified orthopedic supports, spinal alignment pillows, TENS pain relief units, and exercise tools curated by Dr. Chandan Kumar.
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
                    : 'bg-[#F7F8F4] text-[#5D6661] hover:bg-[#DCE9D9] hover:text-[#07382D] border border-[#DDE3DE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedIds.has(product.id);
            return (
              <div
                key={product.id}
                className="group bg-[#F7F8F4]/50 rounded-2xl p-5 border border-[#DDE3DE] hover:border-[#0B4336] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Image Wrapper */}
                  <div className="relative h-52 rounded-xl overflow-hidden bg-white mb-4 border border-[#DDE3DE]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#0B4336] text-[#A8C99D] text-[10px] uppercase font-bold tracking-wider py-1 px-2.5 rounded-md shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* In Stock Pill */}
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#07382D] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#0B4336]" />
                      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-[#111714]">{product.rating}</span>
                    <span className="text-[#5D6661] font-normal">/ 5.0</span>
                  </div>

                  <h3 className="text-base font-bold text-[#111714] group-hover:text-[#0B4336] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#4E5651] mt-1.5 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-4 mt-4 border-t border-[#DDE3DE] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#0B4336]">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#717C75] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#0B4336] font-semibold flex items-center gap-0.5">
                      <Tag className="w-3 h-3" />
                      <span>Use coupon HEALTH10 for 10% off</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#25D366] text-white'
                        : 'bg-[#0B4336] hover:bg-[#07382D] text-white shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-[#A8C99D]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#07382D] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">Have questions about selecting the right rehab tool?</h4>
            <p className="text-xs sm:text-sm text-white/80 mt-0.5">Our clinical team at Trisulia Square will recommend the exact support for your condition.</p>
          </div>
          <button
            onClick={onOpenCart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#A8C99D] text-[#07382D] text-xs uppercase font-bold py-3.5 px-6 rounded-full shadow hover:bg-[#b8d8ac] transition-all cursor-pointer flex-shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>View Shopping Cart</span>
          </button>
        </div>

      </div>
    </section>
  );
};
