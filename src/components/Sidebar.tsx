"use client";
import ActivityIcon from "@/icons/activity.svg";
import ArrowDownIcon from "@/icons/arrow-down.svg";
import ChatIcon from "@/icons/chat.svg";
import HamburgerIcon from "@/icons/hamburger.svg";
import HelpIcon from "@/icons/help.svg";
import PlusIcon from "@/icons/plus.svg";
import SettingIcon from "@/icons/setting.svg";
import Link from "next/link";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useChats } from "../hooks/useChats";
import { Button } from "./Button";

const settingSectionItems = [
  {
    label: "Help",
    Icon: HelpIcon,
  },
  { label: "Activity", Icon: ActivityIcon },
  { label: "Settings", Icon: SettingIcon },
];

const Chats = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const { data: chats } = useChats();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {chats.length > 0 && isNavOpen ? (
        <div className="w-full h-full overflow-auto">
          <p className="mb-2 ml-2 font-medium text-black/80 text-sm">Recent</p>
          {chats.slice(0, showMore ? undefined : 5).map((chat) => (
            <Link href={`/app/${chat.id}`} key={chat.id}>
              <Button className="flex items-center gap-3 w-full animate-fadeIn">
                <ChatIcon className="w-4 min-w-4 h-auto" />
                <p className="font-medium text-ellipsis text-grey6 text-nowrap overflow-hidden">
                  {chat.title}
                </p>
              </Button>
            </Link>
          ))}
          {chats.length > 5 ? (
            <Button
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

export function SideBar() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const onHamBurgetButtonClicked = useCallback(() => {
    setIsNavOpen((n) => !n);
  }, []);

  return (
    <div
      className={twMerge(
        "flex flex-col bg-grey1 px-3 pt-3 h-screen transition-all animate-fadeIn overflow-hidden",
        isNavOpen ? "w-[320px] min-w-[320px] max-w-[320px]" : "w-[72px]"
      )}
    >
      <Button className="p-3 w-fit" onClick={onHamBurgetButtonClicked}>
        <HamburgerIcon />
      </Button>{" "}
      <div className="flex flex-col justify-between gap-5 w-full h-full">
        {/* new chat & recent chats */}
        <Link href={"/app"}>
          <Button
            className={twMerge(
              "flex items-center gap-2 bg-grey3 hover:bg-grey5 mt-12 p-2 w-fit",
              isNavOpen && "px-4"
            )}
          >
            <PlusIcon />
            {isNavOpen ? "New Chat" : null}
          </Button>
        </Link>

        {/* chats */}
        <Chats isNavOpen={isNavOpen} />

        {/* help and settings section */}
        <div className="pb-4 min-h-fit">
          {settingSectionItems.map(({ label, Icon }) => (
            <Button className="flex items-center gap-2 p-2 w-full" key={label}>
              <Icon className="w-[1.25rem] h-[1.25rem]" />
              {isNavOpen && label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
