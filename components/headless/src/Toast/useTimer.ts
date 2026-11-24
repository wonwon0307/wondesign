import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface UseTimerOptions {
  duration?: number;
  enabled?: boolean;
}

export function useTimer(
  callback: () => void,
  { duration = 5000, enabled = false }: UseTimerOptions = {},
) {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [prevEnabled, setPrevEnabled] = useState<boolean>(enabled);
  const remainingRef = useRef<number>(duration);
  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  if (prevEnabled !== enabled) {
    setPrevEnabled(enabled);
    setIsPaused(false);
  }

  const startTimer = useCallback(() => {
    if (remainingRef.current <= 0) return;
    if (timerRef.current) return; // 타이머가 이미 실행 중이면, 중복해서 시작하지 않는다.

    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(
      () => callbackRef.current(),
      remainingRef.current,
    );
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (startedAtRef.current !== null) {
      remainingRef.current -= Date.now() - startedAtRef.current;
      startedAtRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    remainingRef.current = duration;
    startedAtRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [duration]);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (enabled) {
      resetTimer();
      startTimer();
    }

    return () => {
      resetTimer();
    };
  }, [resetTimer, startTimer, enabled]);

  return { isPaused, resumeTimer, pauseTimer };
}
