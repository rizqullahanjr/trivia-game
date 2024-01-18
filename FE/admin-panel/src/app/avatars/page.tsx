// pages/dashboard.tsx
import React from "react";
import Sidebar from "../components/sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Hello, World! This is the avatar shop Page
        </h1>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
};

export default Dashboard;
