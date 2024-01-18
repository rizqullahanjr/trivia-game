// userEditPopout.tsx
import React, { useEffect, useState } from 'react';
import { userCRUD } from '../users/userCRUD';

interface User {
  id: number;
  name: string;
  active_avatar: string;
  diamond: number;
  highest_score: number;
}

interface UserEditPopoutProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserEditPopout: React.FC<UserEditPopoutProps> = ({ user, onSave, onCancel }) => {
  const { updateUser, resetScore } = userCRUD();
  const [editUser, setEditUser] = useState<User>(user);

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleResetScore = async () => {
    // Use the resetScore function to reset the user's highest score
    const response = await resetScore(editUser.id, editUser.name, editUser.active_avatar, editUser.diamond, 0);
    onSave({ ...editUser, highest_score: 0 }); // Update the local state to reflect the reset score
  };

  const handleSaveChanges = async () => {
    // Ensure diamond is sent as a number
    const diamondAsNumber = isNaN(editUser.diamond) ? 0 : Number(editUser.diamond);

    const response = await updateUser(editUser.id, editUser.name, editUser.active_avatar, diamondAsNumber, editUser.highest_score);
    onSave(response);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="userEditModal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex flex-col items-center">
          <img src={editUser.active_avatar} alt="User avatar image placeholder" className="rounded-full mb-4" />
          <h2 className="text-lg font-semibold">{editUser.name}</h2>
          <span className="text-sm text-gray-500">#{editUser.id}</span>
          <span className="text-sm text-gray-500">Joined at 12/12/2023</span>
        </div>
        <div className="mt-4">
          <label htmlFor="avatarSelect" className="block text-sm font-medium text-gray-700">Avatar Select</label>
          <input type="text" id="avatarSelect" name="active_avatar" value={editUser.active_avatar} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black" />
        </div>
        <div className="mt-4">
          <label htmlFor="diamond" className="block text-sm font-medium text-gray-700">Diamond</label>
          <input type="text" id="diamond" name="diamond" value={editUser.diamond.toString()} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black" />
        </div>
        <div className="mt-4">
          <label htmlFor="highestScore" className="block text-sm font-medium text-gray-700">Highest Score</label>
          <div className="rounded-md shadow-sm border-2 border-gray-300 text-3xl text-center py-2 text-black" id="highestScore">{editUser.highest_score}</div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleResetScore}>reset</button>
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSaveChanges}>save</button>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onCancel}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditPopout;
