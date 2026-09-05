export type FloatingPlacement = "top" | "bottom" | "left" | "right";
export type FloatingAlign = "start" | "center" | "end";

export interface FloatingOptions {
  placement?: FloatingPlacement;
  forcePlacement?: boolean;
  align?: FloatingAlign;
  offset?: number;
  padding?: number;
}

export interface FloatingPosition {
  placement: FloatingPlacement;
  x: number;
  y: number;
}

export interface ArrowPosition {
  x: number;
  y: number;
}
