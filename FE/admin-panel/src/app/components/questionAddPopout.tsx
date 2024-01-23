import React, { useState } from "react";
import { questionsCRUD } from "../questions/questionsCRUD";

interface Question {
    Question: string;
    Answer: string;
}

interface QuestionAddPopoutProps {
    onSave:  (question: Question) => void;
    onCancel: () => void;
}

const QuestionAddPopout: React.FC<QuestionAddPopoutProps> = ({ onSave, onCancel }) => {
    const { createQuestion } = questionsCRUD();
    const [newQuestion, setNewQuestion] = useState<Question>({ Question: "", Answer: ""});
}