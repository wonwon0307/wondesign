import { render } from "@testing-library/react";

import { NavbarWrapper } from "@/Navbar/Wrapper";
import { NavbarList } from "@/Navbar/List";
import { NavbarItem } from "@/Navbar/Item";
import { NavbarLink } from "@/Navbar/Link";

describe("HeadlessNavbar - corner cases", () => {
  it("Nav - should warn in console if neither aria-label nor aria-labelledby is provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<NavbarWrapper>Test</NavbarWrapper>);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[WonDesign Navbar] It is strongly recommended to provide either an aria-label or aria-labelledby for the navigation element.",
    );

    consoleWarnSpy.mockRestore();
  });

  it("should support the asChild/as prop on all of the components", () => {
    const { getByTestId } = render(
      <NavbarWrapper asChild aria-label="Main navigation" data-testid="nav">
        <div>
          <NavbarList asChild data-testid="list">
            <div>
              <NavbarItem asChild data-testid="item">
                <div>
                  <NavbarLink as="button" href="#" data-testid="link">
                    <a>Item 1</a>
                  </NavbarLink>
                </div>
              </NavbarItem>
            </div>
          </NavbarList>
        </div>
      </NavbarWrapper>,
    );

    expect(getByTestId("nav").tagName).toBe("DIV");
    expect(getByTestId("list").tagName).toBe("DIV");
    expect(getByTestId("item").tagName).toBe("DIV");
    expect(getByTestId("link").tagName).toBe("BUTTON");
  });

  it("should support ref passing on all of the components", () => {
    const navRef = vi.fn();
    const listRef = vi.fn();
    const itemRef = vi.fn();
    const linkRef = vi.fn();

    const { getByTestId } = render(
      <NavbarWrapper
        ref={navRef}
        aria-label="Main navigation"
        data-testid="nav"
      >
        <NavbarList ref={listRef} data-testid="list">
          <NavbarItem ref={itemRef} data-testid="item">
            <NavbarLink ref={linkRef} href="#" data-testid="link">
              Item 1
            </NavbarLink>
          </NavbarItem>
        </NavbarList>
      </NavbarWrapper>,
    );

    expect(navRef).toHaveBeenCalledWith(getByTestId("nav"));
    expect(listRef).toHaveBeenCalledWith(getByTestId("list"));
    expect(itemRef).toHaveBeenCalledWith(getByTestId("item"));
    expect(linkRef).toHaveBeenCalledWith(getByTestId("link"));
  });

  it("should throw if NavbarList is used outside of Nav", () => {
    expect(() => render(<NavbarList>Test</NavbarList>)).toThrow(
      "[WonDesign Navbar] Navbar.List must be used inside the Nav wrapper.",
    );
  });

  it("should throw if NavbarItem is used outside of NavbarList", () => {
    expect(() => render(<NavbarItem>Test</NavbarItem>)).toThrow(
      "[WonDesign Navbar] useNavbarList() must be used inside a Navbar.List component.",
    );
  });

  it("should throw if NavbarLink is used outside of NavbarItem", () => {
    expect(() => render(<NavbarLink href="#">Test</NavbarLink>)).toThrow(
      "[WonDesign Navbar] useNavbarItem() must be used inside a Navbar.Item component.",
    );
  });
});
