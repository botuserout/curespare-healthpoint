# CureSpare Health Point — Architecture & Implementation Guide

## 1. Executive Overview

The **CureSpare Health Point** website has been built as a high-performance, modular React + TypeScript application using Vite and Tailwind CSS.

The application architecture strictly separates **UI rendering**, **data models**, **clinic configurations**, and **service contracts**, ensuring that future enhancements (such as real appointment backends, patient portals, or admin dashboards) can be added without rewriting the frontend layout.

---

## 2. Directory Structure

```
curespare-healthpoint/
├── docs/
│   ├── website-design.md         # Visual design system & token specification
│   └── implementation-plan.md    # Architecture & future API integration guide
├── public/
├── src/
│   ├── components/               # Modular UI sections & elements
│   │   ├── About.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── BookingModal.tsx
│   │   ├── Conditions.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LegalModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── RecoveryJourney.tsx
│   │   ├── Services.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   └── WhyChooseUs.tsx
│   ├── config/
│   │   └── clinic.ts             # Centralized clinic information & metadata
│   ├── data/
│   │   ├── conditions.ts         # 8 treated conditions dataset
│   │   ├── faq.ts                # FAQ accordion items
│   │   ├── recoverySteps.ts      # 4-step rehabilitation process
│   │   ├── services.ts           # 6 core physiotherapy services
│   │   └── testimonials.ts       # Patient reviews data
│   ├── services/
│   │   └── appointmentService.ts # Asynchronous appointment service abstraction
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces & type definitions
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Global CSS & Tailwind directives
│   └── main.tsx                  # React DOM entry point
├── index.html                    # SEO metadata & Google Fonts
├── tailwind.config.js            # Custom design token definitions
└── package.json
```

---

## 3. Configurable Content Guide

To update clinic information across the entire application, edit **`src/config/clinic.ts`**:

- **Clinic Name & Category**: `name`, `category`
- **Location & Address**: `location.fullAddress`, `location.mapPlaceholderUrl`
- **Contact Info**: `contact.phone`, `contact.email`, `contact.instagram`
- **Lead Physiotherapist**: `physiotherapist.name`, `physiotherapist.title`, `physiotherapist.bio`, `physiotherapist.imageUrl`
- **Trust Stats**: `stats.patientsHelped`, `stats.yearsExperience`, `stats.satisfactionRate`, `stats.specializedServices`

Updating a field in `clinic.ts` automatically updates all navigation bars, footers, contact cards, hero sections, and legal modals across the site.

---

## 4. Appointment System Integration Point

The appointment system currently uses a service abstraction located in **`src/services/appointmentService.ts`**:

```typescript
export const submitAppointment = async (
  data: AppointmentData
): Promise<AppointmentResult> => {
  // Currently simulates API delay & generates reference ID
  ...
}
```

### How to Connect a Real Backend API Later:
1. Replace the mock body inside `submitAppointment` with an `axios` or `fetch` call to your backend endpoint (e.g., `https://api.curespare.health/appointments`).
2. Pass `data` (`fullName`, `email`, `phone`, `preferredDate`, `preferredTime`, `message`).
3. Return `{ success: true, message: '...', bookingId: '...' }` on HTTP 200, or `{ success: false, message: '...' }` on HTTP errors.
4. **No UI component code needs to be modified.**

---

## 5. Future Extension Architecture Points

The codebase has been designed to support future modules seamlessly:

### A. Patient Dashboard & Accounts
- Add `src/services/authService.ts` for login/signup endpoints.
- Create `src/pages/Dashboard.tsx` for viewing upcoming appointments and exercise plans.

### B. Online Video Consultation
- Extend `AppointmentData` with a `consultationType: 'in-clinic' | 'telehealth'` field.
- Integrate WebRTC / Zoom / Agora meeting links in the appointment confirmation payload.

### C. Admin & Doctor Dashboard
- Create `src/pages/Admin.tsx` to view appointment requests, mark confirmations, and assign slots to specific physiotherapists.

### D. Payment Integration (Razorpay / Stripe)
- Trigger payment gateways inside `submitAppointment` or on the appointment confirmation step before finalizing booking slots.
