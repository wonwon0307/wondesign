import { render } from "@testing-library/react";

import { Button } from "@/Button/Button";

describe("Button", () => {
  it("renders all variants correctly", () => {
    const { getByText } = render(
      <div>
        <Button>Submit</Button>
        <Button outlined>Outlined Submit</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="secondary" outlined>
          Outlined Cancel
        </Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="destructive" outlined>
          Outlined Delete
        </Button>
      </div>,
    );

    const submitButton = getByText("Submit");
    const outlinedSubmitButton = getByText("Outlined Submit");
    const cancelButton = getByText("Cancel");
    const outlinedCancelButton = getByText("Outlined Cancel");
    const deleteButton = getByText("Delete");
    const outlinedDeleteButton = getByText("Outlined Delete");
    expect(submitButton).toBeTruthy();
    expect(submitButton.className).toContain("primary-filled");
    expect(outlinedSubmitButton).toBeTruthy();
    expect(outlinedSubmitButton.className).toContain("primary-outlined");
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.className).toContain("secondary-filled");
    expect(outlinedCancelButton).toBeTruthy();
    expect(outlinedCancelButton.className).toContain("secondary-outlined");
    expect(deleteButton).toBeTruthy();
    expect(deleteButton.className).toContain("destructive-filled");
    expect(outlinedDeleteButton).toBeTruthy();
    expect(outlinedDeleteButton.className).toContain("destructive-outlined");
  });

  it("renders with left right slots correctly", () => {
    const { getByText } = render(
      <div>
        <Button left={<span>L</span>}>With Left</Button>
        <Button right={<span>R</span>}>With Right</Button>
      </div>,
    );

    expect(getByText("With Left")).toBeTruthy();
    expect(getByText("L")).toBeTruthy();

    expect(getByText("With Right")).toBeTruthy();
    expect(getByText("R")).toBeTruthy();
  });

  it("renders all sizes correctly", () => {
    const { getByText } = render(
      <div>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>,
    );

    const smallButton = getByText("Small");
    const mediumButton = getByText("Medium");
    const largeButton = getByText("Large");
    expect(smallButton).toBeTruthy();
    expect(smallButton.className).toContain("small");
    expect(mediumButton).toBeTruthy();
    expect(mediumButton.className).toContain("medium");
    expect(largeButton).toBeTruthy();
    expect(largeButton.className).toContain("large");
  });

  it("renders a disabled button correctly", () => {
    const { getByText } = render(<Button isDisabled>Disabled</Button>);

    const disabledButton = getByText("Disabled");
    expect(disabledButton).toBeTruthy();
    expect(disabledButton.dataset.disabled).toBe("true");
  });

  it("renders a loading button correctly", () => {
    const { getByTestId, getByText } = render(
      <Button isLoading data-testid="button">
        Loading
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.dataset.loading).toBe("true");

    const text = getByText("Loading");
    expect(text.className).toContain("hide");

    expect(getByTestId("spinner")).toBeTruthy();
  });

  it("renders a left loading button correctly", () => {
    const { getByTestId, getByText } = render(
      <Button isLoading fallbackVariant="left" data-testid="button">
        Loading
      </Button>,
    );

    const button = getByText("Loading");
    expect(button).toBeTruthy();
    expect(button.dataset.loading).toBe("true");

    expect(getByTestId("spinner")).toBeTruthy();
  });

  it("renders custom loading fallback correctly", () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Button isLoading fallback={<span>Custom</span>} data-testid="button">
        Loading
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.dataset.loading).toBe("true");

    expect(getByText("Custom")).toBeTruthy();

    expect(queryByTestId("spinner")).toBeNull();
  });
});
