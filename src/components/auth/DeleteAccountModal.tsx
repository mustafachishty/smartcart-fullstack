import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { logout } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') return;

    setLoading(true);
    try {
      const response = await apiService.deleteAccount();
      if (response.success) {
        showSuccess('Account Deleted', 'Your account has been permanently deleted');
        logout();
        onClose();
      } else {
        showError('Error', response.error || 'Failed to delete account');
      }
    } catch (error) {
      showError('Error', 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Account</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This action cannot be undone. This will permanently delete your account and remove all your data including:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Your profile information</li>
            <li>Shopping cart items</li>
            <li>Wishlist items</li>
            <li>Order history</li>
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type <strong>DELETE</strong> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Type DELETE here"
          />
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading || confirmText !== 'DELETE'}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>
      </div>
    </div>
  );
};