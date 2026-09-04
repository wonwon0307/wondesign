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

    const homeLink = getByText("Home");
    const aboutLink = getByText("About");

    expect(getByTestId("nav-list")).toBeTruthy();
    expect(homeLink.dataset.active).toBe("true");
    expect(homeLink.getAttribute("aria-current")).toBe("page");
    expect(aboutLink.dataset.active).toBe("false");
    expect(aboutLink.getAttribute("aria-current")).toBeNull();
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
