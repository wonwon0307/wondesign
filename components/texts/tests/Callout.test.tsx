import { render } from "@testing-library/react";

import { Callout } from "@/Callout/Callout";

vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <svg data-testid={`${icon}-icon`} />,
}));

describe("Callout", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Callout>Test Content</Callout>);

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("renders correctly with custom children and title", () => {
    const { getByText } = render(
      <Callout title={<h1>Test Title</h1>}>
        <span>
          Custom Child <strong>Test Bold</strong>
        </span>
      </Callout>,
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Custom Child")).toBeTruthy();
    expect(getByText("Test Bold")).toBeTruthy();
  });

  it("renders correctly with a title and a custom icon", () => {
    const { getByText, getByTestId } = render(
      <Callout title="Test Title" icon={<svg data-testid="custom-icon" />}>
        Test Content
      </Callout>,
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Content")).toBeTruthy();
    expect(getByTestId("custom-icon")).toBeTruthy();
  });

  it("renders all variants correctly", () => {
    const { getByTestId, getByText } = render(
      <>
        <Callout variant="info">Info Content</Callout>
        <Callout variant="success">Success Content</Callout>
        <Callout variant="warning">Warning Content</Callout>
        <Callout variant="error">Error Content</Callout>
      </>,
    );

    expect(getByText("Info Content")).toBeTruthy();
    expect(getByTestId("info-icon")).toBeTruthy();
    expect(getByText("Success Content")).toBeTruthy();
    expect(getByTestId("check-fill-icon")).toBeTruthy();
    expect(getByText("Warning Content")).toBeTruthy();
    expect(getByTestId("warning-icon")).toBeTruthy();
    expect(getByText("Error Content")).toBeTruthy();
    expect(getByTestId("alert-icon")).toBeTruthy();
  });

  it("renders correctly with different sizes", () => {
    const { getByText } = render(
      <div data-testid="container">
        <Callout size="small" title="Small Title">
          Small Content
        </Callout>
        <Callout size="medium" title="Medium Title">
          Medium Content
        </Callout>
        <Callout size="large" title="Large Title">
          Large Content
        </Callout>
      </div>,
    );

    // titles should all be h5 despite the size
    expect(getByText("Small Title").tagName).toBe("H5");
    expect(getByText("Medium Title").tagName).toBe("H5");
    expect(getByText("Large Title").tagName).toBe("H5");

    // check size
    expect(getByText("Small Content").className).toContain("small");
    expect(getByText("Medium Content").className).toContain("medium");
    expect(getByText("Large Content").className).toContain("large");
  });
});
