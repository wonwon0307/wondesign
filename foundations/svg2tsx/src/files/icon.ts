import { readFile } from "node:fs/promises";
import { basename, join, relative } from "node:path";
import { transform } from "@svgr/core";

import { Converter } from "@/converter";
import { atomicWrite } from "@/lib/atomicWrite";
import { kebabToPascal } from "@/lib/format";

export class IconFile {
  private readonly familyName: string;
  private readonly srcPath: string;
  private readonly relPath: string;
  private readonly outPath: string;
  private readonly svgName: string;
  private svgContent: string;
  private readonly componentName: string;
  private scanned: boolean;

  constructor(srcPath: string, familyName: string) {
    const relPath = relative(process.cwd(), srcPath);
    const name = basename(relPath, ".svg");
    Converter.registry.validateName(name, relPath);
    const componentName = `${kebabToPascal(name)}${Converter.config.getConfig(familyName).suffix}`;

    this.familyName = familyName;
    this.srcPath = srcPath;
    this.relPath = relPath;
    this.outPath = join(
      Converter.config.getConfig(familyName).outDir,
      "components",
      `${componentName}.tsx`,
    );
    this.svgName = name;
    this.svgContent = "";
    this.componentName = componentName;
    this.scanned = false;
  }

  public async scan(): Promise<{ svgName: string; componentName: string }> {
    const content = await readFile(this.srcPath, "utf-8");

    Converter.registry.validateContent(content, this.relPath);

    this.svgContent = content;
    this.scanned = true;

    return { svgName: this.svgName, componentName: this.componentName };
  }

  public async save(): Promise<void> {
    if (!this.scanned) {
      throw new Error(`Scan has not been performed. Call scan() before save()`);
    }
    const content = await transform(
      this.svgContent,
      Converter.config.getConfig(this.familyName).svgrOptions,
      {
        componentName: this.componentName,
      },
    );

    await atomicWrite(this.outPath, content);
  }
}
