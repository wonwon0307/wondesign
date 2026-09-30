import type { IconProps } from "@wondesign/svg2tsx";
export function CopyCode({ size = 16, ...props }: Readonly<IconProps>) {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M3.333 11.333A1.333 1.333 0 0 1 2 10V3.333A1.333 1.333 0 0 1 3.333 2H10a1.333 1.333 0 0 1 1.333 1.333"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M13 5H6.333C5.597 5 5 5.597 5 6.333V13c0 .736.597 1.333 1.333 1.333H13c.736 0 1.333-.597 1.333-1.333V6.333C14.333 5.597 13.736 5 13 5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="m8.333 8.333-.666 1.334L8.333 11M11 8.333l.667 1.334L11 11"
      />
    </svg>
  );
}
