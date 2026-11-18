import { useContext, useEffect } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useCollapsibleInternal } from "./contexts";

export type CollapsibleToggleProps = Omit<
  ButtonProps,
  "id" | "type" | "aria-controls" | "aria-expanded"
>;

export function CollapsibleToggle({
  children,
  asChild = false,
  isDisabled = false,
  onClick,
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  const { isOpen, keepMounted, toggle, contentId, toggleId, scopeKey } =
    useCollapsibleInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) toggle();
  };

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] CollapsibleToggle should be rendered outside of CollapsibleContent.",
      );
    }
  }, [isInsideContent]);

  const ariaControls = !keepMounted && !isOpen ? undefined : contentId;

  return (
    <Button
      {...rest}
      id={toggleId}
      type="button"
      asChild={asChild}
      isDisabled={isDisabled}
      onClick={finalOnClick}
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
