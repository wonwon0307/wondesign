const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not(:disabled)",
  'input:not(:disabled):not([type="hidden"])',
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "[contenteditable]:not([contenteditable='false'])",
  "details > summary:first-of-type",
  "audio[controls]",
  "video[controls]",
  "[tabindex]:not(:disabled)",
].join(", ");

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  ).filter(isTabbable);
}

function isTabbable(element: HTMLElement): boolean {
  // tabindex가 음수면 Tab 순서에서 제외된다
  const tabIndex = Number.parseInt(element.getAttribute("tabindex") ?? "", 10);
  if (tabIndex < 0) return false;

  // inert 하위 요소는 focus를 받을 수 없다
  if (element.closest("[inert]")) return false;

  return isVisible(element);
}

function isVisible(element: HTMLElement): boolean {
  if (typeof element.checkVisibility === "function") {
    return element.checkVisibility({ visibilityProperty: true });
  }

  // checkVisibility를 지원하지 않는 환경에서는 직접 확인한다
  for (let node: Element | null = element; node; node = node.parentElement) {
    if (getComputedStyle(node).display === "none") return false;
  }
  return getComputedStyle(element).visibility === "visible";
}
