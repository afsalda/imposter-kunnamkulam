import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';

export default function Vote() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, voteIndex, submitVote } = useGameStore();
  
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  
  const currentPlayer = players[voteIndex];

  if (!currentPlayer) return null;

  const handleSelect = (id: string) => {
    if (id === currentPlayer.id) return;
    trigger('light');
    setSelectedPlayerId(id);
  };

  const handleConfirm = () => {
    if (!selectedPlayerId) return;
    trigger('heavy');
    submitVote(currentPlayer.id, selectedPlayerId);
    
    if (voteIndex === players.length - 1) {
      navigate('/game/vote-reveal', { replace: true });
    } else {
      navigate('/game/vote-pass', { replace: true });
    }
  };

  return (
    <div className="h-full min-h-full flex flex-col p-6 bg-bg">
      <header className="mb-8 pt-4 text-center">
        <h2 className="text-text-secondary text-lg font-bold uppercase tracking-widest">Who is the Faker?</h2>
        <h1 className="text-3xl font-display font-black text-white mt-1 uppercase tracking-tight">{currentPlayer.name}'s Vote</h1>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-4 content-start pb-24">
        {players.map((player) => {
          const isSelf = player.id === currentPlayer.id;
          const isSelected = player.id === selectedPlayerId;
          
          return (
            <motion.button
              key={player.id}
              whileHover={!isSelf ? { scale: 1.05 } : {}}
              whileTap={!isSelf ? { scale: 0.95 } : {}}
              onClick={() => handleSelect(player.id)}
              disabled={isSelf}
              className={`aspect-square rounded-3xl flex flex-col items-center justify-center p-4 transition-all ${
                isSelf 
                  ? 'bg-surface border border-border opacity-30 cursor-not-allowed' 
                  : isSelected
                    ? 'bg-primary border-2 border-primary shadow-[0_0_20px_rgba(232,39,42,0.3)]'
                    : 'bg-surface-2 border border-border hover:bg-surface'
              }`}
            >
              <div className="text-4xl mb-2">{player.avatar}</div>
              <span className={`font-bold text-lg text-center ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                {player.name}
              </span>
              {isSelf && <span className="text-xs text-text-faint mt-1">(You)</span>}
            </motion.button>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent">
        <motion.button
          whileHover={{ scale: selectedPlayerId ? 1.05 : 1 }}
          whileTap={{ scale: selectedPlayerId ? 0.95 : 1 }}
          onClick={handleConfirm}
          disabled={!selectedPlayerId}
          className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:bg-surface-2 disabled:text-text-secondary transition-all"
        >
          Confirm Vote
        </motion.button>
      </div>
    </div>
  );
}
