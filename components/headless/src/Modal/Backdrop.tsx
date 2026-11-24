import { useContext, useEffect, useMemo, useRef } from "react";
import { usePresence } from "@wondesign/disclosure/presence";

import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { BackdropContext, ContentContext, useModalInternal } from "./contexts";

export type ModalBackdropProps = Omit<React.ComponentProps<"div">, "hidden">;

export function ModalBackdrop({
  children,
  ref,
  inert,
  ...rest
}: Readonly<ModalBackdropProps>) {
  const { isOpen, keepMounted, disablePortal, scopeKey } = useModalInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;
  const backdropRef = useRef<HTMLDivElement>(null);
  const { isPresent, status } = usePresence(backdropRef, isOpen);
  const mergedRef = useMemo(
    () => mergeRef(backdropRef, ref),
    [backdropRef, ref],
  );

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] ModalBackdrop should be rendered outside of ModalContent.",
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
