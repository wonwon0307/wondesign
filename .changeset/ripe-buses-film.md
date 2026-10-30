---
"@wondesign/separator": minor
---

Initial release of `@wondesign/separator`, a thin line that divides content, either for looks or as a real break in the page.

- **Separator**: `Separator` draws a 1px line between pieces of content, stretching to the full width or height of its container.
- **Decorative or theme break**: by default, the line is hidden from screen readers. Set `variant="theme-break"` to have it announced as a separator, with its
  orientation.
- **Vertical**: add `vertical` to divide content placed side by side, like the links in a nav row.
- **Bold**: add `bold` for a 2px line, for breaks that should stand out more.
- **Styleable**: the line's color comes from `tokens.colors.borderMuted`, with a fallback when the token stylesheet isn't loaded. Your `className` and `style` are
  applied on top.
- **Typed**: `SeparatorProps` is exported. It accepts the props of `<div>`, including `ref`, except `children` and the ARIA attributes the separator sets itself.
