import { fireEvent, render } from "@testing-library/react";

import { CollapsibleProvider } from "@/Collapsible/Provider";
import { CollapsibleToggle } from "@/Collapsible/Toggle";
import { CollapsibleContent } from "@/Collapsible/Content";
import { TestCollapsible } from "./test-component";

describe("Collapsible - properties", () => {
  it("respects the defaultOpen prop", () => {
    const { getByText } = render(
      <TestCollapsible defaultOpen>Content</TestCollapsible>,
    );

    const content = getByText("Content");
    expect(content).toBeTruthy();
    expect(content.dataset.state).toBe("open");
  });

  it("supports controlled mode", () => {
    const onOpenChange = vi.fn();

    const { getByText } = render(
      <TestCollapsible isOpen={false} onOpenChange={onOpenChange}>
        Content
      </TestCollapsible>,
    );

    const toggle = getByText("Toggle");
    expect(toggle.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("keeps components mounted if keepMounted is true", () => {
    const { getByText } = render(
      <TestCollapsible keepMounted>Content</TestCollapsible>,
    );

    const content = getByText("Content");

    // 초기에는 콘텐츠가 보이지 않아야 한다.
    expect(content.dataset.state).toBe("closed");
    expect(content.hidden).toBe(true);
  });

  it("supports the asChild prop", () => {
    const { getByText } = render(
      <CollapsibleProvider isOpen>
        <CollapsibleToggle asChild>
          <button>Toggle</button>
        </CollapsibleToggle>
        <CollapsibleContent asChild>
          <span>Content</span>
        </CollapsibleContent>
      </CollapsibleProvider>,
    );

    const toggle = getByText("Toggle");
    const content = getByText("Content");

    expect(toggle.getAttribute("aria-controls")).toBe(content.id);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    expect(content.tagName).toBe("SPAN");
    expect(content.role).toBeNull();
    expect(content.hidden).toBe(false);
  });
});
