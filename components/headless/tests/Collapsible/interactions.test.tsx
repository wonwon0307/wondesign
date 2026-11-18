import { fireEvent, render } from "@testing-library/react";

import { TestCollapsible } from "./test-component";

describe("Collapsible - interactions", () => {
  it("toggles content visibility on toggle click", () => {
    const { getByText, queryByText } = render(
      <TestCollapsible>Content</TestCollapsible>,
    );

    const toggle = getByText("Toggle");
    expect(queryByText("Content")).toBeNull();

    fireEvent.click(toggle);
    expect(getByText("Content")).toBeTruthy();

    fireEvent.click(toggle);
    expect(queryByText("Content")).toBeNull();
  });

  it("calls onClick on toggle click", () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <TestCollapsible onClick={onClick}>Content</TestCollapsible>,
    );

    const toggle = getByText("Toggle");
    fireEvent.click(toggle);
    expect(onClick).toHaveBeenCalled();
  });

  it("doesn't switch open state when onClick calls preventDefault", () => {
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
      e.preventDefault();
    const { getByText } = render(
      <TestCollapsible onClick={onClick}>Content</TestCollapsible>,
    );

    const toggle = getByText("Toggle");
    expect(toggle.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(toggle.dataset.state).toBe("closed");
  });
});
