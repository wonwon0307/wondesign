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
    expect(pre.style.maxHeight).toContain("5lh");

    // 줄마다 따로 렌더링 되어야 한다
    const firstLine = getByText("const a = 1;");
    expect(firstLine.dataset.line).toBe("1");
  });

  it("renders empty lines correctly", () => {
    const { getByTestId } = render(
      <Pre code={`const a = 1;\n\nconst b = 2;\n\n`} data-testid="pre" />,
    );

    const pre = getByTestId("pre");
    expect(pre).toBeTruthy();

    const lines = pre.querySelectorAll("span");
    expect(lines.length).toBe(4); // 총 4줄이어야 한다 (마지막 빈 줄은 하나로 합쳐진다)
    expect(lines[0].textContent).toBe("const a = 1;"); // 첫 번째 줄
    expect(lines[1].textContent).toBe(" "); // 두 번째 줄은 빈 줄이어야 한다
    expect(lines[2].textContent).toBe("const b = 2;"); // 세 번째 줄
    expect(lines[3].textContent).toBe(" "); // 네 번째 줄도 빈 줄이어야 한다
  });
});
