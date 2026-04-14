import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../hooks/useHaptics';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Trophy } from 'lucide-react';

export default function Leaderboard() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, scores } = useGameStore();

  const sortedPlayers = [...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  return (
    <div className="min-h-screen flex flex-col p-6 bg-bg">
      <header className="flex items-center mb-8 pt-4">
        <button 
          onClick={() => { trigger('light'); navigate(-1); }}
          className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Leaderboard</h1>
      </header>

      <div className="flex-1 flex flex-col items-center">
        <div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mb-8 border border-border">
          <Trophy size={48} className="text-warning" />
        </div>

        <div className="w-full max-w-sm space-y-3">
          {sortedPlayers.map((player, index) => (
            <motion.div 
              key={player.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-surface border border-border rounded-xl p-4 flex items-center justify-between ${index === 0 ? 'border-warning/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className={`font-bold w-6 text-center ${index === 0 ? 'text-warning text-xl' : 'text-text-faint'}`}>
                  {index === 0 ? '👑' : index + 1}
                </span>
                <span className="text-white font-medium text-lg">{player.name}</span>
              </div>
              <span className="text-primary font-bold text-xl">{scores[player.id] || 0} pts</span>
            </motion.div>
          ))}
          
          {players.length === 0 && (
            <p className="text-center text-text-secondary">No games played yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
