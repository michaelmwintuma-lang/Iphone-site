import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, BatteryCharging, Smartphone, Eye, Sparkles, ChevronDown, ChevronUp, Lock, Wifi, Volume2, Camera, Cpu } from 'lucide-react';

const DIAGNOSTIC_28_POINTS = [
  { id: 1, name: 'TrueTone Sensor', category: 'Display', desc: 'Original ambient color calibration verified' },
  { id: 2, name: 'Multi-Touch Grid', category: 'Display', desc: 'Zero dead zones, 120Hz/60Hz touch responsiveness' },
  { id: 3, name: 'OLED / Retina Panel', category: 'Display', desc: 'Zero screen burns, dead pixels, or aftermarket glass' },
  { id: 4, name: 'Face ID / Touch ID', category: 'Biometrics', desc: 'TrueDepth camera & Secure Enclave 100% operational' },
  { id: 5, name: 'Battery Health Capacity', category: 'Battery', desc: 'Minimum 85%+ OEM capacity or 100% sealed' },
  { id: 6, name: 'Battery Charge Cycles', category: 'Battery', desc: 'Low wear index, normal peak performance capability' },
  { id: 7, name: 'Clean iCloud Status', category: 'Security', desc: 'Zero iCloud lock, Activation Lock removed, clean serial' },
  { id: 8, name: 'IMEI & Blacklist Check', category: 'Security', desc: 'Clean global GSMA database, zero finance lock' },
  { id: 9, name: 'Factory Unlocked Baseband', category: 'Network', desc: 'Accepts all Ghana SIMs (MTN, Telecel, AT Money)' },
  { id: 10, name: '5G / LTE Cellular Bands', category: 'Network', desc: 'Full spectrum RF reception and high-speed data' },
  { id: 11, name: 'Wi-Fi 6 / Bluetooth 5.3', category: 'Network', desc: 'AirDrop, personal hotspot, and audio streaming tested' },
  { id: 12, name: 'Main Camera Sensor', category: 'Cameras', desc: '48MP/12MP sharpness, autofocus & optical stabilization' },
  { id: 13, name: 'Ultra-Wide & Telephoto Lenses', category: 'Cameras', desc: '0.5x to 5x optical zoom clean of dust and haze' },
  { id: 14, name: 'Selfie / FaceTime Camera', category: 'Cameras', desc: 'Portrait mode, depth mapping, and HDR functional' },
  { id: 15, name: 'TrueTone Flash & Torch', category: 'Cameras', desc: 'Dual-LED warm/cool flash & flashlight brightness' },
  { id: 16, name: 'Earpiece Speaker', category: 'Audio', desc: 'Crystal clear voice call clarity and volume' },
  { id: 17, name: 'Stereo Loudspeakers', category: 'Audio', desc: 'Dual bottom speakers with spatial audio separation' },
  { id: 18, name: 'Studio Microphones (x3)', category: 'Audio', desc: 'Top, bottom, and camera mics noise-cancellation verified' },
  { id: 19, name: 'Lightning / USB-C Port', category: 'Hardware', desc: 'Data transfer, fast charging pins, and OTG verified' },
  { id: 20, name: 'MagSafe Wireless Charging', category: 'Hardware', desc: '15W magnetic alignment and induction charging active' },
  { id: 21, name: 'Taptic Engine (Vibration)', category: 'Hardware', desc: 'Authentic haptic feedback and silent motor tested' },
  { id: 22, name: 'Action Button / Mute Switch', category: 'Buttons', desc: 'Tactile click, zero stickiness, assigned shortcut' },
  { id: 23, name: 'Volume Up & Down Keys', category: 'Buttons', desc: 'Responsive tactile key travel and audio adjustment' },
  { id: 24, name: 'Side Power / Sleep Key', category: 'Buttons', desc: 'Instant wake, Siri trigger, and Apple Pay double-click' },
  { id: 25, name: 'Proximity Sensor', category: 'Sensors', desc: 'Screen turns off automatically during phone calls' },
  { id: 26, name: 'Ambient Light Sensor', category: 'Sensors', desc: 'Auto-brightness adapts smoothly to indoor & outdoor' },
  { id: 27, name: 'Gyroscope & Accelerometer', category: 'Sensors', desc: 'Screen auto-rotate, compass, and fitness tracking' },
  { id: 28, name: 'Water / Dust Seal Condition', category: 'Chassis', desc: 'Original chassis rubber gaskets & speaker mesh clean' },
];

