import { render } from "@testing-library/react";

import { AlertProvider } from "@/Alert/Provider";
import { AlertBackdrop } from "@/Alert/Backdrop";
import { AlertContent } from "@/Alert/Content";
import { AlertClose } from "@/Alert/Close";
import { AlertTitle } from "@/Alert/Title";
import { AlertMessage } from "@/Alert/Message";
import { AlertTrigger } from "@/Alert/Trigger";
import { useAlert } from "@/Alert/contexts";

describe("Alert - contexts", () => {
  it("calls useAlert inside the provider", () => {
    const TestComponent = () => {
      const context = useAlert();
      return <div>{context ? "has context" : "no context"}</div>;
    };

    const { getByText } = render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>,
    );

    expect(getByText("has context")).toBeTruthy();
  });

  it("should raise an error if Alert.Content is used outside of the provider", () => {
    expect(() => render(<AlertContent>Test</AlertContent>)).toThrow(
      "[WonDesign Headless] useAlert() must be used within the Alert Provider.",
    );
  });

  it("should raise an error if Alert.Title is used outside of Alert.Content", () => {
    expect(() =>
      render(
        <AlertProvider>
          <AlertTitle>Test</AlertTitle>
        </AlertProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] AlertTitle must be used within AlertContent.",
    );
  });

  it("should raise an error if Alert.Message is used outside of Alert.Content", () => {
    expect(() =>
      render(
        <AlertProvider>
          <AlertMessage>Test</AlertMessage>
        </AlertProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] AlertMessage must be used within AlertContent.",
    );
  });

  it("should raise an error if Alert.Close is used outside of Alert.Content", () => {
    expect(() =>
      render(
        <AlertProvider>
          <AlertClose>Test</AlertClose>
        </AlertProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] AlertClose must be used within AlertContent.",
    );
  });

  it("should warn on console if Alert.Trigger or Alert.Backdrop is used inside Alert.Content", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <AlertProvider isOpen>
        <AlertContent>
          <AlertTrigger>Trigger</AlertTrigger>
          <AlertBackdrop />
        </AlertContent>
      </AlertProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Headless] AlertTrigger should be rendered outside of AlertContent.",
    );
    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Headless] AlertBackdrop should be rendered outside of AlertContent.",
    );

    vi.restoreAllMocks();
  });
});
