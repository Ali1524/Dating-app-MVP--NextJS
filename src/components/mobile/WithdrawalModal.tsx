'use client';

import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WithdrawalModal({ isOpen, onClose, onSuccess }: WithdrawalModalProps) {
  const { user, profile, updateProfile } = useAuth();
  const [method, setMethod] = useState<'easypaisa' | 'jazzcash' | 'bank'>('easypaisa');
  const [amount, setAmount] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    account_number: '',
    account_name: '',
    bank_name: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen || !profile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const withdrawalAmount = parseFloat(amount);
    
    if (withdrawalAmount < 1000) {
      toast.error('Minimum withdrawal amount is PKR 1,000');
      return;
    }

    if (withdrawalAmount > profile.available_balance) {
      toast.error('Insufficient balance');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user's available balance
      await updateProfile({
        available_balance: profile.available_balance - withdrawalAmount
      });

      toast.success('Withdrawal request submitted successfully!');
      onSuccess();
      onClose();
      
      // Reset form
      setAmount('');
      setAccountDetails({
        account_number: '',
        account_name: '',
        bank_name: ''
      });
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast.error('Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone },
    { id: 'jazzcash', name: 'JazzCash', icon: CreditCard },
    { id: 'bank', name: 'Bank Transfer', icon: Building }
  ];

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
          <h2 className="text-lg font-semibold">Withdraw Money</h2>
          <div className="w-9" />
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Available Balance */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-green-700">Available Balance</p>
            <p className="text-2xl font-bold text-green-800">
              PKR {profile.available_balance.toLocaleString()}
            </p>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Withdrawal Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (min PKR 1,000)"
              min="1000"
              max={profile.available_balance}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum: PKR 1,000 | Maximum: PKR {profile.available_balance.toLocaleString()}
            </p>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((pm) => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setMethod(pm.id as any)}
                    className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      method === pm.id
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{pm.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {method === 'bank' ? 'Account Number' : 'Mobile Number'}
              </label>
              <input
                type="text"
                value={accountDetails.account_number}
                onChange={(e) => setAccountDetails(prev => ({ ...prev, account_number: e.target.value }))}
                placeholder={method === 'bank' ? 'Enter account number' : 'Enter mobile number'}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <input
                type="text"
                value={accountDetails.account_name}
                onChange={(e) => setAccountDetails(prev => ({ ...prev, account_name: e.target.value }))}
                placeholder="Enter account holder name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {method === 'bank' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={accountDetails.bank_name}
                  onChange={(e) => setAccountDetails(prev => ({ ...prev, bank_name: e.target.value }))}
                  placeholder="Enter bank name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Withdraw PKR ${amount || '0'}`}
          </button>

          {/* Note */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Withdrawal requests are processed within 24-48 hours. 
              You will receive a confirmation once your request is approved.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}