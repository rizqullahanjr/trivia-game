import { API } from "@/libs/axios";

export function avatarsCRUD(){

	const createAvatar = async (cost: number, image: File) => {
		const formData = new FormData();
		formData.append('cost', cost.toString());
		formData.append('image', image);

		try {
			const response = await API.post('/avatar/add', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data;
		} catch (error) {
			console.error('Error uploading image:', error);
			throw error;
		}
	};

	const readAvatars = async () => {
		const response = await API.get(`/avatar`);
		return response.data;
	};

	const readAvatarSingle = async (id: number) => {
		const response = await API.get(`/avatar/${id}`);
		return response.data;
	};

	const updateAvatar = async (id: number, cost: number, image: string) => {
		const response = await API.put(`/avatar/${id}`, {
			cost,
			image
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
		updateAvatar,
		deleteAvatar
	};
}
