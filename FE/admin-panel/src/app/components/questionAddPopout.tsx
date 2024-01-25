import React, { useState } from "react";
import { questionsCRUD } from "../questions/questionsCRUD";

interface Question {
    question: string; // Note the lowercase 'q' in 'question'
    answer: string;
}

interface QuestionAddPopoutProps {
    onSave:  (question: Question) => void;
    onCancel: () => void;
}

const QuestionAddPopout: React.FC<QuestionAddPopoutProps> = ({ onSave, onCancel }) => {
    const { createQuestion } = questionsCRUD();
    const [newQuestion, setNewQuestion] = useState<Question>({ question: "", answer: "Benar"});

    const handleSaveQuestion = async () => {
        try {
            const response = await createQuestion(newQuestion.question, newQuestion.answer);
            onSave(response);
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewQuestion({ ...newQuestion, answer: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="questionAddModal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                    <input type="text" id="question" name="question" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black" />
                </div>
                <div className="mt-4">
                    <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
                    <select id="answer" name="answer" value={newQuestion.answer} onChange={handleAnswerChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black">
                        <option value="Benar">Benar</option>
                        <option value="Salah">Salah</option>
                    </select>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSaveQuestion}>save</button>
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onCancel}>cancel</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionAddPopout;
