import * as navigation from "next/navigation";

import { CollectionRedirect } from "@/pages/collections";

describe("CollectionRedirect", () => {
  it("renders correctly", async () => {
    const params = Promise.resolve({ collection: "test-collection" });
    await CollectionRedirect({
      params,
    });

    expect(navigation.redirect).toHaveBeenCalledWith("/test-link", "replace");
  });
});
