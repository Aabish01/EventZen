import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [attendeeAdmins, setAttendeesAdmin] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchAttendees();
    fetchAttendeesAdmins();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const fetchAttendeesAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendees/admin");
      setAttendeesAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin attendees:", error);
    }
  };

  const removeAttendee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendees/${id}`);
      setAttendees(attendees.filter(attendee => attendee._id !== id));
    } catch (error) {
      console.error("Error removing attendee:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: formData.firstName, // Store only first name
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await axios.post("http://localhost:5000/api/auth/register", requestBody);
      console.log("Registration successful:", response.data);

      // Refresh the tables
      fetchAttendees();
      fetchAttendeesAdmins();

      // Close modal and reset form
      setIsModalOpen(false);
      setFormData({ firstName: "", email: "", password: "", role: "user" });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">User Management</h2>
            <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>Add User</button>
            <table className="table table-bordered mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={attendee._id}>
                    <td>{index + 1}</td>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removeAttendee(attendee._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Admin's</h2>
            <table className="table table-bordered mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {attendeeAdmins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td>{index + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-lilac bg-opacity-90">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Register for EventZen</h1>
            <form className="w-full" onSubmit={handleRegister}>
              <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                className="w-full p-2 mb-2 border rounded" 
                required 
                onChange={handleChange} 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                className="w-full p-2 mb-2 border rounded" 
                required 
                onChange={handleChange} 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full p-2 mb-2 border rounded" 
                required 
                onChange={handleChange} 
              />
              <select 
                name="role" 
                className="w-full p-2 mb-4 border rounded bg-white" 
                required 
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Register
              </button>
            </form>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AttendeeManagement;
