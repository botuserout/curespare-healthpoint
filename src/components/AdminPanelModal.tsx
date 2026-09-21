import React, { useState } from 'react';
import type { ThemeOption, ClinicSchedule, MediaItem, StoreItem, Coupon } from '../types';
import { themeConfigs } from '../config/themes';
import {
  getActiveTheme,
  setActiveTheme,
  getClinicSchedule,
  saveClinicSchedule,
  getMediaItems,
  saveMediaItems,
  getStoreProducts,
  saveStoreProducts,
  getAdminCoupons,
  saveAdminCoupons,
} from '../services/adminStoreService';
import {
  ShieldAlert,
  Sparkles,
  Clock,
  Image as ImageIcon,
  ShoppingBag,
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Lock,
  Unlock,
  Key,
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChanged: (theme: ThemeOption) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onThemeChanged,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'themes' | 'schedule' | 'media' | 'store' | 'coupons'>('themes');

  // Admin Dynamic Form States
  const [selectedTheme, setSelectedThemeState] = useState<ThemeOption>(getActiveTheme());
  const [schedule, setScheduleState] = useState<ClinicSchedule>(getClinicSchedule());
  const [mediaList, setMediaListState] = useState<MediaItem[]>(getMediaItems());
  const [storeList, setStoreListState] = useState<StoreItem[]>(getStoreProducts());
  const [couponList, setCouponListState] = useState<Coupon[]>(getAdminCoupons());

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // New item inputs
  const [newMedia, setNewMedia] = useState({
    title: '',
    type: 'image' as 'image' | 'video',
    url: '',
    category: 'Clinic Facility' as MediaItem['category'],
  });

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Spine & Support' as StoreItem['category'],
    imageUrl: '',
  });

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    description: '',
  });

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const showSaveSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  const handleThemeSelect = (themeId: ThemeOption) => {
    setSelectedThemeState(themeId);
    setActiveTheme(themeId);
    onThemeChanged(themeId);
    showSaveSuccess(`🎨 Theme switched to ${themeConfigs[themeId].name}!`);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    saveClinicSchedule(schedule);
    showSaveSuccess('🕒 Clinic schedule & timing updated successfully!');
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.title || !newMedia.url) return;
    const created: MediaItem = {
      id: `med-${Date.now()}`,
      title: newMedia.title,
      type: newMedia.type,
      url: newMedia.url,
      category: newMedia.category,
    };
    const updated = [created, ...mediaList];
    setMediaListState(updated);
    saveMediaItems(updated);
    setNewMedia({ title: '', type: 'image', url: '', category: 'Clinic Facility' });
    showSaveSuccess('🖼️ Media item added to gallery!');
  };

  const handleDeleteMedia = (id: string) => {
    const updated = mediaList.filter((m) => m.id !== id);
    setMediaListState(updated);
    saveMediaItems(updated);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;
    const created: StoreItem = {
      id: `prod-${Date.now()}`,
      title: newProduct.title,
      description: newProduct.description || 'Doctor recommended physical therapy support.',
      price: Number(newProduct.price),
      category: newProduct.category,
      imageUrl: newProduct.imageUrl || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      rating: 5,
    };
    const updated = [created, ...storeList];
    setStoreListState(updated);
    saveStoreProducts(updated);
    setNewProduct({ title: '', description: '', price: '', category: 'Spine & Support', imageUrl: '' });
    showSaveSuccess('🛍️ Product added to Physio Store!');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = storeList.filter((p) => p.id !== id);
    setStoreListState(updated);
    saveStoreProducts(updated);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discountValue) return;
    const created: Coupon = {
      code: newCoupon.code.toUpperCase(),
      discountType: newCoupon.discountType,
      discountValue: Number(newCoupon.discountValue),
      description: newCoupon.description || 'Special promo discount',
    };
    const updated = [created, ...couponList];
    setCouponListState(updated);
    saveAdminCoupons(updated);
    setNewCoupon({ code: '', discountType: 'percentage', discountValue: '', description: '' });
    showSaveSuccess(`🎟️ Coupon ${created.code} activated!`);
  };

  const handleDeleteCoupon = (code: string) => {
    const updated = couponList.filter((c) => c.code !== code);
    setCouponListState(updated);
    saveAdminCoupons(updated);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-[#DDE3DE] overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="p-5 bg-[#07382D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#A8C99D]/20 flex items-center justify-center text-[#A8C99D]">
              {isAuthenticated ? <Unlock className="w-4 h-4 text-[#A8C99D]" /> : <Lock className="w-4 h-4 text-[#A8C99D]" />}
            </div>
            <div>
              <h3 className="text-base font-bold">CureSpare Clinic Admin Dashboard</h3>
              <p className="text-[11px] text-[#A8C99D]">Themes, Schedules, Gallery, Physio Store & Coupons</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B4336] text-[#A8C99D] flex items-center justify-center mx-auto shadow-md">
              <Key className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#111714]">Clinic Admin Authentication</h4>
              <p className="text-xs text-[#5D6661] mt-1">Enter PIN to manage themes, clinic timing, media, and products. <br /><span className="text-[#0B4336] font-mono font-bold">(Default PIN: 1234)</span></p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                required
                autoFocus
                placeholder="Enter PIN (1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center text-lg font-mono tracking-widest px-4 py-3 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4336]"
              />

              {pinError && (
                <p className="text-xs text-red-600 font-bold flex items-center justify-center gap-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Incorrect PIN. Use 1234.</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#0B4336] hover:bg-[#07382D] text-white font-bold text-xs uppercase py-3.5 rounded-xl shadow cursor-pointer transition-all"
              >
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Feedback Banner */}
            {saveSuccessMsg && (
              <div className="bg-[#DCE9D9] text-[#07382D] px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 border-b border-[#A8C99D] animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#0B4336]" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* Tabs Bar */}
            <div className="flex border-b border-[#DDE3DE] bg-[#F7F8F4] overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setActiveTab('themes')}
                className={`flex items-center gap-1.5 px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'themes'
                    ? 'border-[#0B4336] text-[#0B4336] bg-white'
                    : 'border-transparent text-[#5D6661] hover:text-[#111714]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>🪔 Festive Themes</span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex items-center gap-1.5 px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'border-[#0B4336] text-[#0B4336] bg-white'
                    : 'border-transparent text-[#5D6661] hover:text-[#111714]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>🕒 Schedule & Timings</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-1.5 px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'media'
                    ? 'border-[#0B4336] text-[#0B4336] bg-white'
                    : 'border-transparent text-[#5D6661] hover:text-[#111714]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>🖼️ Media Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className={`flex items-center gap-1.5 px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'store'
                    ? 'border-[#0B4336] text-[#0B4336] bg-white'
                    : 'border-transparent text-[#5D6661] hover:text-[#111714]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>🛍️ Physio Store</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`flex items-center gap-1.5 px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'coupons'
                    ? 'border-[#0B4336] text-[#0B4336] bg-white'
                    : 'border-transparent text-[#5D6661] hover:text-[#111714]'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>🎟️ Coupons & Referrals</span>
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="overflow-y-auto custom-scrollbar flex-1 p-6 space-y-6">
              
              {/* TAB 1: FESTIVAL THEME SELECTOR */}
              {activeTab === 'themes' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-[#111714]">Indian Festive Theme Selector</h4>
                    <p className="text-xs text-[#5D6661]">
                      Select an occasion to switch the website theme & banner color instantly!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.values(themeConfigs).map((theme) => {
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <div
                          key={theme.id}
                          onClick={() => handleThemeSelect(theme.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                            isSelected
                              ? 'border-[#0B4336] bg-[#F0F6F4] shadow-md'
                              : 'border-[#DDE3DE] bg-white hover:border-[#0B4336]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{theme.badgeEmoji}</span>
                            {isSelected && (
                              <span className="text-[10px] font-bold bg-[#0B4336] text-[#A8C99D] px-2 py-0.5 rounded-full uppercase">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <h5 className="text-sm font-bold text-[#111714]">{theme.name}</h5>
                          <p className="text-xs text-[#5D6661] mt-0.5">{theme.festivalName}</p>

                          {/* Color Swatch */}
                          <div className="flex items-center gap-1.5 pt-3">
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.dark }}></span>
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }}></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: CLINIC SCHEDULE MANAGER */}
              {activeTab === 'schedule' && (
                <form onSubmit={handleSaveSchedule} className="space-y-4 max-w-xl">
                  <div>
                    <h4 className="text-base font-bold text-[#111714]">Manage Clinic Operating Hours</h4>
                    <p className="text-xs text-[#5D6661]">Updates Navbar announcement bar and Contact section timings.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Operating Days</label>
                    <input
                      type="text"
                      required
                      value={schedule.operatingDays}
                      onChange={(e) => setScheduleState({ ...schedule, operatingDays: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Opening Time</label>
                      <input
                        type="text"
                        required
                        value={schedule.openingTime}
                        onChange={(e) => setScheduleState({ ...schedule, openingTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Closing Time</label>
                      <input
                        type="text"
                        required
                        value={schedule.closingTime}
                        onChange={(e) => setScheduleState({ ...schedule, closingTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#111714] mb-1">Sunday / Emergency Notice</label>
                    <input
                      type="text"
                      required
                      value={schedule.sundayNotice}
                      onChange={(e) => setScheduleState({ ...schedule, sundayNotice: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F8F4] border border-[#DDE3DE] rounded-xl text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0B4336] text-white font-bold text-xs uppercase px-6 py-3 rounded-xl hover:bg-[#07382D] transition-colors cursor-pointer"
                  >
                    Save Operating Schedule
                  </button>
                </form>
              )}

              {/* TAB 3: MEDIA GALLERY MANAGER */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  {/* Add Media Form */}
                  <form onSubmit={handleAddMedia} className="p-4 bg-[#F0F6F4] rounded-2xl border border-[#A8C99D]/60 space-y-3">
                    <h5 className="text-xs font-bold uppercase text-[#0B4336]">Add New Photo / Video Demo</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Title / Description *"
                        value={newMedia.title}
                        onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Image URL or Video Embed URL *"
                        value={newMedia.url}
                        onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      />
                      <select
                        value={newMedia.type}
                        onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as 'image' | 'video' })}
                        className="px-3 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      >
                        <option value="image">Photo Image</option>
                        <option value="video">Video Embed URL</option>
                      </select>
                      <select
                        value={newMedia.category}
                        onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as MediaItem['category'] })}
                        className="px-3 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      >
                        <option value="Clinic Facility">Clinic Facility</option>
                        <option value="Therapy Sessions">Therapy Sessions</option>
                        <option value="Rehab Exercises">Rehab Exercises</option>
                        <option value="Equipment">Equipment</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0B4336] text-white font-bold text-xs uppercase px-4 py-2 rounded-xl hover:bg-[#07382D] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Media Item</span>
                    </button>
                  </form>

                  {/* List items */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase text-[#5D6661]">Active Gallery Items ({mediaList.length})</h5>
                    {mediaList.map((m) => (
                      <div key={m.id} className="p-3 bg-white rounded-xl border border-[#DDE3DE] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#111714]">{m.title}</p>
                          <p className="text-[11px] text-[#5D6661]">{m.type.toUpperCase()} • {m.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMedia(m.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PHYSIO STORE MANAGER */}
              {activeTab === 'store' && (
                <div className="space-y-6">
                  <form onSubmit={handleAddProduct} className="p-4 bg-[#F0F6F4] rounded-2xl border border-[#A8C99D]/60 space-y-3">
                    <h5 className="text-xs font-bold uppercase text-[#0B4336]">Add New Physio Supporting Tool</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Product Name *"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      />
                      <input
                        type="number"
                        required
                        placeholder="Price in ₹ *"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      />
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as StoreItem['category'] })}
                        className="px-3 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      >
                        <option value="Spine & Support">Spine & Support</option>
                        <option value="Exercise & Rehab">Exercise & Rehab</option>
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Knee & Joint">Knee & Joint</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0B4336] text-white font-bold text-xs uppercase px-4 py-2 rounded-xl hover:bg-[#07382D] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase text-[#5D6661]">Store Products ({storeList.length})</h5>
                    {storeList.map((p) => (
                      <div key={p.id} className="p-3 bg-white rounded-xl border border-[#DDE3DE] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#111714]">{p.title}</p>
                          <p className="text-[11px] text-[#0B4336] font-bold">₹{p.price} • {p.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: COUPONS & REFERRALS MANAGER */}
              {activeTab === 'coupons' && (
                <div className="space-y-6">
                  <div className="p-4 bg-[#F0F6F4] rounded-2xl border border-[#A8C99D]/60 space-y-2">
                    <h5 className="text-xs font-bold uppercase text-[#0B4336]">Referral Program Logic</h5>
                    <p className="text-xs text-[#5D6661]">
                      Patients can enter any referral code starting with <strong className="text-[#0B4336] font-mono">REF-</strong> (e.g. `REF-RAMESH`) to get an instant ₹100 discount on appointments or store tools.
                    </p>
                  </div>

                  <form onSubmit={handleAddCoupon} className="p-4 bg-[#F0F6F4] rounded-2xl border border-[#A8C99D]/60 space-y-3">
                    <h5 className="text-xs font-bold uppercase text-[#0B4336]">Create New Coupon Code</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Coupon Code (e.g. SPECIAL15)"
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs uppercase font-mono"
                      />
                      <select
                        value={newCoupon.discountType}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as 'percentage' | 'fixed' })}
                        className="px-3 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (₹)</option>
                      </select>
                      <input
                        type="number"
                        required
                        placeholder="Value (e.g. 15 or 100)"
                        value={newCoupon.discountValue}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                        className="px-3.5 py-2 bg-white border border-[#DDE3DE] rounded-xl text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0B4336] text-white font-bold text-xs uppercase px-4 py-2 rounded-xl hover:bg-[#07382D] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Activate Coupon Code</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase text-[#5D6661]">Active Coupons ({couponList.length})</h5>
                    {couponList.map((c) => (
                      <div key={c.code} className="p-3 bg-white rounded-xl border border-[#DDE3DE] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono font-bold bg-[#0B4336] text-[#A8C99D] px-2 py-0.5 rounded-md">
                            {c.code}
                          </span>
                          <span className="text-xs font-bold text-[#111714] ml-2">
                            {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                          </span>
                          <p className="text-[11px] text-[#5D6661] mt-0.5">{c.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCoupon(c.code)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
