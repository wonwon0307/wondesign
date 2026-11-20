import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Converter } from "@/converter";
import { atomicWrite } from "@/lib/atomicWrite";
import { kebabToPascal } from "@/lib/format";
import { logger } from "@/lib/logger";

export class FacadeFile {
  private readonly componentName: string;
  private readonly outPath: string;
  private content: string;

  constructor(familyName: string) {
    const componentName = `${kebabToPascal(familyName)}${Converter.config.getConfig(familyName).facadeSuffix}`;
    const outPath = join(
      Converter.config.getConfig(familyName).outDir,
      `${componentName}.tsx`,
    );

    this.componentName = componentName;
    this.outPath = outPath;
    this.content = "";
    this.prepare(outPath);
  }

  private prepare(filePath: string): void {
    const existingContent = this.readExisting(filePath);

    if (existingContent !== null) {
      logger.info(`Facade component already exists, preserving: ${filePath}`);
      this.content = existingContent;
      return;
    }

    const content = [
      `import type { IconProps } from "@wondesign/svg2tsx";`,
      "",
      `import { iconMap, type IconName } from "./iconMap";`,
      "",
      "type Props = IconProps & { icon: IconName };",
      "",
      `export function ${this.componentName}({ icon, ...rest }: Readonly<Props>) {`,
      "  const IconComponent = iconMap[icon];",
      "",
      "  if (!IconComponent) {",
      "    console.warn(`Icon not found: ${icon}`);",
      "    return null;",
      "  }",
      "",
      "  return <IconComponent {...rest} />;",
      "}",
      "",
    ];

    this.content = content.join("\n");
  }

  private readExisting(filePath: string): string | null {
    try {
      return readFileSync(filePath, "utf-8");
    } catch {
      return null;
    }
  }

  public async save(): Promise<void> {
    await atomicWrite(this.outPath, this.content);
  }
}
