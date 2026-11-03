import { useRef } from "react";
import { render, renderHook } from "@testing-library/react";

import { useBackgroundInert } from "@/background-inert/useBackgroundInert";

function TestComponent({
  children,
  enabled = false,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useBackgroundInert(containerRef, { enabled });

  return <div ref={containerRef}>{children}</div>;
}

describe("useBackgroundInert", () => {
  it("correctly sets all background elements to inert", () => {
    const { getByTestId, rerender } = render(
      <div>
        <TestComponent enabled={true}>
          <div data-testid="inner-div" />
        </TestComponent>
        <div data-testid="outside-div" />
      </div>,
    );
    const outsideDiv = getByTestId("outside-div");
    const innerDiv = getByTestId("inner-div");
    expect(outsideDiv.hasAttribute("inert")).toBe(true);
    expect(innerDiv.hasAttribute("inert")).toBe(false);
    expect(outsideDiv.getAttribute("data-wondesign-inert")).toBeTruthy();

    // should clear when it is turned off
    rerender(
      <div>
        <TestComponent enabled={false}>
          <div data-testid="inner-div" />
          <button data-testid="inner-button" />
        </TestComponent>
        <div data-testid="outside-div" />
        <button data-testid="outside-button" />
      </div>,
    );
    expect(outsideDiv.hasAttribute("inert")).toBe(false);
    expect(outsideDiv.getAttribute("data-wondesign-inert")).toBeFalsy();
  });

  it("should handle nested containers correctly", () => {
    const { getByTestId, rerender } = render(
      <div>
        <TestComponent enabled={true}>
          <TestComponent enabled={true}>
            <div data-testid="innermost-div" />
          </TestComponent>
          <div data-testid="middle-div" />
        </TestComponent>
        <div data-testid="outside-div" />
      </div>,
    );

    const innerDiv = getByTestId("innermost-div");
    const middleDiv = getByTestId("middle-div");
    const outsideDiv = getByTestId("outside-div");

    expect(innerDiv.hasAttribute("inert")).toBe(false);
    expect(middleDiv.hasAttribute("inert")).toBe(true);
    expect(outsideDiv.hasAttribute("inert")).toBe(true);

    rerender(
      <div>
        <TestComponent enabled={false}>
          <TestComponent enabled={true}>
            <div data-testid="innermost-div" />
          </TestComponent>
          <div data-testid="middle-div" />
        </TestComponent>
        <div data-testid="outside-div" />
      </div>,
    );

    expect(innerDiv.hasAttribute("inert")).toBe(false);
    expect(middleDiv.hasAttribute("inert")).toBe(true);
    expect(outsideDiv.hasAttribute("inert")).toBe(true);

    rerender(
      <div>
        <TestComponent enabled={false}>
          <TestComponent enabled={false}>
            <div data-testid="innermost-div" />
          </TestComponent>
          <div data-testid="middle-div" />
        </TestComponent>
        <div data-testid="outside-div" />
      </div>,
    );

    expect(innerDiv.hasAttribute("inert")).toBe(false);
    expect(middleDiv.hasAttribute("inert")).toBe(false);
    expect(outsideDiv.hasAttribute("inert")).toBe(false);
  });

  it("should ignore already-inert elements", () => {
    const { getByTestId, rerender } = render(
      <div>
        <TestComponent enabled={true}>
          <div data-testid="inner-div" />
        </TestComponent>
        <div data-testid="outside-div" inert />
      </div>,
    );

    const innerDiv = getByTestId("inner-div");
    const outsideDiv = getByTestId("outside-div");

    expect(innerDiv.hasAttribute("inert")).toBe(false);
    expect(outsideDiv.hasAttribute("inert")).toBe(true);

    rerender(
      <div>
        <TestComponent enabled={false}>
          <div data-testid="inner-div" />
        </TestComponent>
        <div data-testid="outside-div" inert />
      </div>,
    );

    expect(innerDiv.hasAttribute("inert")).toBe(false);
    expect(outsideDiv.hasAttribute("inert")).toBe(true);
  });

  it("should gracefully handle no parent or null containerRef", () => {
    const containerRef = { current: document.documentElement };
    expect(() =>
      renderHook(() => useBackgroundInert(containerRef, { enabled: true })),
    ).not.toThrow();
    expect(document.querySelectorAll("[inert]")).toHaveLength(0);

    const nullContainerRef = { current: null };
    expect(() =>
      renderHook(() => useBackgroundInert(nullContainerRef, { enabled: true })),
    ).not.toThrow();
    expect(document.querySelectorAll("[inert]")).toHaveLength(0);
  });
});
