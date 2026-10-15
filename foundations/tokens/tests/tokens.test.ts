import { colorTokens } from "@/models/colors/tokens";
import { elevationTokens } from "@/models/elevation";
import { opacityTokens } from "@/models/opacity";
import { radiusTokens } from "@/models/radius";
import { spacingTokens } from "@/models/spacing";
import { typographyTokens } from "@/models/typography";
import { zIndexTokens } from "@/models/z-index";
import { tokens } from "@/tokens";

describe("tokens", () => {
  it("tokens object should have all token categories with correct values", () => {
    expect(tokens).toBeDefined();
    expect(tokens.colors).toEqual(colorTokens);
    expect(tokens.elevation).toEqual(elevationTokens);
    expect(tokens.opacity).toEqual(opacityTokens);
    expect(tokens.radius).toEqual(radiusTokens);
    expect(tokens.spacing).toEqual(spacingTokens);
    expect(tokens.typography).toEqual(typographyTokens);
    expect(tokens.zIndex).toEqual(zIndexTokens);
  });
});
