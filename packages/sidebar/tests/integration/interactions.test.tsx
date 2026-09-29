import { fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("Sidebar - interactions", () => {
  it("handles expand and collapse in hide mode correctly", () => {
    const { getByTestId } = render(<TestComponent keepMounted />);

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    expect(body.dataset.side).toBe("left");
    expect(body.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("closed");
  });

  it("handles expand and collapse in icons mode correctly", () => {
    const { getAllByTestId, getByTestId } = render(
      <TestComponent collapse="icons" keepMounted />,
    );

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    expect(body.dataset.state).toBe("collapsed");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("collapsed");

    // collapsed일 때는 Tooltip이 렌더링 되어야 한다
    const tooltips = getAllByTestId("tooltip");
    expect(tooltips.length).toBeGreaterThan(0);

    // Group
    // Test Group은 collapsedBehavior가 hide
    // Another Test Group은 collapsedBehavior가 flatten
    const testGroup = getByTestId("test-group");
    const anotherTestGroup = getByTestId("another-test-group");

    // header는 둘다 안보인다
    expect(
      testGroup.getElementsByTagName("div")[0].getAttribute("aria-hidden"),
    ).toBe("true");
    expect(
      anotherTestGroup
        .getElementsByTagName("div")[0]
        .getAttribute("aria-hidden"),
    ).toBe("true");

    // children은 flatten인 Another Test Group만 보여야 한다
    const testGroupList = testGroup.getElementsByTagName("ul")[0];
    expect(testGroupList.getAttribute("aria-hidden")).toBe("true");
    expect(testGroupList.getAttribute("data-force-visible")).toBeNull();
    const anotherTestGroupList = anotherTestGroup.getElementsByTagName("ul")[0];
    expect(anotherTestGroupList.getAttribute("aria-hidden")).toBe("false");
    expect(anotherTestGroupList.getAttribute("data-force-visible")).toBe(
      "true",
    );

    // 기본 툴팁 방향은 오른쪽이다 (사이드바가 왼쪽에 있으니; 하나만 대표로 확인)
    expect(tooltips[0].dataset.placement).toBe("right");
  });

  it("handles disable mode correctly", () => {
    const { getByTestId } = render(
      <TestComponent collapse="disable" keepMounted />,
    );

    const body = getByTestId("body");
    const toggle = getByTestId("toggle");

    expect(body.dataset.state).toBe("expanded");

    // stays expanded
    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("expanded");
  });

  it("removes the body from DOM when keepMounted is false", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    const toggle = getByTestId("toggle");

    expect(queryByTestId("body")).toBeNull();

    fireEvent.click(toggle);
    expect(getByTestId("body")).toBeTruthy();

    fireEvent.click(toggle);
    expect(queryByTestId("body")).toBeNull();
  });

  it("handles keyboard shortkey correctly", () => {
    const { getByTestId } = render(
      <TestComponent keepMounted shortkey="Cmd+B" />,
    );

    const body = getByTestId("body");

    expect(body.dataset.state).toBe("closed");

    fireEvent.keyDown(document, { code: "KeyB", metaKey: true });
    expect(body.dataset.state).toBe("expanded");

    fireEvent.keyDown(document, { code: "KeyB", metaKey: true });
    expect(body.dataset.state).toBe("closed");
  });
});
