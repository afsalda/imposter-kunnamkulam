import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { UserCheck } from 'lucide-react';

export default function VotePass() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, voteIndex } = useGameStore();
  
  const currentPlayer = players[voteIndex];

  if (!currentPlayer) return null;

  const handleReady = () => {
    trigger('medium');
    navigate('/game/vote');
  };

  return (
    <div className="h-full min-h-full flex flex-col items-center justify-center p-6 bg-bg text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center w-full h-full"
      >
        <div className="mt-10 mb-8">
          <div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mx-auto border border-border">
            <UserCheck size={48} className="text-primary" />
          </div>
        </div>
        
        <h2 className="text-text-secondary text-xl mb-2 font-bold uppercase tracking-widest">Pass phone to</h2>
        <h1 className="text-5xl font-display font-black mb-6 text-white uppercase tracking-tight">{currentPlayer.name}</h1>
        
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12 w-full">
          <p className="text-primary font-bold text-lg uppercase tracking-wider">Cast your secret vote</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReady}
          className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] mt-auto mb-4"
        >
          I'm Ready to Vote
        </motion.button>
      </motion.div>
    </div>
  );
}
