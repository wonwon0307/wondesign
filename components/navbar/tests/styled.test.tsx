import { render } from "@testing-library/react";

import { Navbar } from "@/styled/Navbar";
import { NavLink } from "@/styled/NavLink";

describe("Styled Navbar", () => {
  it("should render correctly", () => {
    const { getByRole } = render(
      <Navbar aria-label="Test Navigation">
        <NavLink href="#">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Navbar>,
    );

    // default orientation is horizontal
    const list = getByRole("list");
    expect(list.dataset.orientation).toBe("horizontal");
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
});
