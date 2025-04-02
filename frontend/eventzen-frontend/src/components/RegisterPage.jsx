import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Import authService

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "", // Store first name separately
        email: "",
        password: "",
        role: "user", // Default role
    });

    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        // Create a request body matching your User model
        const requestBody = {
            name: formData.firstName, // Only first name is used
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };

        try {
            const response = await authService.register(requestBody);
            console.log("Registration Response:", response);

            if (response.success) {
                console.log("Registration successful!");
                navigate("/login");
            } else {
                setError(response.message || "Registration failed. Try again.");
            }
        } catch (err) {
            console.error("Registration Error:", err);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Register for EventZen</h1>
            <form className="bg-white shadow-md rounded-lg p-6 w-96" onSubmit={handleRegister}>
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange} 
                    className="w-full p-2 mb-2 border rounded" 
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleChange} 
                    className="w-full p-2 mb-2 border rounded" 
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange} 
                    className="w-full p-2 mb-2 border rounded" 
                    required
                />
                {/* Role Dropdown */}
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    className="w-full p-2 mb-4 border rounded bg-white"
                    required
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                    Register
                </button>
            </form>
            <p className="mt-4">
                Already have an account? 
                <button onClick={() => navigate("/adminlogin")} className="text-blue-500 underline ml-1">
                    Login
                </button>
            </p>
        </div>
    );
};

export default RegisterPage;
