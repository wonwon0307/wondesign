import { fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("HeadlessTabs - interactions", () => {
  it("handles tab clicks correctly", () => {
    const { getByTestId } = render(<TestComponent />);

    const tab1 = getByTestId("tab1");
    const tab2 = getByTestId("tab2");

    // tab1 is active initially
    expect(tab1.getAttribute("data-state")).toBe("active");
    expect(tab2.getAttribute("data-state")).toBe("inactive");

    fireEvent.click(tab2);

    expect(tab1.getAttribute("data-state")).toBe("inactive");
    expect(tab2.getAttribute("data-state")).toBe("active");
  });

  it("handles tab clicks in controlled mode correctly", () => {
    const cb = vi.fn();
    const { getByTestId } = render(
      <TestComponent selectedTab="tab1" onTabChange={cb} />,
    );

    fireEvent.click(getByTestId("tab2"));
    expect(cb).toHaveBeenCalledWith("tab2");
  });

  it("handles tab focus correctly", () => {
    const { getByTestId } = render(<TestComponent switchOnFocus />);

    const tab1 = getByTestId("tab1");
    const tab2 = getByTestId("tab2");

    // tab1 is active initially
    expect(tab1.getAttribute("data-state")).toBe("active");
    expect(tab2.getAttribute("data-state")).toBe("inactive");

    fireEvent.focus(tab2);

    expect(tab1.getAttribute("data-state")).toBe("inactive");
    expect(tab2.getAttribute("data-state")).toBe("active");
  });

  it("should not switch tabs on focus when switchOnFocus is false", () => {
    const { getByTestId } = render(<TestComponent switchOnFocus={false} />);

    const tab1 = getByTestId("tab1");
    const tab2 = getByTestId("tab2");

    // tab1 is active initially
    expect(tab1.getAttribute("data-state")).toBe("active");
    expect(tab2.getAttribute("data-state")).toBe("inactive");

    fireEvent.focus(tab2);

    expect(tab1.getAttribute("data-state")).toBe("active");
    expect(tab2.getAttribute("data-state")).toBe("inactive");
  });
});
