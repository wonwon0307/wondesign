import { render, renderHook, fireEvent } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { useShortkey } from "@/keyboard/useShortkey";
import type { BindableShortkey } from "@/keyboard/shortkey/types";

function TestComponent({
  shortkey,
  callback,
}: {
  shortkey: BindableShortkey;
  callback: () => void;
}) {
  const result = useShortkey(shortkey, callback);

  return (
    <div>
      <input type="text" data-testid="input" />
      <textarea data-testid="textarea" />
      <div contentEditable tabIndex={0} data-testid="contenteditable" />
      <button type="button" aria-keyshortcuts={result?.ariaKeyshortcuts}>
        Action
      </button>
    </div>
  );
}

describe("useShortkey - corner cases", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

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

  it("should handle SSR environment gracefully", () => {
    expect(() =>
      renderToString(<TestComponent shortkey="Mod+K" callback={vi.fn()} />),
    ).not.toThrow();
  });

  it("should handle invalid modifier gracefully", () => {
    const callback = vi.fn();
    // @ts-expect-error Testing Invalid shortkey
    renderHook(() => useShortkey("Invalid+K", callback));

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
    expect(callback).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      'Invalid shortkey: "Invalid" is not a supported modifier.',
    );
  });

  it("should handle invalid base key gracefully", () => {
    const callback = vi.fn();
    // @ts-expect-error Testing Invalid shortkey
    renderHook(() => useShortkey("Ctrl+Enter", callback));

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
    expect(callback).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      'Invalid shortkey: "Enter" is not a supported key.',
    );
  });
});
