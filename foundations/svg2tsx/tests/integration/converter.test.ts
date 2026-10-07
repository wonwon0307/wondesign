import * as fs from "node:fs";
import * as fg from "fast-glob";
import * as jiti from "jiti";

import { Converter } from "@/converter";
import { atomicWrite } from "@/lib/atomicWrite";
import { clean } from "@/lib/clean";
import { logger } from "@/lib/logger";
import { testOptions, testOptionsMulti } from "@/tests/testdata/config";

describe("svg2tsx - converter tests", () => {
  it("generates correct files and content in barrel mode", async () => {
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValueOnce({
      import: vi.fn().mockResolvedValueOnce({
        ...testOptions,
        mode: "barrel",
      }),
    });
    const converter = new Converter();

    await converter.run();

    expect(clean).toHaveBeenCalledTimes(1);
    expect(atomicWrite).toHaveBeenCalledTimes(3); // 2 component files + 1 barrel file
  });

  it("generates correct files and content in facade mode", async () => {
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValueOnce({
      import: vi.fn().mockResolvedValueOnce({
        ...testOptions,
        mode: "facade",
      }),
    });
    const converter = new Converter();

    await converter.run();

    expect(clean).toHaveBeenCalledTimes(1);
    expect(atomicWrite).toHaveBeenCalledTimes(5); // 2 component files + 1 facade file + 1 index file + 1 icon map file
  });

  it("generates correct files and content for multiple config groups (barrel mode)", async () => {
    vi.spyOn(fg, "default")
      .mockResolvedValueOnce(["test1.svg"])
      .mockResolvedValueOnce(["test2.svg"]);
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValueOnce({
      import: vi.fn().mockResolvedValueOnce(testOptionsMulti),
    });
    const converter = new Converter();

    await converter.run();

    expect(clean).toHaveBeenCalledTimes(2);
    expect(atomicWrite).toHaveBeenCalledTimes(6); // 2 component files + 2 barrel files + 1 facade file + 1 icon map file
  });

  it("generates correct files and content with multiple srcDirs", async () => {
    vi.spyOn(fg, "default")
      .mockResolvedValueOnce(["test1.svg"])
      .mockResolvedValueOnce(["test2.svg"]);
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValueOnce({
      import: vi.fn().mockResolvedValueOnce({
        ...testOptions,
        mode: "facade",
        entry: [
          {
            srcDir: "src/icons",
            outDir: "testout",
          },
          {
            srcDir: "src/icons2",
            outDir: "testout2",
          },
        ],
      }),
    });
    const converter = new Converter();

    await converter.run();

    expect(clean).toHaveBeenCalledTimes(2);
    expect(atomicWrite).toHaveBeenCalledTimes(8); // 2 component files + 2 facade file + 2 index file + 2 icon map file
  });

  it("preserves pre-existing facade file", async () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue("Existing Facade");
    // @ts-expect-error test mock
    vi.spyOn(jiti, "createJiti").mockReturnValueOnce({
      import: vi.fn().mockResolvedValueOnce({ ...testOptions, mode: "facade" }),
    });

    const converter = new Converter();

    await converter.run();
    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining("TestsrcIcon"), // family name + facade suffix
      "utf-8",
    );
    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("TestsrcIcon"),
      "Existing Facade",
    );
  });

  it("doesn't generate files in a dry run", async () => {
    const converter = new Converter();

    await converter.run(undefined, true);

    expect(clean).toHaveBeenCalledTimes(0);
    expect(atomicWrite).toHaveBeenCalledTimes(0);
  });

  it("generates correct files and content with user set config file", async () => {
    const converter = new Converter();

    await converter.run("path/to/config/file");

    expect(clean).toHaveBeenCalledTimes(1);
    expect(atomicWrite).toHaveBeenCalledTimes(3); // 2 component files + 1 barrel file
  });

  it("generates with default options if config file doesn't exist in default path", async () => {
    // @ts-expect-error test mock
    vi.spyOn(fs, "existsSync").mockImplementation((filePath: string) => {
      if (filePath.includes("svg2tsx.config.ts")) return false;
      return true;
    });
    const converter = new Converter();

    await converter.run();

    expect(logger.info).toHaveBeenCalledWith(
      "No config file... Processing with default config.",
    );
    expect(clean).toHaveBeenCalledTimes(1);
    expect(atomicWrite).toHaveBeenCalledTimes(3); // 2 component files + 1 barrel file
  });
});