export default function DiagnosticSeal({ phone }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="diagnostic-seal-card">
      {/* Header with Certified Emblem */}
      <div className="diagnostic-seal-header">
        <div className="seal-emblem-wrap">
          <div className="seal-badge-circle">
            <ShieldCheck size={24} className="seal-icon" />
          </div>
          <div className="seal-title-col">
            <div className="seal-pre-tag">
              <Sparkles size={12} className="text-gold" /> Paindem Quality Assurance
            </div>
            <h3 className="seal-main-title">28-Point Hardware Diagnostic Certificate</h3>
            <p className="seal-subtitle">
              Every iPhone undergoes our proprietary 28-point laboratory inspection before showroom display.
            </p>
          </div>
        </div>

        <div className="seal-status-pill">
          <span className="seal-check-dot"></span>
          <strong>100% Passed</strong>
        </div>
      </div>

      {/* High-Trust Core Checkpoints Grid */}
      <div className="diagnostic-core-grid">
        <div className="diag-point-card">
          <div className="diag-point-head">
            <Smartphone size={16} className="text-cyan" />
            <strong>Display &amp; TrueTone</strong>
          </div>
          <span className="diag-point-val">Original Super Retina • TrueTone Active</span>
          <small className="diag-point-help">Zero aftermarket LCDs or non-genuine screen warnings</small>
        </div>

        <div className="diag-point-card">
          <div className="diag-point-head">
            <Lock size={16} className="text-green" />
            <strong>Face ID &amp; Security</strong>
          </div>
          <span className="diag-point-val">Biometrics 100% Operational</span>
          <small className="diag-point-help">Clean iCloud • Factory Unlocked for MTN, Telecel &amp; AT</small>
        </div>

        <div className="diag-point-card">
          <div className="diag-point-head">
            <BatteryCharging size={16} className="text-gold" />
            <strong>Battery Health</strong>
          </div>
          <span className="diag-point-val">{phone.battery}</span>
          <small className="diag-point-help">Minimum 85%+ OEM capacity guaranteed with peak performance</small>
        </div>

        <div className="diag-point-card">
          <div className="diag-point-head">
            <ShieldCheck size={16} className="text-cyan" />
            <strong>Written Warranty</strong>
          </div>
          <span className="diag-point-val">6-Month Shop Warranty</span>
          <small className="diag-point-help">Full replacement &amp; repair guarantee stamped on your receipt</small>
        </div>
      </div>

      {/* Expandable 28-Point Checklist Drawer */}
      <div className="diagnostic-checklist-wrap">
        <button
          type="button"
          className="checklist-toggle-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span>{expanded ? 'Hide Full 28-Point Inspection Checklist' : 'View Full 28-Point Inspection Checklist'}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <div className="diagnostic-expanded-checklist">
            <div className="checklist-points-grid">
              {DIAGNOSTIC_28_POINTS.map(pt => (
                <div key={pt.id} className="checklist-point-item">
                  <CheckCircle2 size={14} className="point-check-icon text-green" />
                  <div className="point-item-content">
                    <div className="point-item-title-row">
                      <strong className="point-name">{pt.id}. {pt.name}</strong>
                      <span className="point-cat">{pt.category}</span>
                    </div>
                    <span className="point-desc">{pt.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="checklist-footer-note">
              <span>All 28 checkpoints verified by certified iPhone hardware technicians at Paindem Smart Cells, Circle, Accra.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
