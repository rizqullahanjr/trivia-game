'use client'

import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import AuthCheck from "@/libs/AuthCheck";
import { API } from "@/libs/axios";

const Dashboard: React.FC = () => {
  const [playerCount, setPlayerCount] = useState("Loading...");
  const [questionCount, setQuestionCount] = useState("Loading...");
  const [avatarCount, setAvatarCount] = useState("Loading...");

  useEffect(() => {
    AuthCheck();

    // Define each fetch operation as a promise
    const fetchPlayers = API.get('player/all').then(response => response.data.length);
    const fetchQuestions = API.get('quiz').then(response => response.data.length);
    const fetchAvatars = API.get('avatar').then(response => response.data.length);

    // Execute all promises concurrently
    Promise.all([fetchPlayers, fetchQuestions, fetchAvatars])
      .then(([playerCount, questionCount, avatarCount]) => {
        // Update state only after all promises are resolved
        setPlayerCount(playerCount);
        setQuestionCount(questionCount);
        setAvatarCount(avatarCount);
      })
      .catch(error => {
        console.error("Failed to fetch data", error);
        // Handle errors or set defaults
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Hello, World! This is the Dashboard Page</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-rose-500">
            <h1 className="text-2xl font-bold mb-4">Registered Players</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image 
                src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                alt="players icon"
                width={50}
                height={50}
              />
              <span style={{ marginLeft: '5px' }}>{playerCount}</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2xl font-bold mb-4">Number of Questions</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image 
                src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                alt="questions icon"
                width={50}
                height={50}
              />
              <span style={{ marginLeft: '5px' }}>{questionCount}</span>
            </div>
          </div>
          <div className="border-2 border-rose-500">
            <h1 className="text-2xl font-bold mb-4">Avatars Total</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image 
                src="https://cdn.discordapp.com/attachments/1192442047404191776/1196277068380504114/boy-avatar_2.png"
                alt="avatars icon"
                width={50}
                height={50}
              />
              <span style={{ marginLeft: '5px' }}>{avatarCount}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
