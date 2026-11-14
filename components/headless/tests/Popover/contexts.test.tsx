import { render } from "@testing-library/react";

import { PopoverProvider } from "@/Popover/Provider";
import { PopoverContent } from "@/Popover/Content";
import { PopoverTitle } from "@/Popover/Title";
import { PopoverClose } from "@/Popover/Close";
import { PopoverArrow } from "@/Popover/Arrow";
import { PopoverTrigger } from "@/Popover/Trigger";
import { usePopover } from "@/Popover/contexts";

describe("Popover - contexts", () => {
  it("calls usePopover inside the provider", () => {
    const TestComponent = () => {
      const popover = usePopover();
      return <div>{popover ? "has context" : "no context"}</div>;
    };

    const { getByText } = render(
      <PopoverProvider>
        <TestComponent />
      </PopoverProvider>,
    );

    expect(getByText("has context")).toBeTruthy();
  });

  it("should raise an error if usePopover is used outside of the provider", () => {
    const errorMsg =
      "[WonDesign Headless] usePopover() must be used within the Popover Provider.";

    expect(() => render(<PopoverContent>Content</PopoverContent>)).toThrow(
      errorMsg,
    );
    expect(() => render(<PopoverTrigger>Trigger</PopoverTrigger>)).toThrow(
      errorMsg,
    );
    expect(() => render(<PopoverTitle>Title</PopoverTitle>)).toThrow(errorMsg);
    expect(() => render(<PopoverClose>Close</PopoverClose>)).toThrow(errorMsg);
    expect(() => render(<PopoverArrow />)).toThrow(errorMsg);
  });

  it("should raise an error if Popover(Title/Close/Arrow) are used outside of PopoverContent", () => {
    expect(() =>
      render(
        <PopoverProvider>
          <PopoverTitle>Title</PopoverTitle>
        </PopoverProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] PopoverTitle must be used within PopoverContent.",
    );
    expect(() =>
      render(
        <PopoverProvider>
          <PopoverClose>Close</PopoverClose>
        </PopoverProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] PopoverClose must be used within PopoverContent.",
    );
    expect(() =>
      render(
        <PopoverProvider>
          <PopoverArrow />
        </PopoverProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] PopoverArrow must be used within PopoverContent.",
    );
  });

  it("should warn in console if PopoverTrigger is used inside PopoverContent", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");

    render(
      <PopoverProvider isOpen>
        <PopoverContent>
          <PopoverTrigger>Trigger</PopoverTrigger>
        </PopoverContent>
      </PopoverProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Headless] PopoverTrigger should be rendered outside of PopoverContent.",
    );

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });
});
