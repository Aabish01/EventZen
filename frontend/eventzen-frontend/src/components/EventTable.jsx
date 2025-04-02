import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";

const EventTable = () => {
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        date: "",
        venue: "",
        status: "Scheduled",
    });

    // Fetch events from backend when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get("http://localhost:5000/events");
            
            console.log("✅ Events received:", res.data);
            setEvents(res.data);
        } catch (error) {
            console.error("❌ Error fetching events:", error.message);
        }
    };

    const handleAddEvent = async () => {
        console.log("📤 Sending event data:", newEvent);

        if (!newEvent.name || !newEvent.date || !newEvent.venue || !newEvent.status) {
            console.error("❌ All fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/events", newEvent, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Event added:", response.data);
            setEvents([...events, response.data]); // Update table
            setShow(false);
            setNewEvent({ name: "", date: "", venue: "", status: "Upcoming" }); // Reset form
        } catch (error) {
            console.error("❌ Error adding event:", error.response?.data || error.message);
        }
    };
    const handleRemoveEvent = async (_id) => {
        if (!_id) {
            console.error("❌ Error: Event ID is undefined!");
            return;
        }
        console.log("🗑️ Removing event with ID:",_id);
    
        try {
            await axios.delete(`http://localhost:5000/events/${_id}`);
            setEvents(events.filter(event => event._id !==_id));
        } catch (error) {
            console.error("❌ Error removing event:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="container mt-4">
            <h2>Event Management</h2>
            <Button variant="primary" onClick={() => setShow(true)}>+ Add Event</Button>

            {/* Event Table */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.id ||index}>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.venue}</td>
                            <td>{event.status}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveEvent(event._id)}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding Event */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEvent.name}
                                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Venue</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEvent.venue}
                                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newEvent.status}
                                onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                            >
                                <option>Scheduled</option>  {/* ✅ Matches Backend */}
                                <option>Completed</option>  {/* ✅ Matches Backend */}
                                <option>Cancelled</option>  {/* ✅ Matches Backend */}
                            </Form.Control>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddEvent}>Add Event</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EventTable;
