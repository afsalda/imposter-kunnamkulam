import { Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import PassPhone from './PassPhone';
import RoleReveal from './RoleReveal';
import RoleTransition from './RoleTransition';
import CluePass from './CluePass';
import ClueInput from './ClueInput';
import Discuss from './Discuss';
import VotePass from './VotePass';
import Vote from './Vote';
import VoteReveal from './VoteReveal';
import FakerGuess from './FakerGuess';
import RoundEnd from './RoundEnd';

export default function GameRouter() {
  const { category, roundNumber, settings, players, roleRevealIndex, phase } = useGameStore();

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden font-body text-text-primary">
      {/* Left Sidebar */}
      <div className="hidden lg:flex w-[280px] bg-surface border-r border-border p-10 flex-col gap-8">
        <div className="text-[32px] font-black tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-xl">🎭</div>
          BluffIt
        </div>
        
        <div className="bg-surface-2 p-5 rounded-2xl border border-border">
          <span className="text-[11px] uppercase tracking-[1.5px] text-text-faint mb-2 block font-bold">Category</span>
          <div className="text-lg font-semibold text-text-primary">{category || 'Not Selected'}</div>
        </div>

        <div className="bg-surface-2 p-5 rounded-2xl border border-border">
          <span className="text-[11px] uppercase tracking-[1.5px] text-text-faint mb-2 block font-bold">Game Mode</span>
          <div className="text-lg font-semibold text-text-primary">Pass & Play</div>
        </div>

        <div className="bg-surface-2 p-5 rounded-2xl border border-border">
          <span className="text-[11px] uppercase tracking-[1.5px] text-text-faint mb-2 block font-bold">Round</span>
          <div className="text-lg font-semibold text-text-primary">{roundNumber} of {settings.rounds}</div>
        </div>

        <div className="mt-auto">
          <span className="text-[11px] uppercase tracking-[1.5px] text-text-faint mb-2 block font-bold">Fakers</span>
          <div className="text-lg font-semibold text-text-primary">{settings.fakerCount} PLAYER{settings.fakerCount > 1 ? 'S' : ''}</div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex items-center justify-center relative" style={{ background: 'radial-gradient(circle at 50% 50%, #1a1010 0%, #0d0d0d 100%)' }}>
        <div className="w-full h-full lg:w-[380px] lg:h-[680px] lg:bg-black lg:rounded-[50px] lg:border-[8px] lg:border-[#222] lg:shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_20px_rgba(232,39,42,0.1)] overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative h-full">
            <Routes>
              <Route path="pass" element={<PassPhone />} />
              <Route path="role" element={<RoleReveal />} />
              <Route path="role-done" element={<RoleTransition />} />
              <Route path="clue-pass" element={<CluePass />} />
              <Route path="clue-input" element={<ClueInput />} />
              <Route path="discuss" element={<Discuss />} />
              <Route path="vote-pass" element={<VotePass />} />
              <Route path="vote" element={<Vote />} />
              <Route path="vote-reveal" element={<VoteReveal />} />
              <Route path="faker-guess" element={<FakerGuess />} />
              <Route path="round-end" element={<RoundEnd />} />
              <Route path="*" element={<Navigate to="/setup/passplay" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:flex w-[280px] bg-surface border-l border-border p-10 flex-col">
        <span className="text-[11px] uppercase tracking-[1.5px] text-text-faint mb-6 block font-bold">Players</span>
        <div className="flex flex-col gap-3">
          {players.map((player, idx) => {
            const isActive = phase === 'role-reveal' && idx === roleRevealIndex;
            const isDone = phase === 'role-reveal' && idx < roleRevealIndex;
            
            return (
              <div key={player.id} className={`flex items-center p-3.5 px-4.5 bg-surface-2 rounded-2xl border ${isActive ? 'border-primary bg-primary/5' : 'border-border'} ${isDone ? 'opacity-40' : ''} gap-3`}>
                <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-lg">{player.avatar}</div>
                <span className="flex-1 font-semibold">{player.name}</span>
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary shadow-[0_0_10px_var(--color-primary)]' : isDone ? 'bg-success' : 'bg-text-faint'}`}></div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-dashed border-border">
          <p className="text-[13px] text-text-secondary leading-relaxed m-0">
            <strong>Pro Tip:</strong> If you are caught, you can still win by guessing the secret word!
          </p>
        </div>
      </div>
    </div>
  );
}
