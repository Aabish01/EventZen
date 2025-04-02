import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";

import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./components/RegisterPage";
import UserDashBoard from "./pages/UserDashBoard";
import AdminDashBoard from "./pages/AdminDashBoard";
import AdminLogin from "./pages/AdminLogin";
import VenueManagement from "./pages/VenueManagement";
import AttandeeManagement from "./pages/AttandeeManagement";
import VendorManagement from "./pages/VendorManagement";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<h2>Success! Welcome to EventZen Dashboard</h2>} />
        <Route path="/userdashboard" element={<UserDashBoard/>}/>
        <Route path="/admindashboard" element={<AdminDashBoard/>}/>
        <Route path="/venueManagement" element={<VenueManagement/>}/>
       <Route path="/attandeeManagement" element={<AttandeeManagement/>}/>
       <Route path="vendorManagement" element={<VendorManagement/>}/>
      </Routes>
    </Router>
  );
}

export default App;
