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
  notFound: vi.fn(),
  redirect: vi.fn(),
  usePathname: vi.fn().mockReturnValue("/test-collection/test-link"),
  RedirectType: {
    replace: "replace",
  },
}));
vi.mock("@wondocs/core/pages", () => ({
  getPage: vi.fn().mockReturnValue({
    component: () =>
      Promise.resolve({
        default: () => (
          <div data-testid="page-content">Example Page Content</div>
        ),
      }),
    meta: {
      title: "Example Page Title",
      description: "Example Page Description",
    },
    toc: [
      {
        href: "section-1",
        depth: 1,
        value: "Section 1",
      },
    ],
  }),
}));
vi.mock("@wondocs/core/sidebar", () => ({
  getSidebar: vi.fn().mockReturnValue([
    {
      type: "link",
      label: "Test Link",
      url: "/test-link",
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
          url: "/nested-link-1",
        },
        {
          type: "link",
          label: "Nested Link 2",
          url: "/nested-link-2",
          right: "coming-soon",
        },
      ],
    },
    {
      type: "separator",
    },
    {
      type: "link",
      label: "Test Link 2",
      url: "/test-link-2",
      items: [
        {
          type: "link",
          label: "Nested Link 3",
          url: "/nested-link-3",
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
  Link: ({ children, ...props }: { children: React.ReactNode }) => (
    <a {...props} data-testid="link">
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
