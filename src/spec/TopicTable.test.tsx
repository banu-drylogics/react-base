import { fireEvent, render } from "@testing-library/react";
import { HeaderRow } from "../components/topics_table/HeaderRow";
import { screen } from '@testing-library/react'
import { TableRow } from "../components/topics_table/TableRow";
import LoadMoreButton from "../components/topics_table/LoadMoreButton";
import { ColState } from "../components/topics_table/types";

describe('TopicsTable', () => {
  test('headers text test', () => {
    const headers = ["Name", "Display Name", "Description", "Created By", "Released", "Created At", "Updated At", "Featured", "Curated", "Score"];
    render(<HeaderRow headers={headers} />);
    headers.forEach(headerText => {
      const headerElement = screen.getByText(headerText);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test('row has text test', () => {
    const testData: ColState[] = [{
      created_at: "2017-01-31T20:58:27Z",
      created_by: "Microsoft",
      curated: true,
      description: "TypeScript is an open source programming language developed by Microsoft and first released in 2012. It is designed to add type safety to JavaScript while conforming as closely as possible to the syntax and semantics of the ECMAScript standard. \n\nIt is a syntactical superset of the JavaScript programming language; all valid JavaScript source code is also valid TypeScript source code, but not vice-versa. TypeScript compiles (or transpiles) to JavaScript, meaning that it can be utilized to target any JavaScript environment. It can be used to develop JavaScript for both client-side and server-side applications.",
      display_name: "TypeScript",
      featured: true,
      name: "typescript",
      released: "October 1, 2012",
      score: 1,
      short_description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
      updated_at: "2024-05-06T02:23:14Z"
    }];

    render(<TableRow records={testData} />);
    const tableRows = screen.getAllByRole('row');

    let found = false;
    tableRows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      Array.from(cells).forEach(cell => {
        const textContent = cell?.textContent ?? "Default Value";
        if (textContent.includes(testData[0].description)) {
          found = true;
        }
      });
    });
    expect(found).toBeTruthy();
  });

  test('load more button text test', () => {
    const { container } = render(<LoadMoreButton />);
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  test('load more not available when loaded all test', async () => {
    render(<LoadMoreButton />);
    fireEvent.click(screen.getByTestId("button"));
    await expect(screen.findByText("Load More")).toBeNull
  });
});