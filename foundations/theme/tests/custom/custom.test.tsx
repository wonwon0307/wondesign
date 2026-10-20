import { fireEvent, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { ThemeProvider } from "@/custom/Provider";
import { TestComponent } from "./test-component";

describe("Custom Theme Module", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("applies the theme to the document only after hydration", () => {
    const ui = (
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>
    );

    const container = document.createElement("div");
    container.innerHTML = renderToString(ui);
    document.body.appendChild(container);

    delete document.documentElement.dataset.theme;

    render(ui, { container, hydrate: true });

    expect(document.documentElement.dataset.theme).toBe("test1");
  });

  it("renders and handles theme updates correctly", () => {
    const { getByText } = render(
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(getByText("Available Themes: test1, test2")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");
    expect(localStorage.getItem("wondesign-theme")).toBeNull();

    fireEvent.click(getByText("Set test2 Theme"));
    expect(getByText("Current Theme: test2")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test2");
    expect(localStorage.getItem("wondesign-theme")).toBe("test2");
  });

  it("preserves user choice if data exists in local storage", () => {
    localStorage.setItem("wondesign-theme", "test2");

    const { getByText } = render(
      <ThemeProvider themes={["test1", "test2"]}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme: test2")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test2");
    expect(localStorage.getItem("wondesign-theme")).toBe("test2");
  });

  it("handles developer set defaultTheme and storageKey correctly", () => {
    localStorage.setItem("wondesign-theme", "test2");

    const { getByText } = render(
      <ThemeProvider
        themes={["test1", "test2"]}
        defaultTheme="test2"
        storageKey="custom-storage-key"
      >
        <TestComponent />
      </ThemeProvider>,
    );

    // ignores local storage because key is different
    expect(getByText("Current Theme: test2")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test2");

    expect(localStorage.getItem("custom-storage-key")).toBeNull();

    fireEvent.click(getByText("Set test1 Theme"));
    expect(getByText("Current Theme: test1")).toBeTruthy();
    expect(document.documentElement.dataset.theme).toBe("test1");
    expect(localStorage.getItem("custom-storage-key")).toBe("test1");
  });
});
