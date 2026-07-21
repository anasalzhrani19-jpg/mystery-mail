/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Settings, Sparkles } from 'lucide-react';

import { GameState, Challenge } from './types';
import { initialChallenges, defaultCategories } from './data';
import Mailbox from './components/Mailbox';
import Envelope from './components/Envelope';
import Card from './components/Card';
import Confetti from './components/Confetti';
import TeacherMode from './components/TeacherMode';

interface MouseSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [isTeacherModeOpen, setIsTeacherModeOpen] = useState(false);

  // Mouse tracking & ambient sparkles
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<MouseSparkle[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    // 1. Categories
    const savedCategories = localStorage.getItem('mystery_mail_categories');
    let loadedCategories = defaultCategories;
    if (savedCategories) {
      try {
        loadedCategories = JSON.parse(savedCategories);
      } catch (e) {
        loadedCategories = defaultCategories;
      }
    }
    // Migrate Storytelling -> Roleplay
    loadedCategories = loadedCategories.map(c => c === 'Storytelling' ? 'Roleplay' : c);
    if (!loadedCategories.includes('Roleplay')) {
      loadedCategories.push('Roleplay');
    }
    setCategories(loadedCategories);

    // 2. Challenges
    const savedChallenges = localStorage.getItem('mystery_mail_challenges');
    let loadedChallenges = initialChallenges;
    if (savedChallenges) {
      try {
        loadedChallenges = JSON.parse(savedChallenges);
      } catch (e) {
        loadedChallenges = initialChallenges;
      }
    }
    // Migrate Storytelling -> Roleplay
    loadedChallenges = loadedChallenges.map(c => c.category === 'Storytelling' ? { ...c, category: 'Roleplay' } : c);
    setChallenges(loadedChallenges);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (challenges.length > 0) {
      localStorage.setItem('mystery_mail_challenges', JSON.stringify(challenges));
    }
  }, [challenges]);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('mystery_mail_categories', JSON.stringify(categories));
    }
  }, [categories]);

  // Mouse Movement & Sparkles trail
  useEffect(() => {
    let sparkleId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Throttle sparkle creation slightly
      if (Math.random() < 0.25) {
        const newSparkle: MouseSparkle = {
          id: sparkleId++,
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: Math.random() * 12 + 6
        };

        setSparkles(prev => [...prev.slice(-12), newSparkle]);

        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax calculations for the background and container
  const springConfig = { stiffness: 100, damping: 30 };
  const parallaxX = useSpring(useTransform(() => (mousePos.x / window.innerWidth - 0.5) * 30), springConfig);
  const parallaxY = useSpring(useTransform(() => (mousePos.y / window.innerHeight - 0.5) * 30), springConfig);

  const handleMailboxClick = () => {
    if (gameState !== 'IDLE') return;
    setGameState('TRIGGERED');
    
    // Pick random enabled challenge
    const enabledChallenges = challenges.filter(c => c.enabled);
    if (enabledChallenges.length === 0) {
      alert("No challenges available! Please enable or create some in Teacher Mode.");
      setGameState('IDLE');
      return;
    }
    const selected = enabledChallenges[Math.floor(Math.random() * enabledChallenges.length)];
    setCurrentChallenge(selected);

    // Sequence
    setTimeout(() => {
      setGameState('SHOOTING');
      setTimeout(() => {
        setGameState('WAITING');
      }, 1000);
    }, 500);
  };

  const handleEnvelopeClick = () => {
    if (gameState !== 'WAITING') return;
    setGameState('REVEALING');
    setTimeout(() => {
      setGameState('READING');
    }, 600); 
  };

  const handleCloseCard = () => {
    setGameState('IDLE');
  };

  const handleNextChallenge = () => {
    const enabledChallenges = challenges.filter(c => c.enabled);
    if (enabledChallenges.length === 0) {
      alert("No challenges available! Please enable or create some in Teacher Mode.");
      return;
    }
    
    // Pick a new challenge different from current if possible
    let next = enabledChallenges[Math.floor(Math.random() * enabledChallenges.length)];
    if (enabledChallenges.length > 1 && currentChallenge && next.id === currentChallenge.id) {
      const remaining = enabledChallenges.filter(c => c.id !== currentChallenge.id);
      next = remaining[Math.floor(Math.random() * remaining.length)];
    }
    
    setCurrentChallenge(next);
    if (gameState !== 'READING') {
      setGameState('READING');
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 flex items-center justify-center select-none">
      {/* Interactive Cursor Sparkles */}
      <AnimatePresence>
        {sparkles.map(sp => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 1, scale: 1, x: sp.x, y: sp.y }}
            animate={{ opacity: 0, scale: 0.2, y: sp.y - 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.8)]"
            style={{ left: 0, top: 0 }}
          >
            <Sparkles size={sp.size} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dynamic Background Lighting */}
      <div 
        className="absolute inset-0 z-0 opacity-50 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.18), transparent 80%)`
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-900/50 to-slate-950" />

      {/* Main Game Container with Parallax */}
      <motion.div 
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <Mailbox gameState={gameState} onClick={handleMailboxClick}>
           <Envelope gameState={gameState} onClick={handleEnvelopeClick} />
        </Mailbox>
        
        <Confetti active={gameState === 'SHOOTING'} />
        
        <Card 
          challenge={currentChallenge} 
          gameState={gameState} 
          onClose={handleCloseCard}
          onNextChallenge={handleNextChallenge}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      </motion.div>

      {/* Teacher Mode Button */}
      <button 
        onClick={() => setIsTeacherModeOpen(true)}
        className="absolute bottom-6 right-6 z-50 p-3 bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full backdrop-blur-md transition-all border border-slate-700/60 group shadow-lg cursor-pointer"
        title="Teacher Mode"
      >
        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Title (Fades out when playing) */}
      <motion.div 
        className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: gameState === 'IDLE' ? 1 : 0, y: gameState === 'IDLE' ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide drop-shadow-lg">
          Mystery Mail
        </h1>
        <p className="text-indigo-300 font-medium mt-2 drop-shadow-md">Click the mailbox to reveal a challenge</p>
      </motion.div>

      <TeacherMode 
        isOpen={isTeacherModeOpen} 
        onClose={() => setIsTeacherModeOpen(false)} 
        challenges={challenges}
        setChallenges={setChallenges}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
}

