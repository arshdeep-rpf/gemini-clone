import { IMessage } from "@/types/message";
import { apiClient } from "@/utils/apiClient";
import { useMutation } from "@tanstack/react-query";

const createMessage = async (
  chatId: number,
  content: string
): Promise<Array<IMessage>> => {
  const resp = await apiClient.post(`/chat/${chatId}/messages`, { content });
  return resp.data.messages;
};

export const useCreateMessage = () =>
  useMutation({
    mutationKey: [`create-message`],
    mutationFn: (variables: { content: string; chatId: number }) =>
      createMessage(variables.chatId, variables.content),
  });
