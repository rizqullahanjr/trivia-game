import React, { useState } from 'react';
import { avatarsCRUD } from '../avatars/avatarsCRUD';

interface Avatar {
  cost: number;
  image: File;
}

interface AvatarAddPopoutProps {
  onSave: (avatar: Avatar) => void;
  onCancel: () => void;
}

const AvatarAddPopout: React.FC<AvatarAddPopoutProps> = ({ onSave, onCancel }) => {
  const { createAvatar } = avatarsCRUD();
  const [newAvatar, setNewAvatar] = useState<Avatar>({ cost: 0, image: null });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setNewAvatar({ ...newAvatar, image: file });
  };

  const handleSaveAvatar = async () => {
    const formData = new FormData();
    formData.append('cost', newAvatar.cost.toString()); // Append cost as a string
    formData.append('image', newAvatar.image); // Append image as a File object
  
    try {
      const response = await createAvatar(newAvatar.cost, newAvatar.image); // Pass cost and image directly to createAvatar
      onSave(response);
    } catch (error) {
      console.error('Error creating avatar:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="avatarAddModal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex flex-col items-center">
          <input type="file" id="imageUpload" name="image" onChange={handleImageUpload} className="mt-4 block w-full border-gray-300 rounded-md shadow-sm text-black" />
        </div>
        <div className="mt-4">
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
          <input type="text" id="cost" name="cost" value={newAvatar.cost.toString()} onChange={(e) => setNewAvatar({ ...newAvatar, cost: Number(e.target.value) })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSaveAvatar}>save</button>
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onCancel}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AvatarAddPopout;