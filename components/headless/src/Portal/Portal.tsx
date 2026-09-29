import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  disable?: boolean;
};

const subscribe = () => () => {};

/**
 * Portal로 렌더링 되는 컴포넌트를 감싸는 래퍼 컴포넌트.
 *  - 언제나 conditional이며,
 *  - SSR Guard를 포함한다. (서버 렌더링 및 hydration mismatch 방지)
 */
export function Portal({ children, disable }: Props) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  // SSR Guard: 컴포넌트가 마운트되기 전에는 Portal 모드이더라도 children을 그대로 렌더링하여 hydration mismatch 방지
  if (!mounted) return children;

  // 명시적으로 disable가 선언되어 있으면, children을 그대로 렌더링한다
  if (disable) return children;

  // portal
  return createPortal(children, document.body);
}
