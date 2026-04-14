import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { PlayerCard } from '../../components/PlayerCard';

export default function RoundEnd() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, fakers, secretWord, scores, nextRound, resetGame } = useGameStore();
  
  const [showScores, setShowScores] = useState(false);

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
        <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">Round Over</h1>
      </header>

      <div className="flex-1 flex flex-col items-center overflow-y-auto pb-32">
        <div className="bg-surface-2 border-2 border-border rounded-3xl p-8 w-full max-w-sm text-center mb-10 shadow-xl">
          <p className="text-text-secondary text-xs font-black uppercase tracking-[2px] mb-3">The Secret Word was</p>
          <p className="text-5xl font-display font-black text-word uppercase tracking-tight mb-8">{secretWord}</p>
          
          <p className="text-text-secondary text-xs font-black uppercase tracking-[2px] mb-4">The Faker was</p>
          <div className="flex flex-wrap justify-center gap-4">
            {fakers.map(fId => {
              const f = players.find(p => p.id === fId);
              return f ? (
                <div key={f.id} className="flex flex-col items-center">
                  <PlayerCard player={f} className="w-20 h-28 mb-2" />
                  <span className="text-xl font-black text-faker uppercase tracking-widest">{f.name}</span>
                </div>
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
            <h2 className="text-sm font-black text-text-secondary uppercase tracking-[2px] mb-6">Current Standings</h2>
            <div className="space-y-4 mb-8">
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className="flex items-center gap-4">
                  <div className="relative">
                    <PlayerCard player={player} className="w-16 h-20" />
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shadow-lg border border-bg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-tight leading-none">{player.name}</h3>
                    <span className="text-primary font-black text-sm uppercase tracking-widest">{scores[player.id] || 0} PTS</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent space-y-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextRound}
          className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
        >
          Play Again
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNewGame}
          className="w-full py-4 bg-surface-2 text-white rounded-2xl font-extrabold text-sm uppercase border-2 border-border"
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
}
