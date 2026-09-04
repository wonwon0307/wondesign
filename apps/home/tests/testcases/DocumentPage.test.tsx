/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react";
import * as Next from "next/navigation";
import * as DocsPages from "@wondocs/core/pages";

import { generateMetadata } from "@/pages/document/metadata";
import { DocumentPage } from "@/pages/document/page";

describe("DocumentPage", () => {
  const params = Promise.resolve({
    collection: "test-collection",
    slug: ["test-slug"],
  });

  it("loads and renders document page correctly", async () => {
    const jsx = await DocumentPage({ params });
    const { getByText } = render(jsx);

    expect(getByText("Example Page Content")).toBeTruthy();
  });

  it("renders a components document page correctly", async () => {
    vi.spyOn(DocsPages, "getPage").mockReturnValueOnce({
      component: () =>
        Promise.resolve({
          default: () => (
            <div data-testid="page-content">Example Page Content</div>
          ),
        }),
      meta: {
        title: "Components Page",
        description: "This is a components page.",
        type: "component",
      },
      toc: [],
    } as any);

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

  it("redirects correctly when it is given in the metadata (frontmatter)", async () => {
    vi.spyOn(DocsPages, "getPage").mockReturnValue({
      component: () =>
        Promise.resolve({
          default: () => (
            <div data-testid="page-content">Example Page Content</div>
          ),
        }),
      meta: {
        title: "Redirect Page",
        description: "This page redirects to another page.",
        redirect: "/new-page",
      },
      toc: [],
    } as any);

    // next/navigation's redirect() never returns — it throws to halt rendering.
    vi.mocked(Next.redirect).mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    await expect(
      DocumentPage({
        params,
      }),
    ).rejects.toThrow();

    expect(Next.redirect).toHaveBeenCalledWith("/new-page", "replace");

    vi.mocked(Next.redirect).mockReset();
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
