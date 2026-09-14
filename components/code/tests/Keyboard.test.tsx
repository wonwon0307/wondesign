import { render } from "@testing-library/react";

import { Keyboard, KeyboardGroup } from "@/Keyboard";

describe("Keyboard", () => {
  it("renders the key label as a kbd element", () => {
    const { getByText } = render(<Keyboard>⌘</Keyboard>);
    expect(getByText("⌘")).toBeTruthy();
    expect(getByText("⌘").tagName).toBe("KBD");
  });

  it("applies size prop", () => {
    const { getByText } = render(<Keyboard size="large">Enter</Keyboard>);
    expect(getByText("Enter").tagName).toBe("KBD");
  });
});

describe("KeyboardGroup", () => {
  it("handles normal shortkey correctly", () => {
    // alphabet, numeric and function shortkey
    const { getByText } = render(
      <div>
        <KeyboardGroup shortkey="K" />
        <KeyboardGroup shortkey="1" />
        <KeyboardGroup shortkey="Enter" />
        <KeyboardGroup shortkey="Escape" />
      </div>,
    );

    const element = getByText("K");
    expect(element.tagName).toBe("KBD");
    expect(element.ariaLabel).toBe("K");

    const element2 = getByText("1");
    expect(element2.tagName).toBe("KBD");
    expect(element2.ariaLabel).toBe("1");

    const element3 = getByText("Enter");
    expect(element3.tagName).toBe("KBD");
    expect(element3.ariaLabel).toBe("Enter");

    const element4 = getByText("Escape");
    expect(element4.tagName).toBe("KBD");
    expect(element4.ariaLabel).toBe("Escape");
  });

  describe("non-apple", () => {
    // jsdom의 기본이 non-apple이다
    it("handles shortkey with a modifier in non-apple platforms correctly", () => {
      const { getAllByText, getByTestId, getByText } = render(
        <div>
          <KeyboardGroup shortkey="Ctrl+K" data-testid="kbd-grp" />
          <KeyboardGroup shortkey="Shift+K" data-testid="kbd-grp-2" />
          <KeyboardGroup shortkey="Alt+K" data-testid="kbd-grp-3" />
          <KeyboardGroup shortkey="Meta+K" data-testid="kbd-grp-4" />
          <KeyboardGroup shortkey="Mod+K" data-testid="kbd-grp-5" />
        </div>,
      );

      expect(getByTestId("kbd-grp").ariaLabel).toBe("Control K");
      expect(getByTestId("kbd-grp-2").ariaLabel).toBe("Shift K");
      expect(getByTestId("kbd-grp-3").ariaLabel).toBe("Alt K");
      expect(getByTestId("kbd-grp-4").ariaLabel).toBe("Windows K");
      // Mod는 non-apple에서 Control로 처리되어야 한다
      expect(getByTestId("kbd-grp-5").ariaLabel).toBe("Control K");

      expect(getAllByText("Ctrl").length).toBe(2);
      expect(getByText("Shift")).toBeTruthy();
      expect(getByText("Alt")).toBeTruthy();
      expect(getByText("Win")).toBeTruthy();
    });

    it("handles shortkey with 2 modifiers in non-apple platforms correctly", () => {
      const { getByTestId } = render(
        <div>
          <KeyboardGroup shortkey="Ctrl+Shift+K" data-testid="kbd-grp" />
          <KeyboardGroup shortkey="Ctrl+Alt+K" data-testid="kbd-grp-2" />
          <KeyboardGroup shortkey="Ctrl+Win+K" data-testid="kbd-grp-3" />
          <KeyboardGroup shortkey="Alt+Shift+K" data-testid="kbd-grp-4" />
          <KeyboardGroup shortkey="Alt+Win+K" data-testid="kbd-grp-5" />
          <KeyboardGroup shortkey="Win+Shift+K" data-testid="kbd-grp-6" />
        </div>,
      );

      // Labels should always be resolved in the order of
      // Win > Control > Alt > Shift
      expect(getByTestId("kbd-grp").ariaLabel).toBe("Control Shift K");
      expect(getByTestId("kbd-grp-2").ariaLabel).toBe("Control Alt K");
      expect(getByTestId("kbd-grp-3").ariaLabel).toBe("Windows Control K");
      expect(getByTestId("kbd-grp-4").ariaLabel).toBe("Alt Shift K");
      expect(getByTestId("kbd-grp-5").ariaLabel).toBe("Windows Alt K");
      expect(getByTestId("kbd-grp-6").ariaLabel).toBe("Windows Shift K");
    });
  });

  describe("apple", () => {
    beforeAll(() => {
      Object.defineProperty(window.navigator, "platform", {
        value: "MacIntel",
        writable: true,
      });
    });

    afterAll(() => {
      Object.defineProperty(window.navigator, "platform", {
        value: "",
        writable: true,
      });
    });

    it("handles shortkey with a modifier in apple platforms correctly", () => {
      Object.defineProperty(window.navigator, "platform", {
        value: "MacIntel",
        writable: true,
      });
      const { getAllByText, getByTestId, getByText } = render(
        <div>
          <KeyboardGroup shortkey="Ctrl+K" data-testid="kbd-grp" />
          <KeyboardGroup shortkey="Shift+K" data-testid="kbd-grp-2" />
          <KeyboardGroup shortkey="Alt+K" data-testid="kbd-grp-3" />
          <KeyboardGroup shortkey="Meta+K" data-testid="kbd-grp-4" />
          <KeyboardGroup shortkey="Mod+K" data-testid="kbd-grp-5" />
        </div>,
      );

      expect(getByTestId("kbd-grp").ariaLabel).toBe("Control K");
      expect(getByTestId("kbd-grp-2").ariaLabel).toBe("Shift K");
      expect(getByTestId("kbd-grp-3").ariaLabel).toBe("Option K");
      expect(getByTestId("kbd-grp-4").ariaLabel).toBe("Command K");
      // Mod는 apple에서 Command로 처리되어야 한다
      expect(getByTestId("kbd-grp-5").ariaLabel).toBe("Command K");

      expect(getAllByText("⌘").length).toBe(2);
      expect(getByText("⌃")).toBeTruthy();
      expect(getByText("⌥")).toBeTruthy();
      expect(getByText("⇧")).toBeTruthy();
    });

    it("handles shortkey with 2 modifiers in apple platforms correctly", () => {
      const { getByTestId } = render(
        <div>
          <KeyboardGroup shortkey="Control+Option+K" data-testid="kbd-grp" />
          <KeyboardGroup shortkey="Control+Command+K" data-testid="kbd-grp-2" />
          <KeyboardGroup shortkey="Control+Shift+K" data-testid="kbd-grp-3" />
          <KeyboardGroup shortkey="Option+Command+K" data-testid="kbd-grp-4" />
          <KeyboardGroup shortkey="Option+Shift+K" data-testid="kbd-grp-5" />
          <KeyboardGroup shortkey="Command+Option+K" data-testid="kbd-grp-6" />
        </div>,
      );

      // Labels should always be resolved in the order of
      // Control > Option > Shift > Command
      expect(getByTestId("kbd-grp").ariaLabel).toBe("Control Option K");
      expect(getByTestId("kbd-grp-2").ariaLabel).toBe("Control Command K");
      expect(getByTestId("kbd-grp-3").ariaLabel).toBe("Control Shift K");
      expect(getByTestId("kbd-grp-4").ariaLabel).toBe("Option Command K");
      expect(getByTestId("kbd-grp-5").ariaLabel).toBe("Option Shift K");
      expect(getByTestId("kbd-grp-6").ariaLabel).toBe("Option Command K");
    });
  });

  it("handles custom aria-label correctly", () => {
    const { getByTestId } = render(
      <KeyboardGroup
        shortkey="Ctrl+K"
        aria-label="Custom Label"
        data-testid="keyboard-group"
      />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.ariaLabel).toBe("Custom Label");
  });
});
