import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import {
  getNoteById,
  addNote,
  updateNote,
} from "../db/notesDB";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  const [note, setNote] = useState({
    id: id || crypto.randomUUID(),
    title: "",
    content: "",
    updatedAt: new Date().toISOString(),
    tags: "",
    synced: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getNoteById(id).then((existingNote) => {
      if (existingNote) {
        setNote(existingNote);
      }
      setLoading(false);
    });
  }, [id]);

  const handleChange = (field, value) => {
    setNote((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
      synced: false,
    }));
  };

  // Debounced autosave
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(async () => {
      if (!note.title.trim() && !note.content.trim()) return;

      try {
        if (id) {
          await updateNote(note.id, note);
        } else {
          await addNote(note);
        }
      } catch (err) {
        console.error("Autosave error:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [note.title, note.content, note.tags]);

  const handleSave = async () => {
    if (!note.title.trim() && !note.content.trim()) {
      alert("Cannot save an empty note.");
      return;
    }

    try {
      if (id) {
        await updateNote(note.id, note);
      } else {
        await addNote(note);
      }
      navigate("/");
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this note?");
    if (!confirmed) return;

    try {
      await updateNote(note.id, { _deleted: true, synced: false });
      navigate("/");
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  if (loading) return <div>Loading note...</div>;

  return (
    <div className="note-editor-container">
      {/* Connection + Sync Status */}
      <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
        <span style={{ marginRight: "10px" }}>
          {isOnline ? "🟢 Online" : "🔴 Offline"}
        </span>
        <span
          className={`sync-status ${note.synced ? "synced" : "unsynced"}`}
        >
          {note.synced ? "Synced" : "Unsynced"}
        </span>
      </div>

      {/* Title */}
      <input
        className="note-title"
        placeholder="Note title"
        value={note.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      {/* Tags
      <input
        className="note-title"
        placeholder="Tags (comma-separated)"
        value={note.tags}
        onChange={(e) => handleChange("tags", e.target.value)}
        style={{ marginBottom: "1rem" }}
      /> */}

      {/* Markdown Editor */}
      <MDEditor
        value={note.content}
        onChange={(val) => handleChange("content", val || "")}
        height={400}
      />

      {/* Last Updated */}
      <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666" }}>
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="save-button" onClick={handleSave}>Save</button>
        {id && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EditNote;
