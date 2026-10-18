export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    // localStorage is unavailable (e.g., SSR / private mode)
    return null;
  }
}

export function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // localStorage is unavailable (e.g., private mode / quota exceeded)
    console.warn(`[WonDesign Theme] Failed to save theme: ${e}`);
  }
}
