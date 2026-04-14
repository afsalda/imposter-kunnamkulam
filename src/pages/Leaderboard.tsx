import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../hooks/useHaptics';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Trophy, Crown } from 'lucide-react';
import { PlayerCard } from '../components/PlayerCard';

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
        <h1 className="text-3xl font-display font-black ml-2 uppercase tracking-tight">Leaderboard</h1>
      </header>

      <div className="flex-1 flex flex-col items-center pb-24">
        <div className="w-full max-w-sm space-y-6">
          {sortedPlayers.map((player, index) => (
            <motion.div 
              key={player.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-6"
            >
              <div className="relative">
                <PlayerCard player={player} className="w-24 h-32" />
                {index === 0 && (
                  <div className="absolute -top-4 -right-4 bg-warning text-black p-2 rounded-full shadow-xl animate-bounce">
                    <Crown size={20} strokeWidth={3} />
                  </div>
                )}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-black shadow-lg border-2 border-bg">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight leading-none mb-1">{player.name}</h3>
                <span className="text-primary font-black text-xl uppercase tracking-widest">{scores[player.id] || 0} PTS</span>
              </div>
            </motion.div>
          ))}
          
          {players.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">👻</div>
              <p className="text-text-secondary font-bold uppercase tracking-widest">No games played yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
