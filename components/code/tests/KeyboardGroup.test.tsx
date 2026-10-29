import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { KeyboardGroup } from "@/KeyboardGroup";

describe("KeyboardGroup", () => {
  it("renders normal shortkey correctly", () => {
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

  it("renders shortkey with modifiers correctly", () => {
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

  it("renders shortkey with modifiers in apple platform correctly", () => {
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

    Object.defineProperty(window.navigator, "platform", {
      value: "",
      writable: true,
    });
  });

  it("renders nothing for a shortkey with modifiers before hydration", () => {
    expect(renderToString(<KeyboardGroup shortkey="Mod+K" />)).toBe("");
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
