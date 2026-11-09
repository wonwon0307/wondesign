import { AppIcon, type IconName } from "@wondesign/icons";
import { Spinner } from "@wondesign/loading/Spinner";
import { clsx } from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "./styles.css";

export type IconButtonProps = Omit<PressableProps, "children"> & {
  fallback?: React.ReactNode;
  appearance?: "filled" | "outlined" | "ghost";
  size?: string | number;
  rounded?: boolean;
  spacious?: boolean;
} & (
    | {
        children?: never;
        icon: IconName;
      }
    | {
        children: React.ReactNode;
        icon?: never;
      }
  );

export function IconButton({
  icon,
  children,
  fallback,
  appearance = "outlined",
  rounded = false,
  spacious = false,
  size = "1em",
  isLoading = false,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<IconButtonProps>) {
  const defaultLabel = icon ? `${icon} icon button` : "icon button";

  const content = icon ? <AppIcon icon={icon} size={size} /> : children;

  return (
    <Pressable
      {...rest}
      isLoading={isLoading}
      className={clsx(
        styles.iconButton({ appearance, rounded, spacious }),
        className,
      )}
      aria-label={ariaLabel ?? defaultLabel}
    >
      {isLoading ? (
        <>
          <span className={styles.hide}>{content}</span>
          <span className={styles.overlay}>
            {fallback ?? <Spinner size={size} />}
          </span>
        </>
      ) : (
        content
      )}
    </Pressable>
  );
}
