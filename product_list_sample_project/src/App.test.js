import { screen, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("shows 6 products by default", async () => {
  render(<App />);
  const titles = await screen.findAllByRole("heading");
  expect(titles).toHaveLength(6);
});

test("shows 6 products when clicking the button", async () => {
  render(<App />);
  const button = await screen.findByRole("button", { name: /load more/i });

  await user.click(button);

  await waitFor(async () => {
    const titles = await screen.findAllByRole("heading");
    expect(titles).toHaveLength(12);
  });
});
