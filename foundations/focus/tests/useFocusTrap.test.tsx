import { useRef } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useFocusTrap } from "@/trap";

function TestComponent({
  enabled = false,
  focusableChildren = false,
}: {
  enabled?: boolean;
  focusableChildren?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useFocusTrap(ref, { enabled });

  return (
    <div tabIndex={-1}>
      <div ref={ref} data-testid="container" tabIndex={-1}>
        {focusableChildren ? (
          <>
            <button data-testid="button-1" />
            <span data-testid="skipped-middle" tabIndex={-1} />
            <button data-testid="button-2" />
            <span data-testid="skipped-end" tabIndex={-1} />
          </>
        ) : (
          <div />
        )}
      </div>
      <button data-testid="outside-button" />
    </div>
  );
}

describe("useFocusTrap", () => {
  it("should not trap focus when closed", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TestComponent focusableChildren />);

    getByTestId("button-1").focus();
    expect(document.activeElement).toBe(getByTestId("button-1"));

    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-2"));

    // focus should move outside the container
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("outside-button"));
  });

  it("should trap focus when open", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TestComponent enabled focusableChildren />);

    getByTestId("button-1").focus();
    expect(document.activeElement).toBe(getByTestId("button-1"));

    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-2"));

    // 1. forward wrap
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-1"));

    // 2. backward wrap
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(getByTestId("button-2"));
  });

  it("should keep focus inside when the container itself is focused", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TestComponent enabled focusableChildren />);

    getByTestId("container").focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(getByTestId("button-2"));

    getByTestId("container").focus();
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-1"));
  });

  it("should keep focus inside when an element outside the tab order is focused", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TestComponent enabled focusableChildren />);

    // moves to the nearest element in the tab order
    getByTestId("skipped-middle").focus();
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-2"));

    getByTestId("skipped-middle").focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(getByTestId("button-1"));

    // wraps around when there's nothing after it
    getByTestId("skipped-end").focus();
    await user.tab();
    expect(document.activeElement).toBe(getByTestId("button-1"));
  });

  it("should move focus to container if no focusable children", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TestComponent enabled />);

    getByTestId("container").focus();
    expect(document.activeElement).toBe(getByTestId("container"));

    await user.tab();
    expect(document.activeElement).toBe(getByTestId("container"));
  });
});
