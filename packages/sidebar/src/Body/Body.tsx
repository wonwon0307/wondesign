import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { HeadlessBody, type HeadlessBodyProps } from "./Headless";
import { styles } from "./styles.css";

export interface SidebarBodyProps extends HeadlessBodyProps {
  appearance?: "default" | "floating" | "inset";
}

export function SidebarBody({
  children,
  appearance = "default",
  className,
  ...rest
}: Readonly<SidebarBodyProps>) {
  const { state } = useSidebarInternal();

  return (
    <HeadlessBody
      {...rest}
      className={clsx(styles.sidebar({ appearance, state }), className)}
      data-appearance={appearance}
    >
      {children}
    </HeadlessBody>
  );
}
