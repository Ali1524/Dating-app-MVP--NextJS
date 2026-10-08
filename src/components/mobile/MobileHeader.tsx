'use client';

import React from 'react';
import { useState } from 'react';
import { Camera, Bell, Plus, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import { mockNotifications } from '@/data/mockData';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface MobileHeaderProps {
  onUploadClick: () => void;
  onSearchClick: () => void;
}

export default function MobileHeader({ onUploadClick, onSearchClick }: MobileHeaderProps) {
  const { profile } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
    toast.success('All notifications cleared');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SnapEarn
            </h1>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onSearchClick}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={onUploadClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>

          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Bell className={`w-5 h-5 ${showNotifications ? 'text-purple-600' : ''}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            <NotificationDropdown
              notifications={notifications}
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearAll}
            />
          </div>

          {profile && (
            <Link href="/profile"><img
              src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.username}&background=7c3aed&color=fff`}
              alt={profile.username}
              className="w-8 h-8 rounded-full border-2 border-purple-200"
            /></Link>
          )}
        </div>
      </div>
    </header>
  );
}