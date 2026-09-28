import { Button, type ButtonProps } from "@wondesign/headless/Button";

import { useSidebarInternal } from "@/contexts/sidebar";

export type HeadlessToggleProps = ButtonProps;

export function HeadlessToggle({
  children,
  ...rest
}: Readonly<HeadlessToggleProps>) {
  const {
    collapse,
    state,
    toggleSidebar,
    side,
    isMobile,
    contentId,
    ariaKeyshortcuts,
  } = useSidebarInternal();

  return (
    <Button
      {...rest}
      onClick={toggleSidebar}
      isDisabled={collapse === "disable" && !isMobile}
      aria-controls={contentId}
      aria-expanded={state !== "closed"}
      aria-keyshortcuts={ariaKeyshortcuts}
      data-open={state === "expanded"}
      data-side={side}
      data-state={state}
      data-device={isMobile ? "mobile" : "desktop"}
    >
      {children}
    </Button>
  );
}
