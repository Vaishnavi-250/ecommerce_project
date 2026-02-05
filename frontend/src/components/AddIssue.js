import React, { useState } from "react";

const AddIssue = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contact", contact);
    formData.append("location", location);
    if(image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/issues", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if(data.issue){
        alert("Issue added ✅");
        // Clear form
        setTitle(""); setDescription(""); setContact(""); setLocation(""); setImage(null);
        onAdd(); // refresh IssueList in parent
      }
    } catch (err) {
      console.error("Add issue error:", err);
      alert("Failed to add issue ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input 
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input 
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={e => setContact(e.target.value)}
        required
      />
      <input 
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
      />
      <input 
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />
      <button type="submit" style={{ marginTop: "10px" }}>Add Issue</button>
    </form>
  );
};

export default AddIssue;
