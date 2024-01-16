// pages/dashboard.tsx
import React from "react";
import Sidebar from "../components/sidebar";

const topup: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Hello, World! This is the topup Page
        </h1>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
};

export default topup;
