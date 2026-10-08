import { User, Photo, Challenge, Withdrawal, Notification } from '../types';

export const currentUser: User = {
  id: '1',
  username: 'ahmed_photographer',
  email: 'ahmed@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  totalEarnings: 2450,
  totalLikes: 24500,
  isVerified: true,
  isPro: true,
  joinDate: '2024-01-15',
  followers: 1250,
  following: 890
};

export const mockPhotos: Photo[] = [
  {
    id: '1',
    userId: '1',
    username: 'ahmed_photographer',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Golden hour magic in the mountains 🏔️ #landscape #goldenhour #mountains',
    likes: 3420,
    comments: [],
    hashtags: ['landscape', 'goldenhour', 'mountains'],
    uploadDate: '2024-01-20T10:30:00Z',
    earnings: 342,
    isLiked: false
  },
  {
    id: '2',
    userId: '2',
    username: 'sara_creative',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    imageUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Street art speaks louder than words 🎨 #streetart #urban #creativity',
    likes: 2890,
    comments: [],
    hashtags: ['streetart', 'urban', 'creativity'],
    uploadDate: '2024-01-19T15:45:00Z',
    earnings: 289,
    isLiked: true
  },
  {
    id: '3',
    userId: '3',
    username: 'nature_lover_pk',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    imageUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Peaceful morning by the lake 🌅 #nature #lake #peaceful #morning',
    likes: 1560,
    comments: [],
    hashtags: ['nature', 'lake', 'peaceful', 'morning'],
    uploadDate: '2024-01-18T08:20:00Z',
    earnings: 156,
    isLiked: false
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Best Sunset Photography',
    description: 'Capture the most stunning sunset moment',
    prize: 5000,
    endDate: '2024-02-15',
    participants: 234,
    image: 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Urban Life Challenge',
    description: 'Show the beauty of city life',
    prize: 3000,
    endDate: '2024-02-20',
    participants: 189,
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockWithdrawals: Withdrawal[] = [
  {
    id: '1',
    amount: 1000,
    method: 'easypaisa',
    status: 'completed',
    requestDate: '2024-01-15T10:00:00Z',
    completedDate: '2024-01-16T14:30:00Z'
  },
  {
    id: '2',
    amount: 1500,
    method: 'jazzcash',
    status: 'pending',
    requestDate: '2024-01-20T09:15:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'sara_creative liked your photo',
    timestamp: '2024-01-20T14:30:00Z',
    isRead: false,
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    username: 'sara_creative',
    photoId: '1'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'nature_lover_pk commented on your photo',
    timestamp: '2024-01-20T13:45:00Z',
    isRead: false,
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    username: 'nature_lover_pk',
    photoId: '1'
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'photo_enthusiast started following you',
    timestamp: '2024-01-20T12:20:00Z',
    isRead: false,
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    username: 'photo_enthusiast'
  },
  {
    id: '4',
    type: 'withdrawal',
    title: 'Withdrawal Approved',
    message: 'Your withdrawal has been approved and processed',
    timestamp: '2024-01-20T10:15:00Z',
    isRead: true,
    amount: 1000
  },
  {
    id: '5',
    type: 'challenge',
    title: 'Challenge Reminder',
    message: 'Only 2 days left to join "Best Sunset Photography" challenge!',
    timestamp: '2024-01-20T09:00:00Z',
    isRead: true
  },
  {
    id: '6',
    type: 'system',
    title: 'Earnings Update',
    message: 'You earned from likes in the last 24 hours',
    timestamp: '2024-01-19T20:00:00Z',
    isRead: true,
    amount: 45
  },
  {
    id: '7',
    type: 'system',
    title: 'Milestone Reached',
    message: 'Your photo reached 1,000 likes!',
    timestamp: '2024-01-19T18:30:00Z',
    isRead: true,
    amount: 100,
    photoId: '2'
  },
  {
    id: '8',
    type: 'like',
    title: 'New Like',
    message: 'ahmed_photographer liked your photo',
    timestamp: '2024-01-19T16:45:00Z',
    isRead: true,
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    username: 'ahmed_photographer',
    photoId: '3'
  },
  {
    id: '9',
    type: 'withdrawal',
    title: 'Withdrawal Pending',
    message: 'Your withdrawal request is being processed',
    timestamp: '2024-01-19T14:20:00Z',
    isRead: true,
    amount: 1500
  },
  {
    id: '10',
    type: 'follow',
    title: 'New Follower',
    message: 'creative_lens started following you',
    timestamp: '2024-01-19T11:30:00Z',
    isRead: true,
    userAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    username: 'creative_lens'
  }
];