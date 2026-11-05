import { render } from "@testing-library/react";

import { AlertProvider } from "@/Alert/Provider";
import { AlertContent } from "@/Alert/Content";
import { TestComponent } from "./test-component";

describe("Alert - aria attributes", () => {
  it("should have correct aria attributes", () => {
    const { getByTestId, getByText } = render(
      <TestComponent isOpen>Test</TestComponent>,
    );

    const trigger = getByTestId("alert-trigger");
    const content = getByTestId("alert-content");
    const title = getByText("Test Title");
    const message = getByText("Test Message");

    // content
    expect(content.getAttribute("role")).toBe("alertdialog");
    expect(content.tabIndex).toBe(-1);
    expect(content.hidden).toBe(false);
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
    expect(content.getAttribute("aria-describedby")).toBe(message.id);

    // trigger
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
  });

  it("should fallback to default label when title is not provided", () => {
    const { getByText } = render(
      <AlertProvider isOpen>
        <AlertContent>Test</AlertContent>
      </AlertProvider>,
    );

    const content = getByText("Test");

    expect(content.getAttribute("aria-labelledby")).toBeFalsy();
    expect(content.getAttribute("aria-describedby")).toBeFalsy();
    expect(content.getAttribute("aria-label")).toBe("Alert");
  });
});
