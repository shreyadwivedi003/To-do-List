import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API || "http://localhost:3000";

const Create = ({ onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/create-post`, {
        title: title.trim(),
        description: description.trim(),
      });

      if (onNoteCreated) {
        onNoteCreated(response.data.note);
      }

      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      console.log("Error details:", err.response?.data);
      setError("Failed to create note");
    }
  };

  return (
    <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h3>Add a New Note</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter title..."
            className="bg-gray-100 border-b-black border-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Enter description..."
            className="bg-gray-100 border-b-black border-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer",backgroundColor:"black",color:"white" , border:"none" ,borderRadius:"30px"}}>
          Create Note
        </button>
      </form>
    </div>
  );
};

export default Create;