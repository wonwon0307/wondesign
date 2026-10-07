import type { IconProps } from "@wondesign/svg2tsx";
export function Download({ size = "1em", ...props }: Readonly<IconProps>) {
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
        d="m9.54 10.92-.873.84V8a.667.667 0 0 0-1.334 0v3.727l-.86-.867a.668.668 0 0 0-1.142.473.67.67 0 0 0 .196.474l2 2a.667.667 0 0 0 .933.006l2-1.933a.667.667 0 1 0-.92-.96"
      />
      <path
        fill="currentColor"
        d="M11.78 4.667a4 4 0 0 0-7.56 0 3.333 3.333 0 0 0-2.053 5.513.665.665 0 0 0 1.246-.336.67.67 0 0 0-.246-.51A2 2 0 0 1 4.667 6h.066a.67.67 0 0 0 .667-.533 2.667 2.667 0 0 1 5.227 0 .666.666 0 0 0 .666.533h.04a2 2 0 0 1 1.5 3.333.666.666 0 0 0 .06.947.666.666 0 0 0 .94-.06 3.334 3.334 0 0 0-2.053-5.553"
      />
    </svg>
  );
}
