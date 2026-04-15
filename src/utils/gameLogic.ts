import { Pack } from '../constants/packs';

export interface Player {
  id: string;
  name: string;
  avatar: string; // emoji
  avatarId: string;
  avatarColor: string;
  isFaker: boolean;
}

export function assignRoles(players: Player[], fakerCount: 1 | 2): Player[] {
  // Randomly select faker indices (not tied to shuffle position)
  const indices = [...Array(players.length).keys()];
  // Fisher-Yates shuffle indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  // First N shuffled indices are faker positions
  const fakerIndices = new Set(indices.slice(0, fakerCount));
  
  // Optionally shuffle player order for reveal sequence
  const shuffledPlayers = [...players];
  for (let i = shuffledPlayers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
  }
  
  return shuffledPlayers.map((player, index) => ({
    ...player,
    isFaker: fakerIndices.has(index)
  }));
}

export function pickRandomWord(pack: Pack): { word: string; category: string } {
  const word = pack.words[Math.floor(Math.random() * pack.words.length)];
  return { word, category: pack.name };
}
