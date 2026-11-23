import { useContext, useEffect, useMemo, useRef } from "react";
import { usePresence } from "@wondesign/disclosure/presence";

import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { BackdropContext, ContentContext, useAlertInternal } from "./contexts";

export type AlertBackdropProps = Omit<React.ComponentProps<"div">, "hidden">;

export function AlertBackdrop({
  children,
  ref,
  inert,
  ...rest
}: Readonly<AlertBackdropProps>) {
  const { isOpen, keepMounted, disablePortal, scopeKey } = useAlertInternal();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const { isPresent, status } = usePresence(backdropRef, isOpen);
  const mergedRef = useMemo(
    () => mergeRef(backdropRef, ref),
    [backdropRef, ref],
  );
  const isInsideContent = useContext(ContentContext) === scopeKey;

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] AlertBackdrop should be rendered outside of AlertContent.",
      );
    }
  }, [isInsideContent]);

  if (!isPresent && !keepMounted) {
    return null;
  }

  return (
    <Portal disable={disablePortal}>
      <BackdropContext.Provider value={scopeKey}>
        <div
          {...rest}
          ref={mergedRef}
          hidden={!isPresent}
          inert={status === "closing" || inert}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </div>
      </BackdropContext.Provider>
    </Portal>
  );
}
