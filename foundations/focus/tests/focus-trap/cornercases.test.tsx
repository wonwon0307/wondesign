import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TestComponent } from "./test-component";

describe("useFocusTrap - corner cases", () => {
  it("should recover focus when focus is lost to document body", async () => {
    const user = userEvent.setup();
    const { getByTestId, rerender } = render(
      <TestComponent enabled>
        <button data-testid="button-1" />
        <button data-testid="button-2" />
      </TestComponent>,
    );

    getByTestId("button-1").focus();
    expect(document.activeElement).toBe(getByTestId("button-1"));

    rerender(
      <TestComponent enabled>
        <button data-testid="button-2" />
      </TestComponent>,
    );

    // so simulate focus lost to document body
    document.documentElement.focus();
    expect(document.activeElement).toBe(document.body);

    // recover focus on next tab
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-2"));
  });

  it("should recover focus to target when focus is lost to document body and content has no focusable elements", async () => {
    const user = userEvent.setup();
    const { getByTestId, rerender } = render(
      <TestComponent enabled>
        <button data-testid="button" />
      </TestComponent>,
    );

    getByTestId("button").focus();
    expect(document.activeElement).toBe(getByTestId("button"));

    rerender(<TestComponent enabled>Empty Content</TestComponent>);

    // so simulate focus lost to document body
    document.documentElement.focus();
    expect(document.activeElement).toBe(document.body);

    // recover focus on next tab
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("target"));
  });

  it("should not recover focus when focus is lost to somewhere else", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <>
        <TestComponent enabled>
          <button data-testid="button" />
        </TestComponent>
        <button data-testid="outer-button1" />
        <button data-testid="outer-button2" />
      </>,
    );

    const innerButton = getByTestId("button");
    const outerButton = getByTestId("outer-button1");
    const outerButton2 = getByTestId("outer-button2");

    innerButton.focus();
    expect(document.activeElement).toBe(innerButton);

    // so simulate focus lost to the other button
    outerButton.focus();
    expect(document.activeElement).toBe(outerButton);

    // try to recover focus on next tab
    await user.tab();
    expect(document.activeElement).toBe(outerButton2);
  });
});
