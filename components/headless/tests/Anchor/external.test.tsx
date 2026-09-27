import { render } from "@testing-library/react";

import { Anchor } from "@/Anchor/Anchor";

describe("Anchor - openInNewTab behavior", () => {
  beforeAll(() => {
    // Not Implemented: navigation to another Document 경고 무시
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("opens in a new tab when openInNewTab is true", () => {
    const { getByText } = render(
      <Anchor href="https://example.com" openInNewTab>
        External Anchor
      </Anchor>,
    );

    const anchor = getByText("External Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("target")).toBe("_blank");
    expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("auto-detects new tab behavior by default", () => {
    const { getByText } = render(
      <Anchor href="https://example.com">External Anchor</Anchor>,
    );

    const anchor = getByText("External Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("target")).toBe("_blank");
    expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("does not open in a new tab when openInNewTab is false even for external anchors", () => {
    const { getByText } = render(
      <Anchor href="https://example.com" openInNewTab={false}>
        External Anchor
      </Anchor>,
    );

    const anchor = getByText("External Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("target")).toBeNull();
    expect(anchor.getAttribute("rel")).toBeNull();
  });
});
