'use client'
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { avatarsCRUD } from "./avatarsCRUD";
import AuthCheck from "@/libs/AuthCheck";
import AvatarAddPopout from "../components/avatarAddPopout";

const Avatars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [showAddPopout, setShowAddPopout] = useState(false);

  useEffect(() => {
    AuthCheck();
  }, []);

  useEffect(() => {
    avatarsCRUD().readAvatars().then((res) => {
      setAvatars(res);
    });
  }, []);

  const filteredAvatars = avatars.filter((avatar) =>
    avatar.id.toString().includes(searchTerm)
  );

  const toggleAddPopout = () => {
    setShowAddPopout(!showAddPopout);
  };

  const handleSave = (avatar) => {
    // Add logic to handle saving the new avatar
    console.log("Saving avatar:", avatar);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        <input
          type="text"
          placeholder="Search by ID"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="p-2 mb-4 border border-gray-300 rounded text-black"
        />
        <button onClick={toggleAddPopout}>Add Avatar</button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredAvatars.map((avatar, index) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={avatar.image} alt="Avatar" className="w-full h-48 object-cover object-center"/>
              <div className="p-4">
                <p className="text-black">id: {avatar.id}</p>
                <p className="text-black">Cost: {avatar.cost}</p>
              </div>
            </div>
          ))}
        </div>
        {showAddPopout && <AvatarAddPopout onSave={handleSave} onCancel={toggleAddPopout} />}
      </main>
    </div>
  );
};

export default Avatars;