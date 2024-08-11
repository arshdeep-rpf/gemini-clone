import { IChat } from "@/types/chat";
import { apiClient } from "@/utils/apiClient";
import { useMutation } from "@tanstack/react-query";

const createChat = async (content: string): Promise<IChat> => {
  const resp = await apiClient.post(`/chat/`, { content });
  return resp.data.chat;
};

export const useCreateChat = () =>
  useMutation({
    mutationKey: [`create-chat`],
    mutationFn: (variables: { content: string }) =>
      createChat(variables.content),
  });
