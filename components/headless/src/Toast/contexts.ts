import { createContext, useContext } from "react";

type ToastAreaContextValue = {
  isReady: boolean;
};

export const AreaContext = createContext<ToastAreaContextValue | null>(null);

export function useToastArea() {
  const context = useContext(AreaContext);

  if (!context) {
    throw new Error(
      "[WonDesign Headless] Toast must be rendered inside a ToastArea.",
    );
  }

  return context;
}

type ToastContextValue = {
  isOpen: boolean;
  isPaused: boolean;
  dismissToast: () => void;
  resumeTimer: () => void;
  pauseTimer: () => void;

  contentRef: React.RefObject<HTMLDivElement | null>;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastInternal(errMsg?: string) {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      errMsg ??
        "[WonDesign Headless] useToast() must be used inside a Toast component.",
    );
  }

  return context;
}

export function useToast() {
  const { isOpen, isPaused, dismissToast, resumeTimer, pauseTimer } =
    useToastInternal();

  return {
    isOpen,
    isPaused,
    dismissToast,
    resumeTimer,
    pauseTimer,
  };
}
