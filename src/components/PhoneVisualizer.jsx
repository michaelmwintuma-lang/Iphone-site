import React, { useState, useEffect } from 'react';
import { getPhoneColorOptions, getPhoneDesign } from '../data/phone-colors';
import { RotateCw, Smartphone, Camera, Sparkles, Check } from 'lucide-react';

export default function PhoneVisualizer({
  phone,
  size = 'large', // 'large' (ProductPage) or 'compact' (ProductCard)
  initialView = 'back',
  showColorPicker = true,
  onColorChange,
}) {
  const colors = getPhoneColorOptions(phone);
  const design = getPhoneDesign(phone);

  const [activeView, setActiveView] = useState(initialView); // 'back' | 'front'
  const [selectedColor, setSelectedColor] = useState(colors[0] || {
    id: 'default',
    name: phone.color || 'Standard',
    hex: phone.colorHex || '#2a2b2e',
    railHex: '#4a4d52',
    wallpaper: 'linear-gradient(135deg, #10141a 0%, #263345 50%, #121720 100%)'
  });

  // Keep selected color synced if phone changes
  useEffect(() => {
    const newColors = getPhoneColorOptions(phone);
    if (newColors.length > 0) {
      setSelectedColor(newColors[0]);
    }
  }, [phone.id]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (onColorChange) onColorChange(color);
  };

  const toggleView = () => {
    setActiveView(prev => prev === 'back' ? 'front' : 'back');
  };

  const isBack = activeView === 'back';

  return (
    <div className={`phone-visualizer-container visualizer-${size}`}>
      {/* View Toggle Bar (Front / Back) */}
      <div className="visualizer-toggle-bar">
        <div className="view-mode-pill-group" role="tablist" aria-label="Phone view angle">
          <button
            type="button"
            role="tab"
            aria-selected={!isBack}
            className={`view-mode-btn ${!isBack ? 'active' : ''}`}
            onClick={() => setActiveView('front')}
          >
            <Smartphone size={15} />
            <span>Front Display</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isBack}
            className={`view-mode-btn ${isBack ? 'active' : ''}`}
            onClick={() => setActiveView('back')}
          >
            <Camera size={15} />
            <span>Back Chassis</span>
          </button>
        </div>

        <button
          type="button"
          className="flip-action-btn"
          onClick={toggleView}
          title="Flip phone 180° to toggle Front / Back view"
          aria-label="Flip phone view"
        >
          <RotateCw size={14} />
          <span>Flip 180°</span>
        </button>
      </div>

      {/* 3D Phone Perspective Stage */}
      <div className="phone-3d-stage">
        <div className={`phone-3d-card ${isBack ? 'is-showing-back' : 'is-showing-front'}`}>
          {/* ================= BACK VIEW FACE ================= */}
          <div className="phone-face phone-face-back">
            <div
              className="physical-chassis"
              style={{
                backgroundColor: selectedColor.hex,
                borderColor: selectedColor.railHex,
              }}
            >
              {/* Matte frosted glass reflection sheen */}
              <div className="chassis-sheen" aria-hidden="true"></div>

              {/* Side hardware buttons (Action button, Volume, Camera Control) */}
              <div className="hardware-buttons-left">
                {design.hasActionBtn && <span className="hw-btn hw-action-btn"></span>}
                <span className="hw-btn hw-vol-up"></span>
                <span className="hw-btn hw-vol-down"></span>
              </div>
              <div className="hardware-buttons-right">
                <span className="hw-btn hw-power"></span>
                {design.hasCameraControl && <span className="hw-btn hw-camera-control"></span>}
              </div>

              {/* Rear Camera Island System */}
              <div className={`camera-plateau plateau-${design.cameraLayout}`}>
                <div className="camera-glass-base"></div>
                {design.cameraLayout === 'triple' && (
                  <>
                    <div className="lens-mount lens-top-left">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="lens-mount lens-bottom-left">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="lens-mount lens-middle-right">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="sensor-truetone-flash"></div>
                    <div className="sensor-lidar"></div>
                    <div className="sensor-mic"></div>
                  </>
                )}

                {design.cameraLayout === 'vertical-pill' && (
                  <>
                    <div className="lens-mount lens-pill-top">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="lens-mount lens-pill-bottom">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="sensor-truetone-flash flash-pill-side"></div>
                  </>
                )}

                {design.cameraLayout === 'diagonal' && (
                  <>
                    <div className="lens-mount lens-top-left">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="lens-mount lens-bottom-right">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="sensor-truetone-flash flash-diag-top"></div>
                    <div className="sensor-mic mic-diag-bottom"></div>
                  </>
                )}

                {design.cameraLayout === 'vertical' && (
                  <>
                    <div className="lens-mount lens-vert-top">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="lens-mount lens-vert-bottom">
                      <div className="lens-outer-ring"></div>
                      <div className="lens-glass"></div>
                    </div>
                    <div className="sensor-truetone-flash flash-vert-side"></div>
                  </>
                )}
              </div>

              {/* Apple Mirror Monogram Logo */}
              <div className="chassis-apple-logo" aria-hidden="true">
                <svg viewBox="0 0 170 170" width="38" height="38" fill="currentColor">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.94-12-14.58-6.19-9.58-10.98-20.24-14.37-32-3.39-11.75-5.08-22.9-5.08-33.45 0-14.42 3.63-26.4 10.88-35.95 7.26-9.55 16.5-14.4 27.72-14.56 4.35 0 9.47 1.25 15.36 3.75 5.88 2.5 9.77 3.8 11.66 3.9 1.7 0 5.66-1.32 11.88-3.96 6.23-2.64 11.45-3.88 15.67-3.73 11.58.64 21.05 4.88 28.4 12.72-10.15 6.18-15.11 14.88-14.88 26.1.25 8.84 3.72 16.27 10.42 22.28 6.7 6.01 14.62 9.53 23.77 10.56-2.12 6.54-4.88 13.1-8.28 19.67zM119.22 33.74c0-7.3 2.66-14.32 7.98-21.06 5.32-6.74 12.01-11.23 20.08-13.48.33 1.19.49 2.37.49 3.55 0 7.33-2.75 14.47-8.25 21.43-5.5 6.96-12.28 11.39-20.3 13.29z" />
                </svg>
              </div>

              {/* Laser Etched Model Tag */}
              <div className="chassis-bottom-label">
                <span>iPhone</span>
              </div>
            </div>
          </div>

          {/* ================= FRONT VIEW FACE ================= */}
          <div className="phone-face phone-face-front">
            <div
              className="physical-front-chassis"
              style={{
                borderColor: selectedColor.railHex,
                boxShadow: `0 0 35px -5px ${selectedColor.railHex}40, inset 0 0 0 2px rgba(255,255,255,0.15)`,
              }}
            >
              {/* Outer screen bezel */}
              <div className="screen-bezel">
                {/* Active Super Retina Display */}
                <div
                  className="screen-display"
                  style={{ background: selectedColor.wallpaper }}
                >
                  {/* Glass Sheen */}
                  <div className="screen-glass-sheen" aria-hidden="true"></div>

                  {/* Top Dynamic Island or Notch */}
                  {design.hasIsland ? (
                    <div className="dynamic-island-cutout">
                      <span className="camera-dot"></span>
                      <span className="sensor-dot"></span>
                    </div>
                  ) : (
                    <div className="faceid-notch">
                      <span className="notch-speaker"></span>
                      <span className="notch-lens"></span>
                    </div>
                  )}

                  {/* iOS Lockscreen Top Status */}
                  <div className="ios-status-bar">
                    <span className="status-time">9:41</span>
                    <div className="status-icons">
                      <span className="signal-bars">
                        <i></i><i></i><i></i><i></i>
                      </span>
                      <span className="net-tag">5G</span>
                      <span className="battery-pill">
                        <i style={{ width: '100%' }}></i>
                      </span>
                    </div>
                  </div>

                  {/* iOS Clock & Date */}
                  <div className="ios-lock-content">
                    <div className="lock-icon-glyph">🔒</div>
                    <span className="lock-date">Saturday, September 13</span>
                    <h2 className="lock-clock">09:41</h2>
                  </div>

                  {/* Model spec watermark on display */}
                  <div className="lock-widget-pill">
                    <Sparkles size={11} className="text-gold" />
                    <span>{phone.name}</span>
                  </div>

                  {/* Bottom Shortcuts */}
                  <div className="ios-bottom-controls">
                    <span className="ios-circle-btn">🔦</span>
                    <span className="ios-circle-btn">📷</span>
                  </div>

                  {/* iOS Home Indicator Bar */}
                  <div className="ios-home-indicator"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Selection Palette */}
      {showColorPicker && (
        <div className="visualizer-colors-panel">
          <div className="visualizer-color-info">
            <span className="color-label-tag">Physical Color:</span>
            <strong className="color-name-display">{selectedColor.name}</strong>
            <span className="chassis-material-pill">{design.frameMaterial}</span>
          </div>

          <div className="swatches-interactive-row" role="radiogroup" aria-label="Available iPhone colors">
            {colors.map(c => {
              const isSelected = selectedColor.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  title={`${c.name} - Click to see physical ${c.name} preview`}
                  className={`color-swatch-dot ${isSelected ? 'selected' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => handleColorSelect(c)}
                >
                  <span className="swatch-inner-ring" style={{ borderColor: c.railHex }}></span>
                  {isSelected && <Check size={11} className="swatch-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
