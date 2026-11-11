// @vitest-environment node
import { renderToString } from "react-dom/server";

import { Alerter } from "@/Alerter";
import { showAlert, showConfirm } from "@/api";

describe("Alerter - SSR tests", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("silently resolves immediately in the server in production", async () => {
    vi.stubEnv("NODE_ENV", "production");

    await expect(
      showAlert("Test Alert", "This is a test alert"),
    ).resolves.toBeUndefined();
    await expect(
      showConfirm("Test Confirm", "This is a test confirm"),
    ).resolves.toBe(false);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("warns in console in non-production environments", async () => {
    vi.stubEnv("NODE_ENV", "development");

    await showAlert("Test Alert", "This is a test alert");
    await showConfirm("Test Confirm", "This is a test confirm");

    expect(console.warn).toHaveBeenCalledTimes(2);
  });

  it("renders nothing in a server render", () => {
    function TestComponent() {
      showAlert("Title", "Message");
      return <Alerter />;
    }

    expect(renderToString(<TestComponent />)).toBe("");
  });
});
