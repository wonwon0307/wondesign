import { fireEvent, render, waitFor } from "@testing-library/react";

import { CodeWindow } from "@/CodeWindow/CodeWindow";
import { CodeWindowBody } from "@/CodeWindow/fragments/Body";

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: vi.fn() },
  configurable: true,
});

describe("CodeWindow - corner cases", () => {
  it("logs and keeps default state when clipboard copy fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("denied");
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(error);

    const { findByLabelText, getByLabelText } = render(
      <CodeWindow code="const a = 1;" lang="javascript" />,
    );

    const copyButton = await findByLabelText("Copy code");

    fireEvent.click(copyButton);
    await waitFor(() => {
      expect(getByLabelText("Copy code")).toBeTruthy();
    });

    expect(consoleError).toHaveBeenCalledWith(
      "[WonDesign Code] CodeWindowCopyButton: copy failed",
      error,
    );

    consoleError.mockRestore();
  });

  it("throws if fragment is used outside the wrapper", () => {
    expect(() => render(<CodeWindowBody />)).toThrow(
      "[WonDesign Code] useCodeWindow() must be used within a CodeWindowWrapper.",
    );
  });
});
