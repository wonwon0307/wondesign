import { fireEvent, render } from "@testing-library/react";
import { type BindableShortkey } from "@wondesign/interactions/keyboard";
import * as mobile from "@wondesign/interactions/mobile";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarSection } from "@/Section/Section";
import { SidebarGroup } from "@/Item/Group/Group";
import { SidebarItem } from "@/Item/Item/Item";
import { SidebarToggle } from "@/Toggle/Toggle";

function TestComponent({
  collapse,
  keepMounted = false,
  shortkey = null,
  side = "left",
}: Readonly<{
  collapse?: "hide" | "icons" | "disable";
  keepMounted?: boolean;
  shortkey?: BindableShortkey | null;
  side?: "left" | "right";
}>) {
  return (
    <SidebarProvider collapse={collapse} shortkey={shortkey} side={side}>
      <SidebarBody keepMounted={keepMounted} data-testid="body">
        <SidebarSection>Header</SidebarSection>
        <SidebarNav>
          <SidebarGroup label="Test Group">
            <SidebarItem
              href="/grouped-item-1"
              label="Grouped Item 1"
              icon="test-icon"
            />
            <SidebarItem
              href="/grouped-item-2"
              label="Grouped Item 2"
              icon="test-icon"
            />
          </SidebarGroup>
          <SidebarItem href="/test-item" label="Test Item" icon="test-icon">
            <SidebarItem
              href="/nested-item-1"
              label="Nested Item 1"
              icon="test-icon"
            />
            <SidebarItem
              href="/nested-item-2"
              label="Nested Item 2"
              icon="test-icon"
            />
          </SidebarItem>
        </SidebarNav>
      </SidebarBody>
      <SidebarToggle data-testid="toggle" />
    </SidebarProvider>
  );
}

describe("Sidebar - integration", () => {
  it("renders the sidebar with all components correctly", () => {
    const { getByTestId } = render(<TestComponent keepMounted />);

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    expect(body.dataset.side).toBe("left");
    expect(body.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("closed");
  });

  it("removes the body from DOM when keepMounted is false", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    const toggle = getByTestId("toggle");

    expect(queryByTestId("body")).toBeNull();

    fireEvent.click(toggle);
    expect(getByTestId("body")).toBeTruthy();

    fireEvent.click(toggle);
    expect(queryByTestId("body")).toBeNull();
  });

  it("renders collapse-to-icons mode correctly", () => {
    const { getAllByTestId, getByTestId } = render(
      <TestComponent collapse="icons" keepMounted />,
    );

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    expect(body.dataset.state).toBe("collapsed");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("collapsed");

    // collapsed일 때는 Tooltip이 렌더링 되어야 한다
    const tooltips = getAllByTestId("tooltip");
    expect(tooltips.length).toBeGreaterThan(0);

    // 기본 툴팁 방향은 오른쪽이다 (사이드바가 왼쪽에 있으니; 하나만 대표로 확인)
    expect(tooltips[0].dataset.placement).toBe("right");
  });

  it("renders collapse-disable mode correctly", () => {
    const { getByTestId } = render(
      <TestComponent collapse="disable" keepMounted />,
    );

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");
  });

  it("handles keyboard shortkey correctly", () => {
    const { getByTestId } = render(
      <TestComponent keepMounted shortkey="Cmd+B" />,
    );

    const body = getByTestId("body");

    expect(body.dataset.state).toBe("closed");

    fireEvent.keyDown(document, { code: "KeyB", metaKey: true });
    expect(body.dataset.state).toBe("expanded");

    fireEvent.keyDown(document, { code: "KeyB", metaKey: true });
    expect(body.dataset.state).toBe("closed");
  });

  it("forces hide-mode in mobile window size", () => {
    vi.spyOn(mobile, "useIsMobile").mockReturnValue(true);
    const { getByTestId, rerender } = render(
      <TestComponent collapse="icons" keepMounted />,
    );

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    // collapsed가 아니라 closed 상태여야 한다
    expect(body.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("closed");

    rerender(<TestComponent collapse="disable" keepMounted />);

    expect(body.dataset.state).toBe("closed");

    // disable이어도 mobile 환경에선 toggle이 가능해야 한다
    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("closed");
  });
});
