import { useAuth } from "hooks/useAuth";
import React from "react";

const MyDashboard = () => {
  const { logoutUser } = useAuth();

  const handleLogoutClick = async () => {
    console.log("logout clicked");
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
      // Show error to user
    }
  };

  return (
    <div>
      Hello
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default MyDashboard;
