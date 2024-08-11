"use client";

import { AppInput } from "@/components/Input";
import { Loader } from "@/components/Loader";
import { Message } from "@/components/Message";
import { IMessage } from "@/types/message";
import { redirect } from "next/navigation";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useCreateMessage } from "../../../hooks/useCreateMessage";
import { useMessages } from "../../../hooks/useMessages";

export default function AppChat({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  const parsedChatId = Number(chatId);

  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const messagesContainerRef = useRef<HTMLDivElement>();
  const {
    data: messagesData,
    isFetching: isMessagesLoading,
    status: getMessagesStatus,
  } = useMessages({
    chatId: parsedChatId,
  });

  useEffect(() => {
    if (messagesData.length > 0) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const {
    mutateAsync: createMessage,
    isPending: isCreateMessageLoading,
    status: createMessageStatus,
  } = useCreateMessage();

  const isLoading = isMessagesLoading || isCreateMessageLoading;

  const scrollToEnd = () => {
    messagesContainerRef.current?.scrollIntoView?.({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    if (createMessageStatus === "success" || getMessagesStatus === "success") {
      setTimeout(scrollToEnd, 2000);
    }
  }, [getMessagesStatus, createMessageStatus]);

  useEffect(() => {
    scrollToEnd();
  }, [isLoading]);

  const handleSendMessageClick = (content: string) => {
    createMessage({ content, chatId: parsedChatId }).then((message) => {
      setMessages((messages) => [...messages, ...message]);
    });
  };

  if (isNaN(parsedChatId)) {
    return redirect("/app");
  }

  return (
    <div className="flex flex-col justify-between mx-auto px-5 md:px-0 w-full h-full">
      <div className="h-full overflow-y-auto">
        <div
          className="flex flex-col gap-12 mx-auto pb-8 w-full max-w-[700px]"
          ref={messagesContainerRef as LegacyRef<HTMLDivElement> | undefined}
        >
          {messages.map((message, index) => {
            return (
              <Message
                content={message.content}
                role={message.role}
                key={message.id}
              />
            );
          })}
          {isLoading ? <Loader /> : null}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[830px]">
        <AppInput
          handleSendMessageClick={handleSendMessageClick}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
