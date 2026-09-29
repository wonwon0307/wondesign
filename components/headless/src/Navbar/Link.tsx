import { Anchor, type AnchorProps } from "@/Anchor/Anchor";
import { useNavbarItem, useNavbarList } from "./contexts";

export interface NavbarLinkProps extends Omit<AnchorProps, "isDisabled"> {
  isActive?: boolean;
}

export function NavbarLink({
  isActive = false,
  ...rest
}: Readonly<NavbarLinkProps>) {
  const { isDisabled } = useNavbarItem();
  const { orientation } = useNavbarList();

  return (
    <Anchor
      {...rest}
      isDisabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      data-orientation={orientation}
    />
  );
}
