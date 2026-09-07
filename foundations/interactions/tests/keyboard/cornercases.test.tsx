import { render, fireEvent } from "@testing-library/react";

import { useShortkey } from "@/keyboard/useShortkey";
import type { BindableShortkey } from "@/keyboard/shortkey/types";

function TestComponent({
  shortkey,
  callback,
}: {
  shortkey: BindableShortkey;
  callback: () => void;
}) {
  useShortkey(shortkey, callback);

  return (
    <div>
      <input type="text" data-testid="input" />
      <textarea data-testid="textarea" />
      <div contentEditable tabIndex={0} data-testid="contenteditable" />
    </div>
  );
}

describe("useShortkey - corner cases", () => {
  it("should not call callback when focus is on an input even if shortkey is pressed", () => {
    const callback = vi.fn();
    const { getByTestId } = render(
      <TestComponent shortkey="K" callback={callback} />,
    );

    const input = getByTestId("input");
    input.focus();
    fireEvent.keyDown(input, { code: "KeyK" });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call callback when focus is on a textarea even if shortkey is pressed", () => {
    const callback = vi.fn();
    const { getByTestId } = render(
      <TestComponent shortkey="K" callback={callback} />,
    );

    const textarea = getByTestId("textarea");
    textarea.focus();
    fireEvent.keyDown(textarea, { code: "KeyK" });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call callback when focus is on a contenteditable element even if shortkey is pressed", () => {
    const callback = vi.fn();
    const { getByTestId } = render(
      <TestComponent shortkey="K" callback={callback} />,
    );

    const contenteditable = getByTestId("contenteditable");
    Object.defineProperty(contenteditable, "isContentEditable", {
      value: true,
      configurable: true,
    });
    contenteditable.focus();
    fireEvent.keyDown(contenteditable, { code: "KeyK" });

    expect(callback).not.toHaveBeenCalled();
  });
});
