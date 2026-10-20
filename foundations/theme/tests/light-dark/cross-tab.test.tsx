import { fireEvent, render } from "@testing-library/react";

import { LightDarkProvider } from "@/light-dark/Provider";
import { TestComponent } from "./test-component";

describe("Light-Dark Module - cross-tab sync tests", () => {
  it("syncs from localStorage changes correctly", () => {
    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "wondesign-light-dark",
        newValue: JSON.stringify({
          mode: "dark",
          lightTheme: "light",
          darkTheme: "dark",
        }),
        storageArea: localStorage,
      }),
    );

    expect(getByText("Current Mode: dark")).toBeTruthy();
    expect(getByText("Current Color Scheme: dark")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
  });

  it("ignores non local storage events", () => {
    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "some-other-key",
        newValue: JSON.stringify({
          mode: "dark",
          lightTheme: "light",
          darkTheme: "dark",
        }),
        // storageArea intentionally left undefined
      }),
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
  });

  it("ignores storage events with a different key", () => {
    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();

    fireEvent(
      window,
      new StorageEvent("storage", {
        key: "some-other-key",
        newValue: JSON.stringify({
          mode: "dark",
          lightTheme: "light",
          darkTheme: "dark",
        }),
        storageArea: localStorage,
      }),
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
  });
});
