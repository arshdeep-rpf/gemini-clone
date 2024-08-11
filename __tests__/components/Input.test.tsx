import { expect, test, describe, vi, it, afterEach } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { AppInput } from "../../src/components/Input";
import { beforeEach } from "node:test";
import exp from "node:constants";
import { text } from "stream/consumers";

vi.mock("/src/icons/add_image.svg", () => {
  return { default: () => {} };
});

vi.mock("/src/icons/microphone.svg", () => {
  return { default: () => {} };
});

vi.mock("/src/icons/send.svg", () => {
  return { default: () => {} };
});

describe("component:Input", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render input", () => {
    render(<AppInput handleSendMessageClick={() => {}} />);
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeDefined();
    expect(screen.queryByTestId("send-button")).toBeNull();
  });

  it("should render send button only when input has some content", () => {
    render(<AppInput handleSendMessageClick={() => {}} value={"some value"} />);
    const inputField = screen.getByRole("textbox");
    const sendButton = screen.getByTestId("send-button");

    expect(screen.getByDisplayValue("some value")).toBeDefined();
    expect(inputField).not.toBeNull();
    expect(sendButton).not.toBeNull();
  });

  it("should call handleSendMessageClick on submit or button click", () => {
    const handleSendMessageClick = vi.fn();
    render(
      <AppInput
        handleSendMessageClick={handleSendMessageClick}
        value={"some value"}
      />
    );
    const sendButton = screen.getByTestId("send-button");

    fireEvent.click(sendButton, { target: { value: "some value" } });
    expect(handleSendMessageClick).toBeCalledWith("some value");
  });
});
