import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("useAutoFocus - corner cases", () => {
  const nullRef = vi.fn().mockReturnValue({ current: null });

  it("gracefully handles when initialRef is outside the content", () => {
    // button-inside로 포커스가 이동한다
    const InitialOutside = () => {
      const initialRef = useRef<HTMLButtonElement>(null);

      return (
        <div>
          <TestComponent initialRef={initialRef}>
            <button data-testid="button-inside" />
          </TestComponent>
          <button ref={initialRef} data-testid="button-outside" />
        </div>
      );
    };

    const { getByTestId } = render(<InitialOutside />);

    const trigger = getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const button = getByTestId("button-inside");
    expect(document.activeElement).toBe(button);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("gracefully handles when initialRef is null", () => {
    // button으로 포커스가 이동한다
    const { getByTestId } = render(
      <TestComponent initialRef={nullRef()}>
        <button data-testid="button" />
      </TestComponent>,
    );

    const trigger = getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const button = getByTestId("button");
    expect(document.activeElement).toBe(button);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("gracefully handles when initialRef is not focusable", () => {
    // content 자체로 포커스가 이동한다
    const NotFocusable = () => {
      const initialRef = useRef<HTMLDivElement>(null);

      return (
        <div>
          <TestComponent initialRef={initialRef}>
            <div ref={initialRef} data-testid="div-inside" />
          </TestComponent>
        </div>
      );
    };

    const { getByTestId } = render(<NotFocusable />);

    const trigger = getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("gracefully handles when returnRef is null", () => {
    const { getByTestId } = render(
      <TestComponent returnRef={nullRef()}>Content</TestComponent>,
    );

    const trigger = getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("gracefully handles when document.activeElement is null", () => {
    // COVERAGE PURPOSE
    const { getByTestId } = render(<TestComponent>Content</TestComponent>);

    const trigger = getByTestId("trigger");
    const activeElementSpy = vi
      .spyOn(document, "activeElement", "get")
      .mockReturnValue(null);

    fireEvent.click(trigger);
    activeElementSpy.mockRestore();

    expect(document.activeElement).toBe(getByTestId("content"));

    fireEvent.click(getByTestId("trigger"));
    expect(document.activeElement).toBe(document.body);
  });
});
