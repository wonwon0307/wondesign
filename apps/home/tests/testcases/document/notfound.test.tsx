import * as Next from "next/navigation";
import * as DocsPages from "@wondocs/core/pages";

import { DocumentPage } from "@/pages/document";
import { testPageData } from "@/tests/testdata/document";

describe("DocumentPage - not found", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const params = Promise.resolve({
    collection: "test-collection",
    slug: ["test-slug"],
  });
  const tabParams = Promise.resolve({
    collection: "test-collection",
    slug: ["test-slug", "overview"],
  });
  vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
    if (path === "/test-collection/test-slug") {
      return testPageData.withTabs;
    }
    return testPageData.tab;
  });

  afterEach(() => {
    vi.clearAllMocks();
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

    expect(Next.notFound).toHaveBeenCalled();
  });

  it("calls notFound when type is tabs, but no children exist", async () => {
    vi.spyOn(DocsPages, "getPageChildren").mockReturnValue([]);

    await expect(() => DocumentPage({ params })).rejects.toThrow();

    expect(Next.notFound).toHaveBeenCalledOnce();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        `No children documents found for a tabs page "/test-collection/test-slug".`,
      ),
    );
  });

  it("calls notFound, but doesn't warn on console if type is tabs but no children exist in production environment", async () => {
    vi.spyOn(DocsPages, "getPageChildren").mockReturnValue([]);
    vi.stubEnv("NODE_ENV", "production");

    await expect(() => DocumentPage({ params })).rejects.toThrow();

    expect(Next.notFound).toHaveBeenCalledOnce();
    expect(console.warn).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });

  it("calls notFound when metadata is not available", async () => {
    // for metadata to be unavailable, its own meta should be null,
    // and its parent meta should also be null OR parent page data should be unavailable
    vi.spyOn(DocsPages, "getPage").mockImplementation((path) => {
      if (path === "/test-collection/test-slug") {
        throw new Error("Page does not exist");
      }
      return testPageData.tab;
    });

    await expect(() => DocumentPage({ params: tabParams })).rejects.toThrow();

    expect(Next.notFound).toHaveBeenCalledOnce();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        `No meta found for "/test-collection/test-slug/overview".`,
      ),
    );
  });

  it("calls notFound, but not warn on console if metadata is not available in production environment", async () => {
    // parent 조회에도 tab 데이터 (meta가 없는)를 반환하도록
    vi.spyOn(DocsPages, "getPage").mockReturnValue(testPageData.tab);
    vi.stubEnv("NODE_ENV", "production");

    await expect(() => DocumentPage({ params: tabParams })).rejects.toThrow();

    expect(Next.notFound).toHaveBeenCalledOnce();
    expect(console.warn).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });
});
