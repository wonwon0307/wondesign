import { join } from "node:path";

import { Converter } from "@/converter";
import { atomicWrite } from "@/lib/atomicWrite";
import { kebabToPascal } from "@/lib/format";

export class IndexFile {
  private readonly outPath: string;
  private readonly lines: string[];

  constructor(familyName: string) {
    const outPath = join(
      Converter.config.getConfig(familyName).outDir,
      "index.ts",
    );
    this.outPath = outPath;
    this.lines = [];
  }

  public addIcon(componentName: string): void {
    this.lines.push(
      `export { ${componentName} } from "./components/${componentName}";`,
    );
  }

  public async save(familyName: string): Promise<void> {
    const facadeName =
      kebabToPascal(familyName) +
      Converter.config.getConfig(familyName).facadeSuffix;
    if (Converter.config.getConfig(familyName).mode !== "barrel") {
      const facadeLines = [
        `export { ${facadeName} } from "./${facadeName}";`,
        `export type { IconName } from "./iconMap";`,
        "",
        `export type { IconProps } from "@wondesign/svg2tsx";`,
      ];
      this.lines.push(...facadeLines);
    }
    const content = this.lines.join("\n");

    await atomicWrite(this.outPath, content);
  }
}
