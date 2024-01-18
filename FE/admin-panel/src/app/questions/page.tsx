import React from "react";
import Sidebar from "../components/sidebar";
import Image from "next/image";

const Questions: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Hello, World! This is the Questions Page
        </h1>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="border-2 border-rose-500">
            <h1 className="text-2x1 font-bold mb-4">Registered Players</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                  alt="test"
                  width={50}
                  height={50}
                />
                <span style={{ marginLeft: '5px' }}>100</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2x1 font-bold mb-4">Online Players</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                  alt="test"
                  width={50}
                  height={50}
                />
                <span style={{ marginLeft: '5px' }}>100</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2x1 font-bold mb-4">Numbers of Questions</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                  alt="test"
                  width={50}
                  height={50}
                />
                <span style={{ marginLeft: '5px' }}>100</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2x1 font-bold mb-4">Avatars bought</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                  alt="test"
                  width={50}
                  height={50}
                />
                <span style={{ marginLeft: '5px' }}>100</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2x1 font-bold mb-4">Diamonds Topped up</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                  alt="test"
                  width={50}
                  height={50}
                />
                <span style={{ marginLeft: '5px' }}>100</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2x1 font-bold mb-4">Registered Users</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                  alt="test"
                  width={50}
                  height={50}
                />
                <span style={{ marginLeft: '5px' }}>100</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Questions;
