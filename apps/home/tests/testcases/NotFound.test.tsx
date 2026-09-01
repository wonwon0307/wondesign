import { render } from "@testing-library/react";

import { NotFound } from "@/pages/not-found";

describe("NotFound", () => {
  it("renders the not-found fallback page correctly", () => {
    const { getByText } = render(<NotFound />);

    expect(getByText("404 - NotFound")).toBeTruthy();
  });
});
