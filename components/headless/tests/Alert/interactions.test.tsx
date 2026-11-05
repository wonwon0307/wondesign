import { fireEvent, render, waitFor } from "@testing-library/react";

import { AlertClose } from "@/Alert/Close";
import { TestComponent } from "./test-component";

describe("Alert - interactions", () => {
  it("should open and close the alert", () => {
    const { getByTestId, getByText } = render(
      <TestComponent>
        <AlertClose>Close</AlertClose>
      </TestComponent>,
    );

    const trigger = getByTestId("alert-trigger");
    expect(trigger.dataset.state).toBe("closed");
    expect(trigger.closest("[inert]")).toBeNull();
    // set overflow for testing
    document.documentElement.style.overflowX = "auto";
    document.documentElement.style.overflowY = "auto";

    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    // 열리면 focus가 이동해야 한다
    const closeButton = getByText("Close");
    expect(document.activeElement).toBe(closeButton);

    // background가 inert 상태가 되고, scroll이 막혀야 한다
    expect(trigger.closest("[inert]")).not.toBeNull();
    expect(document.documentElement.style.overflowX).toBe("hidden");
    expect(document.documentElement.style.overflowY).toBe("hidden");

    fireEvent.click(closeButton);
    expect(trigger.dataset.state).toBe("closed");
    // 닫히면 focus가 trigger로 돌아가야 한다
    expect(document.activeElement).toBe(trigger);
    expect(trigger.closest("[inert]")).toBeNull();
    expect(document.documentElement.style.overflowX).toBe("auto");
    expect(document.documentElement.style.overflowY).toBe("auto");
  });

  it("should call the onClose callback when the alert is closed", () => {
    const onClose = vi.fn();

    const { getByTestId, getByText } = render(
      <TestComponent>
        <AlertClose onClose={onClose}>Close</AlertClose>
      </TestComponent>,
    );

    const trigger = getByTestId("alert-trigger");
    fireEvent.click(trigger);

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
    expect(trigger.dataset.state).toBe("closed");
  });

  it("should call async onClose when the alert is closed", async () => {
    const onClose = vi.fn(() => Promise.resolve());

    const { getByTestId, getByText } = render(
      <TestComponent keepMounted>
        <AlertClose onClose={onClose}>Confirm</AlertClose>
        <AlertClose onClose={onClose}>Close</AlertClose>
      </TestComponent>,
    );

    const content = getByTestId("alert-content");
    const trigger = getByTestId("alert-trigger");
    const confirmButton = getByText("Confirm");
    const closeButton = getByText("Close");

    fireEvent.click(trigger);
    fireEvent.click(confirmButton);
    expect(onClose).toHaveBeenCalled();
    expect(confirmButton.dataset.disabled).toBe("true");
    expect(closeButton.dataset.disabled).toBe("true");
    expect(content.dataset.pending).toBe("true");
    expect(content.getAttribute("aria-busy")).toBe("true");

    await waitFor(() => {
      expect(trigger.dataset.state).toBe("closed");
      expect(confirmButton.dataset.disabled).toBeUndefined();
      expect(closeButton.dataset.disabled).toBeUndefined();
      expect(content.dataset.pending).toBeUndefined();
      expect(content.getAttribute("aria-busy")).toBeFalsy();
    });
  });

  it("should not close if async onClose rejects", async () => {
    const onClose = vi.fn(() => Promise.reject());

    const { getByTestId, getByText } = render(
      <TestComponent>
        <AlertClose onClose={onClose}>Close</AlertClose>
      </TestComponent>,
    );

    const trigger = getByTestId("alert-trigger");
    fireEvent.click(trigger);

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
    expect(closeButton.dataset.disabled).toBe("true");

    await waitFor(() => {
      expect(closeButton.dataset.disabled).toBeUndefined();
    });
    expect(trigger.dataset.state).toBe("open");
  });

  it("should focus on the content itself, if no focusable element is in the content", () => {
    const { getByTestId } = render(<TestComponent>Test</TestComponent>);

    const trigger = getByTestId("alert-trigger");

    fireEvent.click(trigger);
    const content = getByTestId("alert-content");
    expect(document.activeElement).toBe(content);
  });

  it("should NOT close on escape key or outside clicks", () => {
    const { getByTestId } = render(<TestComponent>Test</TestComponent>);

    const trigger = getByTestId("alert-trigger");
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(trigger.dataset.state).toBe("open"); // should stay open

    fireEvent.mouseDown(document);
    fireEvent.mouseUp(document);
    fireEvent.click(document);
    expect(trigger.dataset.state).toBe("open"); // should stay open
  });
});
