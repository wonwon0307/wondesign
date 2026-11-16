import { fireEvent, render } from "@testing-library/react";

import { ModalProvider } from "@/Modal/Provider";
import { ModalContent } from "@/Modal/Content";
import { ModalTitle } from "@/Modal/Title";
import { TestComponent } from "./test-component";

describe("Modal - aria attributes", () => {
  it("should have appropriate aria attributes", () => {
    const { getByTestId } = render(<TestComponent />);

    const trigger = getByTestId("modal-trigger");
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");

    fireEvent.click(trigger);

    const content = getByTestId("modal-content");
    const title = getByTestId("modal-title");

    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.hidden).toBe(false);
    expect(content.tabIndex).toBe(-1);
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(content.getAttribute("aria-label")).toBeNull();
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
  });

  it("should apply default aria-label when title is not provided", () => {
    const { getByText } = render(
      <ModalProvider isOpen>
        <ModalContent>Content</ModalContent>
      </ModalProvider>,
    );
    const content = getByText("Content");
    expect(content.getAttribute("aria-label")).toBe("Modal");
  });

  it("should apply custom aria-label when provided", () => {
    const { getByText } = render(
      <ModalProvider isOpen>
        <ModalContent aria-label="Custom Label">Content</ModalContent>
      </ModalProvider>,
    );
    const content = getByText("Content");
    expect(content.getAttribute("aria-label")).toBe("Custom Label");
  });

  it("should not apply custom aria-label when title is provided", () => {
    const { getByTestId, getByText } = render(
      <ModalProvider isOpen>
        <ModalContent aria-label="Custom Label" data-testid="modal-content">
          <ModalTitle>Title</ModalTitle>
          Content
        </ModalContent>
      </ModalProvider>,
    );
    const content = getByTestId("modal-content");
    const title = getByText("Title");
    expect(content.getAttribute("aria-label")).toBeNull();
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
  });
});
