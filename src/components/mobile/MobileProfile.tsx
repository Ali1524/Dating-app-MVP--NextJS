'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Verified, 
  Calendar, 
  Camera, 
  Heart, 
  Users, 
  Trophy,
  Star,
  Edit3,
  Share,
  Grid3X3,
  Bookmark,
  Tag,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function MobileProfile() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  if (!profile) return null;

  const handleShare = async () => {
    const url = `${window.location.origin}/profile`;
    try {
      if (navigator.share) await navigator.share({ title: `${profile.username} on SnapEarn`, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success('Profile link copied');
      }
    } catch {}
  };

  const points = [
    { label: 'Daily', value: 72 },
    { label: 'Monthly', value: 29 },
    { label: 'Yearly', value: 11 },
  ];

  // Mock user photos
  const userPhotos = [
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const achievements = [
    { name: 'First Upload', icon: Camera, color: 'bg-yellow-100 text-yellow-800' },
    { name: '1K Likes Club', icon: Heart, color: 'bg-red-100 text-red-800' },
    { name: '100 Followers', icon: Users, color: 'bg-blue-100 text-blue-800' },
    { name: 'First Earning', icon: Trophy, color: 'bg-green-100 text-green-800' },
    { name: 'Pro Member', icon: Star, color: 'bg-purple-100 text-purple-800' }
  ];

  const tabs = [
    { id: 'posts', icon: Grid3X3, label: 'Posts' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'tagged', icon: Tag, label: 'Tagged' }
  ];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 relative">
          <Link href="/settings" aria-label="Settings" className="absolute top-4 right-4 p-2 bg-black bg-opacity-30 rounded-full text-white">
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <img
              src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.username}&background=7c3aed&color=fff&size=128`}
              alt={profile.username}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            {profile.is_pro && (
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                PRO
              </div>
            )}
          </div>

          {/* Name and Username */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{profile.full_name || profile.username}</h1>
              {profile.is_verified && <Verified className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-gray-600">@{profile.username}</p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-gray-800 mb-2">{profile.bio || "Photography enthusiast 📸 | Earning from creativity ✨"}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Pakistan</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-around py-4 border-t border-b border-gray-100 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{profile.total_photos}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{profile.followers_count.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{profile.following_count.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">PKR {profile.total_earnings.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Earned</div>
            </div>
          </div>

          {/* Challenge Points (from Figma) */}
          <div className="mb-4 rounded-2xl border border-purple-200 bg-purple-100/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fuchsia-900">Challenge Points</h3>
              <div className="flex items-center gap-1 font-bold text-fuchsia-900">
                <span className="text-lg">150</span>
                <Star className="h-4 w-4 fill-purple-600 text-purple-600" />
              </div>
            </div>
            <div className="space-y-2.5">
              {points.map((p) => (
                <div key={p.label}>
                  <div className="mb-1 text-xs text-gray-700">{p.label}</div>
                  <div className="h-1.5 w-full rounded-full bg-white">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-4">
            <Link href="/profile/edit" className="flex-1 bg-[#5b32e8] text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
            <button onClick={handleShare} className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Achievements */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className={`${achievement.color} px-3 py-1 rounded-full flex items-center space-x-1`}>
                    <Icon className="w-3 h-3" />
                    <span className="text-xs font-medium">{achievement.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white border-t border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 flex items-center justify-center space-x-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1">
            {userPhotos.map((photo, index) => (
              <div key={index} className="aspect-square relative group">
                <img
                  src={photo}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-active:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-active:opacity-100 transition-opacity text-white text-center">
                    <Heart className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">{Math.floor(Math.random() * 1000) + 100}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No saved posts yet</p>
            <p className="text-sm text-gray-400 mt-1">Save posts to view them here</p>
          </div>
        )}

        {activeTab === 'tagged' && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tagged posts</p>
            <p className="text-sm text-gray-400 mt-1">Posts you're tagged in will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}