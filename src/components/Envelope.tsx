import { motion } from 'motion/react';
import { GameState } from '../types';

interface EnvelopeProps {
  gameState: GameState;
  onClick: () => void;
}

export default function Envelope({ gameState, onClick }: EnvelopeProps) {
  const isShooting = gameState === 'SHOOTING';
  const isWaiting = gameState === 'WAITING';
  const isRevealing = ['REVEALING', 'READING'].includes(gameState);
  
  if (gameState === 'IDLE' || gameState === 'TRIGGERED') return null;

  return (
    <motion.div
      className="relative w-48 h-32 cursor-pointer group drop-shadow-2xl z-40"
      style={{ pointerEvents: isRevealing ? 'none' : 'auto' }}
      onClick={isWaiting ? onClick : undefined}
      initial={{ y: 50, scale: 0.5, opacity: 0 }}
      animate={
        isShooting 
          ? { y: -350, scale: 1, opacity: 1, rotate: [0, 360, 720] } 
        : isWaiting
          ? { y: [-350, -360, -350], scale: 1.1, opacity: 1, rotate: 0, transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }
        : isRevealing
          ? { y: -350, scale: 1.5, opacity: 0, rotate: 0 }
        : {}
      }
      transition={
        isShooting ? { duration: 0.8, ease: "easeOut" } : 
        isRevealing ? { duration: 0.5, ease: "easeIn" } : 
        { duration: 0.4 }
      }
      whileHover={isWaiting ? { scale: 1.15, rotate: -3 } : {}}
    >
      {/* Base / Back of envelope */}
      <svg viewBox="0 0 160 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        <rect width="160" height="112" rx="6" fill="#FBBF24"/>
        
        {/* Paper peeking inside */}
        <rect x="10" y="10" width="140" height="92" fill="#FFFFFF" rx="2"/>
        
        {/* Bottom fold */}
        <path d="M0 112 L80 50 L160 112 Z" fill="#FDE68A"/>
        
        {/* Left/Right folds */}
        <path d="M0 0 L70 55 L0 112 Z" fill="#FCD34D"/>
        <path d="M160 0 L90 55 L160 112 Z" fill="#FCD34D"/>
      </svg>
      
      {/* Flap (Opens during Reveal) */}
      <motion.svg 
        viewBox="0 0 160 80" 
        className="absolute top-0 left-0 w-full origin-top z-10"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isRevealing ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <path d="M0 0 L80 70 L160 0 Z" fill="#FBBF24" filter="drop-shadow(0 4px 4px rgba(0,0,0,0.15))"/>
      </motion.svg>
      
      {/* Wax Seal */}
      <motion.div 
        className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-600 rounded-full shadow-lg z-20 border-2 border-red-700 flex items-center justify-center overflow-hidden"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: isRevealing ? 0 : 1, opacity: isRevealing ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <span className="text-red-200 text-sm font-serif italic drop-shadow-sm font-bold">M</span>
      </motion.div>
    </motion.div>
  );
}
