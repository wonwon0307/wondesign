import { render } from "@testing-library/react";

import { PackageInfo } from "@/entities/package";

vi.mock("@wondesign/ui/Tooltip", () => ({
  Tooltip: ({
    children,
    text,
  }: {
    children: React.ReactNode;
    text: string;
  }) => <div data-testid={`tooltip-${text}`}>{children}</div>,
}));

describe("PackageInfo", () => {
  it("renders correctly", () => {
    const { getByRole, getByTestId, getByText } = render(
      <PackageInfo name="test-package" relPath="/test/path">
        Test Description
      </PackageInfo>,
    );

    expect(getByText("Test Description")).toBeTruthy();
    expect(getByRole("heading", { name: "test-package" })).toBeTruthy();
    expect(getByTestId("tooltip-View the package on npm")).toBeTruthy();
    expect(getByTestId("tooltip-View the source code on GitHub")).toBeTruthy();
    expect(getByTestId("tooltip-Report an issue")).toBeTruthy();
  });
});
