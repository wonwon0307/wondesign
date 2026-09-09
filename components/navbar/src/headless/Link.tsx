import {
  HeadlessAnchor,
  type HeadlessAnchorProps,
} from "@wondesign/links/Headless";

import { useNavbarItem } from "@/contexts/item";
import { useNavbarList } from "@/contexts/list";

export interface NavbarLinkProps extends Omit<
  HeadlessAnchorProps,
  "isDisabled"
> {
  isActive?: boolean;
}

export function NavbarLink({
  isActive = false,
  ...rest
}: Readonly<NavbarLinkProps>) {
  const { isDisabled } = useNavbarItem();
  const { orientation } = useNavbarList();

  return (
    <HeadlessAnchor
      {...rest}
      isDisabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      data-orientation={orientation}
    />
  );
}
