import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useHaptics } from '../../hooks/useHaptics';
import { useGameStore } from '../../store/gameStore';
import { PlayerCard } from '../../components/PlayerCard';

export default function VoteReveal() {
  const navigate = useNavigate();
  const { trigger } = useHaptics();
  const { players, votes, fakers, calculateScores } = useGameStore();
  
  const [revealedCount, setRevealedCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Tally votes
  const voteTally = votes.reduce((acc, vote) => {
    acc[vote.targetId] = (acc[vote.targetId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Find player with most votes
  let maxVotes = 0;
  let mostVotedPlayerId: string | null = null;
  let isTie = false;

  Object.entries(voteTally).forEach(([id, count]) => {
    if (count > maxVotes) {
      maxVotes = count;
      mostVotedPlayerId = id;
      isTie = false;
    } else if (count === maxVotes) {
      isTie = true;
    }
  });

  const mostVotedPlayer = players.find(p => p.id === mostVotedPlayerId);
  const isFakerCaught = !isTie && mostVotedPlayerId && fakers.includes(mostVotedPlayerId);

  useEffect(() => {
    if (revealedCount < votes.length) {
      const timer = setTimeout(() => {
        trigger('light');
        setRevealedCount(c => c + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (!showResult) {
      const timer = setTimeout(() => {
        trigger('heavy');
        setShowResult(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [revealedCount, votes.length, showResult, trigger]);

  const handleNext = () => {
    trigger('medium');
    if (isFakerCaught) {
      navigate('/game/faker-guess');
    } else {
      calculateScores(false, false);
      navigate('/game/round-end');
    }
  };

  return (
    <div className="h-full min-h-full flex flex-col p-6 bg-bg">
      <header className="mb-8 pt-4 text-center">
        <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">The Votes Are In</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        {!showResult ? (
          <div className="w-full max-w-sm space-y-4">
            <AnimatePresence>
              {votes.slice(0, revealedCount).map((vote, index) => {
                const voter = players.find(p => p.id === vote.voterId);
                const target = players.find(p => p.id === vote.targetId);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50, rotateX: -90 }}
                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                    className="bg-surface-2 border-2 border-border rounded-2xl p-4 flex items-center gap-4"
                  >
                    {voter && <PlayerCard player={voter} className="w-12 h-16 shrink-0" />}
                    <div className="flex-1">
                      <span className="text-text-secondary text-xs font-black uppercase tracking-widest block mb-1">{voter?.name} voted for</span>
                      <span className="text-white font-black text-xl uppercase tracking-tight">{target?.name}</span>
                    </div>
                    {target && <PlayerCard player={target} className="w-12 h-16 shrink-0" />}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {revealedCount < votes.length && (
              <div className="text-center text-text-faint mt-8 animate-pulse font-black uppercase tracking-[3px] text-xs">
                Revealing votes...
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-center w-full max-w-sm"
          >
            {isTie ? (
              <>
                <div className="text-6xl mb-6">🤝</div>
                <h1 className="text-5xl font-display font-black text-warning mb-4 uppercase tracking-tight">It's a Tie!</h1>
                <p className="text-text-secondary text-lg mb-8 font-medium">The group couldn't decide.</p>
              </>
            ) : (
              <>
                <div className="mb-8 flex justify-center">
                  {mostVotedPlayer && <PlayerCard player={mostVotedPlayer} isLarge isGlow />}
                </div>
                <h1 className={`text-5xl font-display font-black mb-2 uppercase tracking-tight leading-none ${isFakerCaught ? 'text-success' : 'text-primary'}`}>
                  {isFakerCaught ? 'Faker Caught!' : 'Faker Escaped!'}
                </h1>
                <p className="text-white text-xl font-black mb-2 mt-6 uppercase tracking-tight">
                  {mostVotedPlayer?.name} received {maxVotes} votes.
                </p>
                <p className="text-text-secondary mb-8 font-bold uppercase tracking-widest text-sm">
                  {isFakerCaught ? 'They were indeed the Faker.' : 'They were NOT the Faker.'}
                </p>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-full py-5 bg-white text-black rounded-2xl font-extrabold text-lg uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] mt-auto mb-4"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
