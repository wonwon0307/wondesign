import { createContext } from "react";

import type { ArrowPosition, FloatingPosition } from "@/core/floating";

type TooltipContextType = {
  // Open State
  isDisabled: boolean;
  isOpen: boolean;
  showTooltip: () => void;
  showTooltipWithDelay: () => void;
  hideTooltip: () => void;
  hideTooltipWithDelay: () => void;
  clearTimer: () => void;
  // 렌더링 관련 상태
  isPortalMode: boolean;
  unmountOnHide: boolean;
  // ARIA 연결을 위한 id
  tooltipId: string;
  // 툴팁/화살표 위치
  floatingPosition: FloatingPosition;
  arrowPosition: ArrowPosition;
  // DOM 참조
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  floatingRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
};

export const TooltipContext = createContext<TooltipContextType | undefined>(
  undefined,
);

// Structure를 위한 Context (Tooltip.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
