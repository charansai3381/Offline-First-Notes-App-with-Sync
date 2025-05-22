import React from "react";
import NoteListItem from "./NoteListItem";

const NoteList = ({ notes, search }) => {
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="note-list-container">
      <div className="note-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
