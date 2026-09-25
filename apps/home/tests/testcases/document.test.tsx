import { render } from "@testing-library/react";
import * as DocsPages from "@wondocs/core/pages";

import { DocumentPage, generateMetadata } from "@/pages/document";
import { testPageData } from "@/tests/testdata/document";

describe("DocumentPage", () => {
  const params = Promise.resolve({
    collection: "test-collection",
    slug: ["test-slug"],
  });

  it("loads and renders document page correctly", async () => {
    const jsx = await DocumentPage({ params });
    const { getByTestId, getByText } = render(jsx);

    expect(getByText("Example Page Title")).toBeTruthy();
    expect(getByText("Example Page Description")).toBeTruthy();
    expect(getByTestId("page-content")).toBeTruthy();
  });

  it("generates metadata correctly", async () => {
    const metadata = await generateMetadata({
      params,
    });

    expect(metadata.title).toBe(
      "Example Page Title | Test-collection | WonDesign",
    );
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
