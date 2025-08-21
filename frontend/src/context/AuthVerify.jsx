import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import

// This component can be placed in your App.js or main layout
const AuthVerify = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  // The function to handle the actual logout
  const handleLogout = () => {
    console.log("Logging out...");
    // 1. Clear user data from your state management (Redux, Context, etc.)
    // dispatch(logoutAction());

    // 2. Clear the token from storage
    localStorage.removeItem("utoken"); // or sessionStorage

    // 3. Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("utoken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          setIsExpired(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout(); // If token is malformed, log out immediately
      }
    }
  }, [navigate]); // Rerun effect if navigation changes

  // Countdown effect when session expires
  useEffect(() => {
    let timer;
    if (isExpired) {
      // Start the countdown timer
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    // When countdown reaches 0, log out
    if (countdown === 0) {
      handleLogout();
    }

    // Cleanup interval on component unmount or when no longer expired
    return () => clearInterval(timer);
  }, [isExpired, countdown]);

  // Render the expiration overlay message
  if (isExpired) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h2>Login Session Expired</h2>
          <p>Please log in again.</p>
          <p>Automatically logging out in {countdown} seconds...</p>
        </div>
      </div>
    );
  }

  return null; // Don't render anything if the session is valid
};

export default AuthVerify;
