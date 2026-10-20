import { renderToStaticMarkup } from "react-dom/server";

import { LightDarkScript } from "@/light-dark/Script";

vi.stubGlobal("matchMedia", (query: string) => ({
  get matches() {
    return query === "(prefers-color-scheme: dark)" && false;
  },
  media: query,
}));

describe("Light-Dark Module - script tests", () => {
  it("runs script correctly", () => {
    const template = document.createElement("template");
    template.innerHTML = renderToStaticMarkup(<LightDarkScript />);

    const script = template.content.querySelector("script")!;
    expect(script).toBeTruthy();

    expect(document.documentElement.dataset.theme).not.toBeDefined();
    expect(document.documentElement.dataset.colorScheme).not.toBeDefined();

    const fn = new Function(script.textContent);
    fn();

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.colorScheme).toBe("light");
  });
});
