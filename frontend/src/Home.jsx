import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";
import Edit from "./Edit";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotes = async (search = "") => {
    setLoading(true);
    try {
      const url = search
        ? `${BASE_URL}/api/tasks?search=${encodeURIComponent(search)}`
        : `${BASE_URL}/api/tasks`;
      const response = await axios.get(url);
      setNotes(response.data.data || []);
    } catch (err) {
      console.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchNotes(query);
  };

  const handleNoteCreated = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    setEditingId(null);
  };

  const handleToggleStatus = async (note) => {
    const nextStatus = note.status === "completed" ? "pending" : "completed";
    try {
      const response = await axios.patch(`${BASE_URL}/api/tasks/${note._id}/status`, {
        status: nextStatus,
      });
      const updated = response.data.data;
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === note._id ? updated : n))
      );
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
      <h2 className="text-4xl text-center font-serif mb-6">Shreya's To-do list</h2>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />

      <Create onNoteCreated={handleNoteCreated} />

      <h3 className="font-semibold bg-gray-300 p-2 mt-4">All Notes</h3>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="items-center bg-gray-300 p-2">No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              padding: "12px",
              borderBottom: "1px solid #ddd",
              backgroundColor: note.status === "completed" ? "#f9f9f9" : "transparent",
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    checked={note.status === "completed"}
                    onChange={() => handleToggleStatus(note)}
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    title="Toggle Status"
                  />
                  <div>
                    <h4
                      style={{
                        margin: "0 0 5px 0",
                        textDecoration: note.status === "completed" ? "line-through" : "none",
                        color: note.status === "completed" ? "#888" : "#000",
                      }}
                    >
                      {note.title}
                    </h4>
                    <p style={{ margin: 0, color: "#555" }}>
                      {note.description || "No description provided"}
                    </p>
                    <small
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "12px",
                        color: note.status === "completed" ? "green" : "#b28900",
                      }}
                    >
                      Status: {note.status || "pending"}
                    </small>
                  </div>
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
                    style={{ color: "red", cursor: "pointer" }}
                  >
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