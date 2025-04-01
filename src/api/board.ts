import { api } from "api";
import { BoardRequest } from "types/board";

export const getBoard = async (page: number, sort: string = "createdAt", order: string = "desc") => {
  const response = await api(`api/v1/boards?page=${page}&sort=${sort},${order}`, "GET");
  return response;
};
export const getBoardById = async (id: number) => {
  const response = await api(`api/v1/boards/${id}`, "GET");
  return response;
};
export const createBoard = async (data: BoardRequest) => {
  const response = await api("api/v1/boards", "POST", data);
  return response;
};
