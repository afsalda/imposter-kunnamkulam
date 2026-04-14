import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { CheckCircle2, Play } from 'lucide-react';

export default function RoleTransition() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, roleRevealIndex, nextRoleReveal } = useGameStore();
  
  const currentPlayer = players[roleRevealIndex];
  const isLastPlayer = roleRevealIndex === players.length - 1;
  const nextPlayer = isLastPlayer ? null : players[roleRevealIndex + 1];

  useEffect(() => {
    // Black screen safety delay
    const timer = setTimeout(() => {
      // Just a small delay to ensure the screen is black before they can click next
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    trigger('medium');
    nextRoleReveal();
    if (isLastPlayer) {
      navigate('/game/clue-pass', { replace: true });
    } else {
      navigate('/game/pass', { replace: true });
    }
  };

  if (!currentPlayer) return null;

  return (
    <div className="h-full min-h-full flex flex-col items-center justify-center p-6 bg-bg text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center w-full h-full"
      >
        <div className="mt-10 mb-8">
          <CheckCircle2 size={64} className="text-success mx-auto" />
        </div>
        
        <h2 className="text-white text-3xl font-display font-black mb-12 uppercase tracking-tight leading-tight">
          {currentPlayer.name} has seen their role
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className={`w-full py-5 rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] mt-auto mb-4 flex items-center justify-center gap-2 ${
            isLastPlayer ? 'bg-primary text-white' : 'bg-white text-black'
          }`}
        >
          {isLastPlayer ? (
            <>
              Start Game <Play size={20} fill="currentColor" />
            </>
          ) : (
            `Pass to ${nextPlayer?.name} →`
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
