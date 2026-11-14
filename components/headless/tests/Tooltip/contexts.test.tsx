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
      "[WonDesign Headless] useTooltip() must be used inside a Tooltip Provider.",
    );
  });

  it("should raise error if TooltipArrow is used outside of TooltipContent", () => {
    expect(() =>
      render(
        <TooltipProvider>
          <TooltipArrow>Arrow</TooltipArrow>
        </TooltipProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] TooltipArrow must be used inside a TooltipContent.",
    );
  });

  it("should raise error if Tooltip.Trigger is used outside of Tooltip", () => {
    expect(() => render(<TooltipTrigger>Trigger</TooltipTrigger>)).toThrow(
      "[WonDesign Headless] useTooltip() must be used inside a Tooltip Provider.",
    );
  });

  it("warns on console when TooltipTrigger is inside TooltipContent", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");

    const TestComponent = () => (
      <TooltipProvider isOpen>
        <TooltipContent>
          <TooltipTrigger>Trigger</TooltipTrigger>
        </TooltipContent>
      </TooltipProvider>
    );

    render(<TestComponent />);
    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Headless] TooltipTrigger should be rendered outside of TooltipContent.",
    );

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("doesn't warn on console if Trigger is inside Content in production", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "production");

    const TestComponent = () => (
      <TooltipProvider isOpen>
        <TooltipContent>
          <TooltipTrigger>Trigger</TooltipTrigger>
        </TooltipContent>
      </TooltipProvider>
    );

    render(<TestComponent />);
    expect(console.warn).not.toHaveBeenCalled();

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });
});
