export interface AppChallenge {
  id: string;
  title: string;
  description: string;
  prize: number;
  type: 'daily' | 'monthly' | 'yearly';
  category: 'photography' | 'engagement' | 'creativity' | 'community';
  participants: number;
  endDate: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requirements: string[];
  status: 'active' | 'upcoming' | 'ended';
}

export const appChallenges: AppChallenge[] = [
  // Daily Challenges
  {
    id: '1',
    title: 'Golden Hour Magic',
    description: 'Capture the perfect golden hour moment',
    prize: 500,
    type: 'daily',
    category: 'photography',
    participants: 234,
    endDate: '2024-01-21T23:59:59Z',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'easy',
    requirements: ['Take photo during golden hour', 'Use #goldenhour hashtag', 'Minimum 100 likes'],
    status: 'active'
  },
  {
    id: '2',
    title: 'Street Photography',
    description: 'Show the beauty of urban life',
    prize: 750,
    type: 'daily',
    category: 'photography',
    participants: 189,
    endDate: '2024-01-21T23:59:59Z',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'medium',
    requirements: ['Urban setting required', 'Black & white preferred', 'Use #streetphotography'],
    status: 'active'
  },
  {
    id: '3',
    title: 'Like Master',
    description: 'Get the most likes in 24 hours',
    prize: 300,
    type: 'daily',
    category: 'engagement',
    participants: 456,
    endDate: '2024-01-21T23:59:59Z',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    requirements: ['Post any photo', 'Get maximum likes', 'No fake engagement'],
    status: 'active'
  },

  // Monthly Challenges
  {
    id: '4',
    title: 'Nature\'s Best',
    description: 'Showcase the most stunning nature photography',
    prize: 5000,
    type: 'monthly',
    category: 'photography',
    participants: 1234,
    endDate: '2024-01-31T23:59:59Z',
    image: 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'medium',
    requirements: ['Nature theme only', 'Original content', 'Minimum 500 likes', 'Use #naturebest'],
    status: 'active'
  },
  {
    id: '5',
    title: 'Portrait Master',
    description: 'Create the most compelling portrait',
    prize: 7500,
    type: 'monthly',
    category: 'photography',
    participants: 892,
    endDate: '2024-01-31T23:59:59Z',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    requirements: ['Human subject required', 'Professional quality', 'Creative composition'],
    status: 'active'
  },
  {
    id: '6',
    title: 'Community Builder',
    description: 'Gain the most followers this month',
    prize: 3000,
    type: 'monthly',
    category: 'community',
    participants: 567,
    endDate: '2024-01-31T23:59:59Z',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    requirements: ['Organic growth only', 'Engage with community', 'Quality content'],
    status: 'active'
  },

  // Yearly Challenges
  {
    id: '7',
    title: 'Photographer of the Year',
    description: 'The ultimate photography competition',
    prize: 50000,
    type: 'yearly',
    category: 'photography',
    participants: 5678,
    endDate: '2024-12-31T23:59:59Z',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    requirements: ['Portfolio submission', 'Minimum 10 photos', 'Consistent quality', 'Community votes'],
    status: 'active'
  },
  {
    id: '8',
    title: 'Top Earner Challenge',
    description: 'Earn the most money from your photos',
    prize: 25000,
    type: 'yearly',
    category: 'engagement',
    participants: 3456,
    endDate: '2024-12-31T23:59:59Z',
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    requirements: ['Track total earnings', 'Consistent posting', 'High engagement'],
    status: 'active'
  },
  {
    id: '9',
    title: 'Innovation Award',
    description: 'Most creative and innovative photography',
    prize: 35000,
    type: 'yearly',
    category: 'creativity',
    participants: 2345,
    endDate: '2024-12-31T23:59:59Z',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    requirements: ['Unique concepts', 'Technical excellence', 'Artistic vision'],
    status: 'active'
  }
];

export const getChallenge = (id: string) => appChallenges.find((c) => c.id === id) ?? appChallenges[0];
