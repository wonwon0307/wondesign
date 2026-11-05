---
"@wondesign/focus": patch
---

`useAutoFocus` returns focus to the element that had it before opening when `returnRef` is passed but empty, like a trigger that isn't rendered. Previously, focus was lost to `<body>`.
