import { useEffect, useMemo, useState } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { AreaContext } from "./contexts";

export interface ToastAreaProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "children" | "role" | "aria-live" | "aria-atomic"
    >,
    React.RefAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asChild?: boolean;
  disablePortal?: boolean;
}

export function ToastArea({
  children,
  asChild = false,
  disablePortal = false,
  ...rest
}: Readonly<ToastAreaProps>) {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsReady(true));

    return () => cancelAnimationFrame(id);
  }, []);

  const value = useMemo(() => ({ isReady }), [isReady]);

  const Component = asChild ? AsChild : "div";

  return (
    <Portal disable={disablePortal}>
      <AreaContext.Provider value={value}>
        <Component
          {...rest}
          role="status"
          aria-live="polite"
          aria-atomic="false"
        >
          {children}
        </Component>
      </AreaContext.Provider>
    </Portal>
  );
}
