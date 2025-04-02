const API_URL = "http://localhost:5000/api/venues"; // Ensure backend is running

export const fetchVenues = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addVenue = async (venue) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venue),
  });
  return response.json();
};

export const deleteVenue = async (id) => {
  console.log("Delete request for venue ID:", id); 
    if (!id) {
      console.error("Delete function called with undefined ID");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Failed to delete venue: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error in deleteVenue:", error);
    }
  };
  

export const countVenue=async()=>
{
    try{
        const response=await fetch("/api/venues/count");
        const data=await response.json();
        return data.count;
    }
    catch(error)
    {
        console.error("error fetchig:",error);
        return 0
    }
    
}