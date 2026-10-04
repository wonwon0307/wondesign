import { AppIcon, type IconName } from "@wondesign/icons";
import { clsx } from "clsx";

import { Heading } from "@/Heading/Heading";
import { Paragraph } from "@/Paragraph/Paragraph";
import { styles } from "./styles.css";

export interface CalloutProps {
  children: React.ReactNode;
  variant?: "info" | "warning" | "error" | "success";
  title?: string;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
}

function defaultIcon(variant: "info" | "warning" | "error" | "success") {
  switch (variant) {
    case "warning":
      return "warning";
    case "error":
      return "alert";
    case "success":
      return "check-fill";
    default:
      return "info";
  }
}

export function Callout({
  children,
  variant = "info",
  title,
  icon = defaultIcon(variant),
  size = "medium",
  className,
  style,
}: Readonly<CalloutProps>) {
  const headingLevel = () => {
    switch (size) {
      case "small":
        return 5;
      case "large":
        return 3;
      default:
        return 4;
    }
  };

  const iconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 28;
      default:
        return 24;
    }
  };

  return (
    <div
      className={clsx(styles.callout({ variant, size }), className)}
      style={style}
    >
      <div className={styles.icon}>
        {typeof icon === "string" ? (
          <AppIcon icon={icon as IconName} size={iconSize()} />
        ) : (
          icon
        )}
      </div>
      {title && (
        <Heading level={headingLevel()} className={styles.title}>
          {title}
        </Heading>
      )}
      <div className={styles.main}>
        {typeof children === "string" ? (
          <Paragraph size={size}>{children}</Paragraph>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
