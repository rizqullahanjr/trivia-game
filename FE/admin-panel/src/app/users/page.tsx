'use client'
import React from "react";
import Sidebar from "../components/sidebar";
import { userCRUD } from "./userCRUD";

const Users: React.FC = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    userCRUD().readUser().then((res) => {
      const usersWithDefaultAvatars = res.map(user => ({
        ...user,
        active_avatar: user.active_avatar || "https://cdn.discordapp.com/attachments/1192442047404191776/1196646572067397662/no-image-available.jpg"
      }));
      setUsers(usersWithDefaultAvatars);
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {users.map((user: any, index: number) => (
          <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={user.active_avatar} alt="Avatar" className="w-full h-48 object-cover object-center"/>
            <div className="p-4">
              <h4 className="font-bold text-black">{user.name}</h4>
              <p className="text-black">Diamonds: {user.diamond}</p>
              <p className="text-black">Highest Score: {user.highest_score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
