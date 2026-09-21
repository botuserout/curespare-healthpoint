import React, { useState, useEffect } from 'react';
import type { PhysiotherapyService, StoreItem, CartItem, ThemeOption } from './types';
import { themeConfigs } from './config/themes';
import { getActiveTheme, subscribeAdminStore } from './services/adminStoreService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppointmentForm } from './components/AppointmentForm';
import { Services } from './components/Services';
import { Treatments } from './components/Treatments';
import { GallerySection } from './components/GallerySection';
import { StoreSection } from './components/StoreSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { About } from './components/About';
import { RecoveryJourney } from './components/RecoveryJourney';
import { Conditions } from './components/Conditions';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CartModal } from './components/CartModal';
import { AdminPanelModal } from './components/AdminPanelModal';

export const App: React.FC = () => {
  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedConditionName, setSelectedConditionName] = useState<string>('');
  const [inspectedService, setInspectedService] = useState<PhysiotherapyService | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Theme state
  const [activeTheme, setActiveThemeState] = useState<ThemeOption>(getActiveTheme());

  useEffect(() => {
    const unsubscribe = subscribeAdminStore(() => {
      setActiveThemeState(getActiveTheme());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const themeConfig = themeConfigs[activeTheme] || themeConfigs.default;

  // Cart operations
  const handleAddToCart = (product: StoreItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenBooking = (serviceId: string = '', conditionName: string = '') => {
    setSelectedServiceId(serviceId);
    setSelectedConditionName(conditionName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceId('');
    setSelectedConditionName('');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F8F4] flex flex-col font-sans text-[#111714]">
      {/* Festive Banner Alert if an occasion theme is active */}
      {themeConfig.bannerMessage && (
        <div
          className="text-white text-xs font-bold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 relative z-50 animate-fadeIn"
          style={{ backgroundColor: themeConfig.primary }}
        >
          <span>{themeConfig.bannerMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenCart={() => setIsCartModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Key Stats Bar */}
        <Stats />

        {/* 3. About Section */}
        <About onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Services Section */}
        <Services
          onInspectService={(service) => setInspectedService(service)}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Clinical Treatments Section */}
        <Treatments onOpenBooking={handleOpenBooking} />

        {/* 6. Media Gallery Section (Photos & Video Demos) */}
        <GallerySection />

        {/* 7. Physio Supporting Tools Store Section */}
        <StoreSection
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartModalOpen(true)}
        />

        {/* 8. Recovery Journey (4-step Process) */}
        <RecoveryJourney />

        {/* 9. Inline Appointment Booking Section */}
        <section id="appointment" className="py-20 lg:py-28 bg-[#DCE9D9]/40 relative">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest text-[#0B4336] font-bold">
                Schedule Your Visit
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111714] tracking-tight mt-2">
                Book a Consultation
              </h2>
              <p className="text-sm sm:text-base text-[#5D6661] mt-2">
                Choose a time that fits your schedule. Apply coupon code or referral code in your notes.
              </p>
            </div>
            
            <AppointmentForm />
          </div>
        </section>

        {/* 10. Conditions We Help With */}
        <Conditions onOpenBooking={handleOpenBooking} />

        {/* 11. Why Choose Us */}
        <WhyChooseUs />

        {/* 12. Testimonials & Reviews */}
        <Testimonials />

        {/* 13. Frequently Asked Questions */}
        <FAQ />

        {/* 14. Final Call To Action */}
        <FinalCTA onOpenBooking={() => handleOpenBooking()} />

        {/* 15. Contact Information & Map */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={inspectedService}
        onClose={() => setInspectedService(null)}
        onBookService={handleOpenBooking}
      />

      {/* Booking Overlay Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        initialServiceId={selectedServiceId}
        initialCondition={selectedConditionName}
        onClose={handleCloseBooking}
      />

      {/* Physio Store Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onThemeChanged={(t) => setActiveThemeState(t)}
      />
    </div>
  );
};

export default App;
