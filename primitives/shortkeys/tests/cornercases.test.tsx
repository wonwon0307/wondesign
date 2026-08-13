import { render, screen, fireEvent } from "@testing-library/react";

import { useKeyboardShortkey } from "@/useKeyboardShortkey";
import type { Shortkey } from "@/types/shortkeys";

describe("useKeyboardShortkey - corner cases", () => {
  function TestComponent({
    shortkey,
    callback,
  }: {
    shortkey: Shortkey;
    callback: () => void;
  }) {
    useKeyboardShortkey(shortkey, callback);

    return (
      <div>
        <input type="text" data-testid="input" />
        <textarea data-testid="textarea" />
        <div contentEditable tabIndex={0} data-testid="contenteditable" />
      </div>
    );
  }

  // jsdom doesn't implement `isContentEditable`, so setting the
  // `contentEditable` attribute alone never makes it report true.
  // Stub it to match real browser behavior.
  function focusContentEditable(element: HTMLElement) {
    Object.defineProperty(element, "isContentEditable", {
      value: true,
      configurable: true,
    });
    element.focus();
  }

  describe("without a command modifier", () => {
    it("does not trigger when focus is on an input", () => {
      const callback = vi.fn();
      render(<TestComponent shortkey="K" callback={callback} />);

      const input = screen.getByTestId("input");
      input.focus();
      fireEvent.keyDown(input, { code: "KeyK" });

      expect(callback).not.toHaveBeenCalled();
    });

    it("does not trigger when focus is on a textarea", () => {
      const callback = vi.fn();
      render(<TestComponent shortkey="K" callback={callback} />);

      const textarea = screen.getByTestId("textarea");
      textarea.focus();
      fireEvent.keyDown(textarea, { code: "KeyK" });

      expect(callback).not.toHaveBeenCalled();
    });

    it("does not trigger when focus is on a content editable element", () => {
      const callback = vi.fn();
      render(<TestComponent shortkey="K" callback={callback} />);

      const contentEditable = screen.getByTestId("contenteditable");
      focusContentEditable(contentEditable);
      fireEvent.keyDown(contentEditable, { code: "KeyK" });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("with a command modifier", () => {
    it("still triggers when focus is on an input", () => {
      const callback = vi.fn();
      render(<TestComponent shortkey="Ctrl+K" callback={callback} />);

      const input = screen.getByTestId("input");
      input.focus();
      fireEvent.keyDown(input, { code: "KeyK", ctrlKey: true });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("still triggers when focus is on a textarea", () => {
      const callback = vi.fn();
      render(<TestComponent shortkey="Ctrl+K" callback={callback} />);

      const textarea = screen.getByTestId("textarea");
      textarea.focus();
      fireEvent.keyDown(textarea, { code: "KeyK", ctrlKey: true });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("still triggers when focus is on a content editable element", () => {
      const callback = vi.fn();
      render(<TestComponent shortkey="Ctrl+K" callback={callback} />);

      const contentEditable = screen.getByTestId("contenteditable");
      focusContentEditable(contentEditable);
      fireEvent.keyDown(contentEditable, { code: "KeyK", ctrlKey: true });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
