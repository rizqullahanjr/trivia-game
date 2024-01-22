'use client'
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { questionsCRUD } from "./questionsCRUD";
import AuthCheck from "@/libs/AuthCheck";

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    questionsCRUD().readQuestions().then((res) => {
      setQuestions(res);
    });
  }, []);

  useEffect(() => {
    AuthCheck();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuestions = questions.filter((question: any) =>
    question.Question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <input
          type="text"
          placeholder="Search by question"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4"
        />
        <div className="grid grid-cols-1 gap-4 p-4">
          {filteredQuestions.map((question: any, index: number) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <h4 className="font-bold text-black">{question.Question}</h4>
              <p className="text-black">Answer: {question.Answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;