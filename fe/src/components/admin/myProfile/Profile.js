import React from "react";
import UserProfile from "@components/user/UserProfile";

const Profile = () => {
  React.useEffect(() => {
    document.title = "Quantox Hotel - Admin Panel - MyProfile";
  }, []);
  return <UserProfile adminPanel />;
};

export default Profile;
