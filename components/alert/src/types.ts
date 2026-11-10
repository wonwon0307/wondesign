export interface AlertOptions {
  closeText?: string;
  tone?: "primary" | "secondary" | "destructive";
}

export type AlertItem = {
  type: "alert";
  id: number;
  title: string;
  message: string;
  closeText: string;
  tone: "primary" | "secondary" | "destructive";
};

export interface AlertComponentProps {
  alert: AlertItem;
  closeAlert: () => void;
}

export interface ConfirmOptions {
  confirmText?: string;
  onConfirm?: () => void | Promise<void>;
  onConfirmError?: (error: unknown) => void | Promise<void>;
  cancelText?: string;
  isDestructive?: boolean;
}

export type ConfirmItem = {
  type: "confirm";
  id: number;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isDestructive: boolean;
  onConfirm?: () => void | Promise<void>;
  onConfirmError?: (error: unknown) => void | Promise<void>;
};

export type ConfirmComponentProps = {
  confirm: ConfirmItem;
  closeConfirm: (confirmed: boolean) => void;
};

export type AlerterProps = {
  AlertComponent?: React.ComponentType<AlertComponentProps>;
  ConfirmComponent?: React.ComponentType<ConfirmComponentProps>;
  confirmText?: string;
  cancelText?: string;
  closeText?: string;
};
