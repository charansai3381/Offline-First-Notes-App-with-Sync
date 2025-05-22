// services/notesApi.js

const BASE_URL = 'http://localhost:4000/notes';

// Utility function to handle fetch responses
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API error');
  }
  return res.json();
};

// GET all notes
export const fetchNotesFromAPI = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

// POST a new note
export const addNoteToAPI = async (note) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return handleResponse(res);
};

// PUT (update) an existing note
export const updateNoteInAPI = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(res);
};

// DELETE a note
export const deleteNoteFromAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete note from API');
  }
};
