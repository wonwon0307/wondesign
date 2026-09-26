import { type BindableShortkey } from "@wondesign/interactions/keyboard";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarSection } from "@/Section/Section";
import { SidebarGroup } from "@/Item/Group/Group";
import { SidebarItem } from "@/Item/Item/Item";
import { SidebarToggle } from "@/Toggle/Toggle";

export function TestComponent({
  defaultOpen = false,
  collapse,
  keepMounted = false,
  shortkey = null,
  side = "left",
}: Readonly<{
  defaultOpen?: boolean;
  collapse?: "hide" | "icons" | "disable";
  keepMounted?: boolean;
  shortkey?: BindableShortkey | null;
  side?: "left" | "right";
}>) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      collapse={collapse}
      shortkey={shortkey}
      side={side}
    >
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
