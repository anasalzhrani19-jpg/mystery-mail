import { motion, AnimatePresence } from 'motion/react';
import { Challenge, GameState } from '../types';
import { useState, MouseEvent } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface CardProps {
  challenge: Challenge | null;
  gameState: GameState;
  onClose: () => void;
  onNextChallenge: () => void;
  mouseX?: number;
  mouseY?: number;
}

// Audio feedback trigger for button interactions
const playPopSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Audio context fallback
  }
};

export default function Card({ challenge, gameState, onClose, onNextChallenge }: CardProps) {
  const isReading = gameState === 'READING';
  const isRevealing = gameState === 'REVEALING';
  const isVisible = isReading || isRevealing;
  
  const [clickCount, setClickCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleNextClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playPopSound();
    setIsSpinning(true);
    setClickCount(prev => prev + 1);
    onNextChallenge();
    setTimeout(() => setIsSpinning(false), 300);
  };

  const handleCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playPopSound();
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            onClick={handleCloseClick}
          />

          {/* Card Container */}
          <motion.div 
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-7 md:p-9 flex flex-col items-center justify-between text-center min-h-[460px] z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button (X) */}
            <button 
              type="button"
              onClick={handleCloseClick}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-90"
              title="Close Card"
              aria-label="Close Card"
            >
              <X size={20} />
            </button>

            {/* Decorative Corner Glows */}
            <div className="absolute -top-12 -left-12 w-44 h-44 bg-gradient-to-br from-indigo-500/15 to-transparent rounded-full pointer-events-none blur-xl" />
            <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-gradient-to-tl from-purple-500/15 to-transparent rounded-full pointer-events-none blur-xl" />

            {/* Prompt Content */}
            <div className="relative flex-1 flex flex-col items-center justify-center w-full z-10 py-4 my-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${challenge?.id || 'challenge'}-${clickCount}`}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 shadow-sm border border-indigo-100/80">
                    {challenge?.category || 'Challenge'}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 leading-snug px-2">
                    {challenge?.text}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-3 z-20 pt-4">
              {/* Main Next Challenge Button */}
              <button 
                type="button"
                onClick={handleNextClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden border border-indigo-400/30"
              >
                <div className={`transition-transform duration-500 ${isSpinning ? 'rotate-180' : ''}`}>
                  <Sparkles size={22} className="text-amber-300" />
                </div>
                <span>Next Challenge</span>
                <ArrowRight size={20} className="text-indigo-200" />
              </button>
              
              {/* Finish Button */}
              <button
                type="button"
                onClick={handleCloseClick}
                className="w-full py-2.5 text-slate-400 hover:text-slate-700 text-sm font-semibold transition-colors cursor-pointer text-center rounded-xl hover:bg-slate-50"
              >
                Finish & Return to Mailbox
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
