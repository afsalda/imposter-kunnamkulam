import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';

export default function RoundEnd() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, fakers, secretWord, scores, nextRound, resetGame } = useGameStore();
  
  const [showScores, setShowScores] = useState(false);

  // We need to determine who won based on the current state.
  // This is a bit tricky since we just updated scores. We can infer it or we should have stored the result.
  // For simplicity, let's just show the word and the current standings.

  useEffect(() => {
    trigger('heavy');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8272A', '#2D6BE4', '#22C55E', '#F59E0B']
    });

    const timer = setTimeout(() => {
      setShowScores(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [trigger]);

  const handleNextRound = () => {
    trigger('medium');
    nextRound();
    navigate('/game/pass');
  };

  const handleNewGame = () => {
    trigger('light');
    resetGame();
    navigate('/setup/passplay');
  };

  const sortedPlayers = [...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  return (
    <div className="h-full min-h-full flex flex-col p-6 bg-bg">
      <header className="mb-8 pt-4 text-center">
        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Round Over</h1>
      </header>

      <div className="flex-1 flex flex-col items-center">
        <div className="bg-surface-2 border border-border rounded-3xl p-8 w-full max-w-sm text-center mb-8">
          <p className="text-text-secondary text-sm uppercase tracking-widest mb-2">The Secret Word was</p>
          <p className="text-4xl font-display font-bold text-word uppercase tracking-tight mb-6">{secretWord}</p>
          
          <p className="text-text-secondary text-sm uppercase tracking-widest mb-2">The Faker was</p>
          <div className="flex flex-wrap justify-center gap-2">
            {fakers.map(fId => {
              const f = players.find(p => p.id === fId);
              return f ? (
                <span key={f.id} className="text-2xl font-bold text-faker">{f.name}</span>
              ) : null;
            })}
          </div>
        </div>

        {showScores && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-xl font-bold text-white mb-4">Current Standings</h2>
            <div className="space-y-2 mb-8">
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-text-faint font-bold w-4">{index + 1}</span>
                    <span className="text-white font-medium">{player.name}</span>
                  </div>
                  <span className="text-primary font-bold">{scores[player.id] || 0} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-auto space-y-4 pt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNextRound}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-xl shadow-lg"
        >
          Play Again (Same Group)
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewGame}
          className="w-full py-4 bg-surface-2 text-white rounded-2xl font-bold text-lg border border-border"
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
}
