import { render } from "@testing-library/react";

import { RootLayout } from "@/_app/RootLayout";

describe("RootLayout", () => {
  it("renders header, main and footer correctly", () => {
    const { getByRole, getByText } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    // header
    expect(getByRole("banner")).toBeTruthy();
    expect(getByText("WonDesign")).toBeTruthy();
    expect(getByText("Primitives")).toBeTruthy();
    expect(getByText("Design System")).toBeTruthy();
    expect(getByText("Colors")).toBeTruthy();

    expect(getByRole("main")).toBeTruthy(); // main
    expect(getByText("Main Content")).toBeTruthy();
    expect(getByRole("contentinfo")).toBeTruthy(); // footer
  });
});
