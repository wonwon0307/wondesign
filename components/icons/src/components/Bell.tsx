import type { IconProps } from "@wondesign/svg2tsx";
export function Bell({ size = "1em", ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M6.764 2.165a1.333 1.333 0 0 1 2.472 0 4.67 4.67 0 0 1 3.43 4.502v3.131l1.222 1.832a.666.666 0 0 1-.555 1.037H10.31a2.334 2.334 0 0 1-4.62 0H2.667a.667.667 0 0 1-.555-1.037l1.221-1.832V6.667c0-2.15 1.454-3.96 3.431-4.502m.293 10.502a1 1 0 0 0 1.886 0zM8 3.333a3.333 3.333 0 0 0-3.333 3.334V10c0 .132-.04.26-.112.37l-.642.963h8.174l-.642-.963a.67.67 0 0 1-.112-.37V6.667A3.333 3.333 0 0 0 8 3.333"
      />
    </svg>
  );
}
