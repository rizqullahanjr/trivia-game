import { API } from "@/libs/axios";

export function questionsCRUD(){

    const createQuestion = async (ID: string, Question: string, answer: string) => {
      const response = await API.post('/Questions', {
        ID,
        Question,
        answer
      });
      return response.data;
    };

    const readQuestions = async () => {
      const response = await API.get(`/quiz`);
      return response.data;
    };

    const readQuestionSingle = async (ID: string, Question: string, answer: string) => {
      const response = await API.get(`/Question/${ID}`, {
        params: {
          Question,
          answer
        }
      });
      return response.data;
    };

    const updateQuestion = async (ID: string, Question: string, answer: string) => {
      const response = await API.post(`/Question/${ID}`, {
        Question,
        answer
      });
      return response.data;
    };

    const deleteQuestion = async (ID: string) => {
      const response = await API.delete(`/Question/${ID}`);
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