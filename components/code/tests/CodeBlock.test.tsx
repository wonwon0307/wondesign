import type { Mock } from "vitest";
import { render } from "@testing-library/react";
import { codeToTokens } from "shiki/bundle/web";

import { CodeBlock } from "@/CodeBlock/CodeBlock";

vi.mock("shiki/bundle/web", () => ({
  bundledLanguages: { javascript: {} },
  bundledLanguagesAlias: { js: {} },
  codeToTokens: vi.fn(),
}));

function mockTokens(lines: string[][]) {
  return {
    tokens: lines.map((line) =>
      line.map((content, offset) => ({ content, offset, htmlStyle: {} })),
    ),
  };
}

describe("CodeBlock", () => {
  it("renders nothing until highlighting resolves", () => {
    (codeToTokens as Mock).mockReturnValue(new Promise(() => {}));

    const { container } = render(<CodeBlock code="const a = 1;" />);

    expect(container.firstChild).toBeNull();
  });

  it("renders highlighted lines once resolved", async () => {
    (codeToTokens as Mock).mockResolvedValue(
      mockTokens([["const a = 1;"], ["const b = 2;"]]),
    );

    const { findByText } = render(
      <CodeBlock code={"const a = 1;\nconst b = 2;"} />,
    );

    expect(await findByText("const a = 1;")).toBeTruthy();
    expect(await findByText("const b = 2;")).toBeTruthy();
  });

  it("renders empty lines as a single space", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"], [], ["b"]]));

    const { container, findByText } = render(<CodeBlock code="a\n\nb" />);
    await findByText("a");

    const lines = container.querySelectorAll("[data-line]");
    expect(lines).toHaveLength(3);
    expect(lines[0].textContent).toBe("a");
    expect(lines[1].textContent).toBe(" ");
    expect(lines[2].textContent).toBe("b");
  });

  it("numbers lines with data-line starting at 1", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"], ["b"]]));

    const { container, findByText } = render(<CodeBlock code="a\nb" />);
    await findByText("a");

    const lines = container.querySelectorAll<HTMLElement>("[data-line]");
    expect(lines[0].dataset.line).toBe("1");
    expect(lines[1].dataset.line).toBe("2");
  });

  it("forwards ref to the underlying pre element", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"]]));
    const testRef = vi.fn();

    const { findByText } = render(<CodeBlock code="a" ref={testRef} />);

    const line = await findByText("a");
    expect(line.closest("pre")?.tagName).toBe("PRE");
    expect(testRef).toHaveBeenCalledWith(line.closest("pre"));
  });

  it("resolves an unsupported language to plaintext", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"]]));

    const { findByText } = render(<CodeBlock code="a" lang="not-a-lang" />);
    await findByText("a");

    expect(codeToTokens).toHaveBeenCalledWith(
      "a",
      expect.objectContaining({ lang: "plaintext" }),
    );
  });

  it("passes through a language known only as an alias", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"]]));

    const { findByText } = render(<CodeBlock code="a" lang="js" />);
    await findByText("a");

    expect(codeToTokens).toHaveBeenCalledWith(
      "a",
      expect.objectContaining({ lang: "js" }),
    );
  });

  it("ignores a stale highlight response once a newer one resolves first", async () => {
    let resolveFirst!: (value: unknown) => void;
    let resolveSecond!: (value: unknown) => void;

    (codeToTokens as Mock)
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { rerender, findByText, queryByText } = render(
      <CodeBlock code="first" />,
    );
    rerender(<CodeBlock code="second" />);

    resolveSecond(mockTokens([["second"]]));
    expect(await findByText("second")).toBeTruthy();

    resolveFirst(mockTokens([["first"]]));
    await Promise.resolve();

    expect(queryByText("first")).toBeNull();
  });
});
