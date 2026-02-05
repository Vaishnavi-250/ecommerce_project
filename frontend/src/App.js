import React, { useEffect } from "react";
import { fetchTest } from "./api";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => {
    fetchTest().then(data => {
      if (data) alert(data);  // backend sends plain text
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Civic Issue Reporting System</h1>
      <p>Welcome to the civic issue reporting app!</p>
      
      {/* Button to go to Admin Dashboard */}
      <Link to="/admin">
        <button style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
          Go to Admin Dashboard
        </button>
      </Link>
    </div>
  );
}

export default App;
