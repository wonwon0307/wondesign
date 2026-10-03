import { render } from "@testing-library/react";

import { Separator } from "@/Separator";

describe("Separator", () => {
  it("renders with default props correctly", () => {
    const { getByTestId } = render(<Separator data-testid="separator" />);

    const separator = getByTestId("separator");

    expect(separator).toBeTruthy();
    expect(separator.getAttribute("aria-hidden")).toBe("true");
    expect(separator.getAttribute("aria-orientation")).toBeNull();
  });

  it("renders a theme break separator correctly", () => {
    const { getByTestId } = render(
      <Separator variant="theme-break" data-testid="separator" />,
    );

    const separator = getByTestId("separator");

    expect(separator).toBeTruthy();
    expect(separator.getAttribute("aria-hidden")).toBeNull();
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("renders a vertical separator correctly", () => {
    const { getByTestId } = render(
      <Separator vertical data-testid="separator" />,
    );

    const separator = getByTestId("separator");

    expect(separator).toBeTruthy();
    expect(separator.getAttribute("aria-hidden")).toBe("true");
    expect(separator.getAttribute("aria-orientation")).toBeNull();
  });

  it("renders a theme break vertical separator correctly", () => {
    const { getByTestId } = render(
      <Separator variant="theme-break" vertical data-testid="separator" />,
    );

    const separator = getByTestId("separator");

    expect(separator).toBeTruthy();
    expect(separator.getAttribute("aria-hidden")).toBeNull();
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
  });
});
