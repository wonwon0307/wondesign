import {
  CollapsibleProvider,
  CollapsibleContent,
  CollapsibleToggle,
} from "@wondesign/headless/Collapsible";
import { AppIcon } from "@wondesign/icons";
import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { SidebarItemWrapper } from "../fragments/Wrapper";
import { styles } from "./styles.css";

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  label: string;
  right?: React.ReactNode;
  defaultOpen?: boolean;
  collapsedBehavior?: "hide" | "flatten";
}

export function SidebarGroup({
  children,
  label,
  right,
  defaultOpen = true,
  collapsedBehavior = "hide",
  className,
  ...rest
}: Readonly<SidebarGroupProps>) {
  const { state } = useSidebarInternal();
  const isHeaderHidden = state !== "expanded";
  const isSubitemsHidden = collapsedBehavior === "hide" && state !== "expanded";
  const forceVisible = collapsedBehavior === "flatten" && state !== "expanded";

  return (
    <CollapsibleProvider defaultOpen={defaultOpen} keepMounted>
      <SidebarItemWrapper {...rest} className={clsx(styles.group, className)}>
        <div
          className={styles.header({ hide: isHeaderHidden })}
          aria-hidden={isHeaderHidden}
        >
          <div className={styles.headerLeft}>
            <span>{label}</span>
            <AppIcon icon="chevron-right" className={styles.icon} />
          </div>
          <div className={styles.headerRight}>{right}</div>
          <CollapsibleToggle
            aria-label={`Toggle ${label} subitems`}
            className={styles.overlayToggle}
          />
        </div>
        <CollapsibleContent asChild>
          <ul
            className={styles.subitems({ hide: isSubitemsHidden })}
            hidden={isSubitemsHidden}
            aria-hidden={isSubitemsHidden}
            data-force-visible={forceVisible || undefined}
          >
            {children}
          </ul>
        </CollapsibleContent>
      </SidebarItemWrapper>
    </CollapsibleProvider>
  );
}
