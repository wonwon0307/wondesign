import { render, renderHook } from "@testing-library/react";

import { useNavbar } from "@/contexts";
import { Navbar } from "@/Navbar";
import { NavLink } from "@/NavLink";

describe("Navbar - context tests", () => {
  it("should warn in console if neither aria-label nor aria-labelledby is provided", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Navbar data-testid="nav">
        <NavLink href="#" data-testid="link">
          Home
        </NavLink>
      </Navbar>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Navbar] It is strongly recommended to provide either an aria-label or aria-labelledby for the navigation element.",
    );
  });

  it("useNavbar() should throw if used outside of a Navbar context", () => {
    expect(() => renderHook(() => useNavbar())).toThrow(
      "[WonDesign Navbar] useNavbar() must be used within a Navbar component.",
    );
  });
});
