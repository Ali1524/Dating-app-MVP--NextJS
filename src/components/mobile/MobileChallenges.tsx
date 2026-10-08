'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appChallenges as mockChallenges, AppChallenge as Challenge } from '@/data/challenges';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Gift,
  Target,
  Award,
  Zap,
  Crown,
  Camera,
  Heart,
  TrendingUp,
  MapPin,
  Timer
} from 'lucide-react';

export default function MobileChallenges() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');


  const tabs = [
    { id: 'daily', label: 'Daily', icon: Zap, color: 'text-yellow-600' },
    { id: 'monthly', label: 'Monthly', icon: Star, color: 'text-blue-600' },
    { id: 'yearly', label: 'Yearly', icon: Crown, color: 'text-purple-600' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'photography': return Camera;
      case 'engagement': return Heart;
      case 'creativity': return Star;
      case 'community': return Users;
      default: return Trophy;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeLeft = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Ends today';
    if (diffDays === 1) return '1 day left';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months left`;
    return `${Math.ceil(diffDays / 365)} year left`;
  };

  const filteredChallenges = mockChallenges.filter(challenge => challenge.type === activeTab);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Challenges</h1>
            <p className="text-purple-100">Compete and win amazing prizes</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-xl font-bold">12</div>
            <div className="text-xs text-purple-200">Active</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">3</div>
            <div className="text-xs text-purple-200">Joined</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">1</div>
            <div className="text-xs text-purple-200">Won</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 flex items-center justify-center space-x-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenges List */}
      <div className="p-4 space-y-4">
        {filteredChallenges.map((challenge) => {
          const CategoryIcon = getCategoryIcon(challenge.category);
          
          return (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Challenge Image */}
              <div className="relative h-48">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Prize Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Gift className="w-4 h-4" />
                  <span className="font-bold">PKR {challenge.prize.toLocaleString()}</span>
                </div>

                {/* Difficulty Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty.toUpperCase()}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white text-lg font-bold mb-1">{challenge.title}</h3>
                  <p className="text-white/90 text-sm">{challenge.description}</p>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="p-4">
                {/* Stats Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CategoryIcon className="w-4 h-4" />
                      <span className="capitalize">{challenge.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Timer className="w-4 h-4" />
                      <span>{getTimeLeft(challenge.endDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="space-y-1">
                    {challenge.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button onClick={() => router.push(`/challenges/${challenge.id}/join`)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Join Challenge</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules Section */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span>Challenge Rules</span>
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
              <span>Only original, high-quality photos allowed</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
              <span>Photos must be taken during challenge period</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
              <span>Winners are selected based on creativity, quality, and engagement</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
              <span>Prizes are awarded within 48 hours of challenge end</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}