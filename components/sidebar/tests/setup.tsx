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

vi.mock("@wondesign/headless-ui/Tooltip", () => ({
  Tooltip: Object.assign(
    ({
      children,
      floatingOptions,
    }: {
      children: React.ReactNode;
      floatingOptions: { placement: "left" | "right" };
    }) => (
      <div data-testid={`tooltip-${floatingOptions.placement}`}>{children}</div>
    ),
    {
      Trigger: (props: React.HTMLAttributes<HTMLButtonElement>) => (
        <button {...props} />
      ),
      Content: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="tooltip-content">{children}</div>
      ),
      Message: ({ children }: { children: React.ReactNode }) => (
        <span data-testid="tooltip-message">{children}</span>
      ),
      Arrow: () => <div data-testid="tooltip-arrow" />,
    },
  ),
}));

vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} />
  ),
}));
