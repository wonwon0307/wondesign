import { render } from "@testing-library/react";

import { LinkButton } from "@/LinkButton/LinkButton";

describe("LinkButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<LinkButton>New Page Button</LinkButton>);

    expect(getByText("New Page Button")).toBeTruthy();
  });
});
