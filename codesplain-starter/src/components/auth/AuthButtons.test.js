import { render, screen } from "@testing-library/react";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";
import { MemoryRouter } from "react-router-dom";

const renderComponent = async () => {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
  await screen.findAllByRole("link");
};

describe("When user is not signed in", () => {
  // this will be used for all tests in this describe block
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("renders sign in and sign up buttons", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: "Sign In" });
    const signUpButton = screen.getByRole("link", { name: "Sign Up" });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out button is not rendered", async () => {
    await renderComponent();

    // we used queryByRole because getByRole will throw an error if the element is not found. But queryByrole will return null if the element is not found.
    const signOutButton = screen.queryByRole("link", { name: "Sign Out" });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

/* describe("When user is signed in", () => {
  // this will be used for all tests in this describe block
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 1, email: "test@test.com" } };
      },
    },
  ]);

  test("sign in and sign out button are not rendered", () => {
    renderComponent();
  });

  test("sign out button is rendered", () => {
    renderComponent();
  });
}); */
