/**
 * Official Apple iPhone Color Definitions and Design Specifications
 * Provides authentic color swatches, chassis materials, front display styles,
 * and rear camera layouts for interactive physical toggling (Front & Back).
 */

export const MODEL_COLOR_PALETTES = {
  // iPhone 17 Series
  '17-pro': [
    { id: 'natural-ti-17', name: 'Natural Titanium', hex: '#54514d', railHex: '#6d6964', wallpaper: 'linear-gradient(135deg, #1d1b19 0%, #403d39 50%, #201e1c 100%)' },
    { id: 'cosmic-ti-17', name: 'Cosmic Titanium', hex: '#2c2b29', railHex: '#3d3c39', wallpaper: 'linear-gradient(135deg, #0e0d0c 0%, #242220 50%, #11100f 100%)' },
    { id: 'silver-ti-17', name: 'Silver Mirror', hex: '#d9dadb', railHex: '#efeff0', wallpaper: 'linear-gradient(135deg, #22252a 0%, #4a4e57 50%, #282a30 100%)' },
    { id: 'desert-ti-17', name: 'Deep Bronze', hex: '#634e3d', railHex: '#7d644f', wallpaper: 'linear-gradient(135deg, #1f1610 0%, #473527 50%, #201711 100%)' },
  ],
  '17-base': [
    { id: 'ultramarine-17', name: 'Ultramarine Blue', hex: '#3554b0', railHex: '#4566c7', wallpaper: 'linear-gradient(135deg, #0c163b 0%, #274094 50%, #111e4f 100%)' },
    { id: 'lavender-17', name: 'Lavender Purple', hex: '#8b7ca8', railHex: '#a091be', wallpaper: 'linear-gradient(135deg, #1b1427 0%, #46375f 50%, #1e152e 100%)' },
    { id: 'mint-17', name: 'Mint Green', hex: '#7ea894', railHex: '#94bfa9', wallpaper: 'linear-gradient(135deg, #122119 0%, #305441 50%, #15291e 100%)' },
    { id: 'white-17', name: 'Pure White', hex: '#f2f3f5', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #1c2029 0%, #3c4454 50%, #1f2533 100%)' },
    { id: 'black-17', name: 'Space Black', hex: '#212224', railHex: '#303236', wallpaper: 'linear-gradient(135deg, #0a0a0c 0%, #1a1c22 50%, #0d0e12 100%)' },
  ],

  // iPhone 16 Series
  '16-pro': [
    { id: 'desert-ti-16', name: 'Desert Titanium', hex: '#c8b49e', railHex: '#d8c5b0', wallpaper: 'linear-gradient(135deg, #241c14 0%, #524132 50%, #292017 100%)' },
    { id: 'natural-ti-16', name: 'Natural Titanium', hex: '#54514d', railHex: '#6d6964', wallpaper: 'linear-gradient(135deg, #1c1b1a 0%, #3d3b37 50%, #1f1e1d 100%)' },
    { id: 'white-ti-16', name: 'White Titanium', hex: '#e3e4e5', railHex: '#f5f5f6', wallpaper: 'linear-gradient(135deg, #1b1f28 0%, #404657 50%, #202430 100%)' },
    { id: 'black-ti-16', name: 'Black Titanium', hex: '#2a2b2e', railHex: '#3b3d42', wallpaper: 'linear-gradient(135deg, #090a0d 0%, #1c1f26 50%, #0e1014 100%)' },
  ],
  '16-base': [
    { id: 'teal-16', name: 'Teal Green', hex: '#82a898', railHex: '#99bfae', wallpaper: 'linear-gradient(135deg, #10211a 0%, #2f5947 50%, #142921 100%)' },
    { id: 'ultramarine-16', name: 'Ultramarine', hex: '#3b5998', railHex: '#4d6eb3', wallpaper: 'linear-gradient(135deg, #0d1736 0%, #2c4482 50%, #111c42 100%)' },
    { id: 'pink-16', name: 'Vibrant Pink', hex: '#f096a6', railHex: '#ffa8b7', wallpaper: 'linear-gradient(135deg, #2b1017 0%, #632938 50%, #30131b 100%)' },
    { id: 'white-16', name: 'Clean White', hex: '#f0f2f4', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #1c202a 0%, #3b455c 50%, #202636 100%)' },
    { id: 'black-16', name: 'Midnight Black', hex: '#26292b', railHex: '#393c3f', wallpaper: 'linear-gradient(135deg, #0a0b0d 0%, #1c1e22 50%, #0d0f12 100%)' },
  ],

  // iPhone 15 Series
  '15-pro': [
    { id: 'blue-ti-15', name: 'Blue Titanium', hex: '#353d4c', railHex: '#485264', wallpaper: 'linear-gradient(135deg, #0b111d 0%, #26334a 50%, #101726 100%)' },
    { id: 'natural-ti-15', name: 'Natural Titanium', hex: '#8e8a83', railHex: '#a39f97', wallpaper: 'linear-gradient(135deg, #1f1e1a 0%, #424039 50%, #22201d 100%)' },
    { id: 'white-ti-15', name: 'White Titanium', hex: '#e3e4e5', railHex: '#f5f5f6', wallpaper: 'linear-gradient(135deg, #1b202c 0%, #3f475b 50%, #1e2433 100%)' },
    { id: 'black-ti-15', name: 'Black Titanium', hex: '#2f3032', railHex: '#424346', wallpaper: 'linear-gradient(135deg, #090b0e 0%, #1a1e24 50%, #0c0e12 100%)' },
  ],
  '15-base': [
    { id: 'black-15', name: 'Matte Black', hex: '#26292b', railHex: '#393d40', wallpaper: 'linear-gradient(135deg, #0c0d0f 0%, #212429 50%, #0f1013 100%)' },
    { id: 'blue-15', name: 'Pastel Blue', hex: '#cbd8e0', railHex: '#dbe7ee', wallpaper: 'linear-gradient(135deg, #121f2d 0%, #2d455e 50%, #162436 100%)' },
    { id: 'green-15', name: 'Mint Green', hex: '#cadbc8', railHex: '#d8e8d6', wallpaper: 'linear-gradient(135deg, #13241b 0%, #2e543e 50%, #172b21 100%)' },
    { id: 'pink-15', name: 'Blush Pink', hex: '#f4d1d6', railHex: '#fce0e4', wallpaper: 'linear-gradient(135deg, #2d161d 0%, #613442 50%, #301820 100%)' },
    { id: 'yellow-15', name: 'Pale Yellow', hex: '#f4e7b8', railHex: '#fff2c6', wallpaper: 'linear-gradient(135deg, #2b2612 0%, #5e532b 50%, #2d2814 100%)' },
  ],

  // iPhone 14 Series
  '14-pro': [
    { id: 'purple-14-pro', name: 'Deep Purple', hex: '#483e4f', railHex: '#5e5167', wallpaper: 'linear-gradient(135deg, #170f20 0%, #3b2c4c 50%, #1d1329 100%)' },
    { id: 'space-black-14', name: 'Space Black', hex: '#2b2b2d', railHex: '#3c3c3f', wallpaper: 'linear-gradient(135deg, #090a0d 0%, #1b1d22 50%, #0d0e12 100%)' },
    { id: 'gold-14-pro', name: 'Refined Gold', hex: '#fae7cf', railHex: '#f7dcc0', wallpaper: 'linear-gradient(135deg, #261e14 0%, #54432f 50%, #2a2217 100%)' },
    { id: 'silver-14-pro', name: 'Pure Silver', hex: '#ebebe3', railHex: '#f7f7f2', wallpaper: 'linear-gradient(135deg, #161b24 0%, #394254 50%, #1c212c 100%)' },
  ],
  '14-base': [
    { id: 'midnight-14', name: 'Midnight', hex: '#1f2024', railHex: '#2d2f35', wallpaper: 'linear-gradient(135deg, #0b0d13 0%, #1e2330 50%, #0f121a 100%)' },
    { id: 'starlight-14', name: 'Starlight', hex: '#faf6f2', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #211e1a 0%, #474139 50%, #25221d 100%)' },
    { id: 'blue-14', name: 'Sky Blue', hex: '#a0b4c7', railHex: '#b5c8db', wallpaper: 'linear-gradient(135deg, #111e2d 0%, #294769 50%, #152436 100%)' },
    { id: 'purple-14', name: 'Lilac Purple', hex: '#e5ddea', railHex: '#f1ebf5', wallpaper: 'linear-gradient(135deg, #1e1526 0%, #463457 50%, #21182b 100%)' },
    { id: 'red-14', name: '(PRODUCT)RED', hex: '#e11c2a', railHex: '#f03744', wallpaper: 'linear-gradient(135deg, #2e090d 0%, #6b181f 50%, #330b0e 100%)' },
  ],

  // iPhone 13 Series
  '13-pro': [
    { id: 'sierra-blue-13', name: 'Sierra Blue', hex: '#9bb5ce', railHex: '#b1cae1', wallpaper: 'linear-gradient(135deg, #132233 0%, #2b4b6f 50%, #162638 100%)' },
    { id: 'alpine-green-13', name: 'Alpine Green', hex: '#576856', railHex: '#6c806b', wallpaper: 'linear-gradient(135deg, #111a12 0%, #2e4430 50%, #152016 100%)' },
    { id: 'graphite-13-pro', name: 'Graphite', hex: '#54524f', railHex: '#696763', wallpaper: 'linear-gradient(135deg, #151515 0%, #30302f 50%, #181818 100%)' },
    { id: 'gold-13-pro', name: 'Polished Gold', hex: '#fae7cf', railHex: '#fad9b8', wallpaper: 'linear-gradient(135deg, #241c13 0%, #523f2b 50%, #282016 100%)' },
    { id: 'silver-13-pro', name: 'Silver White', hex: '#ebebe3', railHex: '#fafaf6', wallpaper: 'linear-gradient(135deg, #171c26 0%, #394254 50%, #1a202b 100%)' },
  ],
  '13-base': [
    { id: 'midnight-13', name: 'Midnight', hex: '#1a2228', railHex: '#27323b', wallpaper: 'linear-gradient(135deg, #091014 0%, #1b2832 50%, #0d151a 100%)' },
    { id: 'starlight-13', name: 'Starlight', hex: '#faf6f2', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #221e1a 0%, #453e37 50%, #24201c 100%)' },
    { id: 'pink-13', name: 'Soft Pink', hex: '#faddd7', railHex: '#feede8', wallpaper: 'linear-gradient(135deg, #2d181c 0%, #5e353c 50%, #301a1e 100%)' },
    { id: 'blue-13', name: 'Deep Blue', hex: '#275a7c', railHex: '#35739c', wallpaper: 'linear-gradient(135deg, #0b1c2b 0%, #1f4769 50%, #0e2233 100%)' },
    { id: 'green-13', name: 'Rich Green', hex: '#3b5249', railHex: '#4d695e', wallpaper: 'linear-gradient(135deg, #0e1a14 0%, #243f33 50%, #122119 100%)' },
  ],

  // iPhone 12 Series
  '12-pro': [
    { id: 'pacific-blue-12', name: 'Pacific Blue', hex: '#2d4856', railHex: '#3a5d6e', wallpaper: 'linear-gradient(135deg, #0c1820 0%, #203c4c 50%, #0e1d26 100%)' },
    { id: 'graphite-12-pro', name: 'Graphite', hex: '#54524f', railHex: '#696763', wallpaper: 'linear-gradient(135deg, #131415 0%, #2f3032 50%, #171819 100%)' },
    { id: 'gold-12-pro', name: 'Glossy Gold', hex: '#fae7cf', railHex: '#ffdca8', wallpaper: 'linear-gradient(135deg, #261d12 0%, #574127 50%, #2b2114 100%)' },
    { id: 'silver-12-pro', name: 'Silver Chrome', hex: '#ebebe3', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #141822 0%, #333d52 50%, #171c26 100%)' },
  ],
  '12-base': [
    { id: 'blue-12', name: 'Cobalt Blue', hex: '#23415c', railHex: '#2e5475', wallpaper: 'linear-gradient(135deg, #0b1724 0%, #1d3954 50%, #0d1c2b 100%)' },
    { id: 'black-12', name: 'Jet Black', hex: '#1f2020', railHex: '#2f3131', wallpaper: 'linear-gradient(135deg, #0a0a0b 0%, #1c1d1e 50%, #0c0d0e 100%)' },
    { id: 'white-12', name: 'Pure White', hex: '#f9f6ef', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #1d2026 0%, #3e4452 50%, #20232b 100%)' },
    { id: 'green-12', name: 'Pistachio Green', hex: '#dbe8dc', railHex: '#eaf4eb', wallpaper: 'linear-gradient(135deg, #122116 0%, #2d4c35 50%, #15271a 100%)' },
    { id: 'purple-12', name: 'Purple Dream', hex: '#b9b4d8', railHex: '#cbc7e8', wallpaper: 'linear-gradient(135deg, #1b1629 0%, #3d325c 50%, #1e192e 100%)' },
  ],

  // iPhone 11 Series
  '11-pro': [
    { id: 'midnight-green-11', name: 'Midnight Green', hex: '#4e5851', railHex: '#606c64', wallpaper: 'linear-gradient(135deg, #101612 0%, #2b3a30 50%, #131a15 100%)' },
    { id: 'space-gray-11-pro', name: 'Space Gray', hex: '#4c4a46', railHex: '#5e5c57', wallpaper: 'linear-gradient(135deg, #131211 0%, #2d2c29 50%, #171514 100%)' },
    { id: 'silver-11-pro', name: 'Silver Matte', hex: '#ebebe3', railHex: '#f7f7f2', wallpaper: 'linear-gradient(135deg, #151a24 0%, #363e4f 50%, #181d28 100%)' },
    { id: 'gold-11-pro', name: 'Soft Gold', hex: '#fad7bd', railHex: '#ffe2ca', wallpaper: 'linear-gradient(135deg, #261912 0%, #573c2a 50%, #2b1d14 100%)' },
  ],
  '11-base': [
    { id: 'purple-11', name: 'Pastel Purple', hex: '#d1cdde', railHex: '#e0dcee', wallpaper: 'linear-gradient(135deg, #1d1829 0%, #443761 50%, #201b2e 100%)' },
    { id: 'green-11', name: 'Mint Green', hex: '#d8e8dc', railHex: '#e7f5eb', wallpaper: 'linear-gradient(135deg, #132418 0%, #2e5238 50%, #16291b 100%)' },
    { id: 'yellow-11', name: 'Butter Yellow', hex: '#ffe681', railHex: '#ffed9d', wallpaper: 'linear-gradient(135deg, #2b240c 0%, #594b1a 50%, #2e260e 100%)' },
    { id: 'black-11', name: 'Classic Black', hex: '#1f2020', railHex: '#303232', wallpaper: 'linear-gradient(135deg, #090a0b 0%, #1a1c1d 50%, #0c0d0e 100%)' },
    { id: 'white-11', name: 'Cloud White', hex: '#f9f6ef', railHex: '#ffffff', wallpaper: 'linear-gradient(135deg, #1a1e28 0%, #3b4357 50%, #1e222e 100%)' },
    { id: 'red-11', name: '(PRODUCT)RED', hex: '#ba0c2e', railHex: '#d81b40', wallpaper: 'linear-gradient(135deg, #29080e 0%, #5e1422 50%, #2e0910 100%)' },
  ],
};

/**
 * Returns the color palette list for a given phone
 */
export function getPhoneColorOptions(phone) {
  if (!phone) return [];
  const series = String(phone.series || '15');
  const isPro = /pro/i.test(phone.name || phone.id || '');

  const key = `${series}-${isPro ? 'pro' : 'base'}`;
  const palette = MODEL_COLOR_PALETTES[key];
  if (palette && palette.length > 0) {
    return palette;
  }

  // Fallback if not found: provide at least phone's original color + 3 complementary shades
  return [
    { id: 'default', name: phone.color || 'Standard', hex: phone.colorHex || '#2a2b2e', railHex: '#4a4d52', wallpaper: 'linear-gradient(135deg, #0e1218 0%, #263345 50%, #121720 100%)' },
    { id: 'silver', name: 'Silver / White', hex: '#e3e4e5', railHex: '#f5f5f6', wallpaper: 'linear-gradient(135deg, #1c202a 0%, #3e475c 50%, #202532 100%)' },
    { id: 'black', name: 'Deep Black', hex: '#1a1a1c', railHex: '#2b2c30', wallpaper: 'linear-gradient(135deg, #0a0b0d 0%, #1a1c22 50%, #0d0f12 100%)' },
  ];
}

/**
 * Returns physical chassis details: camera style, notch/island style, side buttons
 */
export function getPhoneDesign(phone) {
  if (!phone) return { hasIsland: true, hasNotch: false, cameraLayout: 'triple' };
  const name = (phone.name || '').toLowerCase();
  const series = parseInt(phone.series, 10) || 15;

  const isPro = name.includes('pro');
  const hasIsland = (series >= 15) || (series === 14 && isPro);
  const hasNotch = !hasIsland;

  let cameraLayout = 'triple';
  if (isPro) {
    cameraLayout = 'triple';
  } else if (series === 16 || series === 17) {
    cameraLayout = 'vertical-pill';
  } else if (series >= 13) {
    cameraLayout = 'diagonal';
  } else {
    cameraLayout = 'vertical';
  }

  return {
    isPro,
    hasIsland,
    hasNotch,
    cameraLayout,
    hasActionBtn: series >= 16 || (series === 15 && isPro),
    hasCameraControl: series >= 16,
    frameMaterial: isPro && series >= 15 ? 'Grade 5 Titanium' : 'Aerospace Aluminum',
  };
}
