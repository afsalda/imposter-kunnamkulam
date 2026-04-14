import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { DEFAULT_PACKS } from '../../constants/packs';
import { ArrowLeft, Plus, X, Settings2 } from 'lucide-react';

export default function PassPlaySetup() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { 
    players, addPlayer, removePlayer, 
    selectedPack, setSelectedPack,
    settings, setSettings,
    startGame 
  } = useGameStore();
  
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleAddPlayer = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newPlayerName.trim().length > 0 && players.length < 10) {
      trigger('light');
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleStart = () => {
    if (players.length >= 3) {
      trigger('heavy');
      startGame();
      navigate('/game/pass');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="flex items-center justify-between p-6 pb-2">
        <div className="flex items-center">
          <button 
            onClick={() => { trigger('light'); navigate(-1); }}
            className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Setup Game</h1>
        </div>
        <button 
          onClick={() => { trigger('light'); setShowSettings(!showSettings); }}
          className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-primary text-white' : 'bg-surface-2 text-text-secondary'}`}
        >
          <Settings2 size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Players Section */}
        <section className="mb-8 mt-4">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold text-text-secondary uppercase tracking-wider">Players ({players.length}/10)</h2>
            {players.length < 3 && <span className="text-primary text-sm font-medium">Need {3 - players.length} more</span>}
          </div>
          
          <form onSubmit={handleAddPlayer} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name..."
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-white placeholder-text-faint focus:outline-none focus:border-primary transition-colors"
              maxLength={12}
            />
            <button 
              type="submit"
              disabled={!newPlayerName.trim() || players.length >= 10}
              className="bg-primary text-white rounded-xl px-4 py-3 disabled:opacity-50 transition-opacity flex items-center justify-center"
            >
              <Plus size={24} />
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {players.map(player => (
                <motion.div
                  key={player.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-surface-2 border border-border rounded-full pl-3 pr-1 py-1 flex items-center gap-2"
                >
                  <span className="font-medium">{player.name}</span>
                  <button 
                    onClick={() => { trigger('light'); removePlayer(player.id); }}
                    className="w-6 h-6 rounded-full bg-bg flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Packs Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-text-secondary uppercase tracking-wider mb-4">Word Pack</h2>
          <div className="flex overflow-x-auto gap-3 pb-4 -mx-6 px-6 snap-x">
            {DEFAULT_PACKS.map(pack => (
              <button
                key={pack.id}
                onClick={() => { trigger('light'); setSelectedPack(pack); }}
                className={`snap-center shrink-0 w-32 aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                  selectedPack.id === pack.id 
                    ? 'bg-primary border-2 border-primary shadow-[0_0_20px_rgba(232,39,42,0.3)]' 
                    : 'bg-surface border border-border hover:bg-surface-2'
                }`}
              >
                <span className="text-3xl">{pack.emoji}</span>
                <span className="font-bold text-sm text-center px-2">{pack.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Settings Section */}
        <AnimatePresence>
          {showSettings && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-surface border border-border rounded-2xl p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Timer (seconds)</span>
                  <div className="flex bg-bg rounded-lg p-1">
                    {[30, 60, 90].map(t => (
                      <button
                        key={t}
                        onClick={() => { trigger('light'); setSettings({ timerDuration: t as any }); }}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${settings.timerDuration === t ? 'bg-surface-2 text-white' : 'text-text-secondary'}`}
                      >
                        {t}s
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Number of Fakers</span>
                  <div className="flex bg-bg rounded-lg p-1">
                    {[1, 2].map(n => (
                      <button
                        key={n}
                        onClick={() => { trigger('light'); setSettings({ fakerCount: n as any }); }}
                        disabled={players.length < 5 && n === 2}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${settings.fakerCount === n ? 'bg-surface-2 text-white' : 'text-text-secondary'} disabled:opacity-30`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent">
        <motion.button
          whileHover={{ scale: players.length >= 3 ? 1.02 : 1 }}
          whileTap={{ scale: players.length >= 3 ? 0.98 : 1 }}
          onClick={handleStart}
          disabled={players.length < 3}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:bg-surface-2 disabled:text-text-secondary transition-all"
        >
          {players.length < 3 ? `Add ${3 - players.length} more players` : 'Start Game'}
        </motion.button>
      </div>
    </div>
  );
}
