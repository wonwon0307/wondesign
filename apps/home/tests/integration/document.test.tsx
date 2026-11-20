import { render } from "@testing-library/react";
import * as Navigation from "next/navigation";
import * as DocsPages from "@wondocs/core/pages";
import * as WondocsSidebar from "@wondocs/core/sidebar";

import { DocumentLayout, DocumentPage } from "@/pages/document";
import {
  testPageComponent,
  testPageData,
  testSidebarItems,
} from "@/tests/testdata";

describe("Document", () => {
  const params = Promise.resolve({
    slug: ["test-slug"],
  });
  const tabParams = Promise.resolve({
    slug: ["test-slug", "overview"],
  });
  vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
    if (path === "/test-slug") {
      return testPageData.withTabs;
    }
    return testPageData.tab;
  });

  it("loads and renders document page correctly", async () => {
    vi.spyOn(DocsPages, "getPage").mockReturnValueOnce(testPageData.normal);
    const jsx = await DocumentPage({ params });
    const { getByTestId, getByText } = render(
      <DocumentLayout>{jsx}</DocumentLayout>,
    );

    expect(getByText("Example Page Title")).toBeTruthy();
    expect(getByText("Example Page Description")).toBeTruthy();
    expect(getByTestId("page-content")).toBeTruthy();

    // sidebar도 확인
    expect(getByText("Test Link")).toBeTruthy();
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Nested Link 1")).toBeTruthy();
    expect(getByText("Nested Link 2")).toBeTruthy();
  });

  it("warns on console if separator is detected in sidebar", async () => {
    vi.spyOn(DocsPages, "getPage").mockReturnValueOnce(testPageData.normal);
    vi.spyOn(WondocsSidebar, "getSidebar").mockReturnValue([
      ...testSidebarItems,
      { type: "separator" },
    ] as WondocsSidebar.DocsItem[]);
    const jsx = await DocumentPage({ params });
    render(<DocumentLayout>{jsx}</DocumentLayout>);

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Unknown sidebar item"),
      expect.objectContaining({ type: "separator" }),
    );
  });

  it("does not warn on console in production, even if separator is detected", async () => {
    vi.spyOn(DocsPages, "getPage").mockReturnValueOnce(testPageData.normal);
    vi.spyOn(WondocsSidebar, "getSidebar").mockReturnValue([
      ...testSidebarItems,
      { type: "separator" },
    ] as WondocsSidebar.DocsItem[]);
    vi.stubEnv("NODE_ENV", "production");
    const jsx = await DocumentPage({ params });
    render(<DocumentLayout>{jsx}</DocumentLayout>);

    expect(console.warn).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });

  describe("tabs", () => {
    vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
      if (path === "/test-slug") {
        return testPageData.withTabs;
      }
      return testPageData.tab;
    });

    it("renders a page with tabs correctly", async () => {
      const tabParams = Promise.resolve({
        slug: ["test-slug", "overview"],
      });

      const jsx = await DocumentPage({
        params: tabParams,
      });
      const { getByText } = render(jsx);

      expect(getByText("Example Page Content")).toBeTruthy();
      expect(getByText("Overview")).toBeTruthy();
      expect(getByText("API")).toBeTruthy();

      expect(DocsPages.getPage).toHaveBeenCalledWith("/test-slug/overview");
      expect(DocsPages.getPage).toHaveBeenCalledWith("/test-slug");
      expect(DocsPages.getPageChildren).toHaveBeenCalledWith("/test-slug");
    });

    it("redirects to the overview tab when landing on a tabs index page", async () => {
      await DocumentPage({
        params,
      });

      expect(Navigation.redirect).toHaveBeenCalledWith(
        "/test-slug/overview",
        "replace",
      );
      expect(DocsPages.getPage).toHaveBeenCalledWith("/test-slug");
      expect(DocsPages.getPageChildren).toHaveBeenCalledWith("/test-slug");
    });

    it("redirects to the first tab when landing on a tabs index page, and overview doesn't exist", async () => {
      vi.spyOn(DocsPages, "getPageChildren").mockReturnValue([
        {
          url: "/test-slug/test-tab",
          component: testPageComponent,
          meta: null,
          toc: [],
        },
      ]);
      await DocumentPage({
        params,
      });

      expect(Navigation.redirect).toHaveBeenCalledWith(
        "/test-slug/test-tab",
        "replace",
      );
      expect(DocsPages.getPage).toHaveBeenCalledWith("/test-slug");
      expect(DocsPages.getPageChildren).toHaveBeenCalledWith("/test-slug");
    });
  });

  describe("not-found", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    afterAll(() => {
      vi.restoreAllMocks();
    });

    it("redirects to 404 if document is not found on page render", async () => {
      vi.spyOn(DocsPages, "getPage").mockThrowOnce(
        new Error("Document not found"),
      );

      await expect(
        DocumentPage({
          params,
        }),
      ).rejects.toThrow();

      expect(Navigation.notFound).toHaveBeenCalled();
    });

    it("redirects to 404 and warns on console when type is tabs, but no children exist", async () => {
      vi.spyOn(DocsPages, "getPageChildren").mockReturnValue([]);

      await expect(() => DocumentPage({ params })).rejects.toThrow();

      expect(Navigation.notFound).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          `No children documents found for a tabs page "/test-slug".`,
        ),
      );
    });

    it("does not warn on console in production environment when type is tabs but no children exist", async () => {
      vi.spyOn(DocsPages, "getPageChildren").mockReturnValue([]);
      vi.stubEnv("NODE_ENV", "production");

      await expect(() => DocumentPage({ params })).rejects.toThrow();

      expect(Navigation.notFound).toHaveBeenCalledOnce();
      expect(console.warn).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it("redirects to 404 and warns on console when metadata is not available", async () => {
      vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
        if (path === "/test-slug") {
          throw new Error("Page does not exist");
        }
        return testPageData.tab;
      });

      await expect(() => DocumentPage({ params: tabParams })).rejects.toThrow();

      expect(Navigation.notFound).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(`No meta found for "/test-slug/overview".`),
      );
    });

    it("does not warn on console in production environment when metadata is not available", async () => {
      vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
        if (path === "/test-slug") {
          throw new Error("Page does not exist");
        }
        return testPageData.tab;
      });
      vi.stubEnv("NODE_ENV", "production");

      await expect(() => DocumentPage({ params: tabParams })).rejects.toThrow();

      expect(Navigation.notFound).toHaveBeenCalledOnce();
      expect(console.warn).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });
  });
});
