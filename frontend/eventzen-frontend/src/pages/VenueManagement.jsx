import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { fetchVenues, addVenue, deleteVenue, countVenue } from "../api/venues";
import "bootstrap/dist/css/bootstrap.min.css";

const VenueManagement = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: "", location: "", capacity: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venueCount, setVenueCount] = useState(0);

  useEffect(() => {
    loadVenues();
    handleCount();
  }, []);

  const loadVenues = async () => {
    const data = await fetchVenues();
    setVenues(data);
  };

  const handleAddVenue = async () => {
    await addVenue(newVenue);
    setNewVenue({ name: "", location: "", capacity: "" });
    setIsModalOpen(false);
    loadVenues();
    handleCount(); // ✅ Update count after adding
  };

  const handleDeleteVenue = async (id) => {
    console.log("Attempting to delete venue with ID:", id); 
    await deleteVenue(id);
    loadVenues();
    handleCount(); // ✅ Update count after deleting
  };

  const handleCount = async () => {
    try {
      const data = await countVenue();
      setVenueCount(data.count); // ✅ Store count in state
    } catch (error) {
      console.error("Error fetching venue count:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Venue Management</h2>
      <h3>The count is: {venueCount}</h3> {/* ✅ Fixed this */}

      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add Venue</button>
      <button className="btn btn-secondary ms-3" onClick={() => navigate("/venue-management")}>Go to Venue Management</button>
      
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue._id}>    
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td>{venue.capacity}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteVenue(venue._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Venue</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Name" value={newVenue.name} onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })} />
                <input className="form-control mb-2" placeholder="Location" value={newVenue.location} onChange={(e) => setNewVenue({ ...newVenue, location: e.target.value })} />
                <input className="form-control mb-2" placeholder="Capacity" type="number" value={newVenue.capacity} onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleAddVenue}>Save</button>
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueManagement;
