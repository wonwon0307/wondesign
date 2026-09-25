import { testSidebarItems } from "./testdata/collection";
import { testPageChildrenData, testPageData } from "./testdata/document";

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
  notFound: vi.fn().mockThrow(new Error("notFound called")),
  redirect: vi.fn(),
  usePathname: vi.fn().mockReturnValue("/test-collection/test-link"),
  RedirectType: {
    replace: "replace",
  },
}));
vi.mock("@wondocs/core/pages", () => ({
  getPage: vi.fn().mockReturnValue(testPageData.normal),
  getPageChildren: vi.fn().mockReturnValue(testPageChildrenData),
}));
vi.mock("@wondocs/core/sidebar", () => ({
  getSidebar: vi.fn().mockReturnValue(testSidebarItems),
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
