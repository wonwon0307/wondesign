import { act, fireEvent, render } from "@testing-library/react";

import { CopyCodeButton } from "@/CodeBlock/CopyCode";

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: vi.fn() },
  configurable: true,
});

describe("CopyCodeButton", () => {
  const code = "const a = 1;";

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles copy correctly", async () => {
    const { getByLabelText } = render(<CopyCodeButton code={code} />);

    const button = getByLabelText("Copy code");
    expect(button).toBeTruthy();

    await act(async () => {
      fireEvent.click(button);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    expect(getByLabelText("Copied")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(getByLabelText("Copy code")).toBeTruthy();
  });

  it("calls onCopy on click", async () => {
    const onCopy = vi.fn();
    const { getByTestId } = render(
      <CopyCodeButton code={code} onCopy={onCopy} data-testid="copy-button" />,
    );

    const button = getByTestId("copy-button");
    expect(button.ariaLabel).toBe("Copy code");

    await act(async () => {
      fireEvent.click(button);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    expect(button.ariaLabel).toBe("Copied");
    expect(onCopy).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(button.ariaLabel).toBe("Copy code");
  });

  it("calls onCopyFail on copy failure", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onCopyFail = vi.fn();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(
      new Error("copy failed"),
    );

    const { getByTestId } = render(
      <CopyCodeButton
        code={code}
        onCopyFail={onCopyFail}
        data-testid="copy-button"
      />,
    );

    const button = getByTestId("copy-button");
    expect(button.ariaLabel).toBe("Copy code");

    await act(async () => {
      fireEvent.click(button);
    });
    expect(onCopyFail).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "[WonDesign Code] CopyCodeButton: copy failed",
      expect.any(Error),
    );
  });

  it("renders custom copy button correctly", async () => {
    const { getByText } = render(
      <CopyCodeButton code={code} data-testid="copy-button">
        Custom Copy
      </CopyCodeButton>,
    );

    const button = getByText("Custom Copy");
    expect(button).toBeTruthy();
    expect(button.dataset.state).toBe("idle");

    await act(async () => {
      fireEvent.click(button);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    expect(button.dataset.state).toBe("copied");
  });
});
