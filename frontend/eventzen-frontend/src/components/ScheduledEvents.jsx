import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

const ScheduledEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/upcomingevents");
                setEvents(res.data);
            } catch (error) {
                console.error("❌ Error fetching events:", error.message);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "20px", padding: "20px" }}>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {events.length > 0 ? (
                    events.map(event => (
                        <Card key={event._id} style={{ width: '18rem', backgroundColor: 'rgba(0, 128, 255, 0.2)' }}>
                            <Card.Body>
                                <Card.Title><FaCalendarAlt /> {event.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{new Date(event.date).toLocaleDateString()}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Status:</strong> {event.status} <br />
                                    <strong>Location:</strong> {event.location || "TBD"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No scheduled events found.</p>
                )}
            </div>
        </div>
    );
};

export default ScheduledEvents;
