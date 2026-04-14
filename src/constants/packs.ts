export interface Pack {
  id: string;
  name: string;
  emoji: string;
  words: string[];
  ageRestricted?: boolean;
}

export const DEFAULT_PACKS: Pack[] = [
  {
    id: 'food',
    name: '🍕 Food',
    emoji: '🍕',
    words: ['Pizza', 'Sushi', 'Burger', 'Tacos', 'Pasta', 'Ramen', 'Curry', 'Steak', 'Salad', 'Ice Cream', 'Chocolate', 'Pancakes', 'Waffles', 'Sandwich', 'Noodles', 'Fried Rice', 'Cheesecake', 'Dumplings', 'Hot Dog', 'Biryani']
  },
  {
    id: 'sports',
    name: '⚽ Sports', 
    emoji: '⚽',
    words: ['Football', 'Cricket', 'Tennis', 'Basketball', 'Swimming', 'Boxing', 'Golf', 'Baseball', 'Volleyball', 'Badminton', 'Cycling', 'Wrestling', 'Archery', 'Gymnastics', 'Athletics']
  },
  {
    id: 'movies',
    name: '🎬 Movies',
    emoji: '🎬',
    words: ['Avatar', 'Titanic', 'Avengers', 'Batman', 'Inception', 'Interstellar', 'Frozen', 'Lion King', 'Joker', 'Parasite', 'Dunkirk', 'Oppenheimer', 'Barbie', 'Top Gun', 'The Matrix']
  },
  {
    id: 'animals',
    name: '🦁 Animals',
    emoji: '🦁',
    words: ['Elephant', 'Lion', 'Dolphin', 'Penguin', 'Cheetah', 'Gorilla', 'Peacock', 'Crocodile', 'Kangaroo', 'Flamingo', 'Panda', 'Tiger', 'Giraffe', 'Chameleon', 'Octopus']
  },
  {
    id: 'places',
    name: '🌍 Places',
    emoji: '🌍',
    words: ['Paris', 'Tokyo', 'Dubai', 'New York', 'London', 'Sydney', 'Cairo', 'Mumbai', 'Rome', 'Barcelona', 'Maldives', 'Bali', 'Las Vegas', 'Istanbul', 'Singapore']
  },
  {
    id: 'celebrities',
    name: '⭐ Celebrities',
    emoji: '⭐',
    words: ['Elon Musk', 'Virat Kohli', 'Cristiano Ronaldo', 'Taylor Swift', 'Lionel Messi', 'Beyoncé', 'Shah Rukh Khan', 'Dwayne Johnson', 'Priyanka Chopra', 'BTS', 'Will Smith', 'Billie Eilish']
  },
  {
    id: 'party-time',
    name: '🎉 Party Time',
    emoji: '🎉',
    words: ['Dance Floor', 'DJ Booth', 'Confetti', 'Champagne', 'Karaoke', 'Photo Booth', 'Limbo', 'Disco Ball', 'Birthday Cake', 'Streamers', 'Shots', 'Hangover', 'Uber Home', 'Snapchat']
  },
  {
    id: 'science',
    name: '🔬 Science',
    emoji: '🔬',
    words: ['Black Hole', 'DNA', 'Volcano', 'Gravity', 'Photosynthesis', 'Atom', 'Ecosystem', 'Evolution', 'Radiation', 'Quantum', 'Telescope', 'Neuron', 'Fossil', 'Mutation', 'Galaxy']
  },
  {
    id: 'spicy',
    name: '🌶️ Spicy (18+)',
    emoji: '🌶️',
    words: ['First Kiss', 'Walk of Shame', 'Tinder', 'Ghosted', 'Situationship', 'Body Count', 'Red Flag', 'Soft Launch', 'Talking Stage', 'Netflix & Chill', 'Rizz', 'Sneaky Link'],
    ageRestricted: true
  },
  {
    id: 'technology',
    name: '💻 Technology',
    emoji: '💻',
    words: ['Artificial Intelligence', 'Blockchain', 'Cloud Computing', 'Cybersecurity', 'App Store', 'WiFi', 'Algorithm', 'Bitcoin', 'VR Headset', 'Chatbot', 'Data Center', 'Deepfake']
  }
];
