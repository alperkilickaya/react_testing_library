import { render, screen } from "@testing-library/react";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";

const renderComponent = async () => {
  render(
    // this is to prevent the useSWR hook from caching the data
    // So at each test, the data is fetched again with the new server response not the cached data
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
};

describe("When user is not signed in", () => {
  // this will be used for all tests in this describe block
  createServer([
    {
      path: "/api/user",
      res: () => {
        console.log("not signed in");
        return { user: null };
      },
    },
  ]);

  test("renders sign in and sign up buttons", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out button is not rendered", async () => {
    await renderComponent();

    // we used queryByRole because getByRole will throw an error if the element is not found. But queryByrole will return null if the element is not found.
    const signOutButton = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

describe("When user is signed in", () => {
  // this will be used for all tests in this describe block
  createServer([
    {
      path: "/api/user",
      res: () => {
        console.log("signed in");
        return { user: { id: 1, email: "test@test.com" } };
      },
    },
  ]);

  test("sign in and sign out button are not rendered", async () => {
    await renderComponent();

    const signInButton = screen.queryByRole("link", { name: /sign in/i });
    const signUpButton = screen.queryByRole("link", { name: /sign up/i });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("sign out button is rendered", async () => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});
