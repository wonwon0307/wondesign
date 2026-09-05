export type FloatingPlacement = "top" | "bottom" | "left" | "right";
export type FloatingAlign = "start" | "center" | "end";

export interface FloatingOptions {
  placement?: FloatingPlacement;
  forcePlacement?: boolean;
  align?: FloatingAlign;
  offset?: number;
  padding?: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type FloatingPositions = {
  placement: FloatingPlacement;
  content: Coordinates;
  arrow: Coordinates;
};
