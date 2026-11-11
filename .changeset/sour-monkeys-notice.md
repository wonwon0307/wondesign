---
"@wondesign/key-events": patch
---

Add `scopeRef` option to `useEscapeKey`. When given, Escape only calls the callback while focus is inside the referenced element, and does nothing while the ref is empty.
