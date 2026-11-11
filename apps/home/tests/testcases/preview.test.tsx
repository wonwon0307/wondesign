import { fireEvent, render } from "@testing-library/react";
import { showAlert, showConfirm } from "@wondesign/ui/Alert";

import { Preview, AlertDemo } from "@/widgets/preview";

vi.mock("@wondesign/ui/Alert", () => ({
  showAlert: vi.fn(),
  showConfirm: vi.fn(),
}));

describe("preview components", () => {
  it("renders <Preview> correctly", () => {
    const { getByText } = render(
      <Preview>
        <div>Test Content</div>
      </Preview>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("renders <AlertDemo> and calls showAlert correctly", () => {
    const { getByText } = render(
      <AlertDemo
        type="alert"
        label="Test Alert"
        title="Test Title"
        description="Test Description"
      />,
    );

    expect(getByText("Test Alert")).toBeTruthy();

    fireEvent.click(getByText("Test Alert"));
    expect(showAlert).toHaveBeenCalled();
  });

  it("renders <AlertDemo> and calls showConfirm correctly", () => {
    const { getByText } = render(
      <AlertDemo
        type="confirm"
        label="Test Confirm"
        title="Test Title"
        description="Test Description"
        action="success"
      />,
    );

    expect(getByText("Test Confirm")).toBeTruthy();

    fireEvent.click(getByText("Test Confirm"));
    expect(showConfirm).toHaveBeenCalled();
  });

  it("runs a successful action, then the follow-up alert", async () => {
    vi.useFakeTimers();
    vi.mocked(showConfirm).mockImplementation(async (_t, _m, opts) => {
      await opts?.onConfirm?.();
      return true;
    });

    const { getByText } = render(
      <AlertDemo
        type="confirm"
        label="Test Confirm"
        title="Test Title"
        description="Test Description"
        action="success"
        followUp={{ title: "Done", description: "Follow-up Description" }}
      />,
    );

    fireEvent.click(getByText("Test Confirm"));

    await vi.advanceTimersByTimeAsync(2000);

    expect(showAlert).toHaveBeenCalledWith("Done", "Follow-up Description");
  });

  it("rejects when the action fails", async () => {
    vi.useFakeTimers();
    let action!: Promise<void>;
    vi.mocked(showConfirm).mockImplementation(async (_t, _m, opts) => {
      action = Promise.resolve(opts?.onConfirm?.());
      await action;
      return true;
    });

    const { getByText } = render(
      <AlertDemo
        type="confirm"
        label="Test Confirm"
        title="Test Title"
        description="Test Description"
        action="failure"
      />,
    );

    fireEvent.click(getByText("Test Confirm"));

    await vi.advanceTimersByTimeAsync(2000);
    await expect(action).rejects.toThrow();
  });
});
