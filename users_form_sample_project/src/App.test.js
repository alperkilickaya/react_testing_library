import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("renders learn react link", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  const button = screen.getByRole("button");

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard("jane");

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  await user.click(button);

  // this will show the DOM in the console
  //screen.debug();

  const name = screen.getByRole("cell", { name: /^jane$/i });
  const email = screen.getByRole("cell", { name: /^jane@jane\.com$/i });

  /*  screen.logTestingPlaygroundURL(); */

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
