import { Button, type ButtonProps } from "@/Button/Button";
import { useCollapsibleInternal } from "./contexts";

export type CollapsibleToggleProps = Omit<
  ButtonProps,
  "onClick" | "aria-controls" | "aria-expanded"
>;

export function CollapsibleToggle({
  children,
  asChild = false,
  isDisabled = false,
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  const { isOpen, keepMounted, toggle, contentId, toggleId } =
    useCollapsibleInternal();
  // DOM에 Content가 없을 때는, aria-controls를 undefined로 설정.
  const ariaControls = !keepMounted && !isOpen ? undefined : contentId;

  return (
    <Button
      {...rest}
      id={toggleId}
      asChild={asChild}
      isDisabled={isDisabled}
      onClick={toggle}
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
