import { useEffect, useState } from "react";

import type { PresenceStatus, UsePresenceReturn } from "./types";

export function usePresence(
  targetRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
): UsePresenceReturn {
  const [status, setStatus] = useState<PresenceStatus>(
    isOpen ? "open" : "closed",
  );

  if (isOpen && status !== "open") setStatus("open");
  if (!isOpen && status === "open") setStatus("closing");

  useEffect(() => {
    if (status !== "closing") return;

    const node = targetRef.current;

    if (!node || typeof node.getAnimations !== "function") {
      setStatus("closed");
      return;
    }

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      const animations = node
        .getAnimations({ subtree: true })
        .filter((a) => a.effect?.getComputedTiming().endTime !== Infinity);

      void Promise.allSettled(animations.map((a) => a.finished)).then(() => {
        if (!cancelled) setStatus("closed");
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [status, targetRef]);

  return { isPresent: status !== "closed", status };
}
