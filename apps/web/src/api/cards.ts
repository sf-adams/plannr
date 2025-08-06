import api from "@/lib/axios";

export const getCardsByList = async (listId: string) => {
  const res = await api.get(`cards/list/${listId}`);
  return res.data;
};

export const createCard = async (
  listId: string,
  data: { title: string; description?: string }
) => {
  const res = await api.post(`/cards`, data);
  return res.data;
};

export const updateCard = async (
  cardId: string,
  data: {
    title?: string;
    description?: string;
    assignee?: string;
    priority?: string;
  }
) => {
  const res = await api.put(`/cards/${cardId}`, data);
  return res.data;
};

export const deleteCard = async (cardId: string) => {
  const res = await api.delete(`/cards/${cardId}`);
  return res.data;
};

export const moveCard = async (
  cardId: string,
  toListId: string,
  order: number
) => {
  return await api.patch(`/cards/${cardId}/move`, {
    toListId,
    order,
  });
};
