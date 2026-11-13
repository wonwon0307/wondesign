// @vitest-environment node
import { renderToString } from "react-dom/server";
import { toast } from "@/api";

import { Toaster } from "@/Toaster";

vi.mock("@wondesign/headless/Toast", () => ({
  ToastArea: () => <div>Toast Area</div>,
}));

describe("Toast - SSR tests", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("should warn in console when toast is called in the server in non-production environment", () => {
    vi.stubEnv("NODE_ENV", "development");

    toast("Test toast");

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Toast] A Toast cannot be shown in a non-browser environment. Ignoring toast...",
    );
  });

  it("silently ignore toast calls in the server in production environment", () => {
    vi.stubEnv("NODE_ENV", "production");

    toast("Test toast");

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("renders the toast area in the server environment", () => {
    const html = renderToString(<Toaster />);
    expect(html).toContain("Toast Area");
  });
});
