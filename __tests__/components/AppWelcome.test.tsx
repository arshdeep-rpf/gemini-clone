import { AppWelcome } from "../../src/components/AppWelcome";
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "node:test";

describe("component:AppWelcome", () => {
  it("should render username and welcome message", () => {
    const username = "Arshdeep",
      welcomeMessage = "Hey, how're you?";
    render(<AppWelcome username={username} welcomeMessage={welcomeMessage} />);
    expect(
      screen.getByRole("heading", { level: 1, name: /hello/i }).textContent
    ).toContain(username);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toContain(
      welcomeMessage
    );
  });
});
