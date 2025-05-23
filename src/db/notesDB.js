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
  const allNotes = await db.notes.toArray();
  console.log("📦 All notes from IndexedDB:", allNotes);
  return allNotes;
};

export const updateNote = async (id, updatedFields) => {
  const existingNote = await db.notes.get(id);
  if (!existingNote) return;

  const updatedNote = { ...existingNote, ...updatedFields };
  await db.notes.put(updatedNote);
};

export const deleteNote = async (id) => {
  await db.notes.delete(id);
};

export const getNoteById = async (id) => {
  return await db.notes.get(id);
};