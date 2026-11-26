import type { Mock } from "vitest";
import { render } from "@testing-library/react";
import { codeToTokens } from "shiki/bundle/web";

import { CodeBlock } from "@/CodeBlock/CodeBlock";

function mockTokens(lines: string[][]) {
  return {
    tokens: lines.map((line) =>
      line.map((content, offset) => ({ content, offset, htmlStyle: {} })),
    ),
  };
}

describe("CodeBlock - corner cases", () => {
  it("resolves an unsupported language to plaintext", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"]]));

    const { findByText } = render(<CodeBlock code="a" lang="not-a-lang" />);
    await findByText("a");

    expect(codeToTokens).toHaveBeenCalledWith(
      "a",
      expect.objectContaining({ lang: "plaintext" }),
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

  it("falls back to unhighlighted lines and logs when highlighting fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("boom");
    (codeToTokens as Mock).mockRejectedValue(error);

    const { container, findByText } = render(<CodeBlock code={"a\n\nb"} />);

    expect(await findByText("a")).toBeTruthy();
    expect(await findByText("b")).toBeTruthy();

    const lines = container.querySelectorAll("[data-line]");
    expect(lines).toHaveLength(3);
    expect(lines[1].textContent).toBe(" ");

    expect(consoleError).toHaveBeenCalledWith(
      "[WonDesign Code] CodeBlock syntax highlighting failed",
      error,
    );

    consoleError.mockRestore();
  });

  it("ignores a highlight rejection after the effect has been cancelled", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    let rejectFirst!: (reason?: unknown) => void;

    (codeToTokens as Mock)
      .mockImplementationOnce(
        () =>
          new Promise((_resolve, reject) => {
            rejectFirst = reject;
          }),
      )
      .mockResolvedValueOnce(mockTokens([["second"]]));

    const { rerender, findByText } = render(<CodeBlock code="first" />);
    rerender(<CodeBlock code="second" />);

    expect(await findByText("second")).toBeTruthy();

    rejectFirst(new Error("stale failure"));
    await Promise.resolve();
    await Promise.resolve();

    expect(consoleError).not.toHaveBeenCalled();
    expect(await findByText("second")).toBeTruthy();

    consoleError.mockRestore();
  });
});
