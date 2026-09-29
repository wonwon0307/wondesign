import { renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { useSidebarBody, useSidebarNav } from "@/contexts/body";
import { useSidebar, useSidebarInternal } from "@/contexts/sidebar";
import { useIsMobile } from "@/contexts/useIsMobile";

describe("Sidebar contexts - corner cases", () => {
  it("useSidebar and useInternalSidebar throw when used outside of a SidebarProvider", () => {
    expect(() => renderHook(() => useSidebar())).toThrow(
      "[WonDesign Sidebar] useSidebar() must be used inside the Sidebar wrapper.",
    );

    expect(() => renderHook(() => useSidebarInternal())).toThrow(
      "[WonDesign Sidebar] useSidebar() must be used inside the Sidebar wrapper.",
    );
  });

  it("useSidebarBody throws an error when used outside of SidebarBody", () => {
    expect(() => renderHook(() => useSidebarBody())).toThrow(
      "[WonDesign Sidebar] useSidebarBody() must be used inside SidebarBody.",
    );
  });

  it("useSidebarNav throws an error when used outside of SidebarNav", () => {
    expect(() => renderHook(() => useSidebarNav())).toThrow(
      "[WonDesign Sidebar] SidebarItem components must be used inside SidebarNav.",
    );
  });

  it("useIsMobile returns false in SSR environment", () => {
    const TestComponent = () => {
      const isMobile = useIsMobile();

      return <div>{isMobile ? "Mobile" : "Not Mobile"}</div>;
    };
    const html = renderToString(<TestComponent />);

    expect(html).toContain("Not Mobile");
  });
});
