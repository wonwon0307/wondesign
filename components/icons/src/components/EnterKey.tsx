import type { IconProps } from "@wondesign/svg2tsx";
export function EnterKey({ size = "1em", ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        clipPath="url(#enter-key_svg__a)"
      >
        <path d="M14.667 14.667V1.333H8v5.334H1.333v8z" />
        <path d="m7 9.333-1.333 1.334L7 12" />
        <path d="M11.333 7.667v3H5.667" />
      </g>
      <defs>
        <clipPath id="enter-key_svg__a">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
