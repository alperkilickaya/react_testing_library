import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  // but this not the best way to do it because this test can be broken if the component changes
  /*   const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button"); */

  // The best way to do it is to use the label to find the inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Assertion - make sure the component is doing
  // what we expect it to do
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();
  // NOT THE BEST IMPLEMENTATION
  /*   const argList = [];
  const callback = (...args) => {
    argList.push(args);
  }; */
  // Try to render my component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  /*   const [nameInput, emailInput] = screen.getAllByRole("textbox"); */

  // The best way to do it is to use the label to find the inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard("jane");

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  await user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  /*  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "jane", email: "jane@jane.com" }); */
  expect(mock).toHaveBeenCalledTimes(1);

  // Check the arguments that the mock function was called with
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@jane.com" });
});
