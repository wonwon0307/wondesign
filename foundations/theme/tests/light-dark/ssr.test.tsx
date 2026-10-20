import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { LightDarkProvider } from "@/light-dark/Provider";
import { TestComponent } from "./test-component";

describe("Light-Dark Module - SSR tests", () => {
  it("applies the theme to the document only after hydration", () => {
    const ui = (
      <LightDarkProvider>
        <TestComponent />
      </LightDarkProvider>
    );

    const container = document.createElement("div");
    container.innerHTML = renderToString(ui);
    document.body.appendChild(container);

    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.colorScheme;

    render(ui, { container, hydrate: true });

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.colorScheme).toBe("light");
  });
});
