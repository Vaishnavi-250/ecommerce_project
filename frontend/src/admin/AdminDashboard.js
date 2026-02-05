import React, { useEffect, useState } from "react";
import { fetchData } from "../api"; // must match named export

function AdminDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchData().then(data => setIssues(data || []));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue._id}>
              <td>{issue._id}</td>
              <td>{issue.userName}</td>
              <td>{issue.type}</td>
              <td>{issue.status}</td>
              <td>{issue.contact}</td>
              <td>{issue.feedback || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
