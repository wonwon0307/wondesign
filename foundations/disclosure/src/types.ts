export type UseOpenStateOptions = {
  controlledOpen?: boolean;
  setControlledOpen?: (open: boolean) => void;
  initialState?: boolean;
};

export type UseOpenStateReturn = {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};
