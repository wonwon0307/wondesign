import { NavbarWrapper } from "./Wrapper";
import { NavbarList } from "./List";
import { NavbarItem } from "./Item";
import { NavbarLink } from "./Link";

export const Navbar = Object.assign(NavbarWrapper, {
  List: NavbarList,
  Item: NavbarItem,
  Link: NavbarLink,
});

export { useNavbarList, useNavbarItem } from "./contexts";

export { NavbarWrapper } from "./Wrapper";
export { NavbarList } from "./List";
export { NavbarItem } from "./Item";
export { NavbarLink } from "./Link";

export type { NavbarProps } from "./Wrapper";
export type { NavbarListProps } from "./List";
export type { NavbarItemProps } from "./Item";
export type { NavbarLinkProps } from "./Link";
