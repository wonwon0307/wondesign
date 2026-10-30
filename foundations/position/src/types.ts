export type FloatingPlacement = "top" | "bottom" | "left" | "right";
export type FloatingAlign = "start" | "center" | "end";

export type Position = { x: number; y: number };

export interface FloatingOptions {
  placement?: FloatingPlacement;
  forcePlacement?: boolean;
  align?: FloatingAlign;
  offset?: number;
  padding?: number;
}

export interface UseFloatingPositionOptions extends FloatingOptions {
  enabled?: boolean;
}

export interface UseFloatingPositionReturn<
  TTrigger extends HTMLElement = HTMLButtonElement,
  TFloating extends HTMLElement = HTMLDivElement,
  TArrow extends HTMLElement = HTMLDivElement,
> {
  triggerRef: React.RefObject<TTrigger | null>;
  floatingRef: React.RefObject<TFloating | null>;
  arrowRef: React.RefObject<TArrow | null>;
  placement: FloatingPlacement;
  position: Position;
  arrow: Position;
  isPositioned: boolean;
  update: () => void;
}
