import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { getArrowPosition } from "./arrow";
import { finalizePlacement } from "./placement";
import { getContentPosition } from "./position";
import type {
  FloatingOptions,
  FloatingPlacement,
  Position,
  UseFloatingPositionOptions,
  UseFloatingPositionReturn,
} from "./types";

export function useFloatingPosition<
  TTrigger extends HTMLElement = HTMLButtonElement,
  TFloating extends HTMLElement = HTMLDivElement,
  TArrow extends HTMLElement = HTMLDivElement,
>({
  enabled = true,
  placement: preferredPlacement = "bottom",
  forcePlacement = false,
  align = "center",
  offset = 0,
  padding = 0,
}: UseFloatingPositionOptions = {}): UseFloatingPositionReturn<
  TTrigger,
  TFloating,
  TArrow
> {
  const triggerRef = useRef<TTrigger>(null);
  const floatingRef = useRef<TFloating>(null);
  const arrowRef = useRef<TArrow>(null);
  const [placement, setPlacement] =
    useState<FloatingPlacement>(preferredPlacement);
  const [content, setContent] = useState<Position>({ x: 0, y: 0 });
  const [arrow, setArrow] = useState<Position>({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = useState<boolean>(false);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !floatingRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = floatingRef.current.getBoundingClientRect();

    const resolvedOptions: Required<FloatingOptions> = {
      placement: preferredPlacement,
      forcePlacement,
      align,
      offset,
      padding,
    };

    const finalPlacement = finalizePlacement(
      triggerRect,
      contentRect,
      resolvedOptions,
    );
    const contentPosition = getContentPosition(
      finalPlacement,
      triggerRect,
      contentRect,
      resolvedOptions,
    );
    const arrowPosition = getArrowPosition(
      finalPlacement,
      triggerRect,
      contentRect,
      contentPosition,
      arrowRef.current,
    );

    setPlacement(finalPlacement);
    setContent(contentPosition);
    setArrow(arrowPosition);
    setIsPositioned(true);
  }, [preferredPlacement, forcePlacement, align, offset, padding]);

  useLayoutEffect(() => {
    if (!enabled || !triggerRef.current || !floatingRef.current) {
      // arrow는 없더라도 floating의 위치를 계산해야 한다
      return;
    }

    // initial position update
    updatePosition();

    // update position on window resize and scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, {
      passive: true,
      capture: true,
    });

    // add trigger, content, and arrow resize observers
    const observer = new ResizeObserver(updatePosition);
    observer.observe(triggerRef.current);
    observer.observe(floatingRef.current);
    if (arrowRef.current) observer.observe(arrowRef.current);

    // cleanup
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, { capture: true });
      observer.disconnect();
    };
  }, [enabled, updatePosition]);

  return {
    triggerRef,
    floatingRef,
    arrowRef,
    placement,
    content,
    arrow,
    isPositioned: enabled && isPositioned,
    update: updatePosition,
  };
}
