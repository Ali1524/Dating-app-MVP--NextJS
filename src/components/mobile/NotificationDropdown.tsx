'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  CreditCard, 
  Trophy, 
  Bell,
  Check,
  X,
  DollarSign,
  Camera
} from 'lucide-react';

interface Notification {
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

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function NotificationDropdown({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <CreditCard className="w-4 h-4 text-purple-500" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'system':
        return <DollarSign className="w-4 h-4 text-green-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  const formatMessage = (notification: Notification) => {
    if (notification.amount && (notification.type === 'withdrawal' || notification.type === 'system')) {
      return `${notification.message} PKR ${notification.amount.toLocaleString()}`;
    }
    return notification.message;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {unreadCount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600 font-medium">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Mark all read
              </button>
              <button
                onClick={onClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No notifications yet</p>
            <p className="text-sm text-gray-400 mt-1">
              We'll notify you when something happens
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                  !notification.isRead ? 'bg-purple-50 border-l-2 border-l-purple-500' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notification.userAvatar ? (
                      <div className="relative">
                        <img
                          src={notification.userAvatar}
                          alt={notification.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {formatMessage(notification)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      
                      {/* Unread indicator */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 ml-2 mt-1" />
                      )}
                    </div>
                  </div>

                  {/* Mark as read button */}
                  {!notification.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      title="Mark as read"
                    >
                      <Check className="w-3 h-3 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={onClose}
            className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium py-2 transition-colors"
          >
            Close Notifications
          </button>
        </div>
      )}
    </div>
  );
}