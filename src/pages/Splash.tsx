import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHaptics } from '../hooks/useHaptics';

const logoImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0M5QTIyNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAyMnM4LTQgOC0xMFY1bC04LTMtOCAzdjdjMCA2IDggMTAgOCAxMHoiLz48cGF0aCBkPSJNMTIgOHY0Ii8+PHBhdGggZD0iTTEyIDE2aC4wMSIvPjwvc3ZnPg==";

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
        className="flex flex-col items-center mb-12"
      >
        <img 
          src={logoImg}
          alt="വഞ്ചകൻ Logo"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '50%',
            display: 'block',
            margin: '0 auto 20px auto',
            border: '3px solid #C9A227',
            filter: 'drop-shadow(0 0 20px rgba(201,162,39,0.7))'
          }}
        />
        <h1 className="text-6xl font-black tracking-tight mb-4 font-malayalam text-white text-center">വഞ്ചകൻ</h1>
        <p className="font-malayalam text-[clamp(14px,2.5vw,18px)] text-white/85 text-center max-w-[320px] mx-auto leading-[1.6]">
          വാക്കുകളുടെയും വഞ്ചനയുടെയും സോഷ്യൽ ഡിഡക്ഷൻ പാർട്ടി ഗെയിം.
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
