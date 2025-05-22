// App.jsx or NotesContext.jsx
import { useEffect } from 'react';
import useOnlineStatus from '../Hooks/useOnlineStatus';
import { syncNotesWithServer } from '../Utils/syncNotes';

const App = () => {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      syncNotesWithServer();
    }
  }, [isOnline]);

  return <RouterProvider router={router} />;
};

export default App;
