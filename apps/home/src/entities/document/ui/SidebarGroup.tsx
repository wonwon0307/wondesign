import { SidebarGroup as Component } from "@wondesign/ui/Sidebar";
import type { DocsGroup } from "@wondocs/core/sidebar";

interface Props {
  group: DocsGroup;
  children?: React.ReactNode;
}

export function SidebarGroup({ group, children }: Readonly<Props>) {
  return <Component label={group.label}>{children}</Component>;
}
