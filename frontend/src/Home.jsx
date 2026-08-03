import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";
import Edit from "./Edit"; 

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data.notes || []);
    } catch (err) {
      console.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
      <h2 className="text-4xl text-center font-serif mb-6">Shreya's To-do list</h2>

      <Create onNoteCreated={handleNoteCreated} />

      <h3 className="font-semibold bg-gray-300">All Notes</h3>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="items-center bg-gray-300">No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              padding: "12px",
              borderBottom: "1px solid #ddd",
              fontWeight: "bolder"
            }}
          >
            {editingId === note._id ? (
              <Edit
                note={note}
                onUpdateSuccess={handleNoteUpdated}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: "0 0 5px 0" }}>{note.title}</h4>
                  <p style={{ margin: 0, color: "#555" }}>
                    {note.description || "No description provided"}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setEditingId(note._id)}
                    style={{ marginRight: "8px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    style={{ color: "red", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;