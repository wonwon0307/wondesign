import { render } from "@testing-library/react";

import { IconButton } from "@/IconButton/IconButton";

describe("IconButton", () => {
  it("renders children mode correctly", () => {
    const { getByText } = render(
      <IconButton>
        <span>Icon</span>
      </IconButton>,
    );

    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders icon mode correctly", () => {
    const { getByText } = render(<IconButton icon="check-fill" />);

    expect(getByText("check-fill")).toBeTruthy(); // mocked in line 5
  });

  it("renders all variants correctly", () => {
    const { getByTestId } = render(
      <>
        <IconButton icon="check" variant="filled" data-testid="filled-button" />
        <IconButton
          icon="check-fill"
          variant="outlined"
          data-testid="outlined-button"
        />
        <IconButton
          icon="check-circle"
          variant="ghost"
          data-testid="ghost-button"
        />
      </>,
    );

    expect(getByTestId("filled-button").className).toContain("filled");
    expect(getByTestId("outlined-button").className).toContain("outlined");
    expect(getByTestId("ghost-button").className).toContain("ghost");
  });

  it("renders icon button with props correctly", () => {
    const { getByTestId } = render(
      <IconButton
        icon="check-fill"
        size={32}
        rounded
        spacious
        data-testid="button"
      />,
    );

    expect(getByTestId("button").className).toContain("rounded");
    expect(getByTestId("button").className).toContain("spacious");
  });

  it("renders spinner when isLoading is true", () => {
    const { getByTestId, getByText } = render(
      <IconButton icon="check-fill" isLoading data-testid="button" />,
    );

    expect(getByText("check-fill").parentElement?.className).toContain("hide");
    expect(getByText("Spinner")).toBeTruthy();
    expect(getByTestId("button").dataset.loading).toBe("true");
  });

  it("renders custom loading fallback when given", () => {
    const { getByTestId, getByText, queryByText } = render(
      <IconButton
        icon="check-fill"
        isLoading
        fallback={<div>Custom Loading Fallback</div>}
        data-testid="button"
      />,
    );

    expect(getByText("check-fill").parentElement?.className).toContain("hide");
    expect(queryByText("Spinner")).toBeNull();
    expect(getByText("Custom Loading Fallback")).toBeTruthy();
    expect(getByTestId("button").dataset.loading).toBe("true");
  });
});
