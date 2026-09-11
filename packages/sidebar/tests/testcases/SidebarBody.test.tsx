import { render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";

describe("SidebarBody", () => {
  it("renders in app-scope by default", () => {
    const { getByTestId } = render(
      <SidebarProvider isOpen>
        <SidebarBody data-testid="body">Content inside SidebarBody</SidebarBody>
      </SidebarProvider>,
    );

    const body = getByTestId("body");
    expect(body.tagName).toBe("ASIDE");
    expect(body.getAttribute("aria-label")).toBe("Sidebar");
  });

  it("renders in page-scope correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider isOpen>
        <SidebarBody scope="page" data-testid="body">
          Content inside SidebarBody
        </SidebarBody>
      </SidebarProvider>,
    );

    const body = getByTestId("body");
    expect(body.tagName).toBe("DIV");
    expect(body.getAttribute("aria-label")).toBeFalsy();
  });
});
