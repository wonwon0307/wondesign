import { Separator, type SeparatorProps } from "@wondesign/separator";

import { SidebarItemWrapper } from "../fragments/Wrapper";

export type SidebarSeparatorProps = Omit<SeparatorProps, "vertical">;

export function SidebarSeparator(props: Readonly<SidebarSeparatorProps>) {
  const isDecorative = props.variant !== "theme-break";

  return (
    <SidebarItemWrapper aria-hidden={isDecorative || undefined}>
      <Separator {...props} />
    </SidebarItemWrapper>
  );
}
