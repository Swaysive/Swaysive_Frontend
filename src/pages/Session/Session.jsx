import React from "react";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Session() {
  const navigate = useNavigate();
  const { handleLogout, authData } = useAuth();

  const deleteSessionToken = () => {
    localStorage.clear();
    // localStorage.removeItem('active');
    alert("Influencer token deleted!");
  };

  const onLogout = async () => {
      try {
     
        await handleLogout(); 
        toast.success("Logout successfully!");
        // Navigate to the home screen or any other screen after successful login
        navigate("/"); // Replace with your desired screen
      } catch (error) {
        toast.success("Logout unsuccessful!");
      }
    };


  return (
    <div>
       <button className="btn btn-secondary" onClick={onLogout}>
        Logout
      </button>
      <button className="btn btn-primary" onClick={deleteSessionToken}>
        Delete session token from cache
      </button>
      {/* <button className="btn btn-danger" onClick={getLocation}>
        Allow location
      </button> */}
    </div>
  );
}

export default Session;
