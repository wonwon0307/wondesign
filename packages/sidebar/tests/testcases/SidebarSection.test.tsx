import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarSection } from "@/Section/Section";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarSection", () => {
  it("not render anything when collapsed is not given", () => {
    const { getByTestId } = render(
      <SidebarProvider collapse="icons" defaultOpen>
        <SidebarBody keepMounted data-testid="body">
          <SidebarSection data-testid="section">
            Content inside SidebarSection
          </SidebarSection>
        </SidebarBody>
        <SidebarToggle data-testid="toggle" />
      </SidebarProvider>,
    );

    const body = getByTestId("body");
    const section = getByTestId("section");

    // initial state
    expect(body.dataset.state).toBe("expanded");
    expect(section.textContent).toBe("Content inside SidebarSection");

    fireEvent.click(getByTestId("toggle"));
    expect(body.dataset.state).toBe("collapsed");
    expect(section.textContent).toBe("");
  });
});
