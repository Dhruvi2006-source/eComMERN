// src/pages/Profile.jsx
import React from "react";
import { useUser, UserButton } from "@clerk/clerk-react";

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="text-center mt-10">Loading user info...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        <UserButton />
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="font-semibold">Name:</span> {user.fullName || "N/A"}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.primaryEmailAddress?.emailAddress || "N/A"}
        </div>
        <div>
          <span className="font-semibold">User ID:</span> {user.id}
        </div>
        <div>
          <span className="font-semibold">Username:</span> {user.username || "Not set"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
