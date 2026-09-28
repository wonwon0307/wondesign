import { render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarToggle - corner cases", () => {
  it("renders tooltip on the left if sidebar is on the right", () => {
    const { getByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T" side="right">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SidebarToggle disableTooltip={false} />
      </SidebarProvider>,
    );

    const tooltip = getByTestId("tooltip");
    expect(tooltip).toBeTruthy();
    expect(tooltip.dataset.placement).toBe("left");
  });
});
