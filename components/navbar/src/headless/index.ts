import { Navbar } from "./Navbar";
import { NavbarList } from "./List";
import { NavbarItem } from "./Item";
import { NavbarLink } from "./Link";

export const HeadlessNavbar = Object.assign(Navbar, {
  List: NavbarList,
  Item: NavbarItem,
  Link: NavbarLink,
});

export { Navbar } from "./Navbar";
export { NavbarList } from "./List";
export { NavbarItem } from "./Item";
export { NavbarLink } from "./Link";

export type { NavbarProps } from "./Navbar";
export type { NavbarListProps } from "./List";
export type { NavbarItemProps } from "./Item";
export type { NavbarLinkProps } from "./Link";
