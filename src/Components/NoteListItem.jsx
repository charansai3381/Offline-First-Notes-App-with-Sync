import React from "react";
import { NavLink } from "react-router-dom";
import NoteSyncStatus from "./NoteSyncStatus";


const NoteListItem = ({ note }) => {
  return (
    <div className="note-list-item">
      <NavLink to={`/edit/${note.id}`} className="note-link">
        <h3>{note.title || "Untitled Note"}</h3>
        <p className="note-preview">
          {note.content.substring(0, 100)}...
        </p>
        <small>Last updated: {new Date(note.updatedAt).toLocaleString()}</small>
      </NavLink>
      <NoteSyncStatus synced={note.synced} />
    </div>
  );
};

export default NoteListItem;
