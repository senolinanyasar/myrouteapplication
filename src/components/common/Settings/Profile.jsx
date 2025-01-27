import SettingSection from './SettingSection';
import { User } from "lucide-react";
import React from 'react';


const Profile = () => {
  const user = {
    avatar: '/src/components/images/avatar.jpg', 
    name: 'Tom Mat',
    email: 'tom.mat@example.com',
  };

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={user.avatar}
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">{user.name}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <button className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};

export default Profile;
