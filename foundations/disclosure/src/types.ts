export interface UseOpenStateOptions {
  controlledOpen?: boolean;
  setControlledOpen?: (open: boolean) => void;
  initialState?: boolean;
}

export interface UseOpenStateReturn {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}
