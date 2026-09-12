import { renderHook } from "@testing-library/react";

import { useCollapsible } from "@/contexts";

describe("useCollapsible", () => {
  it("should throw an error if used outside the Collapsible wrapper", () => {
    expect(() => renderHook(() => useCollapsible())).toThrow(
      "[WonDesign Collapsible] useCollapsible() must be used inside the Collapsible wrapper.",
    );
  });
});
