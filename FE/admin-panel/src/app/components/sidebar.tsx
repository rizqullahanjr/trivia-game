import React from "react";

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-gray-200 p-4 min-h-screen">
      <ul>
        <li className="mb-2">
          <a href="/dashboard" className="text-blue-600 hover:underline">Home</a>
        </li>
        <li className="mb-2">
          <a href="/users" className="text-blue-600 hover:underline">Users</a>
        </li>
        <li className="mb-2">
          <a href="/avatars" className="text-blue-600 hover:underline">Avatars</a>
        </li>
        <li className="mb-2">
          <a href="/questions" className="text-blue-600 hover:underline">Questions</a>
        </li>
        <li className="mb-2">
          <a href="/logout" className="text-red-600 hover:underline">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
