import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';

export default function FakerGuess() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, fakers, category, submitFakerGuess } = useGameStore();
  
  const [guess, setGuess] = useState('');
  
  const fakerPlayer = players.find(p => fakers.includes(p.id));

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guess.trim()) return;
    
    trigger('heavy');
    submitFakerGuess(guess);
    navigate('/game/round-end');
  };

  if (!fakerPlayer) return null;

  return (
    <div className="h-full min-h-full flex flex-col p-6 bg-faker transition-colors duration-1000">
      <header className="mb-8 pt-4 text-center">
        <h2 className="text-white/70 text-lg uppercase tracking-widest">Last Chance</h2>
        <h1 className="text-3xl font-bold text-white mt-1">{fakerPlayer.name}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        <div className="text-6xl mb-6">🎭</div>
        <p className="text-white/90 text-xl text-center mb-8 font-medium">
          You've been caught... but you can still steal the win!
        </p>
        
        <div className="bg-black/20 rounded-2xl p-6 w-full mb-8 backdrop-blur-sm text-center">
          <p className="text-white/70 text-sm uppercase tracking-widest mb-2">Category</p>
          <p className="text-white font-bold text-2xl">{category}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <p className="text-white/90 text-center mb-4">What was the secret word?</p>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess..."
            className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-6 py-5 text-2xl text-center text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors mb-8"
            autoFocus
          />

          <motion.button
            type="submit"
            whileHover={{ scale: guess.trim() ? 1.02 : 1 }}
            whileTap={{ scale: guess.trim() ? 0.98 : 1 }}
            disabled={!guess.trim()}
            className="w-full py-4 bg-white text-faker rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 transition-all"
          >
            Submit Guess
          </motion.button>
        </form>
      </div>
    </div>
  );
}
