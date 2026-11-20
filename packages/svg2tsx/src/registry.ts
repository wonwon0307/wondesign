import { createHash } from "node:crypto";

export class Registry {
  private readonly names: Map<string, string>; // iconName -> filePath
  private readonly contents: Map<string, string>; // contentHash -> filePath

  constructor() {
    this.names = new Map();
    this.contents = new Map();
  }

  public validateName(name: string, relPath: string): void {
    const existingNameFile = this.names.get(name);
    if (existingNameFile) {
      throw new Error(
        `Duplicate icon name "${name}" found in files:\n` +
          ` - ${existingNameFile}\n` +
          ` - ${relPath}\n` +
          `Please remove or rename one of the files to resolve the conflict.`,
      );
    }
    this.names.set(name, relPath);
  }

  public validateContent(content: string, relPath: string): void {
    if (!content.trim()) {
      throw new Error(
        `Empty SVG content detected in file: "${relPath}". ` +
          `Please ensure the file contains valid SVG data.`,
      );
    }
    const hash = createHash("sha256").update(content).digest("hex");
    const existingContentFile = this.contents.get(hash);
    if (existingContentFile) {
      throw new Error(
        `Duplicate SVG content detected in files:\n` +
          ` - ${existingContentFile}\n` +
          ` - ${relPath}\n` +
          `Please remove or modify one of the files to resolve the conflict.`,
      );
    }
    this.contents.set(hash, relPath);
  }

  public reset(): void {
    this.names.clear();
    this.contents.clear();
  }
}
