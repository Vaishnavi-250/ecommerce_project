import React, { useEffect, useState } from "react";
import { fetchData, updateStatus } from "../api";
import AddIssue from "./AddIssue"; // Add Issue form component

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  // Fetch all issues from backend
  const loadIssues = async () => {
    const data = await fetchData();
    setIssues(data);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // Update issue status
  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status);
    loadIssues(); // refresh list after status change
  };

  // Color for status
  const getStatusColor = (status) => {
    switch(status) {
      case "pending": return "orange";
      case "on process": return "blue";
      case "done": return "green";
      default: return "gray";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/* Add new issue form */}
      <AddIssue onAdd={loadIssues} />

      {/* Issues table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td>{issue.title}</td>
              <td>{issue.description}</td>
              <td>{issue.location}</td>
              <td style={{ color: getStatusColor(issue.status), fontWeight: "bold" }}>
                {issue.status}
              </td>
              <td>{issue.contact}</td>
              <td>{issue.rating}</td>
              <td>{issue.feedback}</td>
              <td>
                <button onClick={() => handleStatusChange(issue._id, "pending")}>Pending</button>{" "}
                <button onClick={() => handleStatusChange(issue._id, "on process")}>On Process</button>{" "}
                <button onClick={() => handleStatusChange(issue._id, "done")}>Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueList;
