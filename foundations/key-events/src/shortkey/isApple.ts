export function isApple() {
  if (typeof navigator !== "undefined") {
    return /Mac|iPhone|iPad|iPod/.test(
      navigator.platform || navigator.userAgent,
    );
  }
  return false;
}
