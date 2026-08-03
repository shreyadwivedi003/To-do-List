import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Edit = ({ note, onUpdateSuccess, onCancel }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description || "");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      const response = await axios.patch(`${BASE_URL}/notes/${note._id}`, {
        title: title.trim(),
        description: description.trim(),
      });

      if (onUpdateSuccess) {
        onUpdateSuccess(response.data.note);
      }
    } catch (err) {
      setError("Failed to update note");
    }
  };

  return (
    <div style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px", marginBottom: "10px" }}>
      <h4>Edit Note</h4>
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "8px" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "8px" }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" style={{ marginRight: "8px", cursor: "pointer" }}>
          Save
        </button>
        <button type="button" onClick={onCancel} style={{ cursor: "pointer" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Edit;