'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
}

interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  total_earnings: number;
  available_balance: number;
  total_likes: number;
  total_photos: number;
  followers_count: number;
  following_count: number;
  is_verified: boolean;
  is_pro: boolean;
  daily_uploads_used: number;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for frontend demo
const mockUser: User = {
  id: '1',
  username: 'demo_user',
  email: 'demo@example.com',
  full_name: 'Demo User'
};

const mockProfile: Profile = {
  id: '1',
  username: 'demo_user',
  full_name: 'Demo User',
  avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  bio: 'Photography enthusiast',
  phone: '03001234567',
  total_earnings: 2450,
  available_balance: 1450,
  total_likes: 24500,
  total_photos: 156,
  followers_count: 1250,
  following_count: 890,
  is_verified: true,
  is_pro: true,
  daily_uploads_used: 2,
  created_at: '2024-01-15T00:00:00Z'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  // `loading` is true only until the saved demo session has been read on the client
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('snapearn:session');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setProfile(parsed.profile);
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    try {
      if (user && profile) localStorage.setItem('snapearn:session', JSON.stringify({ user, profile }));
      else localStorage.removeItem('snapearn:session');
    } catch {}
  }, [user, profile, loading]);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email,
        full_name: userData.full_name
      };
      
      const newProfile = {
        ...mockProfile,
        id: newUser.id,
        username: userData.username,
        full_name: userData.full_name,
        phone: userData.phone,
        total_earnings: 0,
        available_balance: 0,
        total_likes: 0,
        total_photos: 0,
        followers_count: 0,
        following_count: 0,
        is_verified: false,
        is_pro: false,
        daily_uploads_used: 0
      };

      setUser(newUser);
      setProfile(newProfile);
      
      return { data: { user: newUser }, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      setProfile(mockProfile);
      
      return { data: { user: mockUser }, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    toast.success('Signed out successfully');
  };

  const updateProfile = async (updates: any) => {
    if (!profile) return;
    
    setProfile({ ...profile, ...updates });
    toast.success('Profile updated successfully');
  };

  const refreshProfile = async () => {
    // Simulate refresh
    if (profile) {
      setProfile({ ...profile });
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};