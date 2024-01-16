import React from "react";
import Admin from "@/models/admin";
import {API, setAuthToken} from "@/libs/axios";
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

    const updateUser = async (id: number, name: string, active_avatar: string, diamond: number, highest_score: number) => {
      const response = await API.put(`/players/${id}`, {
        name,
        active_avatar,
        diamond,
        highest_score
      });
      return response.data;
    };

    const deleteUser = async (id: number) => {
      const response = await API.delete(`/players/${id}`);
      return response.data;
    };

    return {
      createUser,
      readUser,
      updateUser,
      deleteUser
    };
}