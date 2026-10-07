import type { IconProps } from "@wondesign/svg2tsx";
export function ColorTheme({ size = "1em", ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        stroke="currentColor"
        strokeWidth={1.333}
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path
        fill="currentColor"
        d="M18.364 5.636A9 9 0 0 0 5.636 18.364L12 12z"
      />
    </svg>
  );
}
