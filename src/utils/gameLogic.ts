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
  // Fisher-Yates shuffle for proper randomization
  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.map((player, index) => ({
    ...player,
    isFaker: index < fakerCount
  }));
}

export function pickRandomWord(pack: Pack): { word: string; category: string } {
  const word = pack.words[Math.floor(Math.random() * pack.words.length)];
  return { word, category: pack.name };
}
