import { join } from "node:path";

import { Converter } from "@/converter";
import { atomicWrite } from "@/lib/atomicWrite";

export class IconMapFile {
  private readonly outPath: string;
  // 최상단 import 라인
  private readonly lines: string[];
  // type IconName 정의 라인
  private readonly iconNameTypeLines: string[];
  // iconMap 레코드 정의 라인
  private readonly iconMapRecordLines: string[];

  constructor(familyName: string) {
    const outPath = join(
      Converter.config.getConfig(familyName).outDir,
      "iconMap.ts",
    );
    this.outPath = outPath;

    this.lines = [
      'import type { ComponentType } from "react";',
      'import type { IconProps } from "@wondesign/svg2tsx";',
      "",
    ];
    this.iconNameTypeLines = ["export type IconName ="];
    this.iconMapRecordLines = [
      "export const iconMap: Record<IconName, ComponentType<IconProps>> = {",
    ];
  }

  public addIcon(iconName: string, componentName: string): void {
    // 최상단에 import
    this.lines.push(
      `import { ${componentName} } from "./components/${componentName}";`,
    );
    this.iconNameTypeLines.push(`  | "${iconName}"`);
    this.iconMapRecordLines.push(`  "${iconName}": ${componentName},`);
  }

  public async save(): Promise<void> {
    const fullContent = [
      ...this.lines,
      "",
      this.iconNameTypeLines.join("\n") + ";",
      "",
      this.iconMapRecordLines.join("\n") + "};",
    ];
    const content = fullContent.join("\n");

    await atomicWrite(this.outPath, content);
  }
}
