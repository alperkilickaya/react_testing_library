import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("shows main language of the repository", () => {
  const repository = {
    language: "JavaScript",
    stargazers_count: 5,
    forks_count: 30,
    watchers: 10,
    owner: {
      avatar_url: "https://avatar.url",
    },
    full_name: "facebook/react",
    description: "A JavaScript library",
  };

  render(<RepositoriesSummary repository={repository} />);

  // watching kelimesinden sonraki JavaScript'i bul
  const languageElement = screen.getByText(/^JavaScript$/);
  expect(languageElement).toBeInTheDocument();
});

test("should not show language when language is null", () => {
  const repository = {
    language: null,
    stargazers_count: 5,
    forks_count: 30,
    watchers: 10,
    owner: {
      avatar_url: "https://avatar.url",
    },
    full_name: "facebook/react",
    description: "A JavaScript library",
  };

  const { container } = render(<RepositoriesSummary repository={repository} />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const languageElement = container.querySelector(
    ".flex.items-center span:last-child"
  );

  expect(languageElement).toBeFalsy();
});
