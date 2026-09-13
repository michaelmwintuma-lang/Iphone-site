import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

const DISMISS_KEY = 'paindem_install_dismissed';

/**
 * "Add Paindem to your home screen." Genuinely useful here — the catalog is precached, so
 * it opens without burning data. Shows only when Chrome/Edge actually offers the prompt,
 * and stays dismissed once the visitor says no.
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === '1') return;

    const onBeforeInstall = e => {
      e.preventDefault();
      setDeferred(e);
      // Let the visitor read the page first.
      // Wait until the visitor has had time to read the page properly.
      setTimeout(() => setVisible(true), 25000);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* private mode */ }
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  if (!visible || !deferred) return null;

  return (
    <div className="install-prompt" role="dialog" aria-label="Install app">
      <img src="/logo.jpg" alt="" className="install-prompt-logo" />
      <div className="install-prompt-text">
        <strong>Add Paindem to your phone</strong>
        <span>Browse iPhones and your payment plan offline — no data needed.</span>
      </div>
      <button type="button" className="btn btn-primary install-prompt-btn" onClick={install}>
        <Download size={16} />
        <span>Install</span>
      </button>
      <button
        type="button"
        className="install-prompt-close"
        onClick={dismiss}
        aria-label="Dismiss install prompt"
      >
        <X size={18} />
      </button>
    </div>
  );
}
