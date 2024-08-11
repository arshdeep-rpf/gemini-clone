import { IMessage } from "@/types/message";
import { apiClient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

const getMessages = async (chatId: number): Promise<Array<IMessage>> => {
  console.time("getMessages");
  const resp = await apiClient.get(`/chat/${chatId}/messages`);
  console.timeEnd("getMessages");
  return resp.data.messages;
};

export const useMessages = ({ chatId }: { chatId: number }) =>
  useQuery({
    initialData: [],
    queryKey: [`chats/${chatId}/messages`],
    queryFn: () => getMessages(chatId),
  });
