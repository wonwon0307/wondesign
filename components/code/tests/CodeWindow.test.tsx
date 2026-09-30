import { act, fireEvent, render } from "@testing-library/react";

import { CodeWindow } from "@/CodeWindow/CodeWindow";
import { CodeWindowWrapper } from "@/CodeWindow/fragments/Wrapper";
import { CodeWindowBody } from "@/CodeWindow/fragments/Body";
import { CodeWindowCopyButton } from "@/CodeWindow/fragments/Copy";

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: vi.fn() },
  configurable: true,
});
vi.mock("shiki/bundle/web", () => ({
  bundledLanguages: { javascript: {} },
  bundledLanguagesAlias: { js: {} },
  codeToTokens: vi.fn().mockResolvedValue({
    tokens: [[{ content: "const a = 1;", offset: 0, htmlStyle: {} }]],
  }),
}));

describe("CodeWindow", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders correctly", async () => {
    const { findByText } = render(
      <CodeWindow code="const a = 1;" lang="javascript" />,
    );

    const line = await findByText("const a = 1;");
    const pre = line.closest("pre");
    expect(pre).toBeTruthy();
    expect(pre?.style.maxHeight).toBe("none");
  });

  it("renders correctly with scrollable content (vertically)", async () => {
    const { findByText } = render(
      <CodeWindow code={"const a = 1;"} lang="javascript" maxNumLines={10} />,
    );

    const line = await findByText("const a = 1;");
    const pre = line.closest("pre");
    expect(pre?.style.maxHeight).toBe("10lh");
  });

  it("handles copy click correctly", async () => {
    const { findByLabelText, getByLabelText } = render(
      <CodeWindow code="const a = 1;" lang="javascript" />,
    );

    const copyButton = await findByLabelText("Copy code");
    expect(copyButton).toBeTruthy();

    vi.useFakeTimers();

    fireEvent.click(copyButton);
    await act(async () => {});

    expect(getByLabelText("Copied")).toBeTruthy();

    act(() => {
      // half of the timeout - still shows "Copied"
      vi.advanceTimersByTime(1000);
    });

    expect(getByLabelText("Copied")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(getByLabelText("Copy code")).toBeTruthy();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("const a = 1;");
  });

  it("renders custom copy button correctly", async () => {
    const { findByText, getByLabelText } = render(
      <CodeWindowWrapper code="const a = 1;" lang="javascript">
        <CodeWindowBody />
        <CodeWindowCopyButton>Test Copy Button</CodeWindowCopyButton>
      </CodeWindowWrapper>,
    );

    const customCopyButton = await findByText("Test Copy Button");
    expect(customCopyButton).toBeTruthy();

    vi.useFakeTimers();

    fireEvent.click(customCopyButton);
    await act(async () => {});

    expect(getByLabelText("Copied")).toBeTruthy();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("const a = 1;");

    act(() => {
      vi.runAllTimers();
    });

    expect(getByLabelText("Copy code")).toBeTruthy();
  });
});
