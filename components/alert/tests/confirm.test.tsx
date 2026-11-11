import { fireEvent, render, waitFor } from "@testing-library/react";

import { Alerter } from "@/Alerter";
import { showConfirm } from "@/api";
import * as store from "@/store";

describe("Alerter - onConfirm tests", () => {
  it("handles synchronous onConfirm correctly", async () => {
    const onConfirm = vi.fn();

    const { getByText } = render(
      <div>
        <Alerter />
        <button
          onClick={() =>
            showConfirm("Test Confirm", "This is a test confirm", {
              onConfirm,
            })
          }
        >
          Show Confirm
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Confirm"));
    expect(getByText("Test Confirm")).toBeTruthy();

    fireEvent.click(getByText("OK"));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  it("handles successful async onConfirm correctly", async () => {
    vi.spyOn(store, "respond");
    let resolve = () => {};
    const onConfirm = vi.fn(
      () =>
        new Promise<void>((res) => {
          resolve = res;
        }),
    );
    const onConfirmError = vi.fn();

    const { getByText, queryByText } = render(
      <div>
        <Alerter />
        <button
          onClick={() =>
            showConfirm("Test Confirm", "This is a test confirm", {
              onConfirm,
              onConfirmError,
            })
          }
        >
          Show Confirm
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Confirm"));
    expect(getByText("Test Confirm")).toBeTruthy();

    fireEvent.click(getByText("OK"));

    // button clicks while onConfirm is pending are ignored
    fireEvent.click(getByText("OK"));
    expect(store.respond).not.toHaveBeenCalled();
    fireEvent.click(getByText("Cancel"));
    expect(store.respond).not.toHaveBeenCalled();

    // Esc key press should be ignored as well
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(store.respond).not.toHaveBeenCalled();

    resolve();

    await waitFor(() => {
      expect(queryByText("Test Confirm")).toBeNull();
    });

    expect(onConfirm).toHaveBeenCalled();
    expect(onConfirmError).not.toHaveBeenCalled();
  });

  it("handles failed async onConfirm correctly", async () => {
    const onConfirm = vi.fn(() => Promise.reject());
    const onConfirmError = vi.fn();

    const { getByText } = render(
      <div>
        <Alerter />
        <button
          onClick={() =>
            showConfirm("Test Confirm", "This is a test confirm", {
              onConfirm,
              onConfirmError,
            })
          }
        >
          Show Confirm
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Confirm"));
    expect(getByText("Test Confirm")).toBeTruthy();

    fireEvent.click(getByText("OK"));

    await waitFor(() => {
      expect(onConfirmError).toHaveBeenCalled();
    });

    expect(onConfirm).toHaveBeenCalled();
    expect(getByText("Test Confirm")).toBeTruthy(); // should still be open
  });
});
