import { getKeyShortcuts } from "@wondesign/shortkeys";

import { Button, type ButtonProps } from "@/components/Button";
import { useSidebar } from "./_internals/contexts";

export function SidebarToggle({
  children,
  onClick,
  ...rest
}: Readonly<ButtonProps>) {
  const {
    collapse,
    state,
    toggleSidebar,
    contentId,
    keyboardShortkey,
    side,
    isMobile,
  } = useSidebar();
  const ariaKeyshortcuts = keyboardShortkey
    ? getKeyShortcuts(keyboardShortkey)
    : undefined;
  const isOpen = state !== "closed";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleSidebar();

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      {...rest}
      onClick={handleClick}
      isDisabled={collapse === "disable"}
      aria-controls={contentId}
      aria-expanded={isOpen}
      aria-keyshortcuts={ariaKeyshortcuts}
      data-open={isOpen}
      data-state={state}
      data-side={side}
      data-device={isMobile ? "mobile" : "desktop"}
    >
      {children}
    </Button>
  );
}
