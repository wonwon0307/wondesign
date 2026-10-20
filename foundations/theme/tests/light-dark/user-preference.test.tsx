import { fireEvent, render } from "@testing-library/react";

import { LightDarkProvider } from "@/light-dark/Provider";
import { TestComponent } from "./test-component";

describe("Light-Dark Module", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("handles mode select correctly", () => {
    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: system")).toBeTruthy();
    expect(getByText("Current Color Scheme: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(getByText("Selected Light Theme: light")).toBeTruthy();
    expect(getByText("Available Light Themes: light")).toBeTruthy();
    expect(getByText("Selected Dark Theme: dark")).toBeTruthy();
    expect(getByText("Available Dark Themes: dark")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBeNull();

    // selecting current mode does nothing to what's being rendered
    // but still updates local storage
    fireEvent.click(getByText("Select System Mode"));
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "system",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );

    fireEvent.click(getByText("Select Dark Mode"));
    expect(getByText("Current Mode: dark")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "dark",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );

    fireEvent.click(getByText("Select Light Mode"));
    expect(getByText("Current Mode: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "light",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );
  });

  it("handles advanced theme selection correctly", () => {
    const { getByText } = render(
      <LightDarkProvider
        themes={{ light: ["light", "light-alt"], dark: ["dark", "dark-alt"] }}
      >
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Available Light Themes: light, light-alt")).toBeTruthy();
    expect(getByText("Available Dark Themes: dark, dark-alt")).toBeTruthy();

    fireEvent.click(getByText("Select light-alt as Light Theme"));
    expect(getByText("Selected Light Theme: light-alt")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "system",
        lightTheme: "light-alt",
        darkTheme: "dark",
      }),
    );

    fireEvent.click(getByText("Select dark-alt as Dark Theme"));
    expect(getByText("Selected Dark Theme: dark-alt")).toBeTruthy();
    expect(localStorage.getItem("wondesign-light-dark")).toBe(
      JSON.stringify({
        mode: "system",
        lightTheme: "light-alt",
        darkTheme: "dark-alt",
      }),
    );
  });

  it("preserves previous user preference", () => {
    localStorage.setItem(
      "wondesign-light-dark",
      JSON.stringify({
        mode: "dark",
        lightTheme: "light",
        darkTheme: "dark",
      }),
    );

    const { getByText } = render(
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>,
    );

    expect(getByText("Current Mode: dark")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
    expect(getByText("Selected Light Theme: light")).toBeTruthy();
  });
});
