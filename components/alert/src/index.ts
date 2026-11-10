export { Alerter } from "./Alerter";
export { showAlert, showConfirm } from "./api";

export { dismissAll as dismissAlerts } from "./store";

export type {
  AlertComponentProps,
  AlertObject,
  AlertOptions,
  ConfirmComponentProps,
  ConfirmObject,
  ConfirmOptions,
  AlerterProps,
} from "./types";
