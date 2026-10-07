vi.mock("node:fs", () => ({
  existsSync: vi.fn().mockReturnValue(true),
  readFileSync: vi.fn().mockThrow(new Error("File not found")),
}));
vi.mock("node:fs/promises", () => ({
  readFile: vi.fn().mockImplementation((filePath) => {
    if (filePath.endsWith("test1.svg")) {
      return Promise.resolve("<svg>test1</svg>");
    } else if (filePath.endsWith("test2.svg")) {
      return Promise.resolve("<svg>test2</svg>");
    }

    return Promise.reject(new Error(`File not found: ${filePath}`));
  }),
  rm: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("fast-glob", () => ({
  __esModule: true,
  default: vi.fn().mockResolvedValue(["test1.svg", "test2.svg"]),
}));
vi.mock("jiti", () => ({
  createJiti: vi.fn().mockReturnValue({
    import: vi.fn().mockResolvedValue({}),
  }),
}));
vi.mock("@svgr/core", () => ({
  transform: vi
    .fn()
    .mockResolvedValue("export function Component() { return <svg />; }"),
}));

vi.mock("@/lib/atomicWrite", () => ({
  atomicWrite: vi.fn().mockResolvedValue({}),
}));
vi.mock("@/lib/clean", () => ({
  clean: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}));
