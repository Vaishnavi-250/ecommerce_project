const BASE_URL = "http://localhost:5000";

// Test endpoint
export const fetchTest = async () => {
  try {
    const res = await fetch(`${BASE_URL}/test`);
    const text = await res.text();  // backend sends plain text
    return text;
  } catch (err) {
    console.error("API fetch error:", err);
    return null;
  }
};

// Fetch all issues
export const fetchData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/issues`);
    return await res.json();
  } catch (err) {
    console.error("API fetch error:", err);
    return [];
  }
};

// Update issue status
export const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`${BASE_URL}/issues/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch (err) {
    console.error("Status update error:", err);
    return null;
  }
};
