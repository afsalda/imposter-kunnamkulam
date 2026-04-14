import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../hooks/useHaptics';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Smartphone, Globe } from 'lucide-react';

export default function ModeSelect() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const setMode = useGameStore(state => state.setMode);

  const handleSelectMode = (mode: 'passplay' | 'online') => {
    trigger('medium');
    setMode(mode);
    if (mode === 'passplay') {
      navigate('/setup/passplay');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-bg">
      <header className="flex items-center mb-8 pt-4">
        <button 
          onClick={() => { trigger('light'); navigate(-1); }}
          className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Select Mode</h1>
      </header>

      <div className="flex-1 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelectMode('passplay')}
          className="bg-surface border border-border rounded-3xl p-6 flex flex-col items-center text-center shadow-lg"
        >
          <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
            <Smartphone size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Pass & Play</h2>
          <p className="text-text-secondary">
            Single Device. Play together in person by passing one phone around.
          </p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-surface-2 border border-border rounded-3xl p-6 flex flex-col items-center text-center opacity-60 cursor-not-allowed"
        >
          <div className="w-20 h-20 bg-white/5 text-text-secondary rounded-full flex items-center justify-center mb-4">
            <Globe size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Online</h2>
          <p className="text-text-secondary">
            Multiple Devices. Play remotely with friends via room codes. (Coming Soon)
          </p>
        </motion.button>
      </div>
    </div>
  );
}
