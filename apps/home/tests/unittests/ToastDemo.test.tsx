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

function createClickEvent() {
  return {
    preventDefault: vi.fn(),
  } as unknown as React.MouseEvent<HTMLButtonElement> & {
    preventDefault: ReturnType<typeof vi.fn>;
  };
}

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

  it("renders infinite toast with action correctly", () => {
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

    const options = vi.mocked(toast).mock.calls[0][1];
    options?.action?.onClick?.(createClickEvent());
    expect(toast).toHaveBeenCalledTimes(1);
  });

  it("keeps the toast open and shows an error on the first press only", () => {
    const { getByText } = render(
      <ToastDemo
        label="Show"
        message="Test Toast"
        action={{
          label: "Undo",
          followUp: { message: "Restored", type: "success" },
          failFirst: "Couldn't restore",
        }}
      />,
    );

    fireEvent.click(getByText("Show"));
    const onClick = vi.mocked(toast).mock.calls[0][1]?.action?.onClick;

    // first press fails
    const firstPress = createClickEvent();
    onClick?.(firstPress);
    expect(firstPress.preventDefault).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Couldn't restore");
    expect(toast.success).not.toHaveBeenCalled();

    // second press succeeds
    const secondPress = createClickEvent();
    onClick?.(secondPress);
    expect(secondPress.preventDefault).not.toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Restored", undefined);
  });

  it("shows a default follow-up toast when the action is pressed", () => {
    const { getByText } = render(
      <ToastDemo
        label="Show"
        message="Test Toast"
        action={{ label: "Undo", followUp: { message: "Undone" } }}
      />,
    );

    fireEvent.click(getByText("Show"));
    const options = vi.mocked(toast).mock.calls[0][1];
    expect(options?.action?.variant).toBe("secondary");

    options?.action?.onClick?.(createClickEvent());
    expect(toast).toHaveBeenLastCalledWith("Undone", undefined);
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
