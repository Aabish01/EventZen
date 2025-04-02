import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Import authService
import Card from 'react-bootstrap/Card';
import { FaUser, FaUserShield } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const WelcomePage = () => { 
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      firstName: "",
      email: "",
      password: "",
   });

   const [error, setError] = useState("");

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await authService.login(formData);
         if (response.success) {
            navigate("/dashboard");
         } else {
            setError("Invalid credentials");
         }
      } catch (err) {
         setError("Try again!!!");
      }
   };

   return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', height: "80vh",gap: "10vh" }}>
      <h1 style={{display:'flex',justifyContent: 'center'}}>
        Welcome to eventzen 
      </h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      {/* Admin Card */}
      <Card  style={{ width: '18rem' ,backgroundColor: 'rgba(0, 128, 0, 0.3)' }}  onClick={() => navigate("/adminlogin")}>
        <Card.Body>
          <Card.Title><FaUserShield /> Admin</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Admin Panel</Card.Subtitle>
          <Card.Text>
            Admins can manage users, view analytics, and control system settings.
          </Card.Text>
          
        </Card.Body>
       
      </Card>

      {/* User Card */}
      <Card style={{backgroundColor: 'rgba(128, 0, 128, 0.3)', color: '#333', width: '18rem' }} onClick={() => navigate("/adminlogin")}>
        <Card.Body>
          <Card.Title><FaUser /> User</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">User Profile</Card.Subtitle>
          <Card.Text>
            Users can view their profile, access features, and interact with the system.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    <h5 style={{display:'flex',justifyContent: 'center'}}>
        Dont have an account!? <span 
        onClick={() => navigate("/register")} 
        style={{ color: "blue", cursor: "pointer", marginLeft: "3px" }}
      >
        Register
      </span>
      </h5>
      </div>
   );
};

export default WelcomePage;
