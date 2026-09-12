import type { SemanticColors } from "@wondesign/colors";

import { colorTokens } from "./models/colors";
import { elevationTokens, type ElevationTokens } from "./models/elevation";
import { radiusTokens, type RadiusTokens } from "./models/radius";
import { spacingTokens, type SpacingTokens } from "./models/spacing";
import { textTokens, type TextTokens } from "./models/text";
import { typographyTokens, type TypographyTokens } from "./models/typography";
import { zIndexTokens, type ZIndexTokens } from "./models/z-index";
import { createSimpleBreakpointQueries } from "./utils/breakpoint-queries";

export type DesignTokens = {
  colors: SemanticColors;
  elevation: ElevationTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
  text: TextTokens;
  typography: TypographyTokens;
  zIndex: ZIndexTokens;
};

export const tokens: DesignTokens = {
  colors: { ...colorTokens },
  elevation: { ...elevationTokens },
  radius: { ...radiusTokens },
  spacing: { ...spacingTokens },
  text: { ...textTokens },
  typography: { ...typographyTokens },
  zIndex: { ...zIndexTokens },
};

export const mediaQueries = {
  breakpoints: createSimpleBreakpointQueries(),
  hoverable: "(hover: hover) and (pointer: fine)",
};
