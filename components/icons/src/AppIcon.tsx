import type { IconProps } from "@wondesign/svg2tsx";

import { iconMap, type IconName } from "./iconMap";

type Props = IconProps & { icon: IconName };

export function AppIcon({
  icon,
  size,
  role = "img",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-hidden": ariaHidden = true,
  ...rest
}: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.warn(`[WonDesign Icons] Icon not found: ${icon}`);
    return null;
  }

  return (
    <IconComponent
      {...rest}
      role={role}
      size={size}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaLabel || ariaLabelledBy ? undefined : ariaHidden}
    />
  );
}
