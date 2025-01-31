import { useEffect } from "react";
import GoogleIcon from "../../assets/icons/google.png";

// Custom button with Google logo
const CustomGoogleSignInButton = () => {
  useEffect(() => {
    // Initialize the Google Sign-In API
    window.google.accounts.id.initialize({
      client_id: "YOUR_CLIENT_ID", // Replace with your client ID
      callback: handleCallbackResponse,
    });
  }, []);

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "50px", // Button height
        backgroundColor: "#F6F6F6", // Google blue color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px", // Rounded corners
        cursor: "pointer",
        color: "#4E4B66",
        fontWeight: "bold",
        fontSize: "16px",
        marginTop:'15px',
        marginBottom:'15px',
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
      onClick={() => window.google.accounts.id.prompt()}
    >
      <img
        src={GoogleIcon}
        alt="Google"
        style={{
          width: "30px", // Logo size
          marginRight: "10px", // Space between logo and text
        }}
      />
      Sign in with Google
    </div>
  );
};

export default CustomGoogleSignInButton;
