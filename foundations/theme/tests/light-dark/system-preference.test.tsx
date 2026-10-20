import { act, fireEvent, render } from "@testing-library/react";

import { LightDarkProvider } from "@/light-dark/Provider";
import { TestComponent } from "./test-component";

// jsdom has no matchMedia, so stub one whose dark preference can be flipped
function mockMatchMedia(prefersDark: boolean) {
  const listeners = new Set<() => void>();

  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() {
      return query === "(prefers-color-scheme: dark)" && prefersDark;
    },
    media: query,
    addEventListener: (_type: string, listener: () => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: () => void) => {
      listeners.delete(listener);
    },
  }));

  return {
    listeners,
    setPrefersDark(next: boolean) {
      prefersDark = next;
      listeners.forEach((listener) => listener());
    },
  };
}

describe("Light-Dark Module - system preference tests", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles system preference changes correctly", () => {
    const media = mockMatchMedia(false);
    const { getByText, unmount } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();

    act(() => media.setPrefersDark(true));
    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: dark")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
    expect(document.documentElement.dataset.colorScheme).toBe("dark");

    // An explicit mode overrides the system preference
    fireEvent.click(getByText("Select Light Mode"));
    expect(getByText("Current Color Scheme: light")).toBeTruthy();

    act(() => media.setPrefersDark(false));
    act(() => media.setPrefersDark(true));
    expect(getByText("Current Color Scheme: light")).toBeTruthy();

    unmount();
    expect(media.listeners.size).toBe(0);
  });

  it("gracefully handles stored system + disableSystem", () => {
    localStorage.setItem(
      "wondesign-light-dark",
      JSON.stringify({
        mode: "system",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );

    const { getByText } = render(
      <LightDarkProvider disableSystem>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: light")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "light",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );
    expect(console.warn).not.toHaveBeenCalled();
  });
});
