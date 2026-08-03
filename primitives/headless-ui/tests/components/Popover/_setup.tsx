import { Popover, type PopoverProps } from "@/components/Popover";

export function TestComponent({ children, ...rest }: Readonly<PopoverProps>) {
  return (
    <Popover {...rest}>
      <Popover.Trigger data-testid="popover-trigger">트리거</Popover.Trigger>
      <Popover.Content data-testid="popover-content">
        <Popover.Title data-testid="popover-title">팝오버 제목</Popover.Title>
        {children}
        <Popover.Close data-testid="popover-button">닫기</Popover.Close>
        <Popover.Arrow data-testid="popover-arrow" />
      </Popover.Content>
    </Popover>
  );
}
