import React from "react";
import Admin from "@/models/admin";
import {API} from "@/libs/axios";
import User from "@/models/user";

export function userCRUD(){

    const createUser = async (name: string, active_avatar: string, diamond: number, highest_score: number) => {
      const response = await API.post('/players', {
        name,
        active_avatar,
        diamond,
        highest_score
      });
      return response.data;
    };

    const readUser = async () => {
      const response = await API.get(`/players`);
      return response.data;
    };

    const readUserSingle = async (id: number, name: string, active_avatar: string, diamond: number, highest_score: number) => {
      const response = await API.get(`/player/${id}`, {
        params: {
          name,
          active_avatar,
          diamond,
          highest_score
        }
      });
      return response.data;
    };

    const updateUser = async (id: number, name: string, active_avatar: string, diamond: number, highest_score: number) => {
      const response = await API.post(`/player/${id}`, {
        name,
        active_avatar,
        diamond,
        highest_score
      });
      return response.data;
    };

    const resetScore = async (id: number, name: string, active_avatar: string, diamond: number, highest_score: number) => {
      const response = await API.put(`/player/${id}/reset-score`, {
        highest_score
      });
      return response.data;
    };

    const deleteUser = async (id: number) => {
      const response = await API.delete(`/player/${id}`);
      return response.data;
    };

    return {
      createUser,
      readUser,
      readUserSingle,
      updateUser,
      deleteUser,
      resetScore
    };
}