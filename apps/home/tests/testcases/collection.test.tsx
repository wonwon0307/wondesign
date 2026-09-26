import { render } from "@testing-library/react";
import * as navigation from "next/navigation";
import * as WondocsSidebar from "@wondocs/core/sidebar";

import { CollectionLayout, CollectionIndex } from "@/pages/collection";
import { testSidebarItems } from "../testdata/collection";

describe("CollectionLayout", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const params = Promise.resolve({ collection: "test-collection" });

  it("renders the sidebar correctly", async () => {
    const jsx = await CollectionLayout({
      params,
      children: <div>Test Content</div>,
    });
    const { getByText } = render(jsx);

    expect(getByText("Test Link")).toBeTruthy();
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Nested Link 1")).toBeTruthy();
    expect(getByText("Nested Link 2")).toBeTruthy();
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("warns on console if separator is detected in sidebar", async () => {
    vi.spyOn(WondocsSidebar, "getSidebar").mockReturnValue([
      ...testSidebarItems,
      { type: "separator" },
    ] as WondocsSidebar.DocsItem[]);
    const jsx = await CollectionLayout({
      params,
      children: <div>Test Content</div>,
    });
    render(jsx);

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Unknown sidebar item"),
      expect.objectContaining({ type: "separator" }),
    );
  });

  it("doesn't warn on console even if separator is detected, if in production environment", async () => {
    vi.spyOn(WondocsSidebar, "getSidebar").mockReturnValue([
      ...testSidebarItems,
      { type: "separator" },
    ] as WondocsSidebar.DocsItem[]);
    vi.stubEnv("NODE_ENV", "production");

    const jsx = await CollectionLayout({
      params,
      children: <div>Test Content</div>,
    });
    render(jsx);

    expect(console.warn).not.toHaveBeenCalled();
  });
});

describe("CollectionIndex", () => {
  it("redirects on index page access correctly", async () => {
    const params = Promise.resolve({ collection: "test-collection" });
    await CollectionIndex({
      params,
    });

    expect(navigation.redirect).toHaveBeenCalledWith("/test-link", "replace");
  });
});
