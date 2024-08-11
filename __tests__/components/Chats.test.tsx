import { Chats } from "@/components/Chats";
import { IChat } from "@/types/chat";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";

const getChatsData = (count: number): Array<IChat> => {
  return new Array(count)
    .fill({ userId: 1, createdAt: new Date() })
    .map((d, index) => ({
      id: index + 1,
      title: `title ${index + 1}`,
      ...d,
    }));
};

vi.mock("/src/icons/chat.svg", () => {
  return { default: () => {} };
});

vi.mock("/src/icons/arrow-down.svg", () => {
  return { default: () => {} };
});

describe("component:Chats", () => {
  afterEach(() => {
    cleanup();
  });

  it("render chats and for less than 5 no-showmore button", () => {
    const data = getChatsData(5);
    render(<Chats chats={data} isNavOpen />);

    const chats = screen.getAllByTestId("chat");
    expect(chats.length).toBe(data.length);
    expect(screen.queryByTestId("show-more-button")).toBeNull();
  });

  it("only render 5 childrens max and then render show more button", () => {
    const data = getChatsData(6);
    render(<Chats chats={data} isNavOpen />);

    const chats = screen.getAllByTestId("chat");
    expect(chats.length).toBe(5);

    const showMoreButton = screen.getByTestId("show-more-button");
    expect(showMoreButton).not.toBeNull();
  });

  it("on show more render all chats", () => {
    const data = getChatsData(6);
    render(<Chats chats={data} isNavOpen />);

    const showMoreButton = screen.getByTestId("show-more-button");
    fireEvent.click(showMoreButton);

    const chats = screen.getAllByTestId("chat");
    expect(chats.length).toBe(data.length);
  });

  it("hide chats on nav close", () => {
    const data = getChatsData(5);
    render(<Chats chats={data} isNavOpen={false} />);

    const chats = screen.queryAllByTestId("chat");
    expect(chats.length).toBe(0);
  });
});
