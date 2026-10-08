'use client';

import React, { useState, useEffect } from 'react';
import MobilePhotoCard from './MobilePhotoCard';
import toast from 'react-hot-toast';

// Mock photos data
const mockPhotos = [
  {
    id: '1',
    user_id: '1',
    image_urls: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    caption: 'Golden hour magic in the mountains 🏔️ #landscape #goldenhour #mountains',
    hashtags: ['landscape', 'goldenhour', 'mountains'],
    likes_count: 3420,
    comments_count: 45,
    earnings: 342,
    created_at: '2024-01-20T10:30:00Z',
    profiles: {
      username: 'ahmed_photographer',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      is_verified: true
    }
  },
  {
    id: '2',
    user_id: '2',
    image_urls: [
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    caption: 'Street art speaks louder than words 🎨 #streetart #urban #creativity',
    hashtags: ['streetart', 'urban', 'creativity'],
    likes_count: 2890,
    comments_count: 32,
    earnings: 289,
    created_at: '2024-01-19T15:45:00Z',
    profiles: {
      username: 'sara_creative',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      is_verified: false
    }
  },
  {
    id: '3',
    user_id: '3',
    image_urls: [
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    caption: 'Peaceful morning by the lake 🌅 #nature #lake #peaceful #morning',
    hashtags: ['nature', 'lake', 'peaceful', 'morning'],
    likes_count: 1560,
    comments_count: 18,
    earnings: 156,
    created_at: '2024-01-18T08:20:00Z',
    profiles: {
      username: 'nature_lover_pk',
      avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      is_verified: true
    }
  }
];

export default function MobileFeed() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPhotos = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPhotos(mockPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error('Failed to load photos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleLike = (photoId: string) => {
    // Update local state
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes_count: photo.likes_count + 1, earnings: (photo.likes_count + 1) * 0.1 }
        : photo
    ));
    toast.success('Photo liked!');
  };

  const handleRefresh = () => {
    loadPhotos(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="flex items-center justify-center py-4 bg-purple-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mr-2"></div>
          <span className="text-purple-600 text-sm">Refreshing...</span>
        </div>
      )}

      {/* Stories placeholder */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex space-x-4 overflow-x-auto">
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-1">
              <span className="text-white text-lg font-bold">+</span>
            </div>
            <p className="text-xs text-gray-600">Your Story</p>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5">
                <img
                  src={`https://images.pexels.com/photos/${220453 + i}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`}
                  alt={`Story ${i}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">user_{i}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Feed */}
      <div className="space-y-0">
        {photos.map((photo) => (
          <MobilePhotoCard
            key={photo.id}
            photo={photo}
            onLike={handleLike}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <button
          onClick={() => loadPhotos()}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Load More
        </button>
      </div>
    </div>
  );
}