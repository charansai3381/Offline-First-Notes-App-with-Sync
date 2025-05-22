import {
  getAllNotes,
  updateNote,
  deleteNote,
} from '../db/notesDB';

import {
  addNoteToAPI,
  updateNoteInAPI,
  deleteNoteFromAPI,
} from '../services/notesApi';

/**
 * Syncs local unsynced notes with the remote API.
 * Uses a basic 'client-wins' strategy: always prefers local version.
 */
const syncNotes = async () => {
  try {
    const allNotes = await getAllNotes();

    for (const note of allNotes) {
      if (!note.synced) {
        if (note._deleted) {
          // If marked for deletion, delete from server and local DB
          try {
            await deleteNoteFromAPI(note.id);
            await deleteNote(note.id); // Clean from local
          } catch (error) {
            console.error(`Failed to delete note ${note.id}`, error);
          }
        } else {
          try {
            // Try to upsert (add or update) note on server
            await addOrUpdateOnServer(note);
            await updateNote(note.id, { synced: true });
          } catch (error) {
            console.error(`Failed to sync note ${note.id}`, error);
          }
        }
      }
    }
  } catch (err) {
    console.error('Sync failed:', err);
  }
};

/**
 * Adds or updates a note on the backend.
 * If the note already exists, updates it.
 */
const addOrUpdateOnServer = async (note) => {
  try {
    // Try to POST
    await addNoteToAPI(note);
  } catch (err) {
    // If POST fails (probably already exists), then try PUT
    await updateNoteInAPI(note.id, note);
  }
};


export default syncNotes;
