import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../hooks/useHaptics';

export default function Splash() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();

  const handlePlayNow = () => {
    trigger('light');
    navigate('/mode');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg relative overflow-hidden">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="flex flex-col items-center mb-16"
      >
        <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(232,39,42,0.3)]">
          <span className="text-6xl">🎭</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-2">BluffIt</h1>
        <p className="text-text-secondary text-lg text-center max-w-[250px]">
          The social deduction party game of words and deception.
        </p>
      </motion.div>

      <div className="w-full max-w-sm space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlayNow}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg"
        >
          Play Now
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-surface-2 text-text-primary rounded-2xl font-bold text-lg border border-border opacity-50 cursor-not-allowed"
        >
          Join Room (Soon)
        </motion.button>
      </div>
      
      <div className="absolute bottom-8 flex space-x-6 text-text-faint font-medium text-sm">
        <button className="hover:text-text-secondary transition-colors">My Packs</button>
        <button className="hover:text-text-secondary transition-colors">How to Play</button>
      </div>
    </div>
  );
}
