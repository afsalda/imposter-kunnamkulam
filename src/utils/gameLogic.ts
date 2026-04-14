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
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return shuffled.map((player, index) => ({
    ...player,
    isFaker: index < fakerCount
  }));
}

export function pickRandomWord(pack: Pack): { word: string; category: string } {
  const word = pack.words[Math.floor(Math.random() * pack.words.length)];
  return { word, category: pack.name };
}
