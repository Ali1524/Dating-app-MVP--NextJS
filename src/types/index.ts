export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  totalEarnings: number;
  totalLikes: number;
  isVerified: boolean;
  isPro: boolean;
  joinDate: string;
  followers: number;
  following: number;
}

export interface Photo {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  hashtags: string[];
  uploadDate: string;
  earnings: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  prize: number;
  endDate: string;
  participants: number;
  image: string;
}

export interface Withdrawal {
  id: string;
  amount: number;
  method: 'easypaisa' | 'jazzcash' | 'bank';
  status: 'pending' | 'approved' | 'completed';
  requestDate: string;
  completedDate?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'withdrawal' | 'challenge' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  userAvatar?: string;
  username?: string;
  photoId?: string;
  amount?: number;
}