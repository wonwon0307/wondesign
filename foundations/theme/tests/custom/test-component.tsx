import { useTheme } from "@/custom/context";

export function TestComponent() {
  const { themes, theme, selectTheme } = useTheme();

  return (
    <div>
      <span>Current Theme: {theme}</span>
      <span>Available Themes: {themes.join(", ")}</span>
      {themes.map((t, i) => (
        <button key={`${t}-${i}`} onClick={() => selectTheme(t)}>
          Set {t} Theme
        </button>
      ))}
      <button onClick={() => selectTheme("non-existing")}>
        Set Non-Existing Theme
      </button>
    </div>
  );
}
