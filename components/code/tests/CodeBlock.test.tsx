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

describe("CodeBlock", () => {
  it("renders highlighted lines once resolved", async () => {
    (codeToTokens as Mock).mockResolvedValue(
      mockTokens([["const a = 1;"], ["const b = 2;"]]),
    );

    const { findByText } = render(
      <CodeBlock code={"const a = 1;\nconst b = 2;"} lang="ts" />,
    );

    expect(await findByText("const a = 1;")).toBeTruthy();
    expect(await findByText("const b = 2;")).toBeTruthy();
  });

  it("renders empty lines as a single space", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"], [], ["b"]]));

    const { container, findByText } = render(
      <CodeBlock code="a\n\nb" lang="py" />,
    );
    await findByText("a");

    const lines = container.querySelectorAll("[data-line]");
    expect(lines).toHaveLength(3);
    expect(lines[0].textContent).toBe("a");
    expect(lines[1].textContent).toBe(" ");
    expect(lines[2].textContent).toBe("b");
  });

  it("numbers lines with data-line starting at 1", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"], ["b"]]));

    const { container, findByText } = render(
      <CodeBlock code="a\nb" lang="py" />,
    );
    await findByText("a");

    const lines = container.querySelectorAll<HTMLElement>("[data-line]");
    expect(lines[0].dataset.line).toBe("1");
    expect(lines[1].dataset.line).toBe("2");
  });

  it("respects showLineNumbers, size and maxNumLines props", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"], ["b"], ["c"]]));

    const { findByText, getByRole, getByTestId } = render(
      <CodeBlock
        code="a\nb\nc"
        lang="py"
        showLineNumbers
        size="large"
        maxNumLines={2}
        data-testid="code-block"
      />,
    );

    await findByText("a");
    const codeBlock = getByTestId("code-block");
    const code = getByRole("code");
    expect(codeBlock.className).toContain("large");
    expect(code.className).toContain("showLineNumbers_true");
  });

  it("forwards ref to the underlying pre element", async () => {
    (codeToTokens as Mock).mockResolvedValue(mockTokens([["a"]]));
    const testRef = vi.fn();

    const { findByText, getByTestId } = render(
      <CodeBlock code="a" ref={testRef} lang="py" data-testid="code-block" />,
    );

    await findByText("a");
    const pre = getByTestId("code-block");
    expect(pre.tagName).toBe("PRE");
    expect(testRef).toHaveBeenCalledWith(pre);
  });
});
