'use client'
import React, { useState , useEffect } from "react";
import Sidebar from "../components/sidebar";
import { userCRUD } from "../users/userCRUD";
import UserEditPopout from "../components/userEditPopout";
import AuthCheck from "@/libs/AuthCheck";

const Users: React.FC = () => {

  useEffect(() => {
    AuthCheck();
  }, []);
  

  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // New state to track loading status

  const [editingUser, setEditingUser] = useState(null); // New state to track the user being edited

  React.useEffect(() => {
    userCRUD().readUser().then((res) => {
      const usersWithDefaultAvatars = res.map((user: any) => ({
        ...user,
        active_avatar: user.active_avatar || "https://cdn.discordapp.com/attachments/1192442047404191776/1196646572067397662/no-image-available.jpg"
      }));
      setUsers(usersWithDefaultAvatars);
      setLoading(false); // Set loading to false after data is loaded
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: any) => {
    setEditingUser(user); // Set the user to be edited
  };

  const handleSaveUser = (updatedUser: any) => {
   const updatedUsers = users.map((user: any) => (user.id === updatedUser.id ? updatedUser : user));
    setUsers(updatedUsers);
    setEditingUser(null); // Reset the editing user state
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4"
        />
        {loading ? (
          <p>Loading...</p> // Show loading placeholder if data is not loaded yet
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
            {filteredUsers.map((user: any, index: number) => (
              <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={user.active_avatar} alt="Avatar" className="w-full h-48 object-cover object-center"/>
                <div className="p-4">
                  <h4 className="font-bold text-black">{user.name}</h4>
                  <p className="text-black">Diamonds: {user.diamond}</p>
                  <p className="text-black">Highest Score: {user.highest_score}</p>
                  <button className="text-black" onClick={() => handleEditUser(user)}>Edit</button> {/* Button to trigger edit */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {editingUser && ( // Render the UserEditPopout component if editingUser is not null
        <UserEditPopout user={editingUser} onSave={handleSaveUser} onCancel={() => setEditingUser(null)} />
      )}
    </div>
  );
};

export default Users;

