export interface AlertOptions {
  closeText?: string;
  tone?: "primary" | "secondary" | "destructive";
}

export type AlertItem = {
  type: "alert";
  id: number;
  isOpen: boolean;
  title: string;
  message: string;
  closeText: string;
  tone: "primary" | "secondary" | "destructive";
};

export interface AlertComponentProps {
  alert: AlertItem;
  dismissAlert: () => void;
  deleteAlert: () => void;
}

export interface ConfirmOptions {
  confirmText?: string;
  onConfirm?: () => void | Promise<void>;
  onConfirmError?: (error: unknown) => void;
  cancelText?: string;
  isDestructive?: boolean;
}

export type ConfirmItem = {
  type: "confirm";
  id: number;
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isDestructive: boolean;
  onConfirm?: () => void | Promise<void>;
  onConfirmError?: (error: unknown) => void;
};

export type ConfirmComponentProps = {
  confirm: ConfirmItem;
  dismissConfirm: (confirmed: boolean) => void;
  deleteConfirm: () => void;
};

export type AlerterProps = {
  AlertComponent?: React.ComponentType<AlertComponentProps>;
  ConfirmComponent?: React.ComponentType<ConfirmComponentProps>;
  confirmText?: string;
  cancelText?: string;
  closeText?: string;
};
