'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PrankOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  // Keyboard shortcut to remove overlay (Ctrl + Shift + P)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-md">
      {/* Warning Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600 text-white p-8 rounded-lg shadow-2xl border-4 border-red-800 max-w-md mx-4 text-center relative">
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-white hover:text-red-200 transition-colors"
            title="Remove overlay (Ctrl+Shift+P)"
          >
            <X size={24} />
          </button>
          
          {/* Warning content */}
          <div className="space-y-4">
            <div className="text-6xl">⚠️</div>
            <h1 className="text-2xl font-bold">WARNING</h1>
            <p className="text-lg font-semibold">They haven't paid me</p>
            <p className="text-sm opacity-90">
              Contact Me The Dev , mianmehroze@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
