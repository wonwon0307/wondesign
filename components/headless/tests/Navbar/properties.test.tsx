import { render } from "@testing-library/react";

import { Navbar } from "@/Navbar/Navbar";
import { NavbarList } from "@/Navbar/List";
import { NavbarItem } from "@/Navbar/Item";
import { NavbarLink } from "@/Navbar/Link";

describe("HeadlessNavbar - properties", () => {
  it("should render with default properties correctly", () => {
    const { getAllByTestId, getByTestId } = render(
      <Navbar aria-label="Main navigation" data-testid="nav">
        <NavbarList data-testid="list">
          <NavbarItem data-testid="item">
            <NavbarLink href="#" data-testid="link">
              Item 1
            </NavbarLink>
          </NavbarItem>
          <NavbarItem data-testid="item">
            <NavbarLink href="#" data-testid="link">
              Item 2
            </NavbarLink>
          </NavbarItem>
        </NavbarList>
      </Navbar>,
    );

    // 1. Nav
    const nav = getByTestId("nav");
    expect(nav.tagName).toBe("NAV");
    expect(nav.getAttribute("aria-label")).toBe("Main navigation");
    expect(nav.getAttribute("role")).toBe("navigation");

    // 2. NavbarList
    const list = getByTestId("list");
    expect(list.tagName).toBe("UL");
    expect(list.getAttribute("role")).toBe("list");
    expect(list.getAttribute("data-orientation")).toBe("horizontal");

    // 3. NavbarItem (하나만 대표로 검사)
    const items = getAllByTestId("item");
    expect(items).toHaveLength(2);
    expect(items[0].tagName).toBe("LI");
    expect(items[0].dataset.disabled).toBeUndefined();

    // 4. NavbarLink (하나만 대표로 검사)
    const links = getAllByTestId("link");
    expect(links).toHaveLength(2);
    expect(links[0].tagName).toBe("A");
    expect(links[0].dataset.active).toBeUndefined();
    expect(links[1].dataset.active).toBeUndefined();
  });

  it("Nav - should respect aria-label when both aria-label and aria-labelledby are provided", () => {
    const { getByTestId } = render(
      <Navbar
        aria-label="Main navigation"
        aria-labelledby="nav-label"
        data-testid="nav"
      >
        <div>Test</div>
      </Navbar>,
    );

    const nav = getByTestId("nav");
    expect(nav.getAttribute("aria-label")).toBeNull();
    expect(nav.getAttribute("aria-labelledby")).toBe("nav-label");
  });

  it("NavbarList - should support the vertical property", () => {
    const { getByTestId } = render(
      <Navbar aria-label="Main navigation">
        <NavbarList vertical data-testid="list">
          <NavbarItem>
            <NavbarLink href="#" data-testid="link">
              Link
            </NavbarLink>
          </NavbarItem>
        </NavbarList>
      </Navbar>,
    );

    expect(getByTestId("list").getAttribute("data-orientation")).toBe(
      "vertical",
    );

    // orientation should pass to link as well
    expect(getByTestId("link").getAttribute("data-orientation")).toBe(
      "vertical",
    );
  });

  it("NavbarItem - should support the isDisabled property", () => {
    const { getByTestId } = render(
      <Navbar aria-label="Main navigation">
        <NavbarList>
          <NavbarItem isDisabled data-testid="item">
            <NavbarLink href="#" data-testid="link">
              Link
            </NavbarLink>
          </NavbarItem>
        </NavbarList>
      </Navbar>,
    );

    expect(getByTestId("item").getAttribute("aria-disabled")).toBe("true");

    // should flow into the link as well
    expect(getByTestId("link").getAttribute("aria-disabled")).toBe("true");
  });

  it("NavbarLink - should support the isAcitve property", () => {
    const { getByTestId } = render(
      <Navbar aria-label="Main navigation">
        <NavbarList>
          <NavbarItem>
            <NavbarLink href="#" isActive data-testid="link">
              Link
            </NavbarLink>
          </NavbarItem>
        </NavbarList>
      </Navbar>,
    );

    const link = getByTestId("link");
    expect(link.getAttribute("aria-current")).toBe("page");
    expect(link.getAttribute("data-active")).toBe("true");
  });
});
