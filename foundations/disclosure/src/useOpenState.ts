import { useCallback, useState } from "react";

import type { UseOpenStateOptions, UseOpenStateReturn } from "./types";

export function useOpenState({
  controlledOpen,
  setOpenState,
  initialState = false,
}: UseOpenStateOptions): UseOpenStateReturn {
  const [internalOpen, setInternalOpen] = useState<boolean>(initialState);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const show = useCallback(() => {
    if (isControlled) {
      setOpenState?.(true);
    } else {
      setInternalOpen(true);
    }
  }, [isControlled, setOpenState]);

  const hide = useCallback(() => {
    if (isControlled) {
      setOpenState?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, setOpenState]);

  const toggle = useCallback(() => {
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [isOpen, show, hide]);

  return { isOpen, show, hide, toggle };
}
