import { fireEvent, render } from "@testing-library/react";
import * as mobile from "@wondesign/interactions/mobile";

import { TestComponent } from "./test-component";

describe("Sidebar - mobile interactions", () => {
  it("forces hide-mode in mobile window size", () => {
    vi.spyOn(mobile, "useIsMobile").mockReturnValue(true);
    const { getByTestId, rerender } = render(
      <TestComponent collapse="icons" keepMounted />,
    );

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    // collapsed가 아니라 closed 상태여야 한다
    expect(body.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("closed");

    rerender(<TestComponent collapse="disable" keepMounted />);

    expect(body.dataset.state).toBe("closed");

    // disable이어도 mobile 환경에선 toggle이 가능해야 한다
    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("closed");
  });

  it("hides when the viewport becomes mobile", () => {
    const useIsMobileSpy = vi
      .spyOn(mobile, "useIsMobile")
      .mockReturnValue(false);
    const { getByTestId, rerender } = render(
      <TestComponent collapse="icons" keepMounted defaultOpen />,
    );

    const body = getByTestId("body");

    // starts open on desktop
    expect(body.dataset.state).toBe("expanded");

    // viewport shrinks below the breakpoint
    useIsMobileSpy.mockReturnValue(true);
    rerender(<TestComponent collapse="icons" keepMounted defaultOpen />);

    expect(body.dataset.state).toBe("closed");
  });

  it("opens when the viewport becomes desktop", () => {
    const useIsMobileSpy = vi
      .spyOn(mobile, "useIsMobile")
      .mockReturnValue(true);
    const { getByTestId, rerender } = render(
      <TestComponent collapse="icons" keepMounted />,
    );

    const body = getByTestId("body");

    // starts closed on mobile
    expect(body.dataset.state).toBe("closed");

    // viewport grows past the breakpoint
    useIsMobileSpy.mockReturnValue(false);
    rerender(<TestComponent collapse="icons" keepMounted />);

    expect(body.dataset.state).toBe("expanded");
  });

  it("hides disable-collapse sidebars when the viewport becomes mobile", () => {
    const useIsMobileSpy = vi
      .spyOn(mobile, "useIsMobile")
      .mockReturnValue(false);
    const { getByTestId, rerender } = render(
      <TestComponent collapse="disable" keepMounted defaultOpen />,
    );

    const body = getByTestId("body");

    // disable mode always stays expanded on desktop
    expect(body.dataset.state).toBe("expanded");

    // viewport shrinks below the breakpoint: disable mode shouldn't
    // keep the sidebar force-open on mobile
    useIsMobileSpy.mockReturnValue(true);
    rerender(<TestComponent collapse="disable" keepMounted defaultOpen />);

    expect(body.dataset.state).toBe("closed");
  });
});
