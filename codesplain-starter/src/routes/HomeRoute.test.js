import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

/* const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const result = req.url.searchParams.get("q").split("language:");

    const data = {
      items: [
        { id: 1, full_name: result[1] },
        { id: 2, full_name: result[1] },
      ],
    };
    return res(ctx.json(data));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); */

// converted above code to dynamic
createServer([
  {
    path: "/api/repositories",
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        items: [
          { id: 1, full_name: language },
          { id: 2, full_name: language },
        ],
      };
    },
  },
]);

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  //Loop over each language
  // For each language, make sure we see two links
  // Assert that the links have the appropriate full_name

  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (const language of languages) {
    //use findAllByRole to find all links with the language name and ensure that we are waiting for the links to be in the document
    const links = await screen.findAllByRole("link", { name: language });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(language);
    expect(links[1]).toHaveTextContent(language);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}`);
  }
});
