import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Portal } from "@/portal";

describe("portal", () => {
  it("renders children in a portal correctly", () => {
    const { getByText } = render(
      <Portal>
        <div>Portal Content</div>
      </Portal>,
    );

    const content = getByText("Portal Content");

    expect(content).toBeTruthy();
    expect(content.parentElement).toBe(document.body);
  });

  it("gracefully handles SSR environment", () => {
    // On the server, useSyncExternalStore returns the server snapshot (`false`),
    // so the SSR guard renders children inline instead of calling createPortal
    // (portals aren't supported during server rendering).
    const html = renderToString(
      <Portal>
        <div>Portal Content</div>
      </Portal>,
    );

    expect(html).toContain("Portal Content");
  });

  it("renders children inline when disabled", () => {
    const { container } = render(
      <Portal disable>
        <div>Portal Content</div>
      </Portal>,
    );

    const content = container.querySelector("div");

    expect(content).toBeTruthy();
    expect(content?.parentElement).toBe(container);
  });
});
