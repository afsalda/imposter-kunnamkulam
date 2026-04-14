import React from 'react';
import { motion } from 'motion/react';
import { Player } from '../utils/gameLogic';

interface PlayerCardProps {
  player: Player;
  isLarge?: boolean;
  isGlow?: boolean;
  index?: number;
  className?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  isLarge = false, 
  isGlow = false,
  index = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        damping: 12, 
        stiffness: 200,
        delay: index * 0.1 
      }}
      whileHover={{ rotate: 2, scale: 1.05 }}
      className={`relative rounded-[20px] flex flex-col items-center justify-center overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.3)] ${
        isLarge ? 'w-[200px] h-[250px]' : 'w-[160px] h-[200px]'
      } ${isGlow ? 'animate-glow' : ''} ${className}`}
      style={{ backgroundColor: player.avatarColor }}
    >
      <div className={`${isLarge ? 'text-[100px]' : 'text-[80px]'} flex-1 flex items-center justify-center`}>
        {player.avatar}
      </div>
      <div className="w-full bg-black/20 py-3 text-center">
        <span className="text-white font-bold text-lg uppercase tracking-wide px-2 block truncate">
          {player.name}
        </span>
      </div>
      
      {/* Sparkle effect on mount */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="absolute top-2 right-2 text-2xl"
      >
        ✨
      </motion.div>
    </motion.div>
  );
};
