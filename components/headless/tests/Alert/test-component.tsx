import { Alert, AlertProps } from "@/Alert";

type Props = AlertProps & {
  title?: string;
  message?: string;
};

export function TestComponent({
  children,
  title = "Test Title",
  message = "Test Message",
  ...rest
}: Props) {
  return (
    <Alert {...rest}>
      <Alert.Trigger data-testid="alert-trigger">Trigger</Alert.Trigger>
      <Alert.Content data-testid="alert-content">
        <Alert.Title>{title}</Alert.Title>
        <Alert.Message>{message}</Alert.Message>
        {children}
      </Alert.Content>
      <Alert.Backdrop data-testid="alert-backdrop" />
    </Alert>
  );
}
