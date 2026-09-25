import { render } from "@testing-library/react";
import * as Next from "next/navigation";
import * as DocsPages from "@wondocs/core/pages";

import { DocumentPage } from "@/pages/document";
import { testPageComponent, testPageData } from "@/tests/testdata/document";

describe("DocumentPage - with tabs", () => {
  vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
    if (path === "/test-collection/test-slug") {
      return testPageData.withTabs;
    }
    return testPageData.tab;
  });
  const params = Promise.resolve({
    collection: "test-collection",
    slug: ["test-slug"],
  });

  it("renders a page with tabs correctly", async () => {
    const tabParams = Promise.resolve({
      collection: "test-collection",
      slug: ["test-slug", "overview"],
    });

    const jsx = await DocumentPage({
      params: tabParams,
    });
    const { getByText } = render(jsx);

    expect(getByText("Example Page Content")).toBeTruthy();
    expect(getByText("Overview")).toBeTruthy();
    expect(getByText("API")).toBeTruthy();

    expect(DocsPages.getPage).toHaveBeenCalledWith(
      "/test-collection/test-slug/overview",
    );
    expect(DocsPages.getPage).toHaveBeenCalledWith(
      "/test-collection/test-slug",
    );
    expect(DocsPages.getPageChildren).toHaveBeenCalledWith(
      "/test-collection/test-slug",
    );
  });

  it("redirects to the overview tab when landing on a tabs index page", async () => {
    await DocumentPage({
      params,
    });

    expect(Next.redirect).toHaveBeenCalledWith(
      "/test-collection/test-slug/overview",
      "replace",
    );
    expect(DocsPages.getPage).toHaveBeenCalledWith(
      "/test-collection/test-slug",
    );
    expect(DocsPages.getPageChildren).toHaveBeenCalledWith(
      "/test-collection/test-slug",
    );
  });

  it("redirects to the first tab when landing on a tabs index page, and overview doesn't exist", async () => {
    vi.spyOn(DocsPages, "getPageChildren").mockReturnValue([
      {
        url: "/test-collection/test-slug/test-tab",
        component: testPageComponent,
        meta: null,
        toc: [],
      },
    ]);
    await DocumentPage({
      params,
    });

    expect(Next.redirect).toHaveBeenCalledWith(
      "/test-collection/test-slug/test-tab",
      "replace",
    );
    expect(DocsPages.getPage).toHaveBeenCalledWith(
      "/test-collection/test-slug",
    );
    expect(DocsPages.getPageChildren).toHaveBeenCalledWith(
      "/test-collection/test-slug",
    );
  });
});
