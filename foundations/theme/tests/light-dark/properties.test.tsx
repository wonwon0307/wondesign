import { render } from "@testing-library/react";

import { LightDarkProvider } from "@/light-dark/Provider";
import { TestComponent } from "./test-component";

describe("Light-Dark Module - properties validation", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  describe("production environment", () => {
    beforeEach(() => {
      vi.stubEnv("NODE_ENV", "production");
    });

    it("handles duplicate themes gracefully", () => {
      const { getByText } = render(
        <LightDarkProvider
          themes={{ light: ["light", "light"], dark: ["dark", "dark"] }}
        >
          <TestComponent />
        </LightDarkProvider>,
      );

      expect(getByText("Available Light Themes: light")).toBeTruthy();
      expect(getByText("Available Dark Themes: dark")).toBeTruthy();
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("handles cross duplicates gracefully", () => {
      const { getByText } = render(
        <LightDarkProvider themes={{ light: ["light"], dark: ["light"] }}>
          <TestComponent />
        </LightDarkProvider>,
      );

      expect(getByText("Available Light Themes: light")).toBeTruthy();
      expect(getByText("Available Dark Themes: light")).toBeTruthy();
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("handles defaultMode 'system' with disableSystem gracefully", () => {
      const { getByText } = render(
        <LightDarkProvider disableSystem defaultMode="system">
          <TestComponent />
        </LightDarkProvider>,
      );

      expect(getByText("Current Mode: light")).toBeTruthy();
      expect(getByText("Current Color Scheme: light")).toBeTruthy();
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("non-production environment", () => {
    beforeEach(() => {
      vi.stubEnv("NODE_ENV", "development");
    });

    it("warns on console for duplicate themes", () => {
      const { getByText } = render(
        <LightDarkProvider
          themes={{ light: ["light", "light"], dark: ["dark", "dark"] }}
        >
          <TestComponent />
        </LightDarkProvider>,
      );

      expect(getByText("Available Light Themes: light")).toBeTruthy();
      expect(getByText("Available Dark Themes: dark")).toBeTruthy();
      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Theme] light themes contain duplicate values.",
      );
      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Theme] dark themes contain duplicate values.",
      );
    });

    it("warns on console for cross duplicates", () => {
      const { getByText } = render(
        <LightDarkProvider themes={{ light: ["light"], dark: ["light"] }}>
          <TestComponent />
        </LightDarkProvider>,
      );

      expect(getByText("Available Light Themes: light")).toBeTruthy();
      expect(getByText("Available Dark Themes: light")).toBeTruthy();
      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Theme] some themes are duplicated across light and dark themes.",
      );
    });

    it("warns on console for defaultMode 'system' with disableSystem", () => {
      const { getByText } = render(
        <LightDarkProvider disableSystem defaultMode="system">
          <TestComponent />
        </LightDarkProvider>,
      );

      expect(getByText("Current Mode: light")).toBeTruthy();
      expect(getByText("Current Color Scheme: light")).toBeTruthy();
      expect(console.warn).toHaveBeenCalledWith(
        '[WonDesign Theme] defaultMode "system" is not allowed with disableSystem. Using "light" as the default.',
      );
    });
  });
});
