import {
  CollapsibleProvider,
  type CollapsibleProps,
} from "@/Collapsible/Provider";
import { CollapsibleToggle } from "@/Collapsible/Toggle";
import { CollapsibleContent } from "@/Collapsible/Content";

export function TestCollapsible({
  children,
  onClick,
  role,
  ...rest
}: Readonly<
  CollapsibleProps & {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    role?: "region" | "group";
  }
>) {
  return (
    <CollapsibleProvider {...rest}>
      <CollapsibleToggle onClick={onClick}>Toggle</CollapsibleToggle>
      <CollapsibleContent role={role}>{children}</CollapsibleContent>
    </CollapsibleProvider>
  );
}
