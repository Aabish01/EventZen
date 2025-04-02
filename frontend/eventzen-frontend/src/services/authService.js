const API_URL = "http://localhost:5000"; // Correct backend port

const login = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, { // Ensure correct endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

const register = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, { // Ensure correct endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export default { login, register };
