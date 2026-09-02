import { wondesignDefault } from "@/presets/wondesign-default";

describe("presets", () => {
  it("wondesignDefault should be a string of CSS variables", () => {
    expect(wondesignDefault).toBeDefined();

    // test one of each group
    expect(wondesignDefault).toContain(
      "--color-primary: light-dark(#1647E8, #3B82F6)",
    );
    expect(wondesignDefault).toContain(
      "--elevation-lv1: 0px 1px 3px rgba(127, 127, 127, 0.2)",
    );
    expect(wondesignDefault).toContain("--radius-sm: 4px");
    expect(wondesignDefault).toContain("--spacing-md: 8px");
    expect(wondesignDefault).toContain(
      '--text-hero: 700 1.75rem/2.5rem "Kalam", "Kalam Fallback"',
    );
    expect(wondesignDefault).toContain("--font-size-heading-sm: 1.25rem");
  });
});
