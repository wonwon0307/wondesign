import * as DocsPages from "@wondocs/core/pages";

import { generateMetadata } from "@/pages/document";
import { testPageData } from "@/tests/testdata";

describe("document metadata", () => {
  const params = Promise.resolve({
    slug: ["test-slug"],
  });

  it("generates metadata correctly", async () => {
    const metadata = await generateMetadata({
      params,
    });

    expect(metadata.title).toBe("Example Page Title | WonDesign");
    expect(metadata.description).toBe("Example Page Description");
  });

  it("fallsback to default metadata when page metadata is not available", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(DocsPages, "getPage").mockReturnValue(testPageData.tab);
    const metadata = await generateMetadata({
      params,
    });

    expect(metadata.title).toBe("WonDesign");
    expect(metadata.description).toBe("WonDesign documentation");
  });
});
