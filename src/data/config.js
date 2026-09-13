/**
 * Paindem Smart Cells - Official Store Configuration
 * Contact details, shop location, nationwide delivery, and financing rules.
 */
export const STORE_CONFIG = {
  name: "Paindem Smart Cells",
  shortName: "Paindem",
  slogan: "Smart Your Life",
  tagline: "Your dream iPhone. Buy Now, Pay Later.",
  badge: "Trusted Apple Device Retailer • Circle, Accra & Nationwide Delivery",

  contact: {
    phone: "054 753 7715",
    phoneIntl: "+233 54 753 7715",
    phoneDial: "0547537715",
    whatsappNumber: "233547537715", // wa.me format
    email: "paindemsmartcells@gmail.com",
    address: "Circle, Accra — Opposite Vodafone Office",
    landmark: "At KFC Circle, directly opposite the Vodafone Office",
    city: "Accra",
    area: "Circle",
    mapsQuery: "KFC+Circle+Accra+Ghana",
    deliveryRegions: "All 16 Regions of Ghana (Accra, Kumasi, Takoradi, Tamale, Sunyani, Cape Coast, Ho, Koforidua & more)",
    hours: {
      weekdays: "Mon – Fri: 8:30 AM – 7:00 PM",
      saturday: "Saturday: 9:00 AM – 6:00 PM",
      sunday: "Sunday: Closed (WhatsApp chat open 24/7)"
    }
  },

  bnplRules: {
    standardDeposit: 40, // 40%
    flagshipDeposit: 60, // 60% for brand new 16/17 Pro
    weeks: 12,
    months: 3,
    days: 84, // 12 weeks * 7 days
    warranty: "6 Months Real Shop Warranty",
    differentiator: "The ONLY thing you need is your Ghana Card and down payment. No guarantor, no payslip, no bank statement.",
    paymentOptions: ["Daily MoMo", "Weekly MoMo", "Monthly MoMo", "Bank Transfer"]
  },

  // WhatsApp instant message helper
  makeWhatsAppLink: (message) => {
    return `https://wa.me/233547537715?text=${encodeURIComponent(message)}`;
  }
};
