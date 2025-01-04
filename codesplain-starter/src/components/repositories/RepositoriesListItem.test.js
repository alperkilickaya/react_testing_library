import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

/* jest.mock("../tree/FileIcon", () => {
  return () => {
    return "File Icon Component";
  };
});
 */
test("shows a link to github repo", async () => {
  const repository = {
    full_name: "facebook/react",
    html_url: "https://github.com/facebook/react",
    language: "JavaScript",
    description: "A JavaScript library for building user interfaces",
    owner: {
      login: "facebook",
    },
    name: "react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  const link = screen.getByRole("link", { name: /github repository/i });

  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a file icon with the appropriate icon", async () => {
  const repository = {
    full_name: "facebook/react",
    html_url: "https://github.com/facebook/react",
    language: "JavaScript",
    description: "A JavaScript library for building user interfaces",
    owner: {
      login: "facebook",
    },
    name: "react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  const icon = await screen.findByRole("img", { name: "JavaScript" });

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const repository = {
    full_name: "facebook/react",
    html_url: "https://github.com/facebook/react",
    language: "JavaScript",
    description: "A JavaScript library for building user interfaces",
    owner: {
      login: "facebook",
    },
    name: "react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
