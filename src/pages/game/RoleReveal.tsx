import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { EyeOff } from 'lucide-react';
import { PlayerCard } from '../../components/PlayerCard';

export default function RoleReveal() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, roleRevealIndex, secretWord, category } = useGameStore();
  
  const [timeLeft, setTimeLeft] = useState(8);
  const [isBlurred, setIsBlurred] = useState(false);
  
  const currentPlayer = players[roleRevealIndex];

  useEffect(() => {
    // Prevent back navigation logic would go here in React Native
    // For web, we can't easily disable back button, but we can handle visibility
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleDone();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleDone = () => {
    trigger('light');
    navigate('/game/role-done', { replace: true });
  };

  if (!currentPlayer) return null;

  if (isBlurred) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg text-center">
        <EyeOff size={64} className="text-text-faint mb-4" />
        <h1 className="text-2xl font-bold text-text-secondary">Screen Hidden</h1>
        <p className="text-text-faint mt-2">Return to the app to continue.</p>
      </div>
    );
  }

  return (
    <div className={`h-full min-h-full flex flex-col p-6 transition-colors duration-500 ${currentPlayer.isFaker ? 'bg-faker' : 'bg-word'}`}>
      <div className="absolute top-8 right-8 w-12 h-12 border-4 border-white/20 border-t-white rounded-full flex items-center justify-center font-extrabold text-sm">
        {timeLeft}s
      </div>
      <motion.div 
        initial={{ y: 50, opacity: 0, rotateX: 90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="flex flex-col items-center w-full h-full text-center"
      >
        <div className="mt-10 mb-6">
          <PlayerCard player={currentPlayer} className="w-24 h-32" />
        </div>

        {currentPlayer.isFaker ? (
          <>
            <div>
              <span className="inline-block bg-black/30 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-[2px] mb-5">SHH... QUIET!</span>
              <h1 className="text-5xl font-display font-black text-white mb-4 uppercase tracking-tight leading-none">You are the Faker</h1>
              <p className="text-lg mt-4 opacity-90 font-medium">{currentPlayer.name}, don't let them catch you.</p>
            </div>
            <div className="bg-black/15 p-6 rounded-2xl text-[15px] leading-relaxed text-white w-full mb-8 mt-4 text-left">
              You don't know the word.<br/><br/>
              Listen to the clues, find the pattern, and blend in perfectly.
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="inline-block bg-black/30 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-[2px] mb-5">{category}</span>
              <h1 className="text-5xl font-display font-black text-white mb-4 uppercase tracking-tight leading-none break-words">{secretWord}</h1>
              <p className="text-lg mt-4 opacity-90 font-medium">{currentPlayer.name}, remember this word.</p>
            </div>
            <div className="bg-black/15 p-6 rounded-2xl text-[15px] leading-relaxed text-white w-full mb-8 mt-4 text-left">
              You know the secret word.<br/><br/>
              Give clues that prove you know it, but don't make it too obvious for the Faker!
            </div>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDone}
          className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] mt-auto mb-4"
        >
          Got it — Done ✓
        </motion.button>
      </motion.div>
    </div>
  );
}
