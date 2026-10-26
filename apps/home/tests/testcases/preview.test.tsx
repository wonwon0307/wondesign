import { render } from "@testing-library/react";

import { Preview } from "@/widgets/preview";

describe("Preview", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Preview>
        <div>Test Content</div>
      </Preview>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });
});
