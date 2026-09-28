import {
  CollapsibleProvider,
  CollapsibleContent,
} from "@wondesign/headless/Collapsible";
import { Tooltip } from "@wondesign/tooltip";

import { useSidebarInternal } from "@/contexts/sidebar";
import { SidebarItemWrapper } from "../fragments/Wrapper";
import { SidebarLink } from "../fragments/Link";
import { styles } from "./styles.css";

export interface SidebarItemProps extends HeaderProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  collapsedBehavior?: "self-only" | "flatten";
}

export function SidebarItem({
  children,
  defaultOpen = false,
  collapsedBehavior = "self-only",
  ...linkProps
}: Readonly<SidebarItemProps>) {
  const { state } = useSidebarInternal();
  const hasChildren = Boolean(children);

  if (hasChildren) {
    // forces subitems hidden when the sidebar itself collapses to icons,
    // independent of this item's own open/closed (accordion) state
    const hideChildren =
      collapsedBehavior === "self-only" && state === "collapsed";
    // forces subitems visible when flattened, overriding the accordion's
    // own closed state (there's no toggle UI to open it in icon mode)
    const forceVisible =
      collapsedBehavior === "flatten" && state === "collapsed";

    return (
      <CollapsibleProvider defaultOpen={defaultOpen} keepMounted>
        <SidebarItemWrapper className={styles.wrapper}>
          <Header {...linkProps} />
          <CollapsibleContent asChild>
            <ul
              className={styles.subitems({ hide: hideChildren })}
              hidden={hideChildren}
              aria-hidden={hideChildren}
              data-force-visible={forceVisible || undefined}
            >
              {children}
            </ul>
          </CollapsibleContent>
        </SidebarItemWrapper>
      </CollapsibleProvider>
    );
  }

  return (
    <SidebarItemWrapper className={styles.wrapper}>
      <Header {...linkProps} />
    </SidebarItemWrapper>
  );
}

interface HeaderProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  openInNewTab?: boolean;
}

function Header(props: Readonly<HeaderProps>) {
  const { state, collapse, side } = useSidebarInternal();

  const { label, isActive, isDisabled } = props;

  if (collapse === "icons" && state === "collapsed") {
    return (
      <Tooltip
        placement={side === "left" ? "right" : "left"}
        showDelay={200}
        text={label}
        asChild
      >
        <SidebarLink
          {...props}
          className={styles.item({ isActive, isDisabled, collapsed: true })}
        />
      </Tooltip>
    );
  }

  return (
    <SidebarLink
      {...props}
      className={styles.item({ isActive, isDisabled, collapsed: false })}
    />
  );
}
