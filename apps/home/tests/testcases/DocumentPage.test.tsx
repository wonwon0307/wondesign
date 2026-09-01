import { render } from "@testing-library/react";
import * as Next from "next/navigation";
import * as DocsPages from "@wondocs/core/pages";

import { DocumentPage, generateMetadata } from "@/pages/documents";

describe("DocumentPage", () => {
  const params = Promise.resolve({
    collection: "test-collection",
    slug: ["test-slug"],
  });

  it("loads and renders document page correctly", async () => {
    const jsx = await DocumentPage({
      params,
    });
    const { getByText } = render(jsx);

    expect(getByText("Example Page Content")).toBeTruthy();
  });

  it("generates metadata correctly", async () => {
    const metadata = await generateMetadata({
      params,
    });

    expect(metadata.title).toBe("Example Page Title");
    expect(metadata.description).toBe("Example Page Description");
  });

  it("redirects to 404 if document is not found on page render", async () => {
    vi.spyOn(DocsPages, "getPage").mockThrow(new Error("Document not found"));

    await expect(
      DocumentPage({
        params,
      }),
    ).rejects.toThrow();

    expect(Next.notFound).toHaveBeenCalled();
  });

  it("redirects to 404 if document is not found on generateMetadata", async () => {
    vi.spyOn(DocsPages, "getPage").mockThrow(new Error("Document not found"));

    await expect(
      generateMetadata({
        params,
      }),
    ).rejects.toThrow();

    expect(Next.notFound).toHaveBeenCalled();
  });
});
