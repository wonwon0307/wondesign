import { useCallback, useState } from "react";

type UseOpenStateReturnType = {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
};

/**
 * 열림/닫힘 상태를 관리하는 훅. Controlled/Uncontrolled 패턴을 모두 지원한다.
 *  - `controlledOpen`이 주어지면 외부 상태를 따르는 Controlled 모드로 동작하고
 *  - 그렇지 않으면 내부 상태를 사용하는 Uncontrolled 모드로 동작한다.
 * @param controlledOpen 외부에서 주입하는 열림 상태. `undefined`이면 Uncontrolled 모드.
 * @param setOpenState Controlled 모드에서 상태 변경을 전파할 외부 setter.
 * @param initialState Uncontrolled 모드의 초기 열림 상태. 기본값은 `false`.
 * @return { isOpen: boolean, show: () => void, hide: () => void } 열림 상태와 상태 변경 함수들
 */
export function useOpenState(
  controlledOpen: boolean | undefined,
  setOpenState: ((open: boolean) => void) | undefined,
  initialState: boolean = false,
): UseOpenStateReturnType {
  const [internalOpen, setInternalOpen] = useState(initialState);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const show = useCallback(() => {
    if (isControlled) {
      setOpenState?.(true);
    } else {
      setInternalOpen(true);
    }
  }, [isControlled, setOpenState]);

  const hide = useCallback(() => {
    if (isControlled) {
      setOpenState?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, setOpenState]);

  return { isOpen, show, hide };
}
