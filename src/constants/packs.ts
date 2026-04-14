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
  },
  {
    id: 'bollywood',
    name: 'Bollywood & Hindi Cinema',
    emoji: '🎬',
    words: ['Shah Rukh Khan', 'Salman Khan', 'Aamir Khan', 'Dhoom', 'Dilwale', 'Pathaan', 'KGF', 'RRR', 'Pushpa', 'Bahubali', 'Rowdy Rathore', 'Dabangg', 'Bajrangi Bhaijaan']
  },
  {
    id: 'indian-street-food',
    name: 'Indian Street Food',
    emoji: '🥙',
    words: ['Pani puri', 'Vada pav', 'Samosa', 'Chai', 'Maggi', 'Pav bhaji', 'Chaat', 'Dosa', 'Idli', 'Biryani', 'Golgappa', 'Bhel puri', 'Chole bhature', 'Jalebi', 'Lassi']
  },
  {
    id: 'indian-festivals',
    name: 'Indian Festivals',
    emoji: '🪔',
    words: ['Diwali', 'Holi', 'Eid', 'Christmas', 'Durga Puja', 'Ganesh Chaturthi', 'Navratri', 'Raksha Bandhan', 'Janmashtami', 'Baisakhi', 'Pongal', 'Onam', 'Vishu', 'Lohri']
  },
  {
    id: 'indian-daily-life',
    name: 'Indian Daily Life',
    emoji: '🇮🇳',
    words: ['IRCTC', 'Auto rickshaw', 'Jugaad', 'Chai break', 'Power cut', 'Load shedding', 'Aadhaar card', 'UPI payment', 'Zomato', 'Swiggy', 'OYO', 'NEET exam', 'Board exam', 'Tuition class', 'Joint family', 'Arranged marriage', 'Cricket match']
  },
  {
    id: 'famous-indians',
    name: 'Famous Indians',
    emoji: '🌟',
    words: ['Virat Kohli', 'MS Dhoni', 'Sachin Tendulkar', 'Narendra Modi', 'APJ Abdul Kalam', 'Amitabh Bachchan', 'Sundar Pichai', 'Priyanka Chopra', 'AR Rahman', 'Anoushka Sharma']
  },
  {
    id: 'indian-places',
    name: 'Indian Places & Travel',
    emoji: '🕌',
    words: ['Taj Mahal', 'Goa beach', 'Shimla', 'Manali', 'Jaipur', 'Mumbai local', 'Delhi metro', 'Varanasi', 'Golden Temple', 'Mysore palace']
  },
  {
    id: 'indian-sports',
    name: 'Indian Games & Sports',
    emoji: '🏏',
    words: ['Cricket', 'Kabaddi', 'Gilli danda', 'Pitthu', 'Kho kho', 'Carrom board', 'Ludo', 'Chess', 'IPL', 'Pro Kabaddi']
  }
];
