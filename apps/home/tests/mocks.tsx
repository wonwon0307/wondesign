vi.mock("next/font/google", () => ({
  Google_Sans: () => ({
    className: "google-sans-class",
  }),
  JetBrains_Mono: () => ({
    className: "jetbrains-mono-class",
  }),
  Kalam: () => ({
    className: "--font-kalam",
  }),
  Roboto_Slab: () => ({
    className: "--font-roboto-slab",
  }),
}));

vi.mock("@wondesign/ui/Buttons", () => ({
  Anchor: ({ children, ...props }: { children: React.ReactNode }) => (
    <a {...props} data-testid="anchor">
      {children}
    </a>
  ),
  IconLink: ({ children, ...props }: { children: React.ReactNode }) => (
    <a {...props} data-testid="icon-link">
      {children}
    </a>
  ),
  TabLink: ({
    children,
    isActive,
    ...props
  }: {
    children: React.ReactNode;
    isActive?: boolean;
  }) => (
    <a
      {...props}
      data-testid="tab-link"
      data-active={isActive ? "true" : "false"}
    >
      {children}
    </a>
  ),
}));
vi.mock("@wondesign/ui/Tooltip", () => ({
  Tooltip: ({
    children,
    text,
  }: {
    children: React.ReactNode;
    text: React.ReactNode;
  }) => (
    <div data-testid="tooltip">
      <div data-testid="tooltip-trigger">{children}</div>
      <div data-testid="tooltip-content">{text}</div>
    </div>
  ),
}));
