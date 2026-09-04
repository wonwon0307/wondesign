import { CollapsibleProvider, type CollapsibleProps } from "@/Provider";
import { CollapsibleToggle } from "@/Toggle";
import { CollapsibleContent } from "@/Content";

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
