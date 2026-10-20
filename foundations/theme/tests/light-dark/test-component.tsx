import { useLightDark } from "@/light-dark/context";

export function TestComponent() {
  const {
    themes,
    mode,
    colorScheme,
    theme,
    lightTheme,
    darkTheme,
    selectDarkTheme,
    selectLightTheme,
    selectMode,
  } = useLightDark();

  return (
    <div>
      <span>Current Mode: {mode}</span>
      <span>Current Color Scheme: {colorScheme}</span>
      <span>Resolved Theme: {theme}</span>
      <span>Selected Light Theme: {lightTheme}</span>
      <span>Available Light Themes: {themes.light.join(", ")}</span>
      <span>Selected Dark Theme: {darkTheme}</span>
      <span>Available Dark Themes: {themes.dark.join(", ")}</span>
      <button onClick={() => selectMode("light")}>Select Light Mode</button>
      <button onClick={() => selectMode("dark")}>Select Dark Mode</button>
      <button onClick={() => selectMode("system")}>Select System Mode</button>
      {themes.light.map((theme, i) => (
        <button key={`${theme}-${i}`} onClick={() => selectLightTheme(theme)}>
          Select {theme} as Light Theme
        </button>
      ))}
      {themes.dark.map((theme, i) => (
        <button key={`${theme}-${i}`} onClick={() => selectDarkTheme(theme)}>
          Select {theme} as Dark Theme
        </button>
      ))}
      <button onClick={() => selectLightTheme("invalid")}>
        Select Invalid Light Theme
      </button>
      <button onClick={() => selectDarkTheme("invalid")}>
        Select Invalid Dark Theme
      </button>
    </div>
  );
}
