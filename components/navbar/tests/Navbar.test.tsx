import { render } from "@testing-library/react";

import { Navbar } from "@/Navbar";
import { NavLink } from "@/NavLink";

describe("Navbar", () => {
  it("should render with default properties correctly", () => {
    const { getAllByRole, getByRole, getByTestId } = render(
      <Navbar aria-label="Test Navigation" data-testid="list">
        <NavLink href="#" data-testid="link">
          Home
        </NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Navbar>,
    );

    // 1. Navbar (default orientation is horizontal)
    const nav = getByRole("navigation");
    expect(nav.tagName).toBe("NAV");
    expect(nav.getAttribute("aria-label")).toBe("Test Navigation");
    const list = getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list.dataset.orientation).toBe("horizontal");

    // 2. NavLink (check the first link)
    const items = getAllByRole("listitem");
    const link = getByTestId("link");
    expect(items).toHaveLength(3);
    expect(items[0].tagName).toBe("LI");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("#");
    expect(link.dataset.active).toBeUndefined();
  });

  it("should render vertical navbars correctly", () => {
    const { getByRole } = render(
      <Navbar aria-label="Test Navigation" vertical>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Navbar>,
    );

    const list = getByRole("list");
    expect(list.dataset.orientation).toBe("vertical");
  });

  it("should render disabled and active NavLink correctly", () => {
    const { getByTestId } = render(
      <Navbar aria-label="Test Navigation" data-testid="nav">
        <NavLink href="#" isDisabled data-testid="disabled-link">
          Disabled
        </NavLink>
        <NavLink href="#" isActive data-testid="active-link">
          Active
        </NavLink>
      </Navbar>,
    );

    const disabledLink = getByTestId("disabled-link");
    expect(disabledLink.getAttribute("aria-disabled")).toBe("true");
    expect(disabledLink.dataset.disabled).toBe("true");

    const activeLink = getByTestId("active-link");
    expect(activeLink.getAttribute("aria-current")).toBe("page");
    expect(activeLink.dataset.active).toBe("true");
  });

  it("should prefer aria-labelledby over aria-label when both are provided", () => {
    const { getByRole } = render(
      <Navbar
        aria-label="Test Navigation"
        aria-labelledby="nav-label"
        data-testid="nav"
      >
        <NavLink href="#" data-testid="link">
          Home
        </NavLink>
      </Navbar>,
    );

    const nav = getByRole("navigation");
    expect(nav.getAttribute("aria-label")).toBeNull();
    expect(nav.getAttribute("aria-labelledby")).toBe("nav-label");
  });

  it("should support asChild and as props", () => {
    const { getByTestId } = render(
      <Navbar asChild aria-label="Test Navigation" data-testid="nav">
        <div>
          <NavLink as="button" href="#" isActive data-testid="active-link">
            Active
          </NavLink>
          <NavLink as="button" href="#" isDisabled data-testid="disabled-link">
            Disabled
          </NavLink>
        </div>
      </Navbar>,
    );

    const navbar = getByTestId("nav");
    expect(navbar.tagName).toBe("DIV");
    expect(navbar.getAttribute("aria-label")).toBe("Test Navigation");
    expect(navbar.dataset.orientation).toBe("horizontal");

    const activeLink = getByTestId("active-link");
    expect(activeLink.tagName).toBe("BUTTON");
    expect(activeLink.getAttribute("aria-current")).toBe("page");
    expect(activeLink.dataset.orientation).toBe("horizontal");
    expect(activeLink.dataset.active).toBe("true");

    const disabledLink = getByTestId("disabled-link");
    expect(disabledLink.getAttribute("aria-disabled")).toBe("true");
    expect(disabledLink.dataset.disabled).toBe("true");
  });
  it("should respects vertical and handle label correctly in asChild mode", () => {
    const { getByRole } = render(
      <Navbar
        asChild
        vertical
        aria-label="Test Navigation"
        aria-labelledby="nav-label"
        data-testid="nav"
      >
        <div>
          <NavLink href="#" data-testid="link">
            Home
          </NavLink>
        </div>
      </Navbar>,
    );

    const nav = getByRole("navigation");
    expect(nav.getAttribute("aria-label")).toBeNull();
    expect(nav.getAttribute("aria-labelledby")).toBe("nav-label");
    expect(nav.dataset.orientation).toBe("vertical");
  });
});
