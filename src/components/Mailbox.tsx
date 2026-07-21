import { motion } from 'motion/react';
import { GameState } from '../types';
import { ReactNode } from 'react';

interface MailboxProps {
  gameState: GameState;
  onClick: () => void;
  children?: ReactNode;
}

export default function Mailbox({ gameState, onClick, children }: MailboxProps) {
  const isIdle = gameState === 'IDLE';
  const isTriggered = gameState === 'TRIGGERED';
  const isOpen = ['SHOOTING', 'WAITING', 'REVEALING', 'READING'].includes(gameState);

  return (
    <motion.div 
      className="relative w-56 h-72 cursor-pointer group flex justify-center"
      onClick={isIdle ? onClick : undefined}
      animate={
        isTriggered ? { rotate: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } } 
        : isIdle ? { y: [0, -8, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
        : { y: 0 }
      }
      whileHover={isIdle ? { scale: 1.05 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* BACK LAYER */}
      {/* Post */}
      <div className="absolute bottom-[-160px] w-12 h-[200px] bg-gradient-to-b from-slate-700 to-slate-900 rounded-lg shadow-2xl z-0 border border-slate-600/50" />
      
      {/* Flag */}
      <motion.div 
        className="absolute right-[-24px] top-[80px] w-5 h-28 bg-slate-400 rounded-full origin-bottom z-0 shadow-lg border border-slate-300"
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? -90 : 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12, delay: isOpen ? 0 : 0.3 }}
      >
        <div className="absolute top-2 right-[-10px] w-14 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-md border border-red-300/50" />
      </motion.div>

      {/* Inner Darkness */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-purple-900 rounded-t-full rounded-b-3xl shadow-2xl z-0" />
      <div className="absolute top-4 left-4 right-4 bottom-8 bg-gray-950 rounded-t-full rounded-b-xl shadow-inner z-0" />
      
      {/* CHILDREN (Envelope wrapper, rendered between back and front) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center">
        {children}
      </div>

      {/* FRONT LAYER */}
      {/* Door */}
      <motion.div 
        className="absolute top-4 left-4 right-4 bottom-8 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-t-full rounded-b-xl z-20 origin-bottom border-2 border-indigo-300/60 shadow-xl flex items-center justify-center overflow-hidden"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isOpen ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Door Details */}
        <div className="absolute top-12 w-24 h-3 bg-indigo-800/40 rounded-full shadow-inner" />
        <div className="absolute top-24 w-14 h-20 border-2 border-indigo-300/40 rounded-lg shadow-sm" />
      </motion.div>

      {/* Box Outline Overlay (To cover edges nicely) */}
      <div className="absolute inset-0 border-[8px] border-indigo-400/80 rounded-t-full rounded-b-3xl z-30 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />
      
      {/* Glossy reflection */}
      <div className="absolute top-2 left-2 w-16 h-32 bg-white/10 rounded-tl-full rounded-bl-full z-30 pointer-events-none blur-sm" />
    </motion.div>
  );
}
