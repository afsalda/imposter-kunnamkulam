import { create } from 'zustand';
import { GameSettings, DEFAULT_SETTINGS } from '../constants/settings';
import { Pack, DEFAULT_PACKS, RANDOM_PACK } from '../constants/packs';
import { Player, assignRoles, pickRandomWord } from '../utils/gameLogic';

export type GamePhase = 
  | 'setup'
  | 'role-reveal'      // Pass & Play: sequential private reveal
  | 'clue-collection'  // Pass & Play: sequential clue entry
  | 'discussion'       // All clues visible, timer
  | 'voting'           // Pass & Play: sequential private vote
  | 'vote-reveal'      // Animated tally
  | 'faker-guess'      // Faker's last chance
  | 'round-end';       // Scores + replay

export interface Clue {
  playerId: string;
  playerName: string;
  clue: string;
  submittedAt: number;
}

export interface Vote {
  voterId: string;
  targetId: string;
}

interface GameStore {
  // Setup
  mode: 'passplay' | 'online' | null;
  players: Player[];
  settings: GameSettings;
  selectedPack: Pack;
  
  // Game State
  phase: GamePhase;
  currentPlayerIndex: number;
  fakers: string[]; // player IDs
  secretWord: string;
  category: string;
  clues: Clue[];
  votes: Vote[];
  scores: Record<string, number>;
  roundNumber: number;
  
  // Pass & Play specific
  roleRevealIndex: number;  // which player is currently seeing their role
  voteIndex: number;        // which player is currently voting
  
  // Random Pack tracking
  usedRandomPacks: string[];

  // Actions
  setMode: (mode: 'passplay' | 'online' | null) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setSettings: (settings: Partial<GameSettings>) => void;
  setSelectedPack: (pack: Pack) => void;
  startGame: () => void;
  assignRoles: () => void;
  nextRoleReveal: () => void;
  startClueCollection: () => void;
  submitClue: (playerId: string, clue: string) => void;
  startDiscussion: () => void;
  startVoting: () => void;
  submitVote: (voterId: string, targetId: string) => void;
  revealVotes: () => void;
  submitFakerGuess: (guess: string) => void;
  nextPhase: (phase: GamePhase) => void;
  calculateScores: (fakerCaught: boolean, fakerGuessedCorrectly: boolean) => void;
  nextRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  mode: null,
  players: [],
  settings: DEFAULT_SETTINGS,
  selectedPack: RANDOM_PACK,
  
  phase: 'setup',
  currentPlayerIndex: 0,
  fakers: [],
  secretWord: '',
  category: '',
  clues: [],
  votes: [],
  scores: {},
  roundNumber: 1,
  
  roleRevealIndex: 0,
  voteIndex: 0,
  usedRandomPacks: [],

  setMode: (mode) => set({ mode }),
  
  addPlayer: (name) => set((state) => {
    const newPlayer: Player = {
      id: Math.random().toString(36).substring(7),
      name,
      avatar: '👤', // Default avatar
      isFaker: false
    };
    const newScores = { ...state.scores, [newPlayer.id]: 0 };
    return { players: [...state.players, newPlayer], scores: newScores };
  }),
  
  removePlayer: (id) => set((state) => {
    const newScores = { ...state.scores };
    delete newScores[id];
    return { 
      players: state.players.filter(p => p.id !== id),
      scores: newScores
    };
  }),

  setSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings }
  })),

  setSelectedPack: (pack) => set({ selectedPack: pack }),

  startGame: () => {
    get().assignRoles();
    set({
      phase: 'role-reveal',
      roleRevealIndex: 0,
      clues: [],
      votes: [],
      currentPlayerIndex: 0,
      voteIndex: 0
    });
  },

  assignRoles: () => set((state) => {
    let players = state.players;
    if (state.settings.shufflePlayers) {
      players = [...players].sort(() => Math.random() - 0.5);
    }
    const playersWithRoles = assignRoles(players, state.settings.fakerCount);
    
    let packToUse = state.selectedPack;
    let newUsedRandomPacks = [...state.usedRandomPacks];

    if (packToUse.id === 'random') {
      let availablePacks = DEFAULT_PACKS.filter(p => !newUsedRandomPacks.includes(p.id));
      if (availablePacks.length === 0) {
        // Reset if all used
        availablePacks = [...DEFAULT_PACKS];
        newUsedRandomPacks = [];
      }
      packToUse = availablePacks[Math.floor(Math.random() * availablePacks.length)];
      newUsedRandomPacks.push(packToUse.id);
    }

    const { word, category } = pickRandomWord(packToUse);
    
    return {
      players: playersWithRoles,
      fakers: playersWithRoles.filter(p => p.isFaker).map(p => p.id),
      secretWord: word,
      category: category,
      usedRandomPacks: newUsedRandomPacks
    };
  }),

  nextRoleReveal: () => set((state) => {
    if (state.roleRevealIndex < state.players.length - 1) {
      return { roleRevealIndex: state.roleRevealIndex + 1 };
    } else {
      return { phase: 'clue-collection', currentPlayerIndex: 0 };
    }
  }),

  startClueCollection: () => set({ phase: 'clue-collection', currentPlayerIndex: 0 }),

  submitClue: (playerId, clue) => set((state) => {
    const player = state.players.find(p => p.id === playerId);
    const newClue: Clue = {
      playerId,
      playerName: player?.name || 'Unknown',
      clue,
      submittedAt: Date.now()
    };
    
    const newClues = [...state.clues, newClue];
    
    if (state.currentPlayerIndex < state.players.length - 1) {
      return { clues: newClues, currentPlayerIndex: state.currentPlayerIndex + 1 };
    } else {
      return { clues: newClues, phase: 'discussion' };
    }
  }),

  startDiscussion: () => set({ phase: 'discussion' }),

  startVoting: () => set({ phase: 'voting', voteIndex: 0 }),

  submitVote: (voterId, targetId) => set((state) => {
    const newVote: Vote = { voterId, targetId };
    const newVotes = [...state.votes, newVote];
    
    if (state.voteIndex < state.players.length - 1) {
      return { votes: newVotes, voteIndex: state.voteIndex + 1 };
    } else {
      return { votes: newVotes, phase: 'vote-reveal' };
    }
  }),

  revealVotes: () => set({ phase: 'vote-reveal' }),

  submitFakerGuess: (guess) => set((state) => {
    const isCorrect = guess.toLowerCase().trim() === state.secretWord.toLowerCase().trim();
    get().calculateScores(true, isCorrect);
    return { phase: 'round-end' };
  }),

  nextPhase: (phase) => set({ phase }),

  calculateScores: (fakerCaught, fakerGuessedCorrectly) => set((state) => {
    const newScores = { ...state.scores };
    
    if (!fakerCaught) {
      // Scenario 2: Faker Wins
      state.fakers.forEach(fId => newScores[fId] += 3);
    } else if (fakerCaught && !fakerGuessedCorrectly) {
      // Scenario 1: Group Wins
      state.players.forEach(p => {
        if (!p.isFaker) newScores[p.id] += 2;
      });
    } else if (fakerCaught && fakerGuessedCorrectly) {
      // Scenario 3: Split
      state.fakers.forEach(fId => newScores[fId] += 2);
      state.players.forEach(p => {
        if (!p.isFaker) newScores[p.id] += 1;
      });
    }
    
    return { scores: newScores };
  }),

  nextRound: () => {
    get().assignRoles();
    set((state) => ({
      roundNumber: state.roundNumber + 1,
      phase: 'role-reveal',
      roleRevealIndex: 0,
      clues: [],
      votes: [],
      currentPlayerIndex: 0,
      voteIndex: 0
    }));
  },

  resetGame: () => set({
    phase: 'setup',
    currentPlayerIndex: 0,
    fakers: [],
    secretWord: '',
    category: '',
    clues: [],
    votes: [],
    scores: Object.fromEntries(get().players.map(p => [p.id, 0])),
    roundNumber: 1,
    roleRevealIndex: 0,
    voteIndex: 0,
    usedRandomPacks: []
  })
}));
