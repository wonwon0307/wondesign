import { render } from "@testing-library/react";

import { NavLink, NavList } from "@/NavList";

describe("NavList", () => {
  it("renders correctly", () => {
    const { getByTestId, getByText } = render(
      <NavList data-testid="nav-list">
        <NavLink href="/home" isActive>
          Home
        </NavLink>
        <NavLink href="/about">About</NavLink>
      </NavList>,
    );

    const list = getByTestId("nav-list");

    expect(list).toBeTruthy();
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("About")).toBeTruthy();
  });

  it("renders vertical orientation correctly", () => {
    const { getByTestId } = render(
      <NavList data-testid="nav-list" vertical>
        <NavLink href="/home" isActive>
          Home
        </NavLink>
        <NavLink href="/about">About</NavLink>
      </NavList>,
    );

    const list = getByTestId("nav-list");
    expect(list).toBeTruthy();
    expect(list.dataset.orientation).toBe("vertical");
  });
});
