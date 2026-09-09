/**
 * Paindem Smart Cells - Full iPhone Catalog (Updated from Official Paindem PSC Installment Plan)
 * Complete 38 models from iPhone 11 (64GB) through iPhone 17 Pro Max (256GB SIM).
 * 40% Down Payment, 12 Weeks Weekly, 3 Months Monthly, plus Daily MoMo.
 */

const RAW_IPHONES = [
  // ---------------- iPhone 17 Series ----------------
  {
    id: "iphone-17-pro-max-256gb-sim",
    name: "iPhone 17 Pro Max (SIM)",
    series: "17",
    tag: "Next-Gen Flagship",
    condition: "Brand New (Factory Sealed)",
    isNew: true,
    storage: "256GB",
    price: 16500,
    depositPercent: 40,
    weekly: 1237.5,
    monthly: 5280,
    daily: 177,
    color: "Natural Titanium",
    colorHex: "#54514d",
    battery: "100% Brand New Sealed",
    screen: "6.9\" Super Retina 120Hz",
    shortNote: "Next-gen flagship with physical SIM + eSIM. Factory sealed box with 1-Year Apple warranty.",
    image: "/phones/iphone-17-pro-max.png"
  },
  {
    id: "iphone-17-pro-256gb-sim",
    name: "iPhone 17 Pro (SIM)",
    series: "17",
    tag: "Next-Gen Pro",
    condition: "Brand New (Factory Sealed)",
    isNew: true,
    storage: "256GB",
    price: 15000,
    depositPercent: 40,
    weekly: 1125,
    monthly: 4800,
    daily: 161,
    color: "Cosmic Titanium",
    colorHex: "#44413c",
    battery: "100% Brand New Sealed",
    screen: "6.3\" Super Retina 120Hz",
    shortNote: "Pro power in compact chassis with physical SIM. Sealed in box with full warranty.",
    image: "/phones/iphone-17-pro.png"
  },
  {
    id: "iphone-17-256gb",
    name: "iPhone 17",
    series: "17",
    tag: "Latest Standard",
    condition: "Brand New (Factory Sealed)",
    isNew: true,
    storage: "256GB",
    price: 11000,
    depositPercent: 40,
    weekly: 825,
    monthly: 3520,
    daily: 118,
    color: "Ultramarine Blue",
    colorHex: "#3554b0",
    battery: "100% Brand New Sealed",
    screen: "6.2\" OLED 120Hz",
    shortNote: "Stunning ultramarine finish, fast A19 chip, all-day battery life, factory sealed.",
    image: "/phones/iphone-17.png"
  },

  // ---------------- iPhone 16 Series ----------------
  {
    id: "iphone-16-pro-max-256gb",
    name: "iPhone 16 Pro Max",
    series: "16",
    tag: "Titanium Powerhouse",
    condition: "Brand New (Factory Sealed)",
    isNew: true,
    storage: "256GB",
    price: 11500,
    depositPercent: 40,
    weekly: 862.5,
    monthly: 3680,
    daily: 124,
    color: "Desert Titanium",
    colorHex: "#c8b49e",
    battery: "100% Brand New",
    screen: "6.9\" ProMotion 120Hz",
    shortNote: "Grade 5 Titanium, 5x optical tetraprism camera, Camera Control button, full box.",
    image: "/phones/iphone-16-pro-max.png"
  },
  {
    id: "iphone-16-pro-256gb",
    name: "iPhone 16 Pro (256GB)",
    series: "16",
    tag: "Pro Compact",
    condition: "Brand New (Factory Sealed)",
    isNew: true,
    storage: "256GB",
    price: 10500,
    depositPercent: 40,
    weekly: 787.5,
    monthly: 3360,
    daily: 113,
    color: "Black Titanium",
    colorHex: "#2a2b2e",
    battery: "100% Brand New",
    screen: "6.3\" ProMotion 120Hz",
    shortNote: "4K 120fps Dolby Vision, Action button, A18 Pro chip, studio-quality microphones.",
    image: "/phones/iphone-16-pro.png"
  },
  {
    id: "iphone-16-pro-128gb",
    name: "iPhone 16 Pro (128GB)",
    series: "16",
    tag: "Pro Compact",
    condition: "Brand New (Factory Sealed)",
    isNew: true,
    storage: "128GB",
    price: 10000,
    depositPercent: 40,
    weekly: 750,
    monthly: 3200,
    daily: 108,
    color: "Natural Titanium",
    colorHex: "#54514d",
    battery: "100% Brand New",
    screen: "6.3\" ProMotion 120Hz",
    shortNote: "Pro power with 128GB storage. Triple lens studio cameras and titanium frame.",
    image: "/phones/iphone-16-pro.png"
  },
  {
    id: "iphone-16-plus-256gb",
    name: "iPhone 16 Plus (256GB)",
    series: "16",
    tag: "Big Screen Hero",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 9500,
    depositPercent: 40,
    weekly: 712.5,
    monthly: 3040,
    daily: 102,
    color: "Teal Green",
    colorHex: "#82a898",
    battery: "98% Original Battery",
    screen: "6.7\" Super Retina",
    shortNote: "Gigantic 6.7\" display with legendary 2-day battery endurance and Camera Control.",
    image: "/phones/iphone-16.png"
  },
  {
    id: "iphone-16-plus-128gb",
    name: "iPhone 16 Plus (128GB)",
    series: "16",
    tag: "Big Screen Hero",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 8800,
    depositPercent: 40,
    weekly: 660,
    monthly: 2816,
    daily: 95,
    color: "Pink / Black",
    colorHex: "#2b2b2b",
    battery: "96% Original Battery",
    screen: "6.7\" Super Retina",
    shortNote: "Large screen iPhone 16 experience with huge battery life and Apple Intelligence.",
    image: "/phones/iphone-16.png"
  },
  {
    id: "iphone-16-256gb",
    name: "iPhone 16 (256GB)",
    series: "16",
    tag: "Modern All-Rounder",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 8500,
    depositPercent: 40,
    weekly: 637.5,
    monthly: 2720,
    daily: 92,
    color: "Ultramarine",
    colorHex: "#3b5998",
    battery: "97% Original Battery",
    screen: "6.1\" Super Retina",
    shortNote: "Double storage 256GB. Action button, 48MP fusion camera, and macro photography.",
    image: "/phones/iphone-16.png"
  },
  {
    id: "iphone-16-128gb",
    name: "iPhone 16 (128GB)",
    series: "16",
    tag: "Modern All-Rounder",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 7700,
    depositPercent: 40,
    weekly: 577.5,
    monthly: 2464,
    daily: 83,
    color: "Teal Green",
    colorHex: "#82a898",
    battery: "95% Original Battery",
    screen: "6.1\" Super Retina",
    shortNote: "Camera Control button, Dynamic Island, fast A18 chip, pristine condition.",
    image: "/phones/iphone-16.png"
  },

  // ---------------- iPhone 15 Series ----------------
  {
    id: "iphone-15-pro-max-256gb",
    name: "iPhone 15 Pro Max",
    series: "15",
    tag: "Titanium Legend",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 9000,
    depositPercent: 40,
    weekly: 675,
    monthly: 2880,
    daily: 97,
    color: "Blue Titanium",
    colorHex: "#353d4c",
    battery: "91% Original Battery",
    screen: "6.7\" ProMotion 120Hz",
    shortNote: "Aerospace Titanium, 5x optical zoom, USB-C port, Dynamic Island, zero blemishes.",
    image: "/phones/iphone-15-pro-max.png"
  },
  {
    id: "iphone-15-128gb",
    name: "iPhone 15",
    series: "15",
    tag: "Accra Best Value",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 6200,
    depositPercent: 40,
    weekly: 465,
    monthly: 1984,
    daily: 67,
    color: "Matte Black",
    colorHex: "#26292b",
    battery: "92% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "48MP main camera, Dynamic Island, USB-C connector, color-infused back glass.",
    image: "/phones/iphone-15.png"
  },

  // ---------------- iPhone 14 Series ----------------
  {
    id: "iphone-14-pro-max-256gb",
    name: "iPhone 14 Pro Max (256GB)",
    series: "14",
    tag: "High Demand",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 7800,
    depositPercent: 40,
    weekly: 585,
    monthly: 2496,
    daily: 84,
    color: "Deep Purple",
    colorHex: "#433a4c",
    battery: "90% Original Battery",
    screen: "6.7\" 120Hz Display",
    shortNote: "Dynamic Island, 48MP Pro camera, stainless steel edges with generous 256GB storage.",
    image: "/phones/iphone-14-pro-max.png"
  },
  {
    id: "iphone-14-pro-max-128gb",
    name: "iPhone 14 Pro Max (128GB)",
    series: "14",
    tag: "High Demand",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 7200,
    depositPercent: 40,
    weekly: 540,
    monthly: 2304,
    daily: 78,
    color: "Space Black",
    colorHex: "#2b2b2b",
    battery: "89% Original Battery",
    screen: "6.7\" 120Hz Display",
    shortNote: "Big 6.7\" 120Hz screen, Dynamic Island, 2-day battery, stainless steel frame.",
    image: "/phones/iphone-14-pro-max.png"
  },
  {
    id: "iphone-14-pro-256gb",
    name: "iPhone 14 Pro (256GB)",
    series: "14",
    tag: "Executive Pro",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 6600,
    depositPercent: 40,
    weekly: 495,
    monthly: 2112,
    daily: 71,
    color: "Space Black",
    colorHex: "#2b2b2b",
    battery: "91% Original Battery",
    screen: "6.1\" 120Hz Display",
    shortNote: "Always-On display, 48MP camera, 256GB storage for large video files and apps.",
    image: "/phones/iphone-14-pro.png"
  },
  {
    id: "iphone-14-pro-128gb",
    name: "iPhone 14 Pro (128GB)",
    series: "14",
    tag: "Executive Pro",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 6200,
    depositPercent: 40,
    weekly: 465,
    monthly: 1984,
    daily: 67,
    color: "Deep Purple",
    colorHex: "#433a4c",
    battery: "90% Original Battery",
    screen: "6.1\" 120Hz Display",
    shortNote: "Compact Pro device with Dynamic Island and studio-quality 4K cinema mode.",
    image: "/phones/iphone-14-pro.png"
  },
  {
    id: "iphone-14-plus-128gb",
    name: "iPhone 14 Plus",
    series: "14",
    tag: "Battery King",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 5200,
    depositPercent: 40,
    weekly: 390,
    monthly: 1664,
    daily: 56,
    color: "Midnight Blue",
    colorHex: "#242c38",
    battery: "92% Original Battery",
    screen: "6.7\" OLED Display",
    shortNote: "Large 6.7\" screen with the best battery life in the 14 lineup. Clean UK import.",
    image: "/phones/iphone-14.png"
  },
  {
    id: "iphone-14-128gb",
    name: "iPhone 14",
    series: "14",
    tag: "Modern Standard",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 4500,
    depositPercent: 40,
    weekly: 337.5,
    monthly: 1440,
    daily: 49,
    color: "Midnight Blue",
    colorHex: "#242c38",
    battery: "93% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Crash detection, photonic engine camera system, fast A15 chip with 5-core GPU.",
    image: "/phones/iphone-14.png"
  },

  // ---------------- iPhone 13 Series ----------------
  {
    id: "iphone-13-pro-max-256gb",
    name: "iPhone 13 Pro Max (256GB)",
    series: "13",
    tag: "Accra Best Seller",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 5800,
    depositPercent: 40,
    weekly: 435,
    monthly: 1856,
    daily: 63,
    color: "Sierra Blue",
    colorHex: "#9bb5ce",
    battery: "88% Original Battery",
    screen: "6.7\" 120Hz OLED",
    shortNote: "Legendary 2-day battery life, 120Hz ProMotion screen, macro mode, 256GB storage.",
    image: "/phones/iphone-13-pro-max.png"
  },
  {
    id: "iphone-13-pro-max-128gb",
    name: "iPhone 13 Pro Max (128GB)",
    series: "13",
    tag: "Accra Best Seller",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 5400,
    depositPercent: 40,
    weekly: 405,
    monthly: 1728,
    daily: 58,
    color: "Graphite Gray",
    colorHex: "#3c3d40",
    battery: "87% Original Battery",
    screen: "6.7\" 120Hz OLED",
    shortNote: "Renowned reliability, smooth 120Hz scrolling, stainless steel body, 6-month warranty.",
    image: "/phones/iphone-13-pro-max.png"
  },
  {
    id: "iphone-13-pro-256gb",
    name: "iPhone 13 Pro (256GB)",
    series: "13",
    tag: "Pocket Cinema",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 5200,
    depositPercent: 40,
    weekly: 390,
    monthly: 1664,
    daily: 56,
    color: "Sierra Blue",
    colorHex: "#9bb5ce",
    battery: "89% Original Battery",
    screen: "6.1\" 120Hz OLED",
    shortNote: "Triple lens with 3x optical zoom, 4K Cinematic video recording, 256GB capacity.",
    image: "/phones/iphone-13-pro.png"
  },
  {
    id: "iphone-13-pro-128gb",
    name: "iPhone 13 Pro (128GB)",
    series: "13",
    tag: "Pocket Cinema",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 4900,
    depositPercent: 40,
    weekly: 367.5,
    monthly: 1568,
    daily: 53,
    color: "Graphite",
    colorHex: "#3c3d40",
    battery: "90% Original Battery",
    screen: "6.1\" 120Hz OLED",
    shortNote: "ProMotion 120Hz, macro camera, stainless steel frame, 100% original Apple parts.",
    image: "/phones/iphone-13-pro.png"
  },
  {
    id: "iphone-13-256gb",
    name: "iPhone 13 (256GB)",
    series: "13",
    tag: "Top Reliable",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 4200,
    depositPercent: 40,
    weekly: 315,
    monthly: 1344,
    daily: 45,
    color: "Starlight White",
    colorHex: "#f0ece4",
    battery: "91% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Diagonal dual cameras, cinematic video mode, fast A15 Bionic chip, 256GB space.",
    image: "/phones/iphone-13.png"
  },
  {
    id: "iphone-13-128gb",
    name: "iPhone 13 (128GB)",
    series: "13",
    tag: "Top Reliable",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 3900,
    depositPercent: 40,
    weekly: 292.5,
    monthly: 1248,
    daily: 42,
    color: "Midnight Black",
    colorHex: "#1f2329",
    battery: "89% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Ghana favorite. Beautiful cameras, strong battery, reliable iOS updates for years.",
    image: "/phones/iphone-13.png"
  },

  // ---------------- iPhone 12 Series ----------------
  {
    id: "iphone-12-pro-max-256gb",
    name: "iPhone 12 Pro Max (256GB)",
    series: "12",
    tag: "Big Pro Luxury",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 4800,
    depositPercent: 40,
    weekly: 360,
    monthly: 1536,
    daily: 52,
    color: "Pacific Blue",
    colorHex: "#2c3e50",
    battery: "87% Original Battery",
    screen: "6.7\" OLED Display",
    shortNote: "Big screen, triple camera with LiDAR scanner, flat surgical steel edges, 256GB.",
    image: "/phones/iphone-12-pro-max.png"
  },
  {
    id: "iphone-12-pro-max-128gb",
    name: "iPhone 12 Pro Max (128GB)",
    series: "12",
    tag: "Big Pro Luxury",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 4400,
    depositPercent: 40,
    weekly: 330,
    monthly: 1408,
    daily: 48,
    color: "Graphite",
    colorHex: "#3c3d40",
    battery: "86% Original Battery",
    screen: "6.7\" OLED Display",
    shortNote: "Huge 6.7\" Super Retina XDR, triple 12MP cameras with sensor-shift OIS, pristine frame.",
    image: "/phones/iphone-12-pro-max.png"
  },
  {
    id: "iphone-12-pro-256gb",
    name: "iPhone 12 Pro (256GB)",
    series: "12",
    tag: "Premium Compact",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 3900,
    depositPercent: 40,
    weekly: 292.5,
    monthly: 1248,
    daily: 42,
    color: "Pacific Blue",
    colorHex: "#2c3e50",
    battery: "88% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Sleek stainless steel design, Dolby Vision HDR recording, 256GB storage capacity.",
    image: "/phones/iphone-12-pro-max.png"
  },
  {
    id: "iphone-12-pro-128gb",
    name: "iPhone 12 Pro (128GB)",
    series: "12",
    tag: "Premium Compact",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 3700,
    depositPercent: 40,
    weekly: 277.5,
    monthly: 1184,
    daily: 40,
    color: "Silver / Graphite",
    colorHex: "#4a4c50",
    battery: "87% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Triple camera system, LiDAR, MagSafe support, premium surgical steel chassis.",
    image: "/phones/iphone-12-pro-max.png"
  },
  {
    id: "iphone-12-128gb",
    name: "iPhone 12 (128GB)",
    series: "12",
    tag: "Budget 5G King",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 3100,
    depositPercent: 40,
    weekly: 232.5,
    monthly: 930,
    daily: 34,
    color: "Ocean Blue",
    colorHex: "#223c52",
    battery: "88% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Vibrant OLED screen, Ceramic Shield front, MagSafe wireless charging, 128GB space.",
    image: "/phones/iphone-12.png"
  },
  {
    id: "iphone-12-64gb",
    name: "iPhone 12 (64GB)",
    series: "12",
    tag: "Budget 5G King",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "64GB",
    price: 2900,
    depositPercent: 40,
    weekly: 217.5,
    monthly: 928,
    daily: 32,
    color: "Midnight Black",
    colorHex: "#1b1e23",
    battery: "87% Original Battery",
    screen: "6.1\" OLED Display",
    shortNote: "Fast 5G speeds, modern flat-edge Apple styling, dual 12MP cameras with Night Mode.",
    image: "/phones/iphone-12.png"
  },

  // ---------------- iPhone 11 Series ----------------
  {
    id: "iphone-11-pro-max-512gb",
    name: "iPhone 11 Pro Max (512GB)",
    series: "11",
    tag: "Maximum Storage",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "512GB",
    price: 3700,
    depositPercent: 40,
    weekly: 277.5,
    monthly: 1184,
    daily: 40,
    color: "Midnight Green",
    colorHex: "#35443c",
    battery: "86% Original Battery",
    screen: "6.5\" Super Retina",
    shortNote: "Massive 512GB storage. Frosted matte glass, 3 cameras, phenomenal battery life.",
    image: "/phones/iphone-11-pro-max.png"
  },
  {
    id: "iphone-11-pro-max-256gb",
    name: "iPhone 11 Pro Max (256GB)",
    series: "11",
    tag: "Popular Classic",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 3500,
    depositPercent: 40,
    weekly: 262.5,
    monthly: 1120,
    daily: 38,
    color: "Space Gray",
    colorHex: "#3e3f42",
    battery: "87% Original Battery",
    screen: "6.5\" Super Retina",
    shortNote: "Accra favorite. Frosted matte glass, 3 cameras, 6.5-inch OLED, solid all-day power.",
    image: "/phones/iphone-11-pro-max.png"
  },
  {
    id: "iphone-11-pro-max-64gb",
    name: "iPhone 11 Pro Max (64GB)",
    series: "11",
    tag: "Popular Classic",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "64GB",
    price: 3000,
    depositPercent: 40,
    weekly: 225,
    monthly: 960,
    daily: 33,
    color: "Gold / Silver",
    colorHex: "#d4af37",
    battery: "86% Original Battery",
    screen: "6.5\" Super Retina",
    shortNote: "Entry-level price for a 3-camera Pro Max iPhone with OLED display and stainless steel.",
    image: "/phones/iphone-11-pro-max.png"
  },
  {
    id: "iphone-11-pro-512gb",
    name: "iPhone 11 Pro (512GB)",
    series: "11",
    tag: "Pro Compact",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "512GB",
    price: 3400,
    depositPercent: 40,
    weekly: 255,
    monthly: 1088,
    daily: 37,
    color: "Midnight Green",
    colorHex: "#35443c",
    battery: "87% Original Battery",
    screen: "5.8\" Super Retina",
    shortNote: "Compact 5.8\" OLED with colossal 512GB storage. Three lenses with 4K recording.",
    image: "/phones/iphone-11-pro-max.png"
  },
  {
    id: "iphone-11-pro-256gb",
    name: "iPhone 11 Pro (256GB)",
    series: "11",
    tag: "Pro Compact",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "256GB",
    price: 3100,
    depositPercent: 40,
    weekly: 232.5,
    monthly: 992,
    daily: 34,
    color: "Space Gray",
    colorHex: "#3e3f42",
    battery: "88% Original Battery",
    screen: "5.8\" Super Retina",
    shortNote: "Handy one-handed size with 256GB storage and triple cameras. Clean UK unit.",
    image: "/phones/iphone-11-pro-max.png"
  },
  {
    id: "iphone-11-pro-64gb",
    name: "iPhone 11 Pro (64GB)",
    series: "11",
    tag: "Pro Compact",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "64GB",
    price: 2900,
    depositPercent: 40,
    weekly: 217.5,
    monthly: 928,
    daily: 32,
    color: "Midnight Green",
    colorHex: "#35443c",
    battery: "87% Original Battery",
    screen: "5.8\" Super Retina",
    shortNote: "Affordable triple camera iPhone with OLED display, matte glass, and Night Mode.",
    image: "/phones/iphone-11-pro-max.png"
  },
  {
    id: "iphone-11-128gb",
    name: "iPhone 11 (128GB)",
    series: "11",
    tag: "Most Affordable",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "128GB",
    price: 2700,
    depositPercent: 40,
    weekly: 202.5,
    monthly: 864,
    daily: 29,
    color: "Black / Purple",
    colorHex: "#22252a",
    battery: "88% Original Battery",
    screen: "6.1\" Liquid Retina",
    shortNote: "Our #1 entry-level seller. 128GB storage, dual 12MP cameras, ultra-wide lens.",
    image: "/phones/iphone-11.png"
  },
  {
    id: "iphone-11-64gb",
    name: "iPhone 11 (64GB)",
    series: "11",
    tag: "Most Affordable",
    condition: "Clean UK Used (Grade A+)",
    isNew: false,
    storage: "64GB",
    price: 2400,
    depositPercent: 40,
    weekly: 180,
    monthly: 768,
    daily: 26,
    color: "Black",
    colorHex: "#1f2227",
    battery: "87% Original Battery",
    screen: "6.1\" Liquid Retina",
    shortNote: "Lowest deposit in store (GH₵ 960). Great starter iPhone for students and daily work.",
    image: "/phones/iphone-11.png"
  }
];

