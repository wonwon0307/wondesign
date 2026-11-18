import { Alert, AlertProps } from "@/Alert";

export function TestComponent({
  children,
  title = "Test Title",
  message = "Test Message",
  onTrigger,
  ...rest
}: AlertProps & {
  title?: string;
  message?: string;
  onTrigger?: (e: React.MouseEvent) => void;
}) {
  return (
    <Alert {...rest}>
      <Alert.Trigger onClick={onTrigger} data-testid="alert-trigger">
        Trigger
      </Alert.Trigger>
      <Alert.Content data-testid="alert-content">
        <Alert.Title>{title}</Alert.Title>
        <Alert.Message>{message}</Alert.Message>
        {children}
      </Alert.Content>
      <Alert.Backdrop data-testid="alert-backdrop" />
    </Alert>
  );
}
