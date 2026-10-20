// JSON-encode a value for embedding in an inline <script>,
// escaping "<" so a value can't close the script tag early.
export function serialize(value: unknown) {
  return JSON.stringify(value).replaceAll("<", String.raw`\u003c`);
}
