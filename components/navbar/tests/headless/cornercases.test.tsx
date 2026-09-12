import { render } from "@testing-library/react";

import { Navbar } from "@/headless/Navbar";
import { NavbarList } from "@/headless/List";
import { NavbarItem } from "@/headless/Item";
import { NavbarLink } from "@/headless/Link";

describe("HeadlessNavbar - corner cases", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <Navbar aria-label="Main navigation">
        <NavbarList>
          <NavbarItem>
            <NavbarLink href="#">Home</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="#">About</NavbarLink>
          </NavbarItem>
        </NavbarList>
      </Navbar>,
    );

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("About")).toBeTruthy();
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
