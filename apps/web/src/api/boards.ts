import api from "@/lib/axios";

export const fetchUserBoards = async () => {
  const res = await api.get("/boards");
  return res.data;
};

export const fetchBoardById = async (id: string) => {
  const response = await api.get(`/boards/${id}`);
  return response.data;
};

export const createBoard = async (data: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/boards", data);
  return res.data;
};
