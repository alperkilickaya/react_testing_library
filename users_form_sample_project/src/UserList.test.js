import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    { name: "Jane", email: "jane@jane.com" },
    { name: "John", email: "john@john.com" },
  ];

  render(<UserList users={users} />);

  return { users };
};

test("render one row per user", () => {
  // Render the component
  renderComponent();

  // Another approach to find all the rows in the table. This will only find the rows in the table body
  // container is used to find the elements in the DOM and it is added automatically by render
  /*   const { container } = render(
    <UserList
      users={[
        { name: "Jane", email: "jane@jane.com" },
        { name: "John", email: "john@john.com" },
      ]}
    />
  ); */

  // Log the URL to the testing playground. This is useful for debugging and finding the element in the DOM
  //screen.logTestingPlaygroundURL();

  // Find all the rows in the table. But it will also find the header row.
  const rows = screen.getAllByRole("row");

  // Another approach to find all the rows in the table. This will only find the rows in the table body
  const rowsAlternative = within(screen.getByTestId("users")).getAllByRole(
    "row"
  );

  // Another approach to find all the rows in the table. This will only find the rows in the table body with querySelector
  //eslint-disable-next-line
  /*   const rowsAlternativeContainer = container.querySelectorAll("tbody tr"); */

  // Check that the number of rows is equal to the number of users. but this will be 3 because it will also count the header row
  expect(rows).toHaveLength(3);

  // Check that the number of rows is equal to the number of users inside the table body
  expect(rowsAlternative).toHaveLength(2);

  // Check that the number of rows is equal to the number of users inside the table body with querySelector
  /* expect(rowsAlternativeContainer).toHaveLength(2); */
});

test("render the user's name and email", () => {
  // Render the component

  const { users } = renderComponent();

  // Find all the cells in the table
  const cells = screen.getAllByRole("cell");

  // Check that the number of cells is equal to the number of users times the number of columns
  expect(cells).toHaveLength(4);

  // using for loop to check the name and email of the users
  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }

  // Check that the first cell contains the name of the first user
  expect(cells[0]).toHaveTextContent("Jane");

  // Check that the second cell contains the email of the first user
  expect(cells[1]).toHaveTextContent("jane@jane.com");
});
