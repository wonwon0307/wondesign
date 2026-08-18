import { render } from "@testing-library/react";

import { DocumentPage, generateMetadata } from "@/pages/documents";

describe("DocumentPage", () => {
  it("loads and renders document page correctly", async () => {
    const params = Promise.resolve({ slug: ["test-slug"] });
    const jsx = await DocumentPage({
      params,
    });
    const { getByText } = render(jsx);

    expect(getByText("Example Page Content")).toBeTruthy();
  });
});

describe("generateMetadata", () => {
  it("generates metadata correctly", async () => {
    const params = Promise.resolve({ slug: ["test-slug"] });
    const metadata = await generateMetadata({
      params,
    });

    expect(metadata.title).toBe("Example Page Title");
    expect(metadata.description).toBe("Example Page Description");
  });
});
