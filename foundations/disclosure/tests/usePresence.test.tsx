import { act, fireEvent, render } from "@testing-library/react";

import { usePresence } from "@/presence/usePresence";
import { useRef, useState } from "react";

function TestComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isPresent, status } = usePresence(ref, isOpen);

  return (
    <div ref={ref}>
      <p>{isPresent ? "Present" : "Not Present"}</p>
      <p>Status: {status}</p>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
    </div>
  );
}

describe("usePresence", () => {
  function mockAnimations(animations: Animation[] = []) {
    (Element.prototype as Partial<Element>).getAnimations = vi.fn(
      () => animations,
    );
  }

  function createAnimation(endTime = 200) {
    const { promise, resolve, reject } = Promise.withResolvers<Animation>();
    const animation = {
      effect: { getComputedTiming: () => ({ endTime }) },
      finished: promise,
    } as Animation;

    return {
      animation,
      finish: () => resolve(animation),
      cancel: () => reject(),
    };
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    delete (Element.prototype as Partial<Element>).getAnimations;
  });

  it("should update presence states when node is null, or getAnimations is not a function", () => {
    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");

    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();

    fireEvent.click(toggleButton);
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: open")).toBeTruthy();

    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();
  });

  it("should update presence states when node has no animation correctly", async () => {
    mockAnimations();
    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");

    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();

    fireEvent.click(toggleButton);
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: open")).toBeTruthy();

    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    await act(async () => {});
    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();
  });

  it("should update presence states when node has animation correctly", async () => {
    const { animation, finish } = createAnimation();
    mockAnimations([animation]);

    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");
    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();

    fireEvent.click(toggleButton);
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: open")).toBeTruthy();

    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: closing")).toBeTruthy();

    await act(async () => finish());
    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();
  });

  it("should handle animation cancel correctly", async () => {
    const { animation, cancel } = createAnimation();
    mockAnimations([animation]);

    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: closing")).toBeTruthy();

    await act(async () => cancel());
    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();
  });

  it("should handle re-open while closing correctly", async () => {
    const { animation, finish } = createAnimation();
    mockAnimations([animation]);

    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: closing")).toBeTruthy();

    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: open")).toBeTruthy();

    await act(async () => finish());
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: open")).toBeTruthy();
  });

  it("should skip infinite animations correctly", async () => {
    const { animation } = createAnimation(Infinity);
    mockAnimations([animation]);

    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");
    fireEvent.click(toggleButton);
    expect(getByText("Present")).toBeTruthy();
    expect(getByText("Status: open")).toBeTruthy();

    fireEvent.click(toggleButton);
    act(() => vi.advanceTimersToNextFrame());
    await act(async () => {});
    expect(getByText("Not Present")).toBeTruthy();
    expect(getByText("Status: closed")).toBeTruthy();
  });
});
