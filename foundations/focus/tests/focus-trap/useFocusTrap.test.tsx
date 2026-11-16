import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TestComponent } from "./test-component";

describe("useFocusTrap", () => {
  it("should not trap focus when not enabled", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <>
        <TestComponent>
          <button data-testid="button-1" />
          <button data-testid="button-2" />
        </TestComponent>
        <button data-testid="outside-button" />
      </>,
    );

    getByTestId("button-1").focus();
    expect(document.activeElement).toBe(getByTestId("button-1"));

    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-2"));

    // focus should move outside the container
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("outside-button"));
  });

  it("should trap focus when enabled", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <>
        <TestComponent enabled>
          <button data-testid="button-1" />
          <button data-testid="button-2" />
          <div tabIndex={-1} data-testid="div" />
        </TestComponent>
        <button data-testid="outside-button" />
      </>,
    );

    const button1 = getByTestId("button-1");
    const button2 = getByTestId("button-2");
    const div = getByTestId("div");

    div.focus();
    expect(document.activeElement).toBe(div);

    // 1. forward wrap
    await user.tab();
    expect(document.activeElement).toBe(button1);

    // 2. backward wrap
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(button2);
  });

  it("should keep focus inside when the target itself is focused", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <TestComponent enabled>
        <button data-testid="button-1" />
        <button data-testid="button-2" />
      </TestComponent>,
    );

    getByTestId("target").focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(getByTestId("button-2"));
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(getByTestId("button-1"));
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(getByTestId("button-2"));

    getByTestId("target").focus();
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-1"));
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-2"));
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-1"));
  });

  it("should move focus to target if no focusable children", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <>
        <TestComponent enabled>Content</TestComponent>
        <button data-testid="outside-button" />
      </>,
    );

    const target = getByTestId("target");
    target.focus();
    expect(document.activeElement).toBe(target);

    // tab / shift+tab should keep focus on the target
    await user.tab();
    expect(document.activeElement).toBe(target);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(target);
  });
});
