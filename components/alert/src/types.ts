export interface AlertOptions {
  closeText?: string;
}

export interface AlertObject extends AlertOptions {
  type: "alert";
  id: number;
  title: string;
  message: string;
}

export interface AlertComponentProps {
  alert: AlertObject;
  closeAlert: () => void;
  closeText: string;
}

export interface ConfirmOptions {
  confirmText?: string;
  onConfirm?: () => void | Promise<void>;
  onConfirmError?: (error: unknown) => void | Promise<void>;
  cancelText?: string;
  isDestructive?: boolean;
}

export interface ConfirmObject extends Omit<ConfirmOptions, "isDestructive"> {
  type: "confirm";
  id: number;
  title: string;
  message: string;
  isDestructive: boolean;
}

export type ConfirmComponentProps = {
  confirm: ConfirmObject;
  closeConfirm: (confirmed: boolean) => void;
  confirmText: string;
  cancelText: string;
};

export type AlerterProps = {
  AlertComponent?: React.ComponentType<AlertComponentProps>;
  ConfirmComponent?: React.ComponentType<ConfirmComponentProps>;
  confirmText?: string;
  cancelText?: string;
  closeText?: string;
};

export type AlerterObject = AlertObject | ConfirmObject;
