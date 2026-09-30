import { createContext, useContext } from "react";

interface CodeWindowContextValue {
  code: string;
  lang: string;
}

export const CodeWindowContext = createContext<
  CodeWindowContextValue | undefined
>(undefined);

export function useCodeWindow() {
  const context = useContext(CodeWindowContext);

  if (!context) {
    throw new Error(
      "[WonDesign Code] useCodeWindow() must be used within a CodeWindowWrapper.",
    );
  }

  return context;
}
