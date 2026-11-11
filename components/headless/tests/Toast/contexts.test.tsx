import { act, render } from "@testing-library/react";

import { ToastArea } from "@/Toast/Area";
import { Toast } from "@/Toast/Toast";
import { ToastTitle } from "@/Toast/Title";
import { ToastMessage } from "@/Toast/Message";
import { ToastClose } from "@/Toast/Close";
import { useToast } from "@/Toast/contexts";

describe("Toast - contexts", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls useToast inside a Toast component", () => {
    const TestComponent = () => {
      const context = useToast();
      return <div>{context ? "Has context" : "No context"}</div>;
    };

    const { getByText } = render(
      <ToastArea>
        <Toast defaultOpen>
          <TestComponent />
        </Toast>
      </ToastArea>,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Has context")).toBeTruthy();
  });

  it("throws when Toast is used outside of ToastArea", () => {
    expect(() => render(<Toast defaultOpen>Test</Toast>)).toThrow(
      "[WonDesign Headless] a Toast component must be rendered inside a ToastArea.",
    );
  });

  it("throws when Toast.Title is used outside of Toast", () => {
    expect(() =>
      render(
        <ToastArea>
          <ToastTitle>Title</ToastTitle>
        </ToastArea>,
      ),
    ).toThrow(
      "[WonDesign Headless] ToastTitle must be used within a Toast component.",
    );
  });

  it("throws when Toast.Message is used outside of Toast", () => {
    expect(() =>
      render(
        <ToastArea>
          <ToastMessage>Message</ToastMessage>
        </ToastArea>,
      ),
    ).toThrow(
      "[WonDesign Headless] ToastMessage must be used within a Toast component.",
    );
  });

  it("throws when Toast.Close is used outside of Toast", () => {
    expect(() =>
      render(
        <ToastArea>
          <ToastClose>Close</ToastClose>
        </ToastArea>,
      ),
    ).toThrow(
      "[WonDesign Headless] ToastClose must be used within a Toast component.",
    );
  });

  it("throws when useToast() is called outside of Toast", () => {
    const TestComponent = () => {
      useToast();
      return <div>Test</div>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "[WonDesign Headless] useToast() must be used within a Toast component.",
    );
  });
});
