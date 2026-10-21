import { renderToStaticMarkup } from "react-dom/server";

import { ThemeScript, type ScriptProps } from "@/custom/Script";

// Render the script as the server would, then run its inline code
function runScript(props: ScriptProps) {
  const template = document.createElement("template");
  template.innerHTML = renderToStaticMarkup(<ThemeScript {...props} />);

  const script = template.content.querySelector("script")!;
  expect(script).toBeTruthy();

  const fn = new Function(script.textContent);
  fn();
}

describe("Custom Theme Module - script tests", () => {
  const root = document.documentElement;

  afterEach(() => {
    localStorage.clear();
    delete root.dataset.theme;
  });

  it("applies the default theme when nothing is stored", () => {
    expect(root.dataset.theme).not.toBeDefined();

    runScript({ defaultTheme: "test" });

    expect(root.dataset.theme).toBe("test");
  });

  it("applies the stored theme", () => {
    localStorage.setItem("wondesign-theme", "forest");

    runScript({ defaultTheme: "ocean" });

    expect(root.dataset.theme).toBe("forest");
  });

  it("reads from the given storage key", () => {
    localStorage.setItem("custom-key", "sunset");

    runScript({ defaultTheme: "ocean", storageKey: "custom-key" });

    expect(root.dataset.theme).toBe("sunset");
  });
});
