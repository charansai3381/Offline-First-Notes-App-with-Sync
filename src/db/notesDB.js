import Dexie from 'dexie';

// Create and configure the database
const db = new Dexie('NotesDatabase');
db.version(1).stores({
  notes: 'id, title, content, updatedAt, synced',
});

export default db;

// ✅ Export the utility functions
export const addNote = async (note) => {
  await db.notes.add(note);
};

export const getAllNotes = async () => {
  return await db.notes.toArray();
};

export const updateNote = async (id, updates) => {
  await db.notes.update(id, updates);
};

export const deleteNote = async (id) => {
  await db.notes.delete(id);
};

export const getNoteById = async (id) => {
  return await db.notes.get(id);
};
