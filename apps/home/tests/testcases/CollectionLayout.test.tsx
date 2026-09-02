import { render } from "@testing-library/react";

import { CollectionLayout } from "@/pages/collection/layout";

describe("CollectionLayout", () => {
  it("renders sidebar correctly", async () => {
    const params = Promise.resolve({ collection: "test-collection" });
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
});
