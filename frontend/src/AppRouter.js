import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./admin/AdminDashboard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

