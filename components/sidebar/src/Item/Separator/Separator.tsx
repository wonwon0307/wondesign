import { Divider, type DividerProps } from "@wondesign/separators/Divider";

import { SidebarItemWrapper } from "../fragments/Wrapper";

export type SidebarSeparatorProps = Omit<DividerProps, "vertical">;

export function SidebarSeparator(props: Readonly<SidebarSeparatorProps>) {
  return (
    <SidebarItemWrapper aria-hidden={props.label ? undefined : true}>
      <Divider {...props} />
    </SidebarItemWrapper>
  );
}