/**
 * Cedi formatting. Bare toLocaleString() follows the *visitor's* browser locale, so a phone
 * set to German renders "2.480" instead of "2,480". Pin it to Ghana.
 */
const GHS = new Intl.NumberFormat('en-GH', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatGHS(amount) {
  return `GH₵ ${GHS.format(Math.round(amount || 0))}`;
}

/** Same, but keeps pesewas when the amount isn't whole (weekly figures like 1237.5). */
export function formatGHSExact(amount) {
  const n = Number(amount) || 0;
  const isWhole = Math.abs(n - Math.round(n)) < 0.005;
  return isWhole
    ? formatGHS(n)
    : `GH₵ ${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Derived catalog fields. Kept as a mapping pass rather than 38 hand-edits so the source
 * entries stay easy to update from the shop's price sheet.
 *  • family  — name minus the "(128GB)" / "(SIM)" suffix, so storage variants group together
 *  • slug    — the id, used for /iphone/:slug routes
 *  • images  — array form (single render path even once we shoot more angles)
 *  • inStock — placeholder until the shop gives us real counts; see plan "Stock/urgency"
 */
export const IPHONES = RAW_IPHONES.map(phone => ({
  ...phone,
  slug: phone.id,
  family: phone.name.replace(/\s*\([^)]*\)\s*$/, '').trim(),
  images: [phone.image],
  colors: phone.color.split('/').map(c => c.trim()).filter(Boolean),
  inStock: null
}));

/** All storage/variant siblings of a phone, cheapest first. */
export function getVariants(phone) {
  if (!phone) return [];
  return IPHONES
    .filter(p => p.family === phone.family)
    .sort((a, b) => a.price - b.price);
}

/** Find one phone by its slug/id. */
export function getPhoneBySlug(slug) {
  return IPHONES.find(p => p.slug === slug) || null;
}

/**
 * Related models for the product page rail: same series first, then nearest price.
 */
export function getRelatedPhones(phone, limit = 4) {
  if (!phone) return [];
  return IPHONES
    .filter(p => p.family !== phone.family)
    .sort((a, b) => {
      const seriesA = a.series === phone.series ? 0 : 1;
      const seriesB = b.series === phone.series ? 0 : 1;
      if (seriesA !== seriesB) return seriesA - seriesB;
      return Math.abs(a.price - phone.price) - Math.abs(b.price - phone.price);
    })
    .slice(0, limit);
}

export const TRADE_IN_DEVICES = [
  { model: "iPhone 15 Pro Max", baseVal: 7500 },
  { model: "iPhone 15", baseVal: 5000 },
  { model: "iPhone 14 Pro Max", baseVal: 5800 },
  { model: "iPhone 14 Pro", baseVal: 4800 },
  { model: "iPhone 14", baseVal: 3500 },
  { model: "iPhone 13 Pro Max", baseVal: 4200 },
  { model: "iPhone 13 Pro", baseVal: 3600 },
  { model: "iPhone 13", baseVal: 2800 },
  { model: "iPhone 12 Pro Max", baseVal: 3200 },
  { model: "iPhone 12", baseVal: 2100 },
  { model: "iPhone 11 Pro Max", baseVal: 2200 },
  { model: "iPhone 11", baseVal: 1600 },
  { model: "iPhone XR / XS", baseVal: 1100 },
  { model: "Samsung S23 / S22 Series", baseVal: 2400 }
];

/**
 * Flexible Payment Math following official Paindem PSC Installment Formula:
 * - Down Payment (40%) = Price * 0.40
 * - Weekly (12 Weeks) = Price * 0.075
 * - Monthly (3 Months) = Price * 0.32
 * - Daily (84 Days) = Weekly / 7
 */
export function calculateInstallment(price, depositPercent = 40, frequency = "weekly") {
  const deposit = Math.round(price * (depositPercent / 100));
  const balance = Math.max(0, price - deposit);
  
  // Official Paindem PSC rates
  const weekly = Math.round(price * 0.075 * 10) / 10;
  const monthly = Math.round(price * 0.32);
  const daily = Math.ceil(weekly / 7);

  let installment = weekly;
  let periodLabel = "/ wk (12 wks)";
  let periods = 12;

  if (frequency === "daily") {
    installment = daily;
    periodLabel = "/ day (84 days)";
    periods = 84;
  } else if (frequency === "monthly") {
    installment = monthly;
    periodLabel = "/ mo (3 mos)";
    periods = 3;
  }

  // What the customer actually pays over the life of the agreement. The cash price and the
  // hire-purchase price are different numbers, and the Hire Purchase Act 1974 (NRCD 292)
  // requires the total to be disclosed — so every surface that shows an installment
  // must be able to show this too.
  const instalmentsTotal = Math.round(installment * periods);
  const totalPayable = deposit + instalmentsTotal;
  const creditCharge = Math.max(0, totalPayable - price);

  return {
    price,
    depositPercent,
    deposit,
    balance,
    installment,
    periodLabel,
    frequency,
    periods,
    instalmentsTotal,
    totalPayable,
    creditCharge,
    daily,
    weekly,
    monthly
  };
}

/**
 * Dated repayment schedule. Turns the plan into rows a customer can actually hold:
 * "Mon 15 Sep — GH₵ 465".
 */
export function buildSchedule(plan, startDate = new Date()) {
  const rows = [];
  const start = new Date(startDate);
  const stepDays = plan.frequency === 'daily' ? 1 : plan.frequency === 'weekly' ? 7 : 0;

  for (let i = 0; i < plan.periods; i++) {
    const due = new Date(start);
    if (plan.frequency === 'monthly') {
      due.setMonth(due.getMonth() + i + 1);
    } else {
      due.setDate(due.getDate() + stepDays * (i + 1));
    }
    rows.push({
      index: i + 1,
      date: due,
      amount: plan.installment,
      remaining: Math.max(0, Math.round(plan.instalmentsTotal - plan.installment * (i + 1)))
    });
  }
  return rows;
}

export function formatScheduleDate(date) {
  return date.toLocaleDateString('en-GH', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
