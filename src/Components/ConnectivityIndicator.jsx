import React from 'react';
import useOnlineStatus from '../Hooks/useOnlineStatus';

const ConnectivityIndicator = () => {
  const isOnline = useOnlineStatus();

  return (
    <div style={{
      backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
      color: isOnline ? '#155724' : '#721c24',
      padding: '0.5rem 1rem',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      {isOnline ? 'You are Online' : 'You are Offline'}
    </div>
  );
};

export default ConnectivityIndicator;
