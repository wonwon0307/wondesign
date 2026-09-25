import { render } from "@testing-library/react";

import { RootLayout } from "@/app/RootLayout";
import { NotFound } from "@/pages/not-found";

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
    expect(getByText("Foundations")).toBeTruthy();
    expect(getByText("Components")).toBeTruthy();

    expect(getByRole("main")).toBeTruthy(); // main
    expect(getByText("Main Content")).toBeTruthy();
    expect(getByRole("contentinfo")).toBeTruthy(); // footer
  });
});

describe("NotFound", () => {
  it("renders the not-found fallback page correctly", () => {
    const { getByText } = render(<NotFound />);

    expect(getByText("404 - NotFound")).toBeTruthy();
  });
});
