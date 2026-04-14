import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { Timer, ArrowRight } from 'lucide-react';
import { PlayerCard } from '../../components/PlayerCard';

export default function Discuss() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { clues, players, startVoting } = useGameStore();
  
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes for discussion

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleStartVoting = () => {
    trigger('heavy');
    startVoting();
    navigate('/game/vote-pass');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full min-h-full flex flex-col p-6 bg-bg">
      <header className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-2xl font-display font-black uppercase tracking-tight text-white">Discussion</h1>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg border-4 ${timeLeft <= 30 ? 'border-primary text-primary animate-pulse' : 'border-white/20 border-t-white text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </header>

      <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-6 text-center">
        <p className="text-primary font-bold text-lg uppercase tracking-wider">Discuss! Who gave a suspicious clue?</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-24">
        {clues.map((clue, index) => {
          const player = players.find(p => p.id === clue.playerId);
          return (
            <motion.div
              key={clue.playerId}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-2 border-2 border-border rounded-2xl p-4 flex items-center gap-4"
            >
              {player && <PlayerCard player={player} className="w-16 h-20 shrink-0" />}
              <div className="flex flex-col">
                <span className="text-text-secondary text-xs font-black uppercase tracking-widest mb-1">{clue.playerName}</span>
                <span className="text-white text-2xl font-black uppercase tracking-tight">"{clue.clue}"</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartVoting}
          className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
        >
          Time to Vote! <ArrowRight size={24} />
        </motion.button>
      </div>
    </div>
  );
}
