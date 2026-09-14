import { render } from "@testing-library/react";

import { Pre } from "@/CodeBlock/Pre";

describe("CodeBlock", () => {
  it("renders correctly with default properties", () => {
    const { getByTestId, getByText } = render(
      <Pre code={`const a = 1;\nconst b = 2;`} data-testid="pre" />,
    );

    const pre = getByTestId("pre");

    expect(pre.className).toContain("small"); // size 확인

    // 줄마다 따로 렌더링 되어야 한다
    expect(getByText("const a = 1;")).toBeTruthy();
    expect(getByText("const b = 2;")).toBeTruthy();
  });

  it("renders correctly with custom properties", () => {
    const { getByTestId, getByText } = render(
      <Pre
        code={`const a = 1;\nconst b = 2;`}
        size="large"
        vertical="scroll"
        numLines={5}
        horizontal="wrap"
        showLineNumbers
        data-testid="pre"
      />,
    );

    const pre = getByTestId("pre");

    expect(pre.className).toContain("large"); // size 확인
    expect(pre.style.maxHeight).toBe("5lh");

    // 줄마다 따로 렌더링 되어야 한다
    const firstLine = getByText("const a = 1;");
    expect(firstLine.dataset.line).toBe("1");
  });
});
