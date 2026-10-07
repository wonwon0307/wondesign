import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import * as jiti from "jiti";

import { Converter } from "@/converter";
import { logger } from "@/lib/logger";
import { testOptions } from "@/tests/testdata/config";

describe("svg2tsx - scan failure tests", () => {
  vi.spyOn(fsPromises, "readFile").mockResolvedValue("<svg>test</svg>");

  it("fails the converter if config path with '..' is used", async () => {
    const converter = new Converter();

    await expect(converter.run("../some/relative/path")).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Relative paths with '..' are not allowed."),
    );
  });

  it("fails the converter if file is not found in user set config path", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValueOnce(false);
    const converter = new Converter();

    await expect(converter.run("/non/existent/path")).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Config file not found: "),
    );
  });

  it("fails the converter if duplicate srcDirs are found in the config", async () => {
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValue({
      import: vi.fn().mockResolvedValue({
        ...testOptions,
        entry: [
          {
            srcDir: "testsrc",
            outDir: "testout",
          },
          {
            srcDir: "testsrc",
            outDir: "testout2",
          },
        ],
      }),
    });
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Duplicate srcDir detected."),
    );
  });

  it("fails the converter if srcDir with '..' are found in the config", async () => {
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValue({
      import: vi.fn().mockResolvedValue({
        ...testOptions,
        entry: {
          srcDir: "../some/relative/path",
          outDir: "testout",
        },
      }),
    });
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "srcDir and outDir must be a subdirectory of the current working directory.",
      ),
    );
  });

  it("fails the converter if outDir with '..' are found in the config", async () => {
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValue({
      import: vi.fn().mockResolvedValue({
        ...testOptions,
        entry: {
          srcDir: "testsrc",
          outDir: "../some/relative/path",
        },
      }),
    });
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "srcDir and outDir must be a subdirectory of the current working directory.",
      ),
    );
  });

  it("fails the converter if jiti fails to load config", async () => {
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValueOnce({
      import: vi.fn().mockRejectedValueOnce(new Error("Failed to load config")),
    });
    const converter = new Converter();

    await expect(converter.run()).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Failed to load config"),
    );
  });
});
