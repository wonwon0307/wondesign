import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("useAutoFocus", () => {
  it("handles basic focus and return", () => {
    // focuses to first focusable element correctly
    // and returns to previously active element
    const { getByTestId } = render(
      <TestComponent>
        <div />
        <span />
        <button data-testid="button" />
      </TestComponent>,
    );

    const trigger = getByTestId("trigger");

    // make trigger the previously active element
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const button = getByTestId("button");
    expect(document.activeElement).toBe(button);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("focuses to initialRef correctly", () => {
    const WithInitial = () => {
      const initialRef = useRef<HTMLButtonElement>(null);

      return (
        <TestComponent initialRef={initialRef}>
          <button data-testid="button1" />
          <button ref={initialRef} data-testid="button2" />
          <button data-testid="button3" />
        </TestComponent>
      );
    };

    const { getByTestId } = render(<WithInitial />);

    const trigger = getByTestId("trigger");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const button2 = getByTestId("button2");
    expect(document.activeElement).toBe(button2);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("returns focus to returnRef correctly", () => {
    const WithReturn = () => {
      const nextRef = useRef<HTMLDivElement>(null);
      return (
        <div>
          <TestComponent returnRef={nextRef}>Content</TestComponent>
          <div ref={nextRef} data-testid="next" tabIndex={-1} />
        </div>
      );
    };

    const { getByTestId } = render(<WithReturn />);

    const trigger = getByTestId("trigger");
    const next = getByTestId("next");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(next);
  });

  it("does not return focus if user already focused another element", () => {
    const WithReturn = () => {
      const nextRef = useRef<HTMLDivElement>(null);
      return (
        <div>
          <TestComponent returnRef={nextRef}>Content</TestComponent>
          <div ref={nextRef} data-testid="next" tabIndex={-1} />
          <button data-testid="other" />
        </div>
      );
    };

    const { getByTestId } = render(<WithReturn />);

    const trigger = getByTestId("trigger");
    const other = getByTestId("other");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    other.focus();
    expect(document.activeElement).toBe(other);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(other);
  });

  it("focuses to content itself when there isn't any focusable element", () => {
    const { getByTestId } = render(<TestComponent>Content</TestComponent>);

    const trigger = getByTestId("trigger");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });
});
