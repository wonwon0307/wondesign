import { SidebarGroup as Component } from "@wondesign/sidebar/Item";
import type { DocsGroup } from "@wondocs/core/sidebar";

interface Props {
  group: DocsGroup;
  children?: React.ReactNode;
}

export function SidebarGroup({ group, children }: Readonly<Props>) {
  return <Component label={group.label}>{children}</Component>;
}
