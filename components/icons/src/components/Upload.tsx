import type { IconProps } from "@wondesign/svg2tsx";
export function Upload({ size = 16, ...props }: Readonly<IconProps>) {
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
        d="M8.473 7.527a.667.667 0 0 0-.933 0l-2 1.933a.667.667 0 1 0 .92.96l.873-.847v3.76a.667.667 0 0 0 1.334 0V9.607l.86.866a.669.669 0 1 0 .946-.946z"
      />
      <path
        fill="currentColor"
        d="M11.78 4.667a4 4 0 0 0-7.56 0 3.333 3.333 0 0 0-2.053 5.513.665.665 0 0 0 1.246-.336.67.67 0 0 0-.246-.51A2 2 0 0 1 4.667 6h.066a.67.67 0 0 0 .667-.533 2.667 2.667 0 0 1 5.227 0 .666.666 0 0 0 .666.533h.04a2 2 0 0 1 1.5 3.333.666.666 0 0 0 .06.947.666.666 0 0 0 .94-.06 3.334 3.334 0 0 0-2.053-5.553"
      />
    </svg>
  );
}
