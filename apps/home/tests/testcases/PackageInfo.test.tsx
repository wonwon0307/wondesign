import { render } from "@testing-library/react";

import { PackageInfo } from "@/entities/package";

describe("PackageInfo", () => {
  it("renders correctly", () => {
    const { getByRole, getByText } = render(
      <PackageInfo name="test-package" relPath="/test/path">
        Test Description
      </PackageInfo>,
    );

    expect(getByText("Test Description")).toBeTruthy();
    expect(getByRole("heading", { name: "test-package" })).toBeTruthy();
    expect(getByText("View the package on npm")).toBeTruthy();
    expect(getByText("View the source code on GitHub")).toBeTruthy();
    expect(getByText("Report an issue")).toBeTruthy();
  });
});
