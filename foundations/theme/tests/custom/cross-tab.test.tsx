import { fireEvent, render } from "@testing-library/react";

import { ThemeProvider } from "@/custom/Provider";
import { TestComponent } from "./test-component";

describe("Custom Theme Module - cross tab sync tests", () => {
  it("handles storage event (cross-tab theme updates) correctly", () => {
    const { getByText } = render(
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");

    // Simulate storage event
    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "wondesign-theme",
        newValue: "test2",
        storageArea: localStorage,
      }),
    );

    expect(getByText("Current Theme: test2")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test2");
  });

  it("ignores non local storage events", () => {
    const { getByText } = render(
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "wondesign-theme",
        newValue: "test2",
        // storageArea intentionally left undefined
      }),
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");
  });

  it("ignores storage events with a different key", () => {
    const { getByText } = render(
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "some-other-key",
        newValue: "test2",
        storageArea: localStorage,
      }),
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");
  });

  it("silently ignores storage events with the same theme", () => {
    const { getByText } = render(
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "wondesign-theme",
        newValue: "test1",
        storageArea: localStorage,
      }),
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");
  });
});
