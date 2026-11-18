export interface BaseToastOptions {
  duration?: number;
}

export interface BaseToastItem {
  id: number;
  isOpen: boolean;
  message: string;
  duration: number;
}
