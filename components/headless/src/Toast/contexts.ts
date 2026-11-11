import { createContext, useContext } from "react";

type ToastAreaContext = {
  isReady: boolean;
};

export const AreaContext = createContext<ToastAreaContext | undefined>(
  undefined,
);

export function useToastArea() {
  const context = useContext(AreaContext);

  if (!context) {
    throw new Error(
      "[WonDesign Headless] a Toast component must be rendered inside a ToastArea.",
    );
  }

  return context;
}

type ToastContextType = {
  isOpen: boolean;
  dismissToast: () => void;
  resumeTimer: () => void;
  pauseTimer: () => void;
  keepMounted: boolean;

  contentRef: React.RefObject<HTMLDivElement | null>;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export function useToastInternal(errMsg?: string) {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      errMsg ??
        "[WonDesign Headless] useToast() must be used within a Toast component.",
    );
  }

  return context;
}

export function useToast() {
  const { isOpen, dismissToast, resumeTimer, pauseTimer, keepMounted } =
    useToastInternal();

  return {
    isOpen,
    dismissToast,
    resumeTimer,
    pauseTimer,
    keepMounted,
  };
}
