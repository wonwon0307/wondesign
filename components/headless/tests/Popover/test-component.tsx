import { PopoverProvider, type PopoverProps } from "@/Popover/Provider";
import { PopoverContent } from "@/Popover/Content";
import { PopoverTitle } from "@/Popover/Title";
import { PopoverClose } from "@/Popover/Close";
import { PopoverArrow } from "@/Popover/Arrow";
import { PopoverTrigger } from "@/Popover/Trigger";

export function TestComponent({
  children,
  onClose,
  ...rest
}: Readonly<PopoverProps & { onClose?: (e: React.MouseEvent) => void }>) {
  return (
    <PopoverProvider {...rest}>
      <PopoverTrigger data-testid="popover-trigger">Trigger</PopoverTrigger>
      <PopoverContent data-testid="popover-content">
        <PopoverTitle data-testid="popover-title">Popover Title</PopoverTitle>
        {children}
        <PopoverClose onClick={onClose} data-testid="popover-button">
          Close
        </PopoverClose>
        <PopoverArrow data-testid="popover-arrow" />
      </PopoverContent>
    </PopoverProvider>
  );
}
