import { renderToStaticMarkup } from "react-dom/server";

import { ThemeScript } from "@/custom/Script";

describe("Custom Theme Module - script tests", () => {
  it("applies the default theme when nothing is stored", () => {
    const template = document.createElement("template");
    template.innerHTML = renderToStaticMarkup(
      <ThemeScript defaultTheme="test" />,
    );

    const script = template.content.querySelector("script")!;
    expect(script).toBeTruthy();
  });
});
