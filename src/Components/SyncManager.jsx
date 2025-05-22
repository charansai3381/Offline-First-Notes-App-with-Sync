import { useEffect } from 'react';
import useOnlineStatus from '../Hooks/useOnlineStatus';
import { syncNotesWithServer } from '../Utils/syncNotes';

const SyncManager = () => {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      console.log('🟢 Online: syncing notes...');
      syncNotesWithServer();
    }
  }, [isOnline]);

  return null;
};

export default SyncManager;
