import { fireEvent, render } from "@testing-library/react";

import { LightDarkProvider } from "@/light-dark/Provider";
import { createStore } from "@/light-dark/store";
import { TestComponent } from "./test-component";

describe("Light-Dark Module - corner case tests", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  it("gracefully handles invalid selects in production environment", () => {
    vi.stubEnv("NODE_ENV", "production");

    const { getByText } = render(
      <LightDarkProvider disableSystem>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: light")).toBeTruthy();
    expect(getByText("Selected Light Theme: light")).toBeTruthy();
    expect(getByText("Selected Dark Theme: dark")).toBeTruthy();

    fireEvent.click(getByText("Select System Mode"));
    fireEvent.click(getByText("Select Invalid Light Theme"));
    fireEvent.click(getByText("Select Invalid Dark Theme"));

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("warns invalid selects on console in non-production environment", () => {
    vi.stubEnv("NODE_ENV", "development");

    const { getByText } = render(
      <LightDarkProvider disableSystem>
        <TestComponent />
      </LightDarkProvider>,
    );

    fireEvent.click(getByText("Select System Mode"));
    fireEvent.click(getByText("Select Invalid Light Theme"));
    fireEvent.click(getByText("Select Invalid Dark Theme"));

    expect(console.warn).toHaveBeenCalledTimes(3);
  });

  it("keeps listening to storage events until the last subscriber is removed", () => {
    const store = createStore({
      themes: { light: ["light"], dark: ["dark"] },
      defaultMode: "system",
      disableSystem: false,
      storageKey: "store-key",
    });
    const first = vi.fn();
    const second = vi.fn();

    const dispatch = (mode: string) =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "store-key",
          newValue: JSON.stringify({ mode }),
          storageArea: localStorage,
        }),
      );

    const unsubscribeFirst = store.subscribe(first);
    const unsubscribeSecond = store.subscribe(second);

    dispatch("dark");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    unsubscribeFirst();
    dispatch("light");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(2);

    unsubscribeSecond();
    dispatch("dark");
    expect(second).toHaveBeenCalledTimes(2);
    expect(store.getPreference().mode).toBe("light");
  });

  it("overrides a stale stored theme on first subscribe", () => {
    localStorage.setItem("wondesign-light-dark", "invalid-value");

    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "system",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );
  });

  it("gracefully handles storage read failure", () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => {
        throw new Error("Failed to read from localStorage");
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });

    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
  });

  it("throws when useLightDark is used outside of a provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "[WonDesign Theme] useLightDark() must be used within a LightDarkProvider",
    );
  });
});
