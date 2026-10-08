'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Verified } from 'lucide-react';
import PhotoSwiper from './PhotoSwiper';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface Photo {
  id: string;
  user_id: string;
  image_urls: string[];
  caption: string;
  hashtags: string[];
  likes_count: number;
  comments_count: number;
  earnings: number;
  created_at: string;
  profiles: {
    username: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

interface MobilePhotoCardProps {
  photo: Photo;
  onLike?: (photoId: string) => void;
}

export default function MobilePhotoCard({ photo, onLike }: MobilePhotoCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(photo.likes_count);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like photos');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isLiked) {
        setIsLiked(false);
        setLikes(prev => prev - 1);
        toast.success('Like removed');
      } else {
        setIsLiked(true);
        setLikes(prev => prev + 1);
        toast.success('Photo liked! +PKR 0.1 earned', {
          icon: '❤️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
      onLike?.(photo.id);
    } catch (error) {
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={photo.profiles.avatar_url || `https://ui-avatars.com/api/?name=${photo.profiles.username}&background=7c3aed&color=fff`}
            alt={photo.profiles.username}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900 text-sm">{photo.profiles.username}</h3>
              {photo.profiles.is_verified && (
                <Verified className="w-3 h-3 text-blue-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">{timeAgo(photo.created_at)}</p>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Photo Swiper */}
      <PhotoSwiper images={photo.image_urls} />

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium text-sm">{formatNumber(likes)}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">{photo.comments_count}</span>
            </button>
            <button className="text-gray-600 hover:text-green-500 transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            PKR {Math.floor(photo.earnings)}
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-gray-900 text-sm">
            <span className="font-semibold">{photo.profiles.username}</span> {photo.caption}
          </p>
          {photo.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {photo.hashtags.map((tag, index) => (
                <span key={index} className="text-blue-600 text-sm hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500">
            {formatNumber(likes)} likes = PKR {Math.floor(likes * 0.1)}
          </p>
        </div>
      </div>
    </div>
  );
}