import { render } from "@testing-library/react";

import { CollapsibleProvider } from "@/Collapsible/Provider";
import { CollapsibleContent } from "@/Collapsible/Content";
import { CollapsibleToggle } from "@/Collapsible/Toggle";
import { useCollapsible } from "@/Collapsible/contexts";

describe("useCollapsible - contexts", () => {
  it("calls useCollapsible inside the Provider", () => {
    const TestComponent = () => {
      const collapsible = useCollapsible();

      return <div>{collapsible ? "has context" : "no context"}</div>;
    };

    const { getByText } = render(
      <CollapsibleProvider>
        <TestComponent />
      </CollapsibleProvider>,
    );

    expect(getByText("has context")).toBeTruthy();
  });

  it("throws an error if Collapsible Content/Toggle are used outside the Provider", () => {
    const errorMsg =
      "[WonDesign Headless] useCollapsible() must be used inside a Collapsible Provider.";

    expect(() =>
      render(<CollapsibleContent>Content</CollapsibleContent>),
    ).toThrow(errorMsg);

    expect(() =>
      render(<CollapsibleToggle>Trigger</CollapsibleToggle>),
    ).toThrow(errorMsg);
  });

  it("should warn on console if Toggle is used inside Content in non-production", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");

    render(
      <CollapsibleProvider isOpen>
        <CollapsibleContent>
          <CollapsibleToggle />
        </CollapsibleContent>
      </CollapsibleProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Headless] CollapsibleToggle should be rendered outside of CollapsibleContent.",
    );

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("should not warn on console if Toggle is used inside Content in production", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "production");

    render(
      <CollapsibleProvider isOpen>
        <CollapsibleContent>
          <CollapsibleToggle />
        </CollapsibleContent>
      </CollapsibleProvider>,
    );

    expect(console.warn).not.toHaveBeenCalled();

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });
});
