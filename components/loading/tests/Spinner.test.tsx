import { render } from "@testing-library/react";

import { Spinner } from "@/Spinner";

describe("Spinner", () => {
  it("renders the default Spinner correctly", () => {
    const { getByTestId } = render(<Spinner data-testid="spinner" />);

    const spinner = getByTestId("spinner");
    expect(spinner.getAttribute("aria-hidden")).toBe("true");
    expect(spinner.tagName).toBe("svg");
  });

  it("renders the Spinner with the correct custom properties", () => {
    const { getByTestId } = render(
      <Spinner
        variant="tail"
        className="custom-spinner"
        style={{ animationDuration: "2s" }}
        data-testid="spinner"
      />,
    );

    const spinner = getByTestId("spinner");
    expect(spinner.getAttribute("aria-hidden")).toBe("true");
    expect(spinner.tagName).toBe("svg");
  });
});
