import { fireEvent, render } from "@testing-library/react";

import { ModalProvider } from "@/Modal/Provider";
import { ModalContent } from "@/Modal/Content";
import { ModalTitle } from "@/Modal/Title";
import { ModalClose } from "@/Modal/Close";
import { ModalTrigger } from "@/Modal/Trigger";
import { TestComponent } from "./test-component";

describe("Modal - properties", () => {
  it("respects the defaultOpen state when set to true", () => {
    const { getByTestId } = render(<TestComponent defaultOpen />);

    const trigger = getByTestId("modal-trigger");
    expect(trigger.dataset.state).toBe("open");

    const content = getByTestId("modal-content");
    expect(content.dataset.state).toBe("open");
  });

  it("respects the disablePortal prop", () => {
    const { getByTestId } = render(<TestComponent isOpen disablePortal />);

    const backdrop = getByTestId("modal-backdrop");
    const content = getByTestId("modal-content");
    expect(content.parentElement).not.toBe(document.body);
    expect(backdrop.parentElement).not.toBe(document.body);
  });

  it("respects the keepMounted prop", () => {
    const { getByTestId } = render(<TestComponent keepMounted />);

    const trigger = getByTestId("modal-trigger");
    expect(trigger.dataset.state).toBe("closed");

    const backdrop = getByTestId("modal-backdrop");
    const content = getByTestId("modal-content");
    expect(backdrop.dataset.state).toBe("closed");
    expect(backdrop.hidden).toBe(true);
    expect(content.dataset.state).toBe("closed");
    expect(content.hidden).toBe(true);

    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    expect(backdrop.dataset.state).toBe("open");
    expect(backdrop.hidden).toBe(false);
    expect(content.dataset.state).toBe("open");
    expect(content.hidden).toBe(false);
  });

  it("respects the disableEscapeKey prop", () => {
    const { getByTestId } = render(<TestComponent disableEscapeKey />);

    const trigger = getByTestId("modal-trigger");
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger.dataset.state).toBe("open");
  });

  it("supports controlled mode", () => {
    const controlledOpen = vi.fn();

    const { getByTestId } = render(
      <TestComponent isOpen onOpenChange={controlledOpen} />,
    );

    const trigger = getByTestId("modal-trigger");
    fireEvent.click(trigger);
    expect(controlledOpen).toHaveBeenCalledWith(true);

    const closeButton = getByTestId("modal-close");
    fireEvent.click(closeButton);
    expect(controlledOpen).toHaveBeenCalledWith(false);
  });

  it("supports the asChild props", () => {
    const { getByTestId, getByText } = render(
      <ModalProvider>
        <ModalContent asChild data-testid="modal-content">
          <div>
            <ModalTitle asChild>
              <h4>Modal Title</h4>
            </ModalTitle>
            <ModalClose asChild>
              <button>Close</button>
            </ModalClose>
          </div>
        </ModalContent>
        <ModalTrigger asChild>
          <button>Open Modal</button>
        </ModalTrigger>
      </ModalProvider>,
    );

    const trigger = getByText("Open Modal");
    expect(trigger.dataset.state).toBe("closed");
    fireEvent.click(trigger);
    expect(trigger.dataset.state).toBe("open");

    const content = getByTestId("modal-content");
    expect(content.dataset.state).toBe("open");
    expect(content.tagName).toBe("DIV"); // instead of dialog

    const title = getByText("Modal Title");
    expect(title.tagName).toBe("H4");

    const close = getByText("Close");
    fireEvent.click(close);
    expect(trigger.dataset.state).toBe("closed");
  });
});
