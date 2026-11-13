import { render } from "@testing-library/react";

import { showToast } from "@/base/api";
import { toast } from "@/api";
import { Toaster } from "@/Toaster";

vi.mock("@wondesign/headless/Toast", () => ({
  ToastArea: () => <div>Toast Area</div>,
}));

describe("Toast - corner cases", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.useRealTimers();
  });

  describe("Toaster", () => {
    it("should warn on console if maxToasts is a negative number", () => {
      vi.stubEnv("NODE_ENV", "development");

      const { queryByText } = render(<Toaster maxToasts={-1} />);

      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Toast] maxToasts must be greater than 0. No toasts will be shown.",
      );
      // should render nothing
      expect(queryByText("Toast Area")).toBeNull();
    });

    it("should warn on console if maxToasts is 0", () => {
      vi.stubEnv("NODE_ENV", "development");

      const { queryByText } = render(<Toaster maxToasts={0} />);

      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Toast] maxToasts must be greater than 0. No toasts will be shown.",
      );
      // should render nothing
      expect(queryByText("Toast Area")).toBeNull();
    });

    it("should not warn on console in production", () => {
      vi.stubEnv("NODE_ENV", "production");

      render(<Toaster maxToasts={-1} />);

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("API", () => {
    it("calls the base showToast directly", () => {
      showToast("Test toast");
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("warns on console if API is called with an invalid duration value", () => {
      vi.stubEnv("NODE_ENV", "development");

      toast("Test toast", { duration: -1 });

      expect(console.warn).toHaveBeenCalledWith(
        "[WonDesign Toast] The duration for a Toast must be 0 (infinite) or greater. Ignoring toast...",
      );
    });

    it("does not warn on console in production for invalid duration", () => {
      vi.stubEnv("NODE_ENV", "production");

      toast("Test toast", { duration: -1 });

      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});
