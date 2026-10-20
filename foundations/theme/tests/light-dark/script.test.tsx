import { renderToStaticMarkup } from "react-dom/server";

import { LightDarkScript } from "@/light-dark/Script";

describe("Light-Dark Module - script tests", () => {
  it("runs script correctly", () => {
    const template = document.createElement("template");
    template.innerHTML = renderToStaticMarkup(<LightDarkScript />);

    const script = template.content.querySelector("script")!;
    expect(script).toBeTruthy();
  });
});
