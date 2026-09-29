Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // desktop width
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
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
