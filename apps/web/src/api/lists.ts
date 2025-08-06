import api from "@/lib/axios";

export const getListsByBoard = async (boardId: string) => {
  const res = await api.get(`lists/board/${boardId}`);
  return res.data;
};

export const createList = async (boardId: string, data: { title: string }) => {
  const res = await api.post(`/boards/${boardId}/lists`, data);
  return res.data;
};

export const updateList = async (listId: string, data: { title?: string }) => {
  const res = await api.put(`/lists/${listId}`, data);
  return res.data;
};

export const deleteList = async (listId: string) => {
  const res = await api.delete(`/lists/${listId}`);
  return res.data;
};
