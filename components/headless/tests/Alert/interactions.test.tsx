import { fireEvent, render } from "@testing-library/react";

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

  it("should close on escape key press", () => {
    const { getByTestId } = render(<TestComponent>Test</TestComponent>);

    const trigger = getByTestId("alert-trigger");

    // initial state
    expect(trigger.dataset.state).toBe("closed");

    // do nothing
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(trigger.dataset.state).toBe("closed"); // should still be closed

    // open the alert
    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open"); // should be open after click

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(trigger.dataset.state).toBe("closed"); // should be closed after escape key press
  });

  it("should NOT close on outside clicks", () => {
    const { getByTestId } = render(<TestComponent>Test</TestComponent>);

    const trigger = getByTestId("alert-trigger");
    fireEvent.click(trigger);

    fireEvent.mouseDown(document);
    fireEvent.mouseUp(document);
    fireEvent.click(document);
    expect(trigger.dataset.state).toBe("open"); // should stay open
  });

  it("should focus on the content itself, if no focusable element is in the content", () => {
    const { getByTestId } = render(<TestComponent>Test</TestComponent>);

    const trigger = getByTestId("alert-trigger");

    fireEvent.click(trigger);
    const content = getByTestId("alert-content");
    expect(document.activeElement).toBe(content);
  });
});
