vi.mock("@wondesign/interactions/mobile", () => ({
  useIsMobile: vi.fn().mockReturnValue(false),
}));
vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  ),
}));
vi.mock("@wondesign/tooltip", () => ({
  Tooltip: ({
    children,
    text,
    placement,
  }: {
    children: React.ReactNode;
    text: React.ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
  }) => (
    <div data-testid="tooltip" data-placement={placement}>
      {children}
      {text}
    </div>
  ),
}));
