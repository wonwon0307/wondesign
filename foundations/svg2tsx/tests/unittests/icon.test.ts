import { Converter } from "@/converter";
import { IconFile } from "@/files/icon";

describe("IconFile - corner cases", () => {
  vi.spyOn(Converter.config, "getConfig").mockReturnValue({
    mode: "barrel",
    suffix: "",
    facadeSuffix: "Icon",
    srcDir: "testsrc",
    outDir: "testout",
    svgrOptions: {},
  });

  it("throws an error if save() is called before scan()", async () => {
    const iconFile = new IconFile("test.svg", "test-family");
    await expect(iconFile.save()).rejects.toThrow(
      "Scan has not been performed. Call scan() before save()",
    );
  });
});
