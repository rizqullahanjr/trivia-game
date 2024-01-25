import { API } from "@/libs/axios";

export function questionsCRUD(){

    const createQuestion = async (question: string, answer: string) => {
      const response = await API.post('/quiz/add', {
        question,
        answer
      });
      return response.data;
    };

    const readQuestions = async () => {
      const response = await API.get(`/quiz`);
      return response.data;
    };

    const readQuestionSingle = async (_id: { $oid: string }) => {
      const response = await API.get(`/quiz/${_id.$oid}`);
      return response.data;
    };

    const updateQuestion = async (_id: { $oid: string }, question: string, answer: string) => {
      const response = await API.put(`/quiz/${_id.$oid}`, {
        question,
        answer
      });
      return response.data;
    };

    const deleteQuestion = async (_id: { $oid: string }) => {
      const response = await API.delete(`/quiz/${_id.$oid}`);
      return response.data;
    };

    return {
      createQuestion,
      readQuestions,
      readQuestionSingle,
      updateQuestion,
      deleteQuestion
    };
}