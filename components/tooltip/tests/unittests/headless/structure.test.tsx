import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { TooltipArrow } from "@/headless/Arrow";
import { TooltipContent } from "@/headless/Content";
import { TooltipTrigger } from "@/headless/Trigger";
import { TestComponent } from "./test-component";

describe("HeadlessTooltip - structure", () => {
  it("should handle SSR environments without errors", () => {
    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;

    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);

    const html = renderToString(
      <TestComponent isOpen>Tooltip Message</TestComponent>,
    );

    expect(html).toContain('data-testid="tooltip-trigger"');
    expect(html).toContain('data-testid="tooltip-content"');
    expect(html).toContain('data-testid="tooltip-message"');
    expect(html).toContain('data-testid="tooltip-arrow"');

    vi.stubGlobal("window", originalWindow);
    vi.stubGlobal("document", originalDocument);
  });

  it("should raise error if Tooltip.Content is used outside of Tooltip", () => {
    expect(() => render(<TooltipContent>Content</TooltipContent>)).toThrow(
      "Tooltip.Content must be used inside the Tooltip wrapper",
    );
  });

  it("should raise error if Tooltip.Arrow is used outside of Tooltip.Content", () => {
    expect(() => render(<TooltipArrow>Arrow</TooltipArrow>)).toThrow(
      "Tooltip.Arrow must be used inside Tooltip.Content.",
    );
  });

  it("should raise error if Tooltip.Trigger is used outside of Tooltip", () => {
    expect(() => render(<TooltipTrigger>Trigger</TooltipTrigger>)).toThrow(
      "Tooltip.Trigger must be used inside the Tooltip wrapper",
    );
  });
});
