import Navbar from "../components/NavBar"
import EventTable from "../components/EventTable";
import ScheduledEvents from "../components/ScheduledEvents";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 


const AdminDashBoard=()=>
    {
        const navigate = useNavigate();
       
        return<>
        <Navbar/>
        <EventTable/>
        <ScheduledEvents/>
        <Button onClick={()=>navigate("/venueManagement")}>Go to venue Management</Button>
        <Button onClick={()=>navigate("/attandeeManagement")}>AtandeeManagemnt</Button>
        <Button onClick={()=>navigate("/vendorManagement")}>VendorManagement</Button>
        </>
        
       

    }
 export default AdminDashBoard;