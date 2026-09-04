import { render } from "@testing-library/react";

import { Anchor } from "@/Anchor/Anchor";

describe("Anchor", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Anchor href="/test">Submit</Anchor>);

    expect(getByText("Submit")).toBeTruthy();
  });
});
