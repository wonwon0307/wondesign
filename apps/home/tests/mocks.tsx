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
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  usePathname: vi.fn().mockReturnValue("/test-collection/test-link"),
  RedirectType: {
    replace: "replace",
  },
}));

vi.mock("@wondocs/core/sidebar", () => ({
  getSidebar: vi.fn().mockReturnValue([
    {
      type: "link",
      label: "Test Link",
      href: "/test-link",
    },
    {
      type: "separator",
    },
    {
      type: "group",
      label: "Test Group",
      items: [
        {
          type: "link",
          label: "Nested Link 1",
          href: "/nested-link-1",
        },
        {
          type: "link",
          label: "Nested Link 2",
          href: "/nested-link-2",
          badge: "coming-soon",
        },
      ],
    },
    {
      type: "separator",
    },
    {
      type: "link",
      label: "Test Link 2",
      href: "/test-link-2",
      items: [
        {
          type: "link",
          label: "Nested Link 3",
          href: "/nested-link-3",
        },
      ],
    },
  ]),
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
