/**
 * iDeal Ghana - Central Business Configuration
 * Edit these values in one place to update details across the entire site.
 */
const CONFIG = {
  business: {
    name: "iDeal Ghana",
    tagline: "Your dream iPhone. Pay small small.",
    badge: "Accra's #1 Certified Apple Dealer",
    phone: "+233 24 819 4022",
    phoneRaw: "233248194022",
    whatsapp: "+233 24 819 4022",
    whatsappRaw: "233248194022", // International format without '+' for wa.me links
    email: "inquiries@idealghana.com",
    address: {
      line1: "Suite 4B, Premier Tower, Oxford Street",
      area: "Osu, Accra",
      country: "Ghana",
      landmark: "Opposite TotalEnergies Osu & Near Papaye",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.970183182845!2d-0.18349272424491763!3d5.556658933519965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf907d7c66c3c5%3A0xb35a09e05ecff59b!2sOxford%20St%2C%20Accra!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
    },
    hours: {
      weekdays: "Monday – Friday: 8:30 AM – 7:00 PM",
      saturday: "Saturday: 9:00 AM – 6:00 PM",
      sunday: "Sunday: Closed (WhatsApp active 24/7)"
    },
    socials: {
      instagram: "https://instagram.com/idealghana",
      tiktok: "https://tiktok.com/@idealghana",
      twitter: "https://x.com/idealghana",
      facebook: "https://facebook.com/idealghana"
    }
  },

  bnpl: {
    standardDepositPercent: 40,
    flagshipDepositPercent: 60,
    weeksDuration: 12,
    monthsDuration: 3,
    warrantyMonths: 6,
    interestRatePromo: 0,
    acceptedMomo: ["MTN Mobile Money", "Telecel Cash", "AT Money"],
    legalNotice: "Installment purchases are hire-purchase agreements under Ghana's Hire Purchase Act, 1974 (NRCD 292)."
  },

  templates: {
    generalInquiry: "Hello iDeal Ghana! 👋 I would like to inquire about getting an iPhone on your Buy Now, Pay Later scheme.",
    catalogOrder: (item, plan) => 
      `Hello iDeal Ghana! 👋\n\nI want to purchase the *${item.name}* (${item.storage}, ${item.condition}) on your BNPL scheme.\n\n*Device Details:*\n• Price: GHS ${item.price.toLocaleString()}\n• Condition: ${item.condition}\n• Warranty: 6 Months Included\n\n*Payment Plan:*\n• Deposit: GHS ${plan.deposit.toLocaleString()} (${plan.depositPercent}%)\n• Plan Term: ${plan.frequency === 'weekly' ? '12 Weeks' : '3 Months'}\n• Installment: GHS ${plan.installmentAmount.toLocaleString()} / ${plan.frequencyUnit}\n• Remaining Balance: GHS ${plan.balance.toLocaleString()}\n\nI have my Ghana Card ready. Please let me know how soon I can pick this up at your Osu showroom!`,
    calculatorInquiry: (price, depositPercent, frequency, deposit, balance, installment) =>
      `Hello iDeal Ghana! 👋\n\nI just calculated a custom BNPL plan on your website:\n\n• Target Phone Budget: GHS ${price.toLocaleString()}\n• Deposit (${depositPercent}%): GHS ${deposit.toLocaleString()}\n• Remaining Balance: GHS ${balance.toLocaleString()}\n• Payment Term: ${frequency === 'weekly' ? '12 Weekly payments' : '3 Monthly payments'}\n• Installment: GHS ${installment.toLocaleString()} / ${frequency === 'weekly' ? 'week' : 'month'}\n\nPlease recommend the best iPhone models matching this plan!`,
    tradeIn: (currentPhone, storage, condition, estimatedCredit, desiredModel) =>
      `Hello iDeal Ghana! 👋\n\nI want to trade in my current device toward an iPhone upgrade:\n\n• Trade-in Phone: ${currentPhone} (${storage})\n• Condition: ${condition}\n• Estimated Credit: GHS ${estimatedCredit.toLocaleString()}\n• Upgrading to: ${desiredModel}\n\nPlease confirm device appraisal at your Osu showroom!`
  }
};
