import * as fs from "node:fs/promises";
import * as fg from "fast-glob";
import * as jiti from "jiti";

import { Converter } from "@/converter";
import { logger } from "@/lib/logger";
import { testOptions } from "@/tests/testdata/config";

describe("svg2tsx - scan failure tests", () => {
  vi.spyOn(fs, "readFile").mockResolvedValue("<svg>test</svg>");
  // @ts-expect-error test mock
  vi.spyOn(jiti, "createJiti").mockReturnValue({
    import: vi.fn().mockResolvedValue(testOptions),
  });

  it("fails the converter on duplicate svg names", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["test.svg", "test.svg"]);
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Duplicate icon name"),
    );
  });

  it("fails the converter on duplicate svg contents", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["test.svg", "test2.svg"]);
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Duplicate SVG content"),
    );
  });

  it("fails the converter on empty svg content", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["empty.svg"]);
    vi.spyOn(fs, "readFile").mockResolvedValue("   ");
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Empty SVG content"),
    );
  });

  it("fails the converter if no svg files are found", async () => {
    vi.spyOn(fg, "default").mockResolvedValue([]);
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("No SVG files found"),
    );
  });

  it("fails the converter if an invalid svg file is found", async () => {
    // invalid SVG name (not kebab-case)
    vi.spyOn(fg, "default").mockResolvedValue(["InvalidName.svg"]);
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Invalid icon name: "),
    );
  });
});
