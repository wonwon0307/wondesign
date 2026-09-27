import {
  CollapsibleProvider,
  type CollapsibleProps,
} from "@/Collapsible/Provider";
import { CollapsibleToggle } from "@/Collapsible/Toggle";
import { CollapsibleContent } from "@/Collapsible/Content";

type Props = CollapsibleProps & {
  role?: "region" | "group";
  isDisabled?: boolean;
};

export function TestCollapsible({
  children,
  role = "region",
  isDisabled,
  ...rest
}: Readonly<Props>) {
  return (
    <CollapsibleProvider {...rest}>
      <CollapsibleToggle isDisabled={isDisabled}>Toggle</CollapsibleToggle>
      <CollapsibleContent role={role}>{children}</CollapsibleContent>
    </CollapsibleProvider>
  );
}
