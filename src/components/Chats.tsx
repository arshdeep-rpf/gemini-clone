import ArrowDownIcon from "@/icons/arrow-down.svg";
import ChatIcon from "@/icons/chat.svg";
import { IChat } from "@/types/chat";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

export const Chats = ({
  isNavOpen,
  chats,
}: {
  isNavOpen: boolean;
  chats: Array<IChat>;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {chats.length > 0 && isNavOpen ? (
        <div className="w-full h-full overflow-auto">
          <p className="mb-2 ml-2 font-medium text-black/80 text-sm">Recent</p>
          {chats.slice(0, showMore ? undefined : 5).map((chat) => (
            <Link href={`/app/${chat.id}`} key={chat.id}>
              <Button
                data-testid="chat"
                className="flex items-center gap-3 w-full animate-fadeIn"
              >
                <ChatIcon className="w-4 min-w-4 h-auto" />
                <p className="font-medium text-ellipsis text-grey6 text-nowrap overflow-hidden">
                  {chat.title}
                </p>
              </Button>
            </Link>
          ))}
          {chats.length > 5 ? (
            <Button
              data-testid="show-more-button"
              onClick={() => setShowMore((s) => !s)}
              className="flex items-center gap-3 w-full animate-fadeIn"
            >
              <ArrowDownIcon
                className={twMerge("w-4", showMore && "rotate-180")}
              />
              Show More
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
