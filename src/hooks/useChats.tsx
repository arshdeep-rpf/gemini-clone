import { IChat } from "@/types/chat";
import { apiClient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

const getChats = async (): Promise<Array<IChat>> => {
  const resp = await apiClient.get("/chat");
  return resp.data.chats;
};

export const useChats = () =>
  useQuery({ initialData: [], queryKey: ["chats"], queryFn: getChats });
