import React, { useEffect, useState } from 'react';
import { Download, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState<boolean>(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);

    if (mediaQuery.matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (!isOffline && (!deferredPrompt || isInstalled)) {
    return null;
  }

  return (
    <div className="mb-4 rounded-2xl border border-indigo-200 dark:border-indigo-700 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/40 dark:to-cyan-900/30 px-4 py-3 flex flex-wrap items-center gap-3">
      {isOffline ? (
        <WifiOff className="w-5 h-5 text-amber-600 dark:text-amber-300" />
      ) : (
        <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
      )}
      <p className="text-sm text-gray-700 dark:text-gray-200 flex-1 min-w-[220px]">
        {isOffline
          ? 'You are offline. Cached lessons and practice remain available.'
          : 'Install LawRanker to your device for one-tap access and better offline reliability.'}
      </p>
      {!isOffline && deferredPrompt && !isInstalled && (
        <button
          onClick={handleInstall}
          className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
        >
          Install App
        </button>
      )}
    </div>
  );
};

export default PwaInstallPrompt;
