import { API } from "@/libs/axios";

export function avatarsCRUD(){

    const createAvatar = async (id: number, cost: number, image: string) => {
      const response = await API.post('/avatars', {
        id,
        cost,
        image
      });
      return response.data;
    };

    const readAvatars = async () => {
      const response = await API.get(`/avatar/get-all-avatar`);
      return response.data;
    };

    const readAvatarSingle = async (id: number) => {
      const response = await API.get(`/avatar/${id}`);
      return response.data;
    };

    const updateAvatarCost = async (id: number, cost: number) => {
      const response = await API.put(`/avatar/${id}/update-cost`, {
        cost
      });
      return response.data;
    };

    const deleteAvatar = async (id: number) => {
      const response = await API.delete(`/avatar/${id}`);
      return response.data;
    };

    return {
      createAvatar,
      readAvatars,
      readAvatarSingle,
      updateAvatarCost,
      deleteAvatar
    };
}