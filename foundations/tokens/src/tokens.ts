import { colorTokens } from "./models/colors/tokens";
import type { ColorTokens } from "./models/colors/types";
import { elevationTokens, type ElevationTokens } from "./models/elevation";
import { opacityTokens, type OpacityTokens } from "./models/opacity";
import { radiusTokens, type RadiusTokens } from "./models/radius";
import { spacingTokens, type SpacingTokens } from "./models/spacing";
import { typographyTokens, type TypographyTokens } from "./models/typography";
import { zIndexTokens, type ZIndexTokens } from "./models/z-index";

export interface DesignTokens {
  colors: ColorTokens;
  elevation: ElevationTokens;
  opacity: OpacityTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  zIndex: ZIndexTokens;
}

export const tokens: DesignTokens = {
  colors: colorTokens,
  elevation: elevationTokens,
  opacity: opacityTokens,
  radius: radiusTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  zIndex: zIndexTokens,
};
