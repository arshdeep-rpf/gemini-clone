import { PromptCard } from "@/components/PromptCard";
import { it, describe, vi, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

describe("component:PromptCard", () => {
  it("render prompt", () => {
    const prompt = "write a js function";
    const onClick = vi.fn();
    render(<PromptCard prompt={prompt} onClick={onClick} />);

    const card = screen.getByTestId("prompt-card");
    expect(card).toBeDefined();
    expect(screen.getByText(prompt)).toBeDefined();

    fireEvent.click(card);
    expect(onClick).toBeCalledWith(prompt);
  });
});
