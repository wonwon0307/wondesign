import { fireEvent, render } from "@testing-library/react";

import { ThemeProvider } from "@/custom/Provider";
import { createStore } from "@/custom/store";
import { TestComponent } from "./test-component";

describe("Custom Theme Module - corner cases", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  describe("production environment", () => {
    beforeEach(() => {
      vi.stubEnv("NODE_ENV", "production");
    });

    it("handles duplicate themes array gracefully", () => {
      const { getByText } = render(
        <ThemeProvider themes={["test1", "test1", "test2"]}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(document.documentElement.dataset.theme).toBe("test1");
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("handles non-existing default theme gracefully", () => {
      const { getByText } = render(
        <ThemeProvider themes={["test1", "test2"]} defaultTheme="non-existing">
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(document.documentElement.dataset.theme).toBe("test1");
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("handles non-existing theme select gracefully", () => {
      const { getByText } = render(
        <ThemeProvider themes={["test1", "test2"]}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(document.documentElement.dataset.theme).toBe("test1");

      fireEvent.click(getByText("Set Non-Existing Theme"));
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("non-production environment", () => {
    beforeEach(() => {
      vi.stubEnv("NODE_ENV", "development");
    });

    it("warns when there are duplicate themes in the array", () => {
      const { getByText } = render(
        <ThemeProvider themes={["test1", "test1", "test2"]}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(document.documentElement.dataset.theme).toBe("test1");
      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Theme] themes contains duplicate values.",
      );
    });

    it("warns when the default theme does not exist in the themes array", () => {
      const { getByText } = render(
        <ThemeProvider themes={["test1", "test2"]} defaultTheme="non-existing">
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(document.documentElement.dataset.theme).toBe("test1");
      expect(console.warn).toHaveBeenCalledWith(
        '[WonDesign Theme] defaultTheme "non-existing" is not included in themes. ' +
          'Using "test1" as the default.',
      );
    });

    it("warns when selecting a non-existing theme", () => {
      const { getByText } = render(
        <ThemeProvider themes={["test1", "test2"]}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(document.documentElement.dataset.theme).toBe("test1");

      fireEvent.click(getByText("Set Non-Existing Theme"));
      expect(console.warn).toHaveBeenCalledWith(
        '[WonDesign Theme] Unknown theme: "non-existing".',
      );
    });
  });

  describe("store subscriptions", () => {
    it("removes a stale stored theme on first subscribe", () => {
      localStorage.setItem("wondesign-theme", "removed-theme");

      const { getByText } = render(
        <ThemeProvider themes={["test1", "test2"]}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByText("Current Theme: test1")).toBeTruthy();
      expect(localStorage.getItem("wondesign-theme")).toBeNull();
    });

    it("keeps listening to storage events until the last subscriber leaves", () => {
      const store = createStore(["test1", "test2"], "test1", "store-key");
      const first = vi.fn();
      const second = vi.fn();

      const dispatch = (newValue: string) =>
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "store-key",
            newValue,
            storageArea: localStorage,
          }),
        );

      const unsubscribeFirst = store.subscribe(first);
      const unsubscribeSecond = store.subscribe(second);

      dispatch("test2");
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);

      unsubscribeFirst();
      dispatch("test1");
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(2);

      unsubscribeSecond();
      dispatch("test2");
      expect(second).toHaveBeenCalledTimes(2);
      expect(store.getTheme()).toBe("test1");
    });
  });

  it("throws when useTheme is used outside of a ThemeProvider", () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      "[WonDesign Theme] useTheme() must be used within a ThemeProvider",
    );
  });
});
