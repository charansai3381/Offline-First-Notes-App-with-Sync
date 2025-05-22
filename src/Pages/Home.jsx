import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NoteList from "../Components/NoteList";
import { getAllNotes } from "../db/notesDB";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();

  // Fetch notes from IndexedDB and sort them by updated date descending
  const fetchNotes = async () => {
    const allNotes = await getAllNotes();
    const sortedNotes = allNotes.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setNotes(sortedNotes);
  };

  // Re-fetch notes every time the route changes (e.g. after saving a note)
  useEffect(() => {
    fetchNotes();
  }, [location]);

  return (
    <div className="home-container">
      <input
        type="text"
        className="note-search"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <NoteList notes={notes} search={search} />
    </div>
  );
};

export default Home;
