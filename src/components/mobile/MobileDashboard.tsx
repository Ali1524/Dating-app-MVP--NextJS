'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Heart, Users, Award, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WithdrawalModal from './WithdrawalModal';

// Mock withdrawals data
const mockWithdrawals = [
  {
    id: '1',
    amount: 1000,
    method: 'easypaisa',
    status: 'completed',
    requested_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    amount: 1500,
    method: 'jazzcash',
    status: 'pending',
    requested_at: '2024-01-20T09:15:00Z'
  }
];

export default function MobileDashboard() {
  const { profile, refreshProfile } = useAuth();
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const loadWithdrawals = async () => {
    if (!profile) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWithdrawals(mockWithdrawals);
    } catch (error) {
      console.error('Error loading withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  const stats = [
    {
      title: 'Total Earnings',
      value: `PKR ${profile.total_earnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5%'
    },
    {
      title: 'Available Balance',
      value: `PKR ${profile.available_balance.toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-blue-500',
      change: '+8.2%'
    },
    {
      title: 'Total Likes',
      value: profile.total_likes.toLocaleString(),
      icon: Heart,
      color: 'bg-red-500',
      change: '+15.3%'
    },
    {
      title: 'Followers',
      value: profile.followers_count.toLocaleString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+5.1%'
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-purple-100">Track your earnings and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="p-4 -mt-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-green-600 text-xs font-medium">{stat.change}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-xs">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowWithdrawalModal(true)}
              disabled={profile.available_balance < 1000}
              className="bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Withdraw Money
            </button>
            <button className="bg-purple-600 text-white p-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>
          {profile.available_balance < 1000 && (
            <p className="text-sm text-gray-500 mt-2">
              Minimum withdrawal amount: PKR 1,000
            </p>
          )}
        </div>

        {/* Earnings Overview */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Earnings Overview</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold text-green-600">PKR 1,250</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Month</span>
              <span className="font-semibold">PKR 980</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average per Photo</span>
              <span className="font-semibold">PKR {Math.floor(profile.total_earnings / Math.max(profile.total_photos, 1))}</span>
            </div>
          </div>
        </div>

        {/* Recent Withdrawals */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Withdrawals</h2>
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            </div>
          ) : withdrawals.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No withdrawals yet</p>
          ) : (
            <div className="space-y-3">
              {withdrawals.slice(0, 3).map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">PKR {withdrawal.amount}</p>
                    <p className="text-sm text-gray-600 capitalize">{withdrawal.method}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : withdrawal.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {withdrawal.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(withdrawal.requested_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        onSuccess={() => {
          loadWithdrawals();
          refreshProfile();
        }}
      />
    </div>
  );
}