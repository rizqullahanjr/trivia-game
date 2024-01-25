'use client'

import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { questionsCRUD } from "./questionsCRUD";
import AuthCheck from "@/libs/AuthCheck";
import QuestionAddPopout from "../components/questionAddPopout";
import QuestionEditPopout from "../components/questionEditPopout";

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState("Loading...");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPopout, setShowAddPopout] = useState(false);
  const [showEditPopout, setShowEditPopout] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState(null);

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

  const filteredQuestions = questions === "Loading..." ? "Loading..." : questions.filter((question: any) =>
    question.Question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuestion = () => {
    setShowAddPopout(true);
  };

  const handleCancelAdd = () => {
    setShowAddPopout(false);
  };

  const handleSaveAdd = (question: any) => {
    // Handle the saved question here
    console.log("Saved question:", question);
    setShowAddPopout(false);
  };

  const handleEditQuestion = (question: any) => {
    setEditQuestionData(question);
    setShowEditPopout(true);
  };

  const handleSaveEdit = (question: any) => {
    // Handle the edited question here
    console.log("Edited question:", question);
    setShowEditPopout(false);
  };

  const handleCancelEdit = () => {
    setShowEditPopout(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by question"
            value={searchTerm}
            onChange={handleSearch}
            className="mr-2"
          />
          <button onClick={handleAddQuestion} className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Question</button>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4">
          {filteredQuestions === "Loading..." ? "Loading..." : filteredQuestions.map((question: any, index: number) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <h4 className="font-bold text-black">{question.Question}</h4>
              <p className="text-black">Answer: {question.Answer}</p>
              <p className="text-black">{question._id.$oid}</p>
              <button onClick={() => handleEditQuestion(question)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
            </div>
          ))}
        </div>
        {showAddPopout && <QuestionAddPopout onSave={handleSaveAdd} onCancel={handleCancelAdd} />}
        {showEditPopout && <QuestionEditPopout question={editQuestionData} onSave={handleSaveEdit} onCancel={handleCancelEdit} />}
      </div>
    </div>
  );
};

export default Questions;