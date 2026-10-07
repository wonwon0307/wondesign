import { existsSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

import { readConfigFile } from "./readConfigFile";
import type { FamilyConfig } from "./types";

const DEFAULT_CONFIG_PATH = "svg2tsx.config.ts";

export class ConfigManager {
  private readonly configMap: Map<string, FamilyConfig>;

  constructor() {
    this.configMap = new Map();
  }

  public getConfig(familyName: string): FamilyConfig {
    const config = this.configMap.get(familyName);

    if (!config) {
      throw new Error(`Config for family "${familyName}" not found.`);
    }

    return config;
  }

  public async loadConfig(filePath?: string): Promise<void> {
    const validatedPath = this.validatePath(filePath);
    const configs = await readConfigFile(validatedPath);

    for (const { entry, ...groupConfig } of configs) {
      const entries = Array.isArray(entry) ? entry : [entry];

      for (const entry of entries) {
        const { name, srcDir, outDir } = entry;
        const familyName = name ?? basename(srcDir);
        const absSrcDir = this.getAbsDir(srcDir);
        const absOutDir = this.getAbsDir(outDir);

        if (this.configMap.has(familyName)) {
          throw new Error(
            `Duplicate srcDir detected. Please ensure each srcDir is unique: "${absSrcDir}".`,
          );
        }

        this.configMap.set(familyName, {
          ...groupConfig,
          srcDir: absSrcDir,
          outDir: absOutDir,
        });
      }
    }
  }

  public getFamilies(): string[] {
    return Array.from(this.configMap.keys());
  }

  public reset(): void {
    this.configMap.clear();
  }

  private validatePath(path?: string): string | null {
    // 유저가 설정 파일을 지정했을 경우
    if (path) {
      if (path.includes("..")) {
        throw new Error("Relative paths with '..' are not allowed.");
      }

      const absPath = join(process.cwd(), path);

      // 파일이 존재하지 않으면 오류
      if (!existsSync(absPath)) {
        throw new Error(`Config file not found: "${absPath}".`);
      }

      return absPath;
    }

    const defaultPath = join(process.cwd(), DEFAULT_CONFIG_PATH);

    if (!existsSync(defaultPath)) {
      return null;
    }

    return defaultPath;
  }

  private getAbsDir(dir: string): string {
    const resolvedDir = resolve(dir);
    const rel = relative(process.cwd(), resolvedDir);
    // dir는 relative로 들어온다
    if (!rel || rel.startsWith("..")) {
      throw new Error(
        `Invalid directory: "${dir}". ` +
          `srcDir and outDir must be a subdirectory of the current working directory. ` +
          `Please specify a valid source directory within the project.`,
      );
    }

    const abs = join(process.cwd(), dir);

    return abs;
  }
}
