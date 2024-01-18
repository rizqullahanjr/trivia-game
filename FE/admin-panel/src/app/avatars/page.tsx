'use client'
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { avatarsCRUD } from "./avatarsCRUD";

const Avatars: React.FC = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    avatarsCRUD().readAvatars().then((res) => {
      setAvatars(res);
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Hello, World! This is the Avatars shop Page
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {avatars.map((avatar, index) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={avatar.image} alt="Avatar" className="w-full h-48 object-cover object-center"/>
              <div className="p-4">
                <h4 className="font-bold text-black">{avatar.name}</h4>
                <p className="text-black">Cost: {avatar.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Avatars;