export interface Pack {
  id: string;
  name: string;
  emoji: string;
  words: string[];
  ageRestricted?: boolean;
}

export const RANDOM_PACK: Pack = {
  id: 'random',
  name: 'Random Topic',
  emoji: '🎲',
  words: []
};

export const DEFAULT_PACKS: Pack[] = [
  {
    id: 'kerala-food',
    name: 'Kerala Food',
    emoji: '🍛',
    words: ['Puttu', 'Kadala curry', 'Appam', 'Biriyani', 'Parotta', 'Sadya', 'Pazham', 'Chaya', 'Kanji', 'Porotta', 'Beef fry', 'Tapioca', 'Unniyappam', 'Pathiri', 'Avial']
  },
  {
    id: 'kerala-places',
    name: 'Kerala Places',
    emoji: '🌴',
    words: ['Thrissur', 'Kozhikode', 'Munnar', 'Alleppey', 'Wayanad', 'Kochi', 'Palakkad', 'Trivandrum', 'Guruvayur', 'Sabarimala']
  },
  {
    id: 'daily-malayalam-life',
    name: 'Daily Malayalam Life',
    emoji: '🚌',
    words: ['Autorickshaw', 'Harthal', 'Bandh', 'Onam', 'Vishu', 'Church', 'Temple festival', 'Kalyanam', 'Nercha', 'KSRTC bus']
  },
  {
    id: 'malayalam-movies',
    name: 'Malayalam Movies & Entertainment',
    emoji: '🎬',
    words: ['Mohanlal', 'Mammootty', 'Dulquer', 'Fahadh', 'OTT', 'Thallumaala', 'Premalu', 'Pulimurugan']
  },
  {
    id: 'kerala-jobs',
    name: 'Kerala Jobs & Life',
    emoji: '💼',
    words: ['Gulf job', 'Pravasi', 'Chit fund', 'Rubber tapping', 'Paddy field', 'Toddy shop', 'PSC exam', 'Government job']
  },
  {
    id: 'kerala-sports',
    name: 'Kerala Sports & Fun',
    emoji: '⚽',
    words: ['Cricket', 'Football', 'Kabbadi', 'Boat race', 'Kalaripayattu', 'Volleyball']
  }
];
