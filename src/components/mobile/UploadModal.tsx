'use client';

import React, { useState, useRef } from 'react';
import { X, Camera, Image, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const { user, profile } = useAuth();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }
    setSelectedImages(files);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    if (selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    // Check daily upload limit
    if (profile.daily_uploads_used >= (profile.is_pro ? 5 : 3)) {
      toast.error(`Daily upload limit reached (${profile.is_pro ? 5 : 3} photos)`);
      return;
    }

    setLoading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const hashtagArray = hashtags
        .split(' ')
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.substring(1));

      toast.success('Photo uploaded successfully! Start earning from likes!', {
        icon: '📸',
        duration: 4000,
        style: {
          borderRadius: '10px',
          background: '#10B981',
          color: '#fff',
        },
      });
      onUploadSuccess();
      onClose();
      
      // Reset form
      setSelectedImages([]);
      setCaption('');
      setHashtags('');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[90vh] rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">New Post</h2>
          <button
            onClick={handleSubmit}
            disabled={loading || selectedImages.length === 0}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Share'}
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Image Selection */}
          <div className="mb-6">
            {selectedImages.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
              >
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Tap to select photos</p>
                <p className="text-sm text-gray-500">Maximum 3 photos allowed</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedImages.length < 3 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-purple-500 transition-colors"
                    >
                      <Image className="w-6 h-6 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Caption */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Hashtags */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#photography #nature #sunset"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate hashtags with spaces. Use # before each tag.
            </p>
          </div>

          {/* Upload Limit Info */}
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-700">
              Daily uploads: {profile?.daily_uploads_used || 0}/{profile?.is_pro ? 5 : 3}
            </p>
            {!profile?.is_pro && (
              <p className="text-xs text-purple-600 mt-1">
                Upgrade to Pro for 5 daily uploads
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}