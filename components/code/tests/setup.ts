vi.mock("shiki/bundle/web", () => ({
  bundledLanguages: { typescript: {}, python: {} },
  bundledLanguagesAlias: { ts: {}, py: {} },
  codeToTokens: vi.fn(),
}));
