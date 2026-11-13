import { InlineCode } from "@wondesign/ui/Code";
import { AppIcon, type IconName } from "@wondesign/ui/Icons";

import { styles } from "./styles.css";

const allIcons: IconName[] = [
  "alert",
  "bell",
  "check",
  "check-circle",
  "check-fill",
  "chevron-down",
  "chevron-right",
  "color-theme",
  "copy",
  "copy-code",
  "download",
  "download-code",
  "error",
  "external-link",
  "info",
  "loading",
  "loading-bubble",
  "loading-line",
  "loading-tail",
  "package",
  "palette",
  "sidebar",
  "sidebar-arrow",
  "upload",
  "warning",
];

export function IconPreview() {
  return (
    <div className={styles.iconGrid}>
      {allIcons.map((icon) => (
        <div key={icon} className={styles.iconBox}>
          <AppIcon icon={icon} size={24} />
          <InlineCode>{icon}</InlineCode>
        </div>
      ))}
    </div>
  );
}
