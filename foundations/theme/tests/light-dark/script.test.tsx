import { renderToStaticMarkup } from "react-dom/server";

import { LightDarkScript, type ScriptProps } from "@/light-dark/Script";

function mockMatchMedia(prefersDark: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() {
      return query === "(prefers-color-scheme: dark)" && prefersDark;
    },
    media: query,
  }));
}

// Render the script as the server would, then run its inline code
function runScript(props: ScriptProps = {}) {
  const template = document.createElement("template");
  template.innerHTML = renderToStaticMarkup(<LightDarkScript {...props} />);

  const script = template.content.querySelector("script")!;
  expect(script).toBeTruthy();

  const fn = new Function(script.textContent);
  fn();
}

describe("Light-Dark Module - script tests", () => {
  const root = document.documentElement;
  const themes = {
    light: ["light", "paper"],
    dark: ["dark", "midnight"],
  } as const;

  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    localStorage.clear();
    delete root.dataset.theme;
    delete root.dataset.colorScheme;
    root.style.colorScheme = "";
    vi.unstubAllGlobals();
  });

  it("runs script correctly", () => {
    expect(root.dataset.theme).not.toBeDefined();
    expect(root.dataset.colorScheme).not.toBeDefined();

    runScript();

    expect(root.dataset.theme).toBe("light");
    expect(root.dataset.colorScheme).toBe("light");
    expect(root.style.colorScheme).toBe("light");
  });

  it("follows the system preference when nothing is stored", () => {
    mockMatchMedia(true);

    runScript({ themes });

    expect(root.dataset.theme).toBe("dark");
    expect(root.dataset.colorScheme).toBe("dark");
  });

  it("applies the default mode when nothing is stored", () => {
    mockMatchMedia(true);

    runScript({ themes, defaultMode: "light" });

    expect(root.dataset.theme).toBe("light");
    expect(root.dataset.colorScheme).toBe("light");
  });

  it("applies the stored preference", () => {
    localStorage.setItem(
      "wondesign-light-dark",
      JSON.stringify({
        mode: "dark",
        lightTheme: "paper",
        darkTheme: "midnight",
      }),
    );

    runScript({ themes });

    expect(root.dataset.theme).toBe("midnight");
    expect(root.dataset.colorScheme).toBe("dark");
  });

  it("falls back to the first theme when the stored one was removed", () => {
    localStorage.setItem(
      "wondesign-light-dark",
      JSON.stringify({ mode: "light", lightTheme: "sepia", darkTheme: "dark" }),
    );

    runScript({ themes });

    expect(root.dataset.theme).toBe("light");
    expect(root.dataset.colorScheme).toBe("light");
  });

  it("reads from the given storage key", () => {
    localStorage.setItem("custom-key", JSON.stringify({ mode: "dark" }));

    runScript({ storageKey: "custom-key" });

    expect(root.dataset.theme).toBe("dark");
    expect(root.dataset.colorScheme).toBe("dark");
  });

  it("falls back to the default mode when the stored mode is invalid", () => {
    localStorage.setItem(
      "wondesign-light-dark",
      JSON.stringify({ mode: "blue", darkTheme: "midnight" }),
    );

    runScript({ themes, defaultMode: "dark" });

    expect(root.dataset.theme).toBe("midnight");
    expect(root.dataset.colorScheme).toBe("dark");
  });

  it("falls back to the defaults when the stored value is malformed", () => {
    localStorage.setItem("wondesign-light-dark", "{not json");

    runScript({ themes, defaultMode: "dark" });

    expect(root.dataset.theme).toBe("dark");
    expect(root.dataset.colorScheme).toBe("dark");
  });
});
