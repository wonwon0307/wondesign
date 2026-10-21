import { render } from "@testing-library/react";

import { RootLayout } from "@/app/RootLayout";
import { NotFound } from "@/pages/not-found";

describe("RootLayout", () => {
  it("renders header, main and footer correctly", async () => {
    const { getByRole, getByText } = render(
      await RootLayout({ children: <div>Main Content</div> }),
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

  it("passes the request nonce to the inline style and script", async () => {
    render(await RootLayout({ children: <div>Main Content</div> }));

    // <head> content renders into the document's own <head>
    const style = document.head.querySelector("style");
    const script = document.head.querySelector("script");

    expect(style?.getAttribute("nonce")).toBe("test-nonce");
    expect(script?.getAttribute("nonce")).toBe("test-nonce");
  });
});

describe("NotFound", () => {
  it("renders the not-found fallback page correctly", () => {
    const { getByText } = render(<NotFound />);

    expect(getByText("404 - NotFound")).toBeTruthy();
  });
});
