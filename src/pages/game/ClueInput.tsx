import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { Check } from 'lucide-react';

export default function ClueInput() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, currentPlayerIndex, secretWord, category, settings, submitClue } = useGameStore();
  
  const [clue, setClue] = useState('');
  const [timeLeft, setTimeLeft] = useState(settings.timerDuration || 60);
  
  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    if (!settings.timerDuration) return;
    
    if (timeLeft <= 0) {
      // Auto-submit empty clue if time runs out
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, settings.timerDuration]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const finalClue = clue.trim() || '...';
    trigger('heavy');
    submitClue(currentPlayer.id, finalClue);
    
    // Check if it was the last player
    if (currentPlayerIndex === players.length - 1) {
      navigate('/game/discuss', { replace: true });
    } else {
      navigate('/game/clue-pass', { replace: true });
    }
  };

  if (!currentPlayer) return null;

  return (
    <div className="h-full min-h-full flex flex-col p-6 bg-bg">
      <header className="flex justify-between items-center mb-8 pt-4">
        <h1 className="text-xl font-bold text-text-secondary">{currentPlayer.name}'s Clue</h1>
        {settings.timerDuration && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 ${timeLeft <= 10 ? 'border-primary text-primary animate-pulse' : 'border-white/20 border-t-white text-white'}`}>
            {timeLeft}
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {!currentPlayer.isFaker ? (
          <div className="mb-12 text-center">
            <div className="inline-block bg-white/10 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-[2px] mb-5 text-white/70">{category}</div>
            <div className="text-5xl font-display font-black text-word uppercase tracking-tight break-words">{secretWord}</div>
          </div>
        ) : (
          <div className="mb-12 text-center">
            <div className="inline-block bg-primary/20 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-[2px] mb-5 text-primary">Category</div>
            <div className="text-4xl font-display font-black text-white uppercase tracking-tight">{category}</div>
            <p className="text-text-secondary mt-4 font-medium">Give a clue that fits in this category...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full mt-auto">
          <input
            type="text"
            value={clue}
            onChange={(e) => setClue(e.target.value)}
            placeholder="Enter your one-word clue..."
            className="w-full bg-surface border-2 border-border rounded-2xl px-6 py-5 text-2xl text-center text-white placeholder-text-faint focus:outline-none focus:border-primary transition-colors mb-8"
            autoFocus
            maxLength={20}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: clue.trim() ? 1.05 : 1 }}
            whileTap={{ scale: clue.trim() ? 0.95 : 1 }}
            disabled={!clue.trim()}
            className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:bg-surface-2 disabled:text-text-secondary transition-all flex items-center justify-center gap-2 mb-4"
          >
            Submit Clue <Check size={24} />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
