import React from 'react';
import { AppointmentForm } from './AppointmentForm';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialCondition?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = '',
  initialCondition = '',
}) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      {/* Outer Card with Rounded Corners & overflow-hidden */}
      <div
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-[#DDE3DE] overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#F7F8F4] text-[#111714] hover:bg-[#DDE3DE] transition-colors focus:outline-none shadow-sm cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container with custom-scrollbar */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <AppointmentForm
            isModal
            initialServiceId={initialServiceId}
            initialCondition={initialCondition}
            onSuccess={onClose}
          />
        </div>

      </div>
    </div>
  );
};
