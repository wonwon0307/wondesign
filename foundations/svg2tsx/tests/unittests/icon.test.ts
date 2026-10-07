import { Converter } from "@/converter";
import { IconFile } from "@/files/icon";
import { testOptions } from "@/tests/testdata/config";

describe("IconFile - corner cases", () => {
  beforeEach(() => {
    vi.spyOn(Converter.config, "getConfig").mockReturnValue({
      ...testOptions,
      srcDir: "testsrc",
      outDir: "testout",
    });
  });

  it("throws an error if save() is called before scan()", async () => {
    const iconFile = new IconFile("test.svg", "test-family");
    await expect(iconFile.save()).rejects.toThrow(
      "Scan has not been performed. Call scan() before save()",
    );
  });
});
