import { render } from "@testing-library/react";

import { Hyperlink } from "@/Hyperlink/Hyperlink";

describe("Hyperlink", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Hyperlink>New Page</Hyperlink>);

    expect(getByText("New Page")).toBeTruthy();
  });
});
