"use client";

import { useState, useEffect } from "react";

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTasha, setShowTasha] = useState(true);
  const [showAnuj, setShowAnuj] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    setShowTasha(true);
    setShowAnuj(true);
  };

  const handleCloseTasha = () => setShowTasha(false);
  const handleCloseAnuj = () => setShowAnuj(false);

  // Close modal when pressing Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close the entire modal if both posters are closed
  useEffect(() => {
    if (isOpen && !showTasha && !showAnuj) {
      setIsOpen(false);
    }
  }, [showTasha, showAnuj, isOpen]);

  return (
    <>
      <div className="fixed bottom-[4.5rem] right-5 z-[10020] flex flex-col items-center">
        {/* Party Button */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Concert Posters"
          className="inline-flex items-center justify-center rounded-full border px-3 py-3 backdrop-blur-md transition-all duration-300 border-white/20 bg-black/55 text-2xl shadow-[0_0_12px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-cyan-400/50 hover:shadow-[0_0_18px_rgba(34,211,238,0.2)] hover:scale-110 active:scale-95 animate-bounce"
        >
          🎉
        </button>
      </div>

      {/* Modal Popup for Posters */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex flex-col items-center justify-center gap-8 md:flex-row md:items-start w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Poster 1: DJ Tasha */}
            {showTasha && (
              <div className="group relative max-w-[90vw] shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                {/* Individual Close Button */}
                <button
                  onClick={handleCloseTasha}
                  className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 border border-white/20 transition-all hover:border-red-500 hover:bg-red-500/90"
                  aria-label="Close DJ Tasha Poster"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* Actually load the image the user will drop as /dj-tasha.jpg */}
                <img
                  src="/dj-tasha.jpg"
                  alt="DJ Tasha"
                  className="max-h-[85vh] w-auto object-contain text-transparent transition-transform duration-500 block"
                />
              </div>
            )}

            {/* Poster 2: Anuj Rehan */}
            {showAnuj && (
              <div className="group relative max-w-[90vw] shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(232,121,249,0.3)]">
                {/* Individual Close Button */}
                <button
                  onClick={handleCloseAnuj}
                  className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 border border-white/20 transition-all hover:border-red-500 hover:bg-red-500/90"
                  aria-label="Close Anuj Rehan Poster"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* Actually load the image the user will drop as /anuj-rehan.jpg */}
                <img
                  src="/anuj-rehan.jpg"
                  alt="Anuj Rehan"
                  className="max-h-[85vh] w-auto object-contain text-transparent transition-transform duration-500 block"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
