import React, { useEffect, useState } from 'react';
import { questionsCRUD } from '../questions/questionsCRUD';

interface Question {
  _id: { $oid: string };
  Question: string;
  Answer: string;
}

interface QuestionEditPopoutProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionEditPopout: React.FC<QuestionEditPopoutProps> = ({ question, onSave, onCancel }) => {
  const [editQuestion, setEditQuestion] = useState<Question>(question);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditQuestion(question);
  }, [question]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditQuestion({ ...editQuestion, [name]: value });
  };

  const handleEditChanges = async () => {
    setIsLoading(true);
    try {
      await questionsCRUD().updateQuestion(editQuestion._id, editQuestion.Question, editQuestion.Answer);
      onSave(editQuestion);
      window.location.reload();
    } catch (error) {
      console.error('Error updating question:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
      setIsLoading(true);
      try {
        await questionsCRUD().deleteQuestion(editQuestion._id);
        onCancel();
        window.location.reload();
      } catch (error) {
        console.error('Error deleting question:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="questionEditModal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-black">Edit Question</h2>
        </div>
        <div className="mt-4">
          <label htmlFor="questionInput" className="block text-sm font-medium text-gray-700">Question</label>
          <input type="text" id="questionInput" name="Question" value={editQuestion.Question} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black" />
        </div>
        <div className="mt-4">
          <label htmlFor="answerSelect" className="block text-sm font-medium text-gray-700">Answer</label>
          <select id="answerSelect" name="Answer" value={editQuestion.Answer} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black">
            <option value="Benar">Benar</option>
            <option value="Salah">Salah</option>
          </select>
        </div>
        <div className="flex justify-between items-center pt-4">
          <button 
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button" 
            onClick={handleEditChanges}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Edit'}
          </button>
          <button 
            className="bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button" 
            onClick={handleDeleteQuestion}
          >
            Delete
          </button>
          <button 
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditPopout;
