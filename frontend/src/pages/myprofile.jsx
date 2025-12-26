import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user, logout, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className='max-w-2xl mx-auto py-10'>
      <h1 className='text-3xl font-semibold mb-6'>My Profile</h1>
      <div className='bg-white shadow rounded p-6 space-y-4'>
        <div>
          <p className='text-sm text-gray-500'>Name</p>
          <p className='font-medium'>{user?.name || '—'}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Email</p>
          <p className='font-medium'>{user?.email}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Role</p>
          <p className='font-medium'>{user?.role || 'user'}</p>
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className='bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded'>Logout</button>
      </div>
    </div>
  );
};

export default MyProfile;
