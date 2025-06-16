import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Phone, Building, Calendar, Eye, EyeOff, Users } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api';

const SettingsPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      
      if (response.ok) {
        setAllUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0]); // İlk kullanıcıyı seç
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch users' });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: 'Error loading users' });
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setMessage({ type: '', text: '' });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/${selectedUser.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Password updated successfully for ${selectedUser.full_name}!` });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update password' });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: 'Error updating password' });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
        <Header title='User Management' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-300">Loading users...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
      <Header title='User Management' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        
        {/* Message Display */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500 text-green-400'
                : 'bg-red-500/10 border border-red-500 text-red-400'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Users List */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className='text-xl font-semibold text-gray-100'>Select User</h2>
              </div>
              
              <div className="space-y-3">
                {allUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedUser?.id === user.id
                        ? 'bg-blue-600 border border-blue-500'
                        : 'bg-gray-700 hover:bg-gray-600 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{user.full_name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <p className="text-gray-500 text-xs">{user.company_name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* User Details & Password Change */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedUser && (
              <div className="space-y-6">
                
                {/* User Information */}
                <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
                  <h2 className='text-xl font-semibold text-gray-100 mb-6'>User Information</h2>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      <div className='flex items-center space-x-3'>
                        <User className='h-5 w-5 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-400'>Full Name</p>
                          <p className='text-gray-100 font-medium'>{selectedUser.full_name}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center space-x-3'>
                        <Mail className='h-5 w-5 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-400'>Email</p>
                          <p className='text-gray-100 font-medium'>{selectedUser.email}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center space-x-3'>
                        <Phone className='h-5 w-5 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-400'>Phone Number</p>
                          <p className='text-gray-100 font-medium'>{selectedUser.phone_number}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className='space-y-4'>
                      <div className='flex items-center space-x-3'>
                        <Building className='h-5 w-5 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-400'>Company</p>
                          <p className='text-gray-100 font-medium'>{selectedUser.company_name}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center space-x-3'>
                        <Building className='h-5 w-5 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-400'>Sector</p>
                          <p className='text-gray-100 font-medium'>{selectedUser.sector}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center space-x-3'>
                        <Calendar className='h-5 w-5 text-gray-400' />
                        <div>
                          <p className='text-sm text-gray-400'>Member Since</p>
                          <p className='text-gray-100 font-medium'>
                            {new Date(selectedUser.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Change Section */}
                <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
                  <div className='flex items-center space-x-3 mb-6'>
                    <Lock className='h-6 w-6 text-gray-400' />
                    <h2 className='text-xl font-semibold text-gray-100'>
                      Change Password for {selectedUser.full_name}
                    </h2>
                  </div>
                  
                  <form onSubmit={handlePasswordChange} className='space-y-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Current Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            currentPassword: e.target.value
                          }))}
                          className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          placeholder='Enter current password'
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        New Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            newPassword: e.target.value
                          }))}
                          className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          placeholder='Enter new password'
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Confirm New Password
                      </label>
                      <input
                        type='password'
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({
                          ...prev,
                          confirmPassword: e.target.value
                        }))}
                        className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Confirm new password'
                        required
                      />
                    </div>
                    
                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        disabled={passwordLoading}
                        className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                      >
                        {passwordLoading ? 'Updating...' : `Update ${selectedUser.full_name}'s Password`}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;