const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // Import connectDB from ./db
const User = require("./models/User");


dotenv.config();
connectDB(); // Call the imported connectDB function

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Event Schema
const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], required: true }
});
const Event = mongoose.model("Event", EventSchema);

// Event Routes
app.post("/events", async (req, res) => {
    const { name, date, venue, status } = req.body;

    if (!name || !date || !venue || !status) {
        return res.status(400).json({ error: "All fields (name, date, venue, status) are required!" });
    }

    try {
        const newEvent = new Event({ id: Date.now(), name, date, venue, status });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/events/:id", async (req, res) => {
    try {
        const eventId = req.params.id;

        const deletedEvent = await Event.findByIdAndDelete(eventId); // Deleted from MongoDB

        if (deletedEvent) {
            res.json({ message: "Event deleted successfully!" });
        } else {
            res.status(404).json({ error: "Event not found!" });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/upcomingevents", async (req, res) => {
    try {
        const events = await Event.find({ status: "Scheduled" });
        console.log("Scheduled Events Found:", events.length > 0 ? events : "No scheduled events found");
        res.json(events);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Authentication and Admin Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));


const venueSchema = new mongoose.Schema({
    name: String,
    location: String,
    capacity: Number,
  });
  const Venue = mongoose.model("Venue", venueSchema);
  
  // Get all venues
  app.get("/api/venues", async (req, res) => {
    try {
      const venues = await Venue.find();
      res.json(venues);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  //get count of the values
  app.get("/api/venues/count",async(rq,res)=>
{
    const count=await Venue.countDocuments();
    req.json({count});   
})


  // Add a venue
  app.post("/api/venues", async (req, res) => {
    try {
      const newVenue = new Venue(req.body);
      await newVenue.save();
      res.status(201).json(newVenue);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a venue
  app.delete("/api/venues/:id", async (req, res) => {
    try {
      await Venue.findByIdAndDelete(req.params.id);
      res.json({ message: "Venue deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
//attandee Management endpoints
// Get all users (attendees) with role "user"
app.get("/api/attendees", async (req, res) => {
  try {
    const attendees = await User.find({ role: "user" }, "name email");
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an attendee
app.delete("/api/attendees/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Attendee removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 
//view the admins 
app.get("/api/attendees/admin", async (req, res) => {
  try {
    const attendees = await User.find({ role: "admin" }, "name email");
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
