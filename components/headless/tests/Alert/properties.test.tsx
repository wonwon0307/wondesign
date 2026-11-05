import { fireEvent, render } from "@testing-library/react";

import { AlertProvider } from "@/Alert/Provider";
import { AlertClose } from "@/Alert/Close";
import { AlertContent } from "@/Alert/Content";
import { AlertTrigger } from "@/Alert/Trigger";
import { AlertTitle } from "@/Alert/Title";
import { AlertMessage } from "@/Alert/Message";
import { TestComponent } from "./test-component";

describe("Alert - properties", () => {
  it("should respect the defaultOpen state", () => {
    const { getByTestId } = render(
      <TestComponent defaultOpen>Test</TestComponent>,
    );

    const content = getByTestId("alert-content");
    expect(content.dataset.state).toBe("open");
    expect(content.hidden).toBeFalsy();
  });

  it("should respect the disablePortal prop", () => {
    const { getByTestId, rerender } = render(
      <TestComponent isOpen>Test</TestComponent>,
    );

    const content = getByTestId("alert-content");
    const backdrop = getByTestId("alert-backdrop");
    expect(content.parentElement).toBe(document.body);
    expect(backdrop.parentElement).toBe(document.body);

    rerender(
      <TestComponent disablePortal isOpen>
        Test
      </TestComponent>,
    );

    expect(content.parentElement).not.toBe(document.body);
    expect(backdrop.parentElement).not.toBe(document.body);
  });

  it("supports controlled mode", () => {
    const controlledOpen = vi.fn();

    const { getByTestId, getByText } = render(
      <TestComponent isOpen onOpenChange={controlledOpen}>
        <AlertClose>Close</AlertClose>
      </TestComponent>,
    );

    const trigger = getByTestId("alert-trigger");
    fireEvent.click(trigger);
    expect(controlledOpen).toHaveBeenCalledWith(true);

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(controlledOpen).toHaveBeenCalledWith(false);
  });

  it("supports the asChild prop", () => {
    const { getByTestId, getByText } = render(
      <AlertProvider isOpen>
        <AlertContent asChild className="parent-content" data-testid="content">
          <div className="child-content">
            <AlertTitle asChild>
              <h1>Title</h1>
            </AlertTitle>
            <AlertMessage asChild>
              <span>Message</span>
            </AlertMessage>
          </div>
        </AlertContent>
        <AlertTrigger asChild className="parent-trigger">
          <button className="child-trigger">Trigger</button>
        </AlertTrigger>
      </AlertProvider>,
    );

    // content
    const content = getByTestId("content");
    expect(content.className).toContain("parent-content");
    expect(content.className).toContain("child-content");

    // trigger
    const trigger = getByText("Trigger");
    expect(trigger.className).toContain("parent-trigger");
    expect(trigger.className).toContain("child-trigger");

    // title
    const title = getByText("Title");
    expect(title.tagName).toBe("H1"); // instead of h2

    // message
    const message = getByText("Message");
    expect(message.tagName).toBe("SPAN"); // instead of p
  });

  it("keeps components mounted if keepMounted is true", () => {
    const { getByTestId } = render(
      <TestComponent keepMounted>Test</TestComponent>,
    );

    const content = getByTestId("alert-content");
    const backdrop = getByTestId("alert-backdrop");
    const trigger = getByTestId("alert-trigger");

    expect(content).toBeTruthy(); // isOpen이 false여도 있어야한다
    expect(content.dataset.state).toBe("closed");
    expect(content.hidden).toBeTruthy();
    expect(backdrop.hidden).toBeTruthy();

    fireEvent.click(trigger);
    expect(content.dataset.state).toBe("open");
    expect(content.hidden).toBeFalsy();
    expect(backdrop.hidden).toBeFalsy();
  });
});
