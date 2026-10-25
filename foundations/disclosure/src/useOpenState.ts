import { useCallback, useState } from "react";

import type { UseOpenStateOptions, UseOpenStateReturn } from "./types";

export function useOpenState({
  controlledOpen,
  setControlledOpen,
  initialState = false,
}: UseOpenStateOptions = {}): UseOpenStateReturn {
  const [internalOpen, setInternalOpen] = useState<boolean>(initialState);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const show = useCallback(() => {
    if (isControlled) {
      setControlledOpen?.(true);
    } else {
      setInternalOpen(true);
    }
  }, [isControlled, setControlledOpen]);

  const hide = useCallback(() => {
    if (isControlled) {
      setControlledOpen?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, setControlledOpen]);

  const toggle = useCallback(() => {
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [isOpen, show, hide]);

  return { isOpen, show, hide, toggle };
}
