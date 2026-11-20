import fg from "fast-glob";

import { ConfigManager } from "./config/manager";
import { clean } from "./lib/clean";
import { logger } from "./lib/logger";
import { FacadeFile } from "./files/facade";
import { IconFile } from "./files/icon";
import { IconMapFile } from "./files/iconMap";
import { IndexFile } from "./files/indexFile";
import { Registry } from "./registry";

export class Converter {
  private families: string[];

  private readonly iconFiles: IconFile[];
  private readonly iconMapFiles: Map<string, IconMapFile>;
  private readonly facadeFiles: Map<string, FacadeFile>;
  private readonly indexFiles: Map<string, IndexFile>;

  public static readonly config = new ConfigManager();
  public static readonly registry = new Registry();

  constructor() {
    Converter.config.reset();
    Converter.registry.reset();

    this.families = [];
    this.iconFiles = [];
    this.iconMapFiles = new Map();
    this.facadeFiles = new Map();
    this.indexFiles = new Map();
  }

  public async run(filePath?: string, dryRun: boolean = false): Promise<void> {
    const startTime = performance.now();

    try {
      await Converter.config.loadConfig(filePath);
      this.families = Converter.config.getFamilies();

      await Promise.all(this.families.map((family) => this.scanFamily(family)));

      if (!dryRun) {
        await Promise.all(
          this.families.map((family) =>
            clean(Converter.config.getConfig(family).outDir),
          ),
        );
        await this.saveFiles();
      }
    } catch (error) {
      logger.error("[WonDesign SVG2TSX] ❌ Generation failed:");
      logger.error(`  ${String(error)}`);
      process.exit(1);
    }

    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    if (dryRun) {
      logger.info(`🔍 [Dry Run] No files written. Completed in ${duration}s`);
    } else {
      logger.success(
        `✨ [Success] Generated ${this.iconFiles.length} components in ${duration}s`,
      );
    }
  }

  private async scanFamily(familyName: string) {
    this.indexFiles.set(familyName, new IndexFile(familyName));

    if (Converter.config.getConfig(familyName).mode !== "barrel") {
      this.facadeFiles.set(familyName, new FacadeFile(familyName));
      this.iconMapFiles.set(familyName, new IconMapFile(familyName));
    }

    const svgFiles = await fg(`*.svg`, {
      cwd: Converter.config.getConfig(familyName).srcDir,
      followSymbolicLinks: false,
      absolute: true,
    });

    if (svgFiles.length === 0) {
      throw new Error(
        `No SVG files found in the source directory: ${Converter.config.getConfig(familyName).srcDir}`,
      );
    }

    const scannedIcons = await Promise.all(
      svgFiles.map(async (absSvgPath) => {
        const iconFile = new IconFile(absSvgPath, familyName);
        const { svgName, componentName } = await iconFile.scan();
        return { iconFile, svgName, componentName };
      }),
    );

    for (const { iconFile, svgName, componentName } of scannedIcons) {
      this.iconFiles.push(iconFile);
      this.iconMapFiles.get(familyName)?.addIcon(svgName, componentName);

      if (Converter.config.getConfig(familyName).mode !== "facade") {
        this.indexFiles.get(familyName)!.addIcon(componentName);
      }
    }
  }

  private async saveFiles(): Promise<void> {
    const tasks: Promise<void>[] = [];

    for (const familyName of this.families) {
      tasks.push(this.indexFiles.get(familyName)!.save(familyName));

      if (this.facadeFiles.has(familyName)) {
        tasks.push(this.facadeFiles.get(familyName)!.save());
      }

      if (this.iconMapFiles.has(familyName)) {
        tasks.push(this.iconMapFiles.get(familyName)!.save());
      }
    }

    tasks.push(...this.iconFiles.map((iconFile) => iconFile.save()));

    await Promise.all(tasks);
  }
}
