Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("@wondesign/tooltip", () => ({
  Tooltip: ({
    children,
    text,
    floatingOptions,
  }: {
    children: React.ReactNode;
    text: React.ReactNode;
    floatingOptions: { placement: "left" | "right" };
  }) => (
    <div data-testid={`tooltip-${floatingOptions.placement}`}>
      <button data-testid="tooltip-trigger">{children}</button>
      <span data-testid="tooltip-content">{text}</span>
    </div>
  ),
}));

vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  ),
}));
