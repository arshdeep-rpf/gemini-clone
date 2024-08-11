"use client";
import { memo, useCallback, useState } from "react";

import { AppWelcome } from "@/components/AppWelcome";
import { PromptCard } from "@/components/PromptCard";
import CodeIcon from "@/icons/code.svg";
import NavigationIcon from "@/icons/navigation.svg";
import PencilIcon from "@/icons/pencil.svg";
import TravelIcon from "@/icons/travel.svg";
import { queryClient } from "@/providers/queryClientProvider";
import { useRouter } from "next/navigation";
import { AppInput } from "../../components/Input";
import { Loader } from "../../components/Loader";
import { useCreateChat } from "../../hooks/useCreateChat";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useAuth } from "@/providers/authContext";

const cardsData = [
  { prompt: "Write JS function for lodash omit", Icon: CodeIcon },
  { prompt: "Must places to visit in Bengaluru", Icon: NavigationIcon },
  { prompt: "Find perfect time to travel Thailand", Icon: TravelIcon },
  { prompt: "Write a thank you note to my colleague", Icon: PencilIcon },
];

const PromptCards = memo(function PromptCards({
  onClick,
}: {
  onClick: (prompt: string) => void;
}) {
  return (
    <div className="flex gap-x-2 animate-fadeIn overflow-x-auto no-scrollbar">
      {cardsData.map(({ prompt, Icon }, index) => {
        return (
          <PromptCard
            key={index}
            onClick={onClick}
            prompt={prompt}
            Icon={Icon}
          />
        );
      })}
    </div>
  );
});

const AppWelcomeScreenWithPropmpts = memo(
  ({ onSelect }: { onSelect: (prompt: string) => void }) => {
    const { user } = useAuth();
    return (
      <div className="mx-auto pb-8 h-full overflow-auto">
        <AppWelcome
          username={user.name}
          welcomeMessage="How can I help you today?"
        />
        <PromptCards onClick={onSelect} />
      </div>
    );
  }
);

export default function App() {
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: createChat } = useCreateChat();
  const { mutateAsync: createMessage } = useCreateMessage();

  const router = useRouter();

  const handleSendMessageClick = useCallback(
    (content: string) => {
      setLoading(true);
      createChat({ content }).then((chat) => {
        queryClient.invalidateQueries({ queryKey: ["chats"], exact: true });

        createMessage({ chatId: chat.id, content }).then(() => {
          router.replace(`/app/${chat.id}`);
        });
      });
    },
    [createChat]
  );

  return (
    <div className="flex flex-col justify-between mx-auto px-5 md:px-0 w-full max-w-[830px] h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <AppWelcomeScreenWithPropmpts onSelect={setInput} />
      )}
      <AppInput value={input} handleSendMessageClick={handleSendMessageClick} />
    </div>
  );
}
