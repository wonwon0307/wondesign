import { AppIcon, type IconName } from "@wondesign/icons";
import { clsx } from "clsx";

import { Heading } from "@/Heading/Heading";
import { Paragraph } from "@/Paragraph/Paragraph";
import { styles } from "./styles.css";

export interface CalloutProps {
  children: React.ReactNode;
  variant?: "info" | "warning" | "error" | "success";
  title?: React.ReactNode;
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
        return 6;
      case "large":
        return 4;
      default:
        return 5;
    }
  };

  return (
    <div className={clsx(styles.callout({ variant }), className)} style={style}>
      <div className={styles.icon({ size, hasTitle: !!title })}>
        {typeof icon === "string" ? <AppIcon icon={icon as IconName} /> : icon}
      </div>
      {title && typeof title === "string" ? (
        <Heading level={headingLevel()} className={styles.title}>
          {title}
        </Heading>
      ) : (
        <div className={styles.title}>{title}</div>
      )}
      {typeof children === "string" ? (
        <Paragraph
          size={size}
          className={styles.paragraph({ hasTitle: !!title })}
        >
          {children}
        </Paragraph>
      ) : (
        <div className={styles.paragraph({ hasTitle: !!title })}>
          {children}
        </div>
      )}
    </div>
  );
}
