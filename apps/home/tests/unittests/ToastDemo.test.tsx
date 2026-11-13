import { fireEvent, render } from "@testing-library/react";
import { dismissToasts, toast } from "@wondesign/ui/Toast";

import { DismissToastsDemo, ToastDemo } from "@/widgets/preview";

vi.mock("@wondesign/ui/Toast", () => ({
  toast: Object.assign(vi.fn(), {
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
  }),
  dismissToasts: vi.fn(),
}));

describe("ToastDemo", () => {
  it("renders <ToastDemo> and calls default toast correctly", () => {
    const { getByText } = render(
      <ToastDemo label="Show" message="Test Toast" />,
    );

    expect(getByText("Show")).toBeTruthy();
    fireEvent.click(getByText("Show"));
    expect(toast).toHaveBeenCalledWith("Test Toast", expect.any(Object));
  });

  it("calls all toast types correctly", () => {
    const { getByText } = render(
      <>
        <ToastDemo label="Info" message="Test Info Toast" type="info" />
        <ToastDemo
          label="Success"
          message="Test Success Toast"
          type="success"
        />
        <ToastDemo
          label="Warning"
          message="Test Warning Toast"
          type="warning"
        />
        <ToastDemo label="Error" message="Test Error Toast" type="error" />
      </>,
    );

    fireEvent.click(getByText("Info"));
    expect(toast.info).toHaveBeenCalledWith(
      "Test Info Toast",
      expect.any(Object),
    );

    fireEvent.click(getByText("Success"));
    expect(toast.success).toHaveBeenCalledWith(
      "Test Success Toast",
      expect.any(Object),
    );

    fireEvent.click(getByText("Warning"));
    expect(toast.warning).toHaveBeenCalledWith(
      "Test Warning Toast",
      expect.any(Object),
    );

    fireEvent.click(getByText("Error"));
    expect(toast.error).toHaveBeenCalledWith(
      "Test Error Toast",
      expect.any(Object),
    );
  });

  it("renders infinite toast correctly", () => {
    const action = {
      label: "Close",
    };

    const { getByText } = render(
      <ToastDemo
        label="Show"
        message="Test Infinite Toast"
        duration={0}
        action={action}
      />,
    );

    fireEvent.click(getByText("Show"));
    expect(toast).toHaveBeenCalledWith(
      "Test Infinite Toast",
      expect.objectContaining({
        duration: 0,
      }),
    );
  });

  it("renders multiple toasts correctly", () => {
    const { getByText } = render(
      <ToastDemo label="Show" message="Test Toast" count={3} />,
    );

    fireEvent.click(getByText("Show"));
    expect(toast).toHaveBeenCalledTimes(3);
  });

  it("renders <DismissToastsDemo> and calls dismissAll correctly", () => {
    const { getByText } = render(<DismissToastsDemo />);

    fireEvent.click(getByText("Dismiss all"));
    expect(dismissToasts).toHaveBeenCalled();
  });
});
