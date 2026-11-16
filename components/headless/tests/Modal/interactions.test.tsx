import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ModalProvider } from "@/Modal/Provider";
import { ModalContent } from "@/Modal/Content";
import { ModalTrigger } from "@/Modal/Trigger";
import { TestComponent } from "./test-component";

describe("Modal - interactions", () => {
  it("should open on trigger click and close on close button click", () => {
    const { getByTestId, getByText } = render(
      <div data-testid="outside-element">
        <TestComponent />
      </div>,
    );

    const trigger = getByText("Open Modal");
    expect(trigger.dataset.state).toBe("closed");

    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    const closeButton = getByText("Close");
    // focus should be moved to close button
    expect(document.activeElement).toBe(closeButton);
    // anything in the background should become inert and not scrollable
    const outsideElement = getByTestId("outside-element");
    expect(outsideElement.closest("[inert]")).toBeTruthy();
    expect(document.documentElement.style.overflowX).toBe("hidden");
    expect(document.documentElement.style.overflowY).toBe("hidden");

    fireEvent.click(closeButton);
    expect(trigger.dataset.state).toBe("closed");
    // focus should be moved back to trigger after closing
    expect(document.activeElement).toBe(trigger);

    // anything in the background should no longer be inert and scrollable
    expect(outsideElement.closest("[inert]")).toBeFalsy();
    expect(document.documentElement.style.overflowX).toBe("");
    expect(document.documentElement.style.overflowY).toBe("");
  });

  it("should call onClick before closing the modal", () => {
    const onClick = vi.fn();

    const { getByText } = render(<TestComponent onClick={onClick} />);

    const trigger = getByText("Open Modal");
    fireEvent.click(trigger);

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(onClick).toHaveBeenCalled();
    expect(trigger.dataset.state).toBe("closed");
  });

  it("should not close the modal on close button if defaultPrevented", () => {
    const onClick = vi.fn((e) => e.preventDefault());

    const { getByText } = render(<TestComponent onClick={onClick} />);

    const trigger = getByText("Open Modal");
    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(onClick).toHaveBeenCalled();
    expect(trigger.dataset.state).toBe("open");
  });

  it("should close the modal on Esc key press", () => {
    const { getByText } = render(<TestComponent />);

    const trigger = getByText("Open Modal");
    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(trigger.dataset.state).toBe("closed");
  });

  it("should close the modal on outside click", () => {
    const { getByText } = render(<TestComponent />);

    const trigger = getByText("Open Modal");
    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    const title = getByText("Modal Title");
    // 안쪽 클릭은 꺼지면 안된다
    fireEvent.pointerDown(title);
    fireEvent.pointerUp(title);
    expect(trigger.dataset.state).toBe("open");

    fireEvent.pointerDown(document);
    fireEvent.pointerUp(document);
    expect(trigger.dataset.state).toBe("closed");
  });

  it("should focus on the content itself, if no focusable elemens is in the content", () => {
    const { getByText } = render(
      <ModalProvider>
        <ModalContent>Content</ModalContent>
        <ModalTrigger>Trigger</ModalTrigger>
      </ModalProvider>,
    );

    const trigger = getByText("Trigger");
    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    const content = getByText("Content");
    expect(document.activeElement).toBe(content);

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(document.activeElement).toBe(trigger);
  });

  it("should trap the focus within the modal", async () => {
    const user = userEvent.setup();

    const { getByTestId } = render(
      <TestComponent isOpen>
        <input type="checkbox" data-testid="modal-checkbox" />
      </TestComponent>,
    );

    const checkbox = getByTestId("modal-checkbox");
    const closeButton = getByTestId("modal-close");
    expect(document.activeElement).toBe(checkbox);

    await user.tab();
    expect(document.activeElement).toBe(closeButton);
    await user.tab();
    expect(document.activeElement).toBe(checkbox);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(closeButton);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(checkbox);
  });
});
