import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { Alerter } from "@/Alerter";
import { showAlert } from "@/api";
import { dismissAll, respond } from "@/store";

vi.mock("@wondesign/headless/Alert", async (original) => {
  const { Alert } =
    await original<typeof import("@wondesign/headless/Alert")>();

  // coverage를 위해 Backdrop을 Trigger로 대체
  return {
    Alert: Object.assign(Alert, {
      Backdrop: () => <Alert.Trigger>Trigger</Alert.Trigger>,
    }),
  };
});

describe("Alerter - corner cases", () => {
  // COVERAGE PURPOSE
  it("removes the alert when dismissAll has been called", async () => {
    const { getByText, queryByText } = render(
      <div>
        <Alerter />
        <button onClick={() => showAlert("Test Alert", "This is a test alert")}>
          Show Alert
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Alert"));
    expect(getByText("Test Alert")).toBeTruthy();

    act(() => {
      dismissAll();
    });

    await waitFor(() => {
      expect(queryByText("Test Alert")).toBeNull();
    });
  });

  it("does nothing respond is called with a non-existing id", () => {
    const { getByText } = render(
      <div>
        <Alerter />
        <button onClick={() => showAlert("Test Alert", "This is a test alert")}>
          Show Alert
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Alert"));
    expect(getByText("Test Alert")).toBeTruthy();

    act(() => {
      respond(32, false);
    });

    expect(getByText("Test Alert")).toBeTruthy();
  });

  it("does not call closeAlert() when onOpenChange(true) is triggered", () => {
    const { getByText } = render(
      <div>
        <Alerter />
        <button onClick={() => showAlert("Test Alert", "This is a test alert")}>
          Show Alert
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Alert"));
    expect(getByText("Test Alert")).toBeTruthy();

    fireEvent.click(getByText("Trigger"));
    expect(getByText("Test Alert")).toBeTruthy(); // should still be visible
  });
});
