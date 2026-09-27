import { render } from "@testing-library/react";

import { TooltipProvider } from "@/Tooltip/Provider";
import { TooltipArrow } from "@/Tooltip/Arrow";
import { TooltipContent } from "@/Tooltip/Content";
import { TooltipTrigger } from "@/Tooltip/Trigger";
import { useTooltip } from "@/Tooltip/contexts";

describe("Tooltip - structure", () => {
  it("calls useTooltip inside Tooltip provider", () => {
    const TestComponent = () => {
      const context = useTooltip();
      return <div>{context ? "has context" : "no context"}</div>;
    };

    const { getByText } = render(
      <TooltipProvider>
        <TestComponent />
      </TooltipProvider>,
    );

    expect(getByText("has context")).toBeTruthy();
  });

  it("should raise error if Tooltip.Content is used outside of Tooltip", () => {
    expect(() => render(<TooltipContent>Content</TooltipContent>)).toThrow(
      "[WonDesign Headless] useTooltip() must be used inside the Tooltip Provider.",
    );
  });

  it("should raise error if Tooltip.Arrow is used outside of Tooltip.Content", () => {
    expect(() => render(<TooltipArrow>Arrow</TooltipArrow>)).toThrow(
      "Tooltip.Arrow must be used inside Tooltip.Content.",
    );
  });

  it("should raise error if Tooltip.Trigger is used outside of Tooltip", () => {
    expect(() => render(<TooltipTrigger>Trigger</TooltipTrigger>)).toThrow(
      "[WonDesign Headless] useTooltip() must be used inside the Tooltip Provider.",
    );
  });
});
