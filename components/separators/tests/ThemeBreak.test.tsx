import { render } from "@testing-library/react";

import { ThemeBreak } from "@/ThemeBreak/ThemeBreak";

describe("ThemeBreak", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <>
        <ThemeBreak data-testid="default" />
        <ThemeBreak bold data-testid="bold" />
      </>,
    );

    expect(getByTestId("default")).toBeTruthy();
    expect(getByTestId("bold")).toBeTruthy();
  });
});
